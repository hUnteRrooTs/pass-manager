import { useForm } from "react-hook-form";
import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";

const signupSchema = z
  .object({
    fname: z
      .string()
      .min(3, "Name must be atleast 3 characters"),

    email: z
      .string()
      .email("Please enter correct email"),

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

  const [sentCode, setSentCode] = useState("");

  const [userCode, setUserCode] = useState("");

  const [codeSent, setCodeSent] = useState(false);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signupSchema),
  });

  const sendCode = async () => {

    const email = getValues("email");

    if (!email) {
      return alert("Enter email first");
    }

    try {

      const response = await fetch(
        "http://localhost:3000/send-code",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({ email }),
        }
      );

      const data = await response.json();

      setSentCode(String(data.code));

      setCodeSent(true);

      alert("Verification code sent");

    } catch (err) {

      console.log(err);

      alert("Failed to send code");
    }
  };

  const onSubmit = async (data) => {

    if (!codeSent) {
      return alert("Please verify your email");
    }

    if (userCode !== sentCode) {
      return alert("Invalid verification code");
    }

    try {

      const response = await fetch(
        "http://localhost:3000/signup",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(data),
        }
      );

      const text = await response.text();

      if (!response.ok) {
        alert(text);
        return;
      }

      alert("Account created successfully");

      navigate("/login");

    } catch (err) {

      console.log(err);

      alert("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden flex items-center justify-center px-4 py-10">

      <div className="absolute inset-0 overflow-hidden pointer-events-none">

        <div className="absolute top-[-120px] left-[-100px] w-[320px] h-[320px] bg-cyan-500/20 blur-3xl rounded-full" />

        <div className="absolute bottom-[-150px] right-[-100px] w-[350px] h-[350px] bg-purple-500/20 blur-3xl rounded-full" />
      </div>

      <div className="relative z-10 w-full max-w-6xl grid lg:grid-cols-2 rounded-[32px] overflow-hidden border border-white/10 bg-white/5 backdrop-blur-2xl shadow-2xl shadow-cyan-500/10">

        {/* Left Side */}
        <div className="hidden lg:flex flex-col justify-between p-12 bg-gradient-to-br from-cyan-500/10 via-blue-500/5 to-purple-500/10 border-r border-white/10">

          <div>

            <div className="flex items-center gap-3 mb-10">

              <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-500 flex items-center justify-center text-black font-bold text-xl">
                🔒
              </div>

              <h1 className="text-3xl font-bold">
                Vaultify
              </h1>
            </div>

            <p className="inline-flex px-4 py-2 rounded-full bg-cyan-400/10 border border-cyan-400/20 text-cyan-300 text-sm mb-6">
              Trusted by 50,000+ users
            </p>

            <h2 className="text-5xl font-bold leading-tight">
              Secure Your

              <span className="block bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent">
                Digital Life
              </span>
            </h2>

            <p className="mt-6 text-slate-300 text-lg leading-relaxed max-w-md">
              Store passwords, notes, cards, and everything important with military-grade encryption.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-12">

            <div className="p-5 rounded-2xl bg-white/5 border border-white/10">

              <p className="text-3xl font-bold">
                256-bit
              </p>

              <p className="text-slate-400 mt-1">
                Encryption
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white/5 border border-white/10">

              <p className="text-3xl font-bold">
                99.9%
              </p>

              <p className="text-slate-400 mt-1">
                Secure
              </p>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="p-6 sm:p-10 lg:p-14 flex items-center justify-center">

          <div className="w-full max-w-md">

            <div className="lg:hidden flex items-center justify-center gap-3 mb-8">

              <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-500 flex items-center justify-center text-black font-bold text-xl">
                🔒
              </div>

              <h1 className="text-3xl font-bold">
                Vaultify
              </h1>
            </div>

            <h2 className="text-4xl font-bold text-center lg:text-left">
              Create Account
            </h2>

            <p className="mt-3 text-slate-400 text-center lg:text-left">
              Start protecting your passwords today.
            </p>

            <form
              className="mt-8 space-y-5"
              onSubmit={handleSubmit(onSubmit)}
            >

              {/* Full Name */}
              <div>

                <label className="text-sm text-slate-300 mb-2 block">
                  Full Name
                </label>

                <input
                  type="text"
                  placeholder="John Doe"
                  {...register("fname")}
                  className={`w-full px-5 py-4 rounded-2xl bg-black/30 border outline-none transition-all placeholder:text-slate-500 ${errors.fname
                    ? "border-red-500 focus:border-red-500"
                    : "border-white/10 focus:border-cyan-400"
                    }`}
                />

                {errors.fname && (
                  <p className="text-red-400 text-sm mt-2">
                    {errors.fname.message}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>

                <label className="text-sm text-slate-300 mb-2 block">
                  Email Address
                </label>

                <input
                  type="email"
                  placeholder="you@example.com"
                  {...register("email")}
                  className={`w-full px-5 py-4 rounded-2xl bg-black/30 border outline-none transition-all placeholder:text-slate-500 ${errors.email
                    ? "border-red-500 focus:border-red-500"
                    : "border-white/10 focus:border-cyan-400"
                    }`}
                />

                {errors.email && (
                  <p className="text-red-400 text-sm mt-2">
                    {errors.email.message}
                  </p>
                )}

                <button
                  type="button"
                  onClick={sendCode}
                  className="mt-3 px-5 py-3 rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-bold"
                >
                  Send Verification Code
                </button>
              </div>

              {/* Verification Code */}
              {codeSent && (

                <div>

                  <label className="text-sm text-slate-300 mb-2 block">
                    Verification Code
                  </label>

                  <input
                    type="text"
                    placeholder="Enter code"
                    value={userCode}
                    onChange={(e) =>
                      setUserCode(e.target.value)
                    }
                    className="w-full px-5 py-4 rounded-2xl bg-black/30 border border-white/10 outline-none focus:border-cyan-400"
                  />
                </div>
              )}

              {/* Password */}
              <div>

                <label className="text-sm text-slate-300 mb-2 block">
                  Master Password
                </label>

                <input
                  type="password"
                  placeholder="Create strong password"
                  {...register("psswd")}
                  className={`w-full px-5 py-4 rounded-2xl bg-black/30 border outline-none transition-all placeholder:text-slate-500 ${errors.psswd
                    ? "border-red-500 focus:border-red-500"
                    : "border-white/10 focus:border-cyan-400"
                    }`}
                />

                {errors.psswd && (
                  <p className="text-red-400 text-sm mt-2">
                    {errors.psswd.message}
                  </p>
                )}
              </div>

              {/* Confirm Password */}
              <div>

                <label className="text-sm text-slate-300 mb-2 block">
                  Confirm Password
                </label>

                <input
                  type="password"
                  placeholder="Confirm password"
                  {...register("confirmPassword")}
                  className={`w-full px-5 py-4 rounded-2xl bg-black/30 border outline-none transition-all placeholder:text-slate-500 ${errors.confirmPassword
                    ? "border-red-500 focus:border-red-500"
                    : "border-white/10 focus:border-cyan-400"
                    }`}
                />

                {errors.confirmPassword && (
                  <p className="text-red-400 text-sm mt-2">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>

              <button
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-bold text-lg hover:scale-[1.02] transition-transform shadow-xl shadow-cyan-500/30"
                type="submit"
              >
                Create Secure Vault
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
