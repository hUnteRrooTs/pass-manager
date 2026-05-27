import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
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

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden flex items-center justify-center px-4 py-10">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-120px] left-[-100px] w-[320px] h-[320px] bg-cyan-500/20 blur-3xl rounded-full" />

        <div className="absolute bottom-[-150px] right-[-100px] w-[350px] h-[350px] bg-purple-500/20 blur-3xl rounded-full" />
      </div>

      <div className="relative z-10 w-full max-w-5xl grid lg:grid-cols-2 rounded-[32px] overflow-hidden border border-white/10 bg-white/5 backdrop-blur-2xl shadow-2xl shadow-cyan-500/10">
        <div className="hidden lg:flex flex-col justify-between p-12 bg-gradient-to-br from-cyan-500/10 via-blue-500/5 to-purple-500/10 border-r border-white/10">
          <div>
            <div className="flex items-center gap-3 mb-10">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-500 flex items-center justify-center text-black font-bold text-xl">
                🔐
              </div>

              <h1 className="text-3xl font-bold">
                Vaultify
              </h1>
            </div>

            <p className="inline-flex px-4 py-2 rounded-full bg-cyan-400/10 border border-cyan-400/20 text-cyan-300 text-sm mb-6">
              Secure Password Management
            </p>

            <h2 className="text-5xl font-bold leading-tight">
              Welcome

              <span className="block bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent">
                Back Again
              </span>
            </h2>

            <p className="mt-6 text-slate-300 text-lg leading-relaxed max-w-md">
              Access your encrypted vault securely from anywhere and keep your digital life protected.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-12">

            <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
              <p className="text-3xl font-bold">
                24/7
              </p>

              <p className="text-slate-400 mt-1">
                Protection
              </p>
            </div>
          </div>
        </div>

        <div className="p-6 sm:p-10 lg:p-14 flex items-center justify-center">
          <div className="w-full max-w-md">
            <div className="lg:hidden flex items-center justify-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-500 flex items-center justify-center text-black font-bold text-xl">
                🔐
              </div>

              <h1 className="text-3xl font-bold">
                Vaultify
              </h1>
            </div>

            <h2 className="text-4xl font-bold text-center lg:text-left">
              Sign In
            </h2>

            <p className="mt-3 text-slate-400 text-center lg:text-left">
              Login to access your secure vault.
            </p>

            <form
              className="mt-8 space-y-5"
              onSubmit={handleSubmit(onSubmit)}
            >
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
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm text-slate-300">
                    Password
                  </label>

                  <button
                    type="button"
                    className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors"
                  >
                    Forgot?
                  </button>
                </div>

                <input
                  type="password"
                  placeholder="Enter your password"
                  {...register("password")}
                  className={`w-full px-5 py-4 rounded-2xl bg-black/30 border outline-none transition-all placeholder:text-slate-500 ${errors.password
                    ? "border-red-500 focus:border-red-500"
                    : "border-white/10 focus:border-cyan-400"
                    }`}
                />

                {errors.password && (
                  <p className="text-red-400 text-sm mt-2">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <button
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-bold text-lg hover:scale-[1.02] transition-transform shadow-xl shadow-cyan-500/30"
                type="submit"
              >
                Login Securely
              </button>
            </form>

            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10" />
              </div>

              <div className="relative flex justify-center text-sm">
                <span className="bg-[#050816] px-4 text-slate-400">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button className="py-3 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all font-medium">
                Google
              </button>

              <button className="py-3 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all font-medium" onClick={() => {
                window.location.href = `${import.meta.env.VITE_BACKEND_URL}/auth/github`
              }}>
                GitHub
              </button>
            </div>

            <p className="mt-8 text-center text-slate-400">
              Don't have an account?{" "}

              <a
                className="text-cyan-400 cursor-pointer hover:text-cyan-300 transition-colors"
                href="/signup"
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
