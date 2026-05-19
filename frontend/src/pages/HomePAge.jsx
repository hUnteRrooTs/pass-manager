import { useEffect, useState } from 'react'

function HomePage() {
  const [user, setUser] = useState(null)
  const logout = () => {
    localStorage.removeItem("user");
  };

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")))
  }, [])
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black text-white overflow-hidden relative">
      {/* Background Glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-120px] left-[-120px] w-[260px] sm:w-[400px] h-[260px] sm:h-[400px] bg-cyan-500/20 blur-3xl rounded-full" />
        <div className="absolute bottom-[-150px] right-[-120px] w-[300px] sm:w-[450px] h-[300px] sm:h-[450px] bg-purple-500/20 blur-3xl rounded-full" />
      </div>

      {/* Navbar */}
      <header className="relative z-10 flex items-center justify-between px-3 sm:px-6 lg:px-10 xl:px-16 2xl:px-24 py-4 sm:py-5 w-full">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-500 flex items-center justify-center shadow-lg shadow-cyan-500/30">
            <span className="text-xl font-bold">🔒</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight">Vaultify</h1>
        </div>

        <nav className="hidden lg:flex items-center gap-8 text-slate-300">
          <a href="#features" className="hover:text-white transition-colors">Features</a>
          <a href="#security" className="hover:text-white transition-colors">Security</a>
          <a href="/vault" className="hover:text-white transition-colors">Vault</a>
        </nav>
        {
          !user ? (
            <div className="flex items-center gap-2">
              <a className="hidden sm:block px-4 lg:px-5 py-2 rounded-xl border border-white/10 bg-white/5 backdrop-blur-md hover:bg-white/10 transition-all text-sm lg:text-base" href='/login'>
                Login
              </a>
              <a className="px-3 sm:px-4 lg:px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-semibold hover:scale-105 transition-transform shadow-lg shadow-cyan-500/30 text-xs sm:text-sm lg:text-base whitespace-nowrap" href='/signup'>
                Signup
              </a>
            </div>
          ) : (<button
            onClick={logout}
            className="px-5 py-2 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all"
          >
            Logout
          </button>
          )
        }
      </header>

      {/* Hero Section */}
      <section className="relative z-10 w-full px-4 sm:px-6 lg:px-10 xl:px-16 2xl:px-24 py-10 sm:py-16 lg:py-24 grid lg:grid-cols-2 gap-12 xl:gap-24 items-center min-h-[85vh]">
        <div className="text-center lg:text-left order-2 lg:order-1">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-xs sm:text-sm text-cyan-300 mb-6">
            ✨ Secure. Fast. Beautiful.
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold leading-tight tracking-tight">
            Manage Your
            <span className="block bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent">
              Passwords Safely
            </span>
          </h2>

          <p className="mt-6 sm:mt-8 text-base sm:text-lg text-slate-300 leading-relaxed max-w-xl mx-auto lg:mx-0">
            Store, generate, and autofill passwords with end-to-end encryption.
            Access your vault anywhere while keeping your digital life secure.
          </p>

          <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
            <button className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-bold text-base sm:text-lg hover:scale-105 transition-transform shadow-2xl shadow-cyan-500/40">
              Start Free
            </button>

            <button className="w-full sm:w-auto px-7 py-4 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md hover:bg-white/10 transition-all text-base sm:text-lg">
              Live Demo
            </button>
          </div>

          <div className="mt-10 sm:mt-12 grid grid-cols-3 gap-4 text-slate-400 text-xs sm:text-sm max-w-md mx-auto lg:mx-0">
            <div>
              <p className="text-2xl sm:text-3xl font-bold text-white">256-bit</p>
              Encryption
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-bold text-white">10K+</p>
              Users
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-bold text-white">99.9%</p>
              Secure
            </div>
          </div>
        </div>

        {/* Mockup */}
        <div className="relative flex justify-center order-1 lg:order-2">
          <div className="absolute inset-0 bg-cyan-500/20 blur-3xl rounded-full" />

          <div className="relative w-full max-w-sm sm:max-w-md rounded-3xl border border-white/10 bg-white/5 backdrop-blur-2xl p-4 sm:p-6 shadow-2xl shadow-black/50">
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-slate-400 text-xs sm:text-sm">Welcome back</p>
                <h3 className="text-xl sm:text-2xl font-bold">Your Vault</h3>
              </div>
              <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-500 flex items-center justify-center text-black font-bold">
                V
              </div>
            </div>

            <div className="space-y-4">
              {[
                { name: 'Google', email: 'user@gmail.com' },
                { name: 'GitHub', email: 'coder@github.com' },
                { name: 'Netflix', email: 'stream@movies.com' },
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between gap-3 p-4 rounded-2xl bg-black/30 border border-white/10 hover:bg-white/5 transition-all"
                >
                  <div className="min-w-0">
                    <p className="font-semibold truncate">{item.name}</p>
                    <p className="text-xs sm:text-sm text-slate-400 truncate">{item.email}</p>
                  </div>

                  <button className="px-3 sm:px-4 py-2 rounded-xl bg-cyan-400/10 text-cyan-300 hover:bg-cyan-400/20 transition-all text-sm whitespace-nowrap">
                    View
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 rounded-2xl bg-gradient-to-r from-cyan-400/10 to-blue-500/10 border border-cyan-400/20">
              <p className="text-sm text-cyan-300 mb-1">Security Score</p>
              <div className="w-full h-3 rounded-full bg-white/10 overflow-hidden">
                <div className="h-full w-[92%] bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full" />
              </div>
              <p className="mt-2 text-white font-semibold text-sm sm:text-base">Excellent Protection</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="relative z-10 w-full px-4 sm:px-6 lg:px-10 xl:px-16 2xl:px-24 pb-16 sm:pb-24">
        <div className="text-center mb-12 sm:mb-16">
          <h3 className="text-3xl sm:text-4xl font-bold">Why Choose Vaultify?</h3>
          <p className="mt-4 text-slate-400 max-w-2xl mx-auto text-sm sm:text-base">
            Everything you need to keep your passwords organized and protected.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {[
            {
              title: 'End-to-End Encryption',
              desc: 'Your passwords are encrypted before they leave your device.',
              icon: '🛡️',
            },
            {
              title: 'Cross Platform Sync',
              desc: 'Access your vault from desktop, mobile, or tablet instantly.',
              icon: '☁️',
            },
            {
              title: 'Password Generator',
              desc: 'Generate strong and unique passwords in one click.',
              icon: '⚡',
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="p-6 sm:p-8 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl hover:-translate-y-2 transition-all duration-300 shadow-xl"
            >
              <div className="text-4xl sm:text-5xl mb-5">{feature.icon}</div>
              <h4 className="text-xl sm:text-2xl font-bold mb-3">{feature.title}</h4>
              <p className="text-slate-400 leading-relaxed text-sm sm:text-base">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
export default HomePage
