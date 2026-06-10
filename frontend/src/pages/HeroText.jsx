import { useEffect, useState } from "react";

const words = [
  "Instagram",
  "Facebook",
  "GitHub",
  "Netflix",
  "Google",
  "Anything"
];

export default function Typewriter() {
  const [wordIndex, setWordIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[wordIndex];

    const timeout = setTimeout(() => {
      if (!deleting) {
        setText(currentWord.slice(0, text.length + 1));

        if (text.length + 1 === currentWord.length) {
          setTimeout(() => setDeleting(true), 1000);
        }
      } else {
        setText(currentWord.slice(0, text.length - 1));

        if (text.length === 1) {
          setDeleting(false);
          setWordIndex((prev) => (prev + 1) % words.length);
        }
      }
    }, deleting ? 50 : 100);

    return () => clearTimeout(timeout);
  }, [text, deleting, wordIndex]);

  return (
    <h1 className="text-7xl font-bold text-foreground flex flex-col w-fit  h-fit">
      <span>
        Store Passwords {" "}
      </span>
      <span className="flex justify-start">
        of {" "}
        <span className="bg-gradient-to-r from-cyan-400 to-fuchsia-500 bg-clip-text text-transparent ml-4 h-full">
          {text}
          <span className="animate-pulse">|</span>
        </span>
      </span>
    </h1>
  );
}
