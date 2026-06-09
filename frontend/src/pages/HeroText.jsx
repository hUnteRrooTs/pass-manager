import { useEffect, useRef, useState } from "react";
import { animate } from "animejs";

const services = [
  "Instagram",
  "Facebook",
  "GitHub",
  "Netflix",
  "Google",
];

export default function HeroText() {
  const [index, setIndex] = useState(0);
  const textRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      animate({

      })
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <h1 className="text-5xl font-bold text-white">
      Store Passwords for{" "}
      <span ref={textRef} className="text-cyan-400 inline-block">
        {services[index]}
      </span>
    </h1>
  );
}
