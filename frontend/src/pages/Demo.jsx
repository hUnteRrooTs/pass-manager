import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function DemoPage() {

  const navigate = useNavigate();

  const [visiblePasswordId, setVisiblePasswordId] =
    useState(null);

  const demoPasswords = [
    {
      pid: 1,
      website: "Github",
      username: "developer@github.com",
      password: "Gh@2026Secure",
    },

    {
      pid: 2,
      website: "Gmail",
      username: "manoj@gmail.com",
      password: "Mail@123Secure",
    },

    {
      pid: 3,
      website: "Netflix",
      username: "watcher@netflix.com",
      password: "Netflix#2026",
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-120px] left-[-100px] w-[320px] h-[320px] bg-cyan-500/20 blur-3xl rounded-full" />

        <div className="absolute bottom-[-150px] right-[-100px] w-[350px] h-[350px] bg-purple-500/20 blur-3xl rounded-full" />
      </div>

      <header className="relative z-10 border-b border-white/10 backdrop-blur-xl">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 h-20 flex items-center justify-between">

          <div className="flex items-center gap-3">

            <div className="w-11 h-11 rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-500 flex items-center justify-center text-black font-bold text-lg">
              🔒
            </div>

            <h1 className="text-2xl font-bold">
              Vaultify Demo
            </h1>
          </div>

          <button
            onClick={() => navigate("/signup")}
            className="px-5 py-2 rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-bold hover:scale-105 transition-transform"
          >
            Start Free
          </button>
        </div>
      </header>

      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-10">

        <div className="mb-12">

          <p className="inline-flex px-4 py-2 rounded-full bg-cyan-400/10 border border-cyan-400/20 text-cyan-300 text-sm">
            Interactive Demo Vault
          </p>

          <h2 className="mt-6 text-5xl font-bold leading-tight">
            Experience

            <span className="block bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent">
              Vaultify
            </span>
          </h2>

          <p className="mt-4 text-slate-400 text-lg max-w-2xl">
            Explore how Vaultify securely stores and manages your passwords with encryption and modern security features.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">

          <div className="p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl">
            <p className="text-slate-400 text-sm">
              Total Passwords
            </p>

            <h3 className="mt-3 text-4xl font-bold">
              3
            </h3>
          </div>

          <div className="p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl">
            <p className="text-slate-400 text-sm">
              Encryption
            </p>

            <h3 className="mt-3 text-4xl font-bold text-cyan-400">
              AES
            </h3>
          </div>

          <div className="p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl">
            <p className="text-slate-400 text-sm">
              Security Score
            </p>

            <h3 className="mt-3 text-4xl font-bold text-green-400">
              92%
            </h3>
          </div>

          <div className="p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl">
            <p className="text-slate-400 text-sm">
              Clipboard Timer
            </p>

            <h3 className="mt-3 text-4xl font-bold">
              30s
            </h3>
          </div>
        </div>

        <div className="rounded-[32px] bg-white/5 border border-white/10 backdrop-blur-2xl overflow-hidden">

          <div className="p-6 border-b border-white/10 flex items-center justify-between">

            <div>
              <h3 className="text-2xl font-bold">
                Demo Password Vault
              </h3>

              <p className="text-slate-400 mt-1">
                Sample encrypted credentials
              </p>
            </div>

            <button
              className="px-5 py-3 rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-bold"
            >
              + Add Password
            </button>
          </div>

          <div className="divide-y divide-white/10">

            {demoPasswords.map((item) => (

              <div
                key={item.pid}
                className="p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4 hover:bg-white/[0.03] transition-all"
              >

                <div>

                  <h4 className="text-xl font-semibold">
                    {item.website}
                  </h4>

                  <p className="text-slate-400">
                    {item.username}
                  </p>

                  <p className="mt-2 text-cyan-400 font-mono">
                    {visiblePasswordId === item.pid
                      ? item.password
                      : "••••••••••••"}
                  </p>
                </div>

                <div className="flex items-center gap-3">

                  <button
                    onClick={() => {

                      if (visiblePasswordId === item.pid) {
                        setVisiblePasswordId(null);
                      }

                      else {
                        setVisiblePasswordId(item.pid);
                      }
                    }}
                    className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all"
                  >
                    {visiblePasswordId === item.pid
                      ? "Hide"
                      : "View"}
                  </button>

                  <button className="px-4 py-2 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 hover:bg-cyan-500/20 transition-all">
                    Copy
                  </button>

                  <button className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all">
                    Edit
                  </button>

                  <button className="px-4 py-2 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 transition-all">
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 text-center">

          <h3 className="text-4xl font-bold">
            Ready to secure your passwords?
          </h3>

          <p className="mt-4 text-slate-400 text-lg">
            Create your own encrypted vault in seconds.
          </p>

          <button
            onClick={() => navigate("/signup")}
            className="mt-6 px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-bold text-lg hover:scale-105 transition-transform shadow-xl shadow-cyan-500/30"
          >
            Create Free Account
          </button>
        </div>
      </main>
    </div>
  );
}
