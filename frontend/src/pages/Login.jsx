import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import GithubSVG from "../assets/github-svgrepo-com.svg"
const loginSchema = z.object({
  email: z
    .string()
    .email("Please enter correct email"),

  password: z
    .string()
    .min(6, "Password must be atleast 6 characters"),
});

export default function LoginPage() {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
  });

  const onSubmit = async (data) => {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/login`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(data),
    });

    if (response.ok) {
      const getUid = await fetch(`${import.meta.env.VITE_BACKEND_URL}/getuid/`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        }
      })
      const uid = await getUid.json();
      console.log(uid)
      console.log("Login worked")
      const data = {
        "fname": uid.fname, "uid": uid.uid, "email": uid.email
      }
      localStorage.setItem("user", JSON.stringify(data))
      navigate("/vault");
    } else {
      alert("Invalid credentials");
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
    <div className="min-h-screen bg-background text-foreground  relative overflow-hidden flex items-center justify-center px-4 py-10">
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
      <div className="relative z-10 w-full max-w-5xl grid lg:grid-cols-2 rounded-[32px] overflow-hidden border border-white/10  bg-card text-card-foreground backdrop-blur-2xl shadow-2xl shadow-cyan-500/10">
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

    backdrop-blur-xl
    border-r
    border-white/10

    relative
    overflow-hidden
  "
        >

          {/* Glow Effects */}
          <div className="absolute top-0 left-0 w-72 h-72 bg-cyan-500/10 blur-3xl rounded-full" />
          <div className="absolute bottom-0 right-0 w-72 h-72 bg-fuchsia-500/10 blur-3xl rounded-full" />

          <div className="relative z-10">

            <div className="flex items-center gap-4 mb-10">

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
                🔐
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

        text-cyan-300
        text-sm
        font-medium

        mb-8
      "
            >
              ✨ Secure Password Management
            </div>

            <h2
              className="
        text-5xl
        font-black
        leading-tight
      "
            >
              Welcome

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
                Back Again
              </span>
            </h2>

            <p
              className="
        mt-6

        text-muted-foreground
        text-lg
        leading-relaxed
        max-w-md
      "
            >
              Access your encrypted vault securely from anywhere and keep
              your digital life protected with military-grade encryption.
            </p>

          </div>

          {/* Stats */}
          <div className="relative z-10 grid grid-cols-2 gap-4 mt-12">

            <div
              className="
        rounded-3xl

        border
        border-cyan-500/20

        bg-card text-card-foreground
        backdrop-blur-xl

        p-5

        hover:border-cyan-500/40
        transition-all
      "
            >
              <p className="text-3xl font-bold text-cyan-400">
                24/7
              </p>

              <p className="text-muted-foreground mt-1">
                Protection
              </p>
            </div>

            <div
              className="
        rounded-3xl

        border
        border-fuchsia-500/20

        bg-card text-card-foreground
        backdrop-blur-xl

        p-5

        hover:border-fuchsia-500/40
        transition-all
      "
            >
              <p className="text-3xl font-bold text-fuchsia-400">
                AES
              </p>

              <p className="text-muted-foreground mt-1">
                Encryption
              </p>
            </div>

          </div>

        </div>

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
                🔐
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
            <div className="text-center lg:text-left">

              <h2
                className="
          text-4xl
          md:text-5xl

          font-black

          bg-gradient-to-r
          from-cyan-400
          via-sky-400
          to-fuchsia-500

          bg-clip-text
          text-transparent
        "
              >
                Sign In
              </h2>

              <p className="mt-4 text-muted-foreground text-lg">
                Login to access your secure vault.
              </p>

            </div>

            {/* Form Card */}
            <div
              className="
        mt-8

        rounded-3xl

        border
        border-white/10

        bg-card text-card-foreground
        backdrop-blur-xl

        p-6
      "
            >

              <form
                className="space-y-5"
                onSubmit={handleSubmit(onSubmit)}
              >

                {/* Email */}
                <div>

                  <label className="text-sm text-muted-foreground mb-2 block">
                    Email Address
                  </label>

                  <div className="relative">

                    <Mail
                      className="
                absolute
                left-4
                top-1/2
                -translate-y-1/2

                w-5
                h-5

                text-cyan-400
              "
                    />

                    <input
                      type="email"
                      placeholder="you@example.com"
                      {...register("email")}
                      className={`
                w-full

                pl-12
                pr-4
                py-4

                rounded-2xl
  bg-card
  border
  border-border

  text-foreground

                outline-none

                transition-all

                ${errors.email
                          ? "border-red-500"
                          : "border-white/10 focus:border-cyan-500"}
              `}
                    />

                  </div>

                  {errors.email && (
                    <p className="text-red-400 text-sm mt-2">
                      {errors.email.message}
                    </p>
                  )}

                </div>

                {/* Password */}
                <div>

                  <div className="flex justify-between items-center mb-2">

                    <label className="text-sm text-muted-foreground">
                      Password
                    </label>

                    <button
                      type="button"
                      className="
                text-sm

                text-cyan-400

                hover:text-fuchsia-400
                transition-colors
              "
                    >
                      Forgot?
                    </button>

                  </div>

                  <div className="relative">

                    <Lock
                      className="
                absolute
                left-4
                top-1/2
                -translate-y-1/2

                w-5
                h-5

                text-cyan-400
              "
                    />

                    <input
                      type="password"
                      placeholder="Enter your password"
                      {...register("password")}
                      className={`
                w-full

                pl-12
                pr-4
                py-4

                rounded-2xl

  bg-card
  border
  border-border

  text-foreground

                outline-none

                transition-all
                ${errors.password
                          ? "border-red-500"
                          : "border-white/10 focus:border-cyan-500"}
              `}
                    />

                  </div>

                  {errors.password && (
                    <p className="text-red-400 text-sm mt-2">
                      {errors.password.message}
                    </p>
                  )}

                </div>

                <Button
                  type="submit"
                  className="
            w-full
            h-14

            text-lg
            font-bold

            bg-gradient-to-r
            from-cyan-500
            to-fuchsia-500

            hover:scale-[1.02]

            transition-all

            shadow-[0_0_30px_rgba(34,211,238,0.25)]
          "
                >
                  Login Securely
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>

              </form>

            </div>

            {/* Divider */}
            <div className="relative my-8">

              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10" />
              </div>

            </div>

            {/* Signup */}
            <p className="text-center text-muted-foreground">

              Don't have an account?

              <a
                href="/signup"
                className="
          ml-2

          font-medium

          bg-gradient-to-r
          from-cyan-400
          to-fuchsia-500

          bg-clip-text
          text-transparent

          hover:opacity-80
        "
              >
                Create One
              </a>

            </p>

          </div>

        </div>
      </div>
    </div>
  );
}
