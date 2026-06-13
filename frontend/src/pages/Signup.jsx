import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input"
import GithubSVG from "../assets/github-svgrepo-com.svg"

const signupSchema = z
  .object({
    fname: z.string().min(3, "Name must be atleast 3 characters"),
    email: z.string().email("Please enter correct email"),
    psswd: z
      .string()
      .min(6, "Password must be atleast 6 characters")
      .regex(/[A-Z]/, "Password must contain uppercase letter")
      .regex(/[0-9]/, "Password must contain number"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.psswd === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export default function SignupPage() {
  const navigate = useNavigate();

  const [codeSent, setCodeSent] = useState(false);
  const [sendingCode, setSendingCode] = useState(false);
  const [userCode, setUserCode] = useState("");

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signupSchema),
  });

  // ✅ SEND CODE
  const sendCode = async () => {
    const email = getValues("email");

    if (!email) return alert("Enter email first");

    try {
      setSendingCode(true);

      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/send-code`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );

      const text = await response.json();

      if (!response.ok) {
        return alert(text);
      }

      setCodeSent(true);
      alert("Verification code sent");
    } catch (err) {
      console.log(err);
      alert("Failed to send code");
    } finally {
      setSendingCode(false);
    }
  };

  // ✅ SIGNUP
  const onSubmit = async (data) => {
    if (!codeSent) return alert("Please verify your email");
    if (!userCode) return alert("Enter verification code");

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/signup`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...data,
            code: userCode,
          }),
        }
      );

      const text = await response.text();

      if (!response.ok) {
        return alert(text); // ❌ OTP / error
      }

      alert("Account Created Successfully"); // ✅ success
      navigate("/login");
    } catch (err) {
      console.log(err);
      alert("Something went wrong");
    }
  };

  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });
  useEffect(() => {
    localStorage.setItem(
      "theme",
      darkMode ? "dark" : "light"
    );

    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

  }, [darkMode])
  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden flex items-center justify-center px-4 py-10">

      {/* Background effects */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: `
          radial-gradient(circle at 50% 50%, 
            rgba(203, 213, 225, 0.12) 0%, 
            rgba(203, 213, 225, 0.07) 25%, 
            rgba(203, 213, 225, 0.03) 35%, 
            transparent 50%
          )
        `,
          backgroundSize: "100% 100%",
        }}
      />

      <div className="relative z-10 w-full max-w-6xl grid lg:grid-cols-2 rounded-[32px] overflow-hidden border border-white/10 bg-card backdrop-blur-2xl shadow-2xl shadow-cyan-500/10">

        {/* LEFT PANEL */}
        <div
          className="
  hidden lg:flex
  flex-col
  justify-between
  p-12

  bg-gradient-to-br
  from-cyan-500/10
  via-transparent
  to-fuchsia-500/10

  border-r
  border-border

  relative
  overflow-hidden
"
        >
          {/* Background Glow */}
          <div className="absolute inset-0 pointer-events-none">
            <div
              className="
      absolute
      top-10
      left-10
      w-72
      h-72
      bg-cyan-500/10
      blur-3xl
      rounded-full
    "
            />

            <div
              className="
      absolute
      bottom-10
      right-10
      w-72
      h-72
      bg-fuchsia-500/10
      blur-3xl
      rounded-full
    "
            />
          </div>

          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-10">
              <div
                className="
        p-3
        rounded-2xl
        bg-gradient-to-r
        from-cyan-500
        to-fuchsia-500

        shadow-[0_0_25px_rgba(34,211,238,0.25)]
      "
              >
                🔒
              </div>

              <h1
                className="
        text-3xl
        font-extrabold

        bg-gradient-to-r
        from-cyan-400
        to-fuchsia-500

        bg-clip-text
        text-transparent
      "
              >
                Vaultify
              </h1>
            </div>

            <div
              className="
      inline-flex
      items-center
      gap-2

      px-4
      py-2

      rounded-full

      bg-cyan-500/10
      border
      border-cyan-500/20

      backdrop-blur-xl

      text-cyan-300
      text-sm
      font-medium

      mb-6
    "
            >
              ✨ Trusted by 50,000+ users
            </div>

            <h2
              className="
      text-5xl
      font-extrabold
      leading-tight
      tracking-tight
    "
            >
              Secure Your

              <span
                className="
        block

        bg-gradient-to-r
        from-cyan-400
        via-sky-400
        to-fuchsia-500

        bg-clip-text
        text-transparent

        drop-shadow-[0_0_25px_rgba(34,211,238,0.25)]
      "
              >
                Digital Life
              </span>
            </h2>

            <p
              className="
      mt-6
      max-w-md

      text-muted-foreground
      text-lg
      leading-relaxed
    "
            >
              Store passwords, notes, cards and everything important
              in a beautifully encrypted vault with instant access
              across all your devices.
            </p>
          </div>

          <div className="relative z-10 grid grid-cols-2 gap-4 mt-12">
            <div
              className="
      p-5
      rounded-3xl

      bg-transparent
      backdrop-blur-xl

      border
      border-cyan-500/15

      hover:border-cyan-500/30
      transition-all
    "
            >
              <p
                className="
        text-3xl
        font-bold

        bg-gradient-to-r
        from-cyan-400
        to-fuchsia-500

        bg-clip-text
        text-transparent
      "
              >
                256-bit
              </p>

              <p className="text-muted-foreground mt-1">
                Encryption
              </p>
            </div>

            <div
              className="
      p-5
      rounded-3xl

      bg-transparent
      backdrop-blur-xl

      border
      border-fuchsia-500/15

      hover:border-fuchsia-500/30
      transition-all
    "
            >
              <p
                className="
        text-3xl
        font-bold

        bg-gradient-to-r
        from-cyan-400
        to-fuchsia-500

        bg-clip-text
        text-transparent
      "
              >
                99.9%
              </p>

              <p className="text-muted-foreground mt-1">
                Secure
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="p-6 sm:p-10 lg:p-14 flex items-center justify-center">
          <div className="w-full max-w-md">

            {/* Mobile Logo */}
            <div className="lg:hidden flex items-center justify-center gap-3 mb-10">
              <div
                className="
        p-3
        rounded-2xl
        bg-gradient-to-r
        from-cyan-500
        to-fuchsia-500
        shadow-[0_0_25px_rgba(34,211,238,0.25)]
      "
              >
                🔒
              </div>

              <h1
                className="
        text-3xl
        font-extrabold
        bg-gradient-to-r
        from-cyan-400
        to-fuchsia-500
        bg-clip-text
        text-transparent
      "
              >
                Vaultify
              </h1>
            </div>

            {/* Heading */}
            <div className="mb-8">

              <div
                className="
        inline-flex
        items-center
        px-4
        py-2
        rounded-full
        bg-cyan-500/10
        border
        border-cyan-500/20
        text-cyan-300
        text-sm
        font-medium
      "
              >
                🚀 Create Your Secure Vault
              </div>

              <h2
                className="
        mt-5
        text-4xl
        font-extrabold
        tracking-tight
      "
              >
                Join
                <span
                  className="
          block
          bg-gradient-to-r
          from-cyan-400
          via-sky-400
          to-fuchsia-500
          bg-clip-text
          text-transparent
        "
                >
                  Vaultify
                </span>
              </h2>

              <p className="mt-3 text-muted-foreground">
                Start protecting your passwords with military-grade encryption.
              </p>

            </div>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-5"
            >

              {/* NAME */}

              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Full Name
                </label>

                <input
                  {...register("fname")}
                  placeholder="John Doe"
                  className="
          w-full
          h-12
          px-4
          rounded-2xl

  bg-card
  border
  border-border

  text-foreground

          backdrop-blur-xl

          focus:outline-none
          focus:border-cyan-500
          focus:ring-2
          focus:ring-cyan-500/20

          transition-all
        "
                />

                <p className="text-red-500 text-sm">
                  {errors.fname?.message}
                </p>
              </div>

              {/* EMAIL */}

              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Email Address
                </label>

                <input
                  {...register("email")}
                  placeholder="you@example.com"
                  className="
          w-full
          h-12
          px-4
          rounded-2xl

  bg-card
  border
  border-border

  text-foreground

          backdrop-blur-xl

          focus:outline-none
          focus:border-cyan-500
          focus:ring-2
          focus:ring-cyan-500/20

          transition-all
        "
                />

                <p className="text-red-500 text-sm">
                  {errors.email?.message}
                </p>

                <button
                  type="button"
                  onClick={sendCode}
                  disabled={sendingCode}
                  className="
          w-full
          h-12

          rounded-2xl

          font-semibold

          bg-gradient-to-r
          from-cyan-500
          to-fuchsia-500

          text-foreground

          shadow-[0_0_20px_rgba(34,211,238,0.25)]

          hover:scale-[1.02]
          hover:shadow-[0_0_35px_rgba(217,70,239,0.35)]

          transition-all
        "
                >
                  {sendingCode
                    ? "Sending..."
                    : "Send Verification Code"}
                </button>
              </div>

              {/* OTP */}

              {codeSent && (
                <div className="space-y-2">

                  <label className="text-sm font-medium">
                    Verification Code
                  </label>

                  <input
                    value={userCode}
                    onChange={(e) =>
                      setUserCode(e.target.value)
                    }
                    placeholder="Enter OTP"
                    className="
            w-full
            h-12
            px-4
            rounded-2xl

  bg-card
  border
  border-border

  text-foreground

            backdrop-blur-xl

            focus:outline-none
            focus:border-cyan-500
            focus:ring-2
            focus:ring-cyan-500/20
          "
                  />
                </div>
              )}

              {/* PASSWORD */}

              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Password
                </label>

                <input
                  type="password"
                  {...register("psswd")}
                  placeholder="Create a strong password"
                  className="
          w-full
          h-12
          px-4
          rounded-2xl

  bg-card
  border
  border-border

  text-foreground
          backdrop-blur-xl

          focus:outline-none
          focus:border-cyan-500
          focus:ring-2
          focus:ring-cyan-500/20
        "
                />

                <p className="text-red-500 text-sm">
                  {errors.psswd?.message}
                </p>
              </div>

              {/* CONFIRM */}

              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Confirm Password
                </label>

                <input
                  type="password"
                  {...register("confirmPassword")}
                  placeholder="Confirm password"
                  className="
          w-full
          h-12
          px-4
          rounded-2xl

  bg-card
  border
  border-border

  text-foreground
          backdrop-blur-xl

          focus:outline-none
          focus:border-fuchsia-500
          focus:ring-2
          focus:ring-fuchsia-500/20
        "
                />

                <p className="text-red-500 text-sm">
                  {errors.confirmPassword?.message}
                </p>
              </div>

              {/* SUBMIT */}

              <button
                type="submit"
                className="
        w-full
        h-12

        rounded-2xl

        text-lg
        font-semibold

        bg-gradient-to-r
        from-cyan-500
        to-fuchsia-500

        text-white

        hover:scale-[1.02]

        shadow-[0_0_25px_rgba(34,211,238,0.25)]
        hover:shadow-[0_0_35px_rgba(217,70,239,0.35)]

        transition-all
      "
              >
                Create Secure Vault
              </button>

              <div className="pt-6 text-center">

                <p className="text-muted-foreground">
                  Already have an account?
                  <a
                    href="/login"
                    className="
            ml-2
            font-semibold

            bg-gradient-to-r
            from-cyan-400
            to-fuchsia-500

            bg-clip-text
            text-transparent
          "
                  >
                    Login
                  </a>
                </p>

              </div>

            </form>

          </div>
        </div>
      </div>
    </div>
  );
}
