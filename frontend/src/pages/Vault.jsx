import { useNavigate } from "react-router-dom";
export default function VaultPage() {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("user");

    navigate("/login");
  };
  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-120px] left-[-100px] w-[320px] h-[320px] bg-cyan-500/20 blur-3xl rounded-full" />

        <div className="absolute bottom-[-150px] right-[-100px] w-[350px] h-[350px] bg-purple-500/20 blur-3xl rounded-full" />
      </div>

      {/* Navbar */}
      <header className="relative z-10 border-b border-white/10 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-500 flex items-center justify-center text-black font-bold text-lg">
              🔒
            </div>

            <h1 className="text-2xl font-bold">
              Vaultify
            </h1>
          </div>

          <button onClick={logout} className="px-5 py-2 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all">
            Logout
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-10">
        {/* Welcome */}
        <div className="mb-10">
          <p className="inline-flex px-4 py-2 rounded-full bg-cyan-400/10 border border-cyan-400/20 text-cyan-300 text-sm">
            Your Secure Password Vault
          </p>

          <h2 className="mt-6 text-5xl font-bold leading-tight">
            Welcome Back,

            <span className="block bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent">
              {user?.fname}
            </span>
          </h2>

          <p className="mt-4 text-slate-400 text-lg max-w-2xl">
            Manage your passwords, credentials, and secure notes in one encrypted place.
          </p>
        </div>

        {/* Stats */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
          <div className="p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl">
            <p className="text-slate-400 text-sm">
              Total Passwords
            </p>

            <h3 className="mt-3 text-4xl font-bold">
              24
            </h3>
          </div>

          <div className="p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl">
            <p className="text-slate-400 text-sm">
              Secure Notes
            </p>

            <h3 className="mt-3 text-4xl font-bold">
              8
            </h3>
          </div>

          <div className="p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl">
            <p className="text-slate-400 text-sm">
              Saved Cards
            </p>

            <h3 className="mt-3 text-4xl font-bold">
              3
            </h3>
          </div>

          <div className="p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl">
            <p className="text-slate-400 text-sm">
              Security Score
            </p>

            <h3 className="mt-3 text-4xl font-bold text-cyan-400">
              98%
            </h3>
          </div>
        </div>

        {/* Password Vault */}
        <div className="rounded-[32px] bg-white/5 border border-white/10 backdrop-blur-2xl overflow-hidden">
          <div className="p-6 border-b border-white/10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h3 className="text-2xl font-bold">
                Saved Passwords
              </h3>

              <p className="text-slate-400 mt-1">
                Your encrypted credentials
              </p>
            </div>

            <button className="px-5 py-3 rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-bold hover:scale-[1.02] transition-transform">
              + Add Password
            </button>
          </div>

          {/* Password List */}
          <div className="divide-y divide-white/10">
            {/* Item */}
            <div className="p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4 hover:bg-white/[0.03] transition-all">
              <div>
                <h4 className="text-xl font-semibold">
                  Gmail
                </h4>

                <p className="text-slate-400">
                  manoj@gmail.com
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all">
                  View
                </button>

                <button className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all">
                  Edit
                </button>

                <button className="px-4 py-2 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 transition-all">
                  Delete
                </button>
              </div>
            </div>

            {/* Item */}
            <div className="p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4 hover:bg-white/[0.03] transition-all">
              <div>
                <h4 className="text-xl font-semibold">
                  GitHub
                </h4>

                <p className="text-slate-400">
                  developer@github.com
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all">
                  View
                </button>

                <button className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all">
                  Edit
                </button>

                <button className="px-4 py-2 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 transition-all">
                  Delete
                </button>
              </div>
            </div>

            {/* Item */}
            <div className="p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4 hover:bg-white/[0.03] transition-all">
              <div>
                <h4 className="text-xl font-semibold">
                  Netflix
                </h4>

                <p className="text-slate-400">
                  movies@netflix.com
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all">
                  View
                </button>

                <button className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all">
                  Edit
                </button>

                <button className="px-4 py-2 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 transition-all">
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
