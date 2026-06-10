import { useNavigate } from "react-router-dom";
import {
  Sun,
  Moon
} from "lucide-react";
import { useState, useEffect } from "react";
import LockSVG from "../assets/lock-svgrepo-com.svg"
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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

  const [darkMode, setDarkMode] = useState(true);
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    console.log("darkMode:", darkMode);

    localStorage.setItem(
      "theme",
      darkMode ? "dark" : "light"
    );
  }, [darkMode])
  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
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


      <header className="sticky top-0 z-50">
        <div
          className="
    max-w-7xl
    mx-auto
    px-6
    py-4
    flex
    items-center
    justify-between

    rounded-2xl
    mt-0

    bg-white/5
    backdrop-blur-xl
    border
    border-white/10
    "
        >
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div
              className="
        p-2
        rounded-xl
        bg-gradient-to-r
        from-cyan-500
        to-fuchsia-500
        shadow-[0_0_20px_rgba(34,211,238,0.3)]
        "
            >
              <img
                src={LockSVG}
                alt="Vaultify"
                className="w-6 h-6"
              />
            </div>

            <span
              className="
        text-xl
        font-bold
        bg-gradient-to-r
        from-cyan-400
        to-fuchsia-500
        bg-clip-text
        text-transparent
        "
            >
              Vaultify
            </span>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <a
              href="#security"
              className="
  relative
  text-muted-foreground
  hover:text-cyan-400
  transition-colors

  after:absolute
  after:left-0
  after:-bottom-1
  after:h-[2px]
  after:w-0
  after:bg-cyan-400
  hover:after:w-full
  after:transition-all
  "
            >
              Security
            </a>

            <a
              href="#features"
              className="
  relative
  text-muted-foreground
  hover:text-cyan-400
  transition-colors

  after:absolute
  after:left-0
  after:-bottom-1
  after:h-[2px]
  after:w-0
  after:bg-cyan-400
  hover:after:w-full
  after:transition-all
  "
            >
              Features
            </a>

            <a
              href="/vault"
              className="
  relative
  text-muted-foreground
  hover:text-cyan-400
  transition-colors

  after:absolute
  after:left-0
  after:-bottom-1
  after:h-[2px]
  after:w-0
  after:bg-cyan-400
  hover:after:w-full
  after:transition-all
  "
            >
              Vault
            </a>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setDarkMode(!darkMode)}
              className="
                text-cyan-400
                hover:text-fuchsia-500
                hover:bg-white/10
                transition-all
                "
              onClick={() => { setDarkMode(prev => !prev) }}
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </Button>
            <Button
              variant="outline"
              className="
        border-cyan-500/40
        text-cyan-400
        bg-transparent
        hover:bg-cyan-500/10
        "
              asChild
            ><a href='/login'>
                Login
              </a>
            </Button>

            <Button
              className="
        bg-gradient-to-r
        from-cyan-500
        to-fuchsia-500
        text-foreground
        hover:scale-105
        transition-all
        shadow-[0_0_25px_rgba(34,211,238,0.25)]
        "
              asChild
            ><a href='/signup'>
                Start Free
              </a>
            </Button>
          </div>
        </div>
      </header>

      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-10">

        {/* Hero */}

        <div className="mb-12 text-center">

          <p
            className="
      inline-flex
      px-4
      py-2
      rounded-full
      bg-cyan-500/10
      border
      border-cyan-500/20
      text-cyan-400
      text-sm
      backdrop-blur-md
      "
          >
            ✨ Interactive Demo Vault
          </p>

          <h2 className="mt-6 text-5xl md:text-6xl font-bold leading-tight">
            Experience

            <span
              className="
block
bg-gradient-to-r
from-cyan-400
via-fuchsia-400
to-pink-500
bg-clip-text
text-transparent
        "
            >
              Vaultify
            </span>
          </h2>

          <p className="mt-4 text-muted-foreground text-lg max-w-2xl mx-auto">
            Explore how Vaultify securely stores and manages your passwords
            with encryption and modern security features.
          </p>

        </div>

        {/* Stats */}

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">

          <Card className="group relative overflow-hidden">
            <div
              className="
    absolute inset-0
    bg-gradient-to-r
    from-cyan-500/10
    to-fuchsia-500/10
    opacity-0
    group-hover:opacity-100
    transition-all
    "
            />
            <CardContent className="p-6">
              <p className="text-muted-foreground text-sm">
                Total Passwords
              </p>

              <h3 className="mt-3 text-4xl font-bold">
                3
              </h3>
            </CardContent>
          </Card>

          <Card className="group relative overflow-hidden">
            <div
              className="
    absolute inset-0
    bg-gradient-to-r
    from-cyan-500/10
    to-fuchsia-500/10
    opacity-0
    group-hover:opacity-100
    transition-all
    "
            />
            <CardContent className="p-6">
              <p className="text-muted-foreground text-sm">
                Encryption
              </p>

              <h3
                className="
          mt-3
          text-4xl
          font-bold
          bg-gradient-to-r
          from-cyan-400
          to-fuchsia-500
          bg-clip-text
          text-transparent
          "
              >
                AES
              </h3>
            </CardContent>
          </Card>

          <Card className="group relative overflow-hidden">
            <div
              className="
    absolute inset-0
    bg-gradient-to-r
    from-cyan-500/10
    to-fuchsia-500/10
    opacity-0
    group-hover:opacity-100
    transition-all
    "
            />
            <CardContent className="p-6">
              <p className="text-muted-foreground text-sm">
                Security Score
              </p>

              <h3 className="mt-3 text-4xl font-bold text-cyan-400">
                92%
              </h3>
            </CardContent>
          </Card>

          <Card className="group relative overflow-hidden">
            <div
              className="
    absolute inset-0
    bg-gradient-to-r
    from-cyan-500/10
    to-fuchsia-500/10
    opacity-0
    group-hover:opacity-100
    transition-all
    "
            />
            <CardContent className="p-6">
              <p className="text-muted-foreground text-sm">
                Clipboard Timer
              </p>

              <h3 className="mt-3 text-4xl font-bold">
                30s
              </h3>
            </CardContent>
          </Card>

        </div>

        {/* Vault */}

        <div className="relative">

          <div className="absolute inset-0 flex justify-center pointer-events-none">
            <div className="w-[500px] h-[500px] bg-gradient-to-r from-cyan-500/10 to-fuchsia-500/10 blur-3xl rounded-full" />
          </div>

          <Card
            className="
 relative
  overflow-hidden
  border-border
  bg-card
  transition-all
  duration-300
  hover:-translate-y-1
  hover:border-cyan-500/30
      "
          >
            <CardHeader className="border-b border-border">

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

                <div>
                  <CardTitle className="text-2xl">
                    Demo Password Vault
                  </CardTitle>

                  <CardDescription>
                    Sample encrypted credentials
                  </CardDescription>
                </div>

                <Button
                  className="
            bg-gradient-to-r
            from-cyan-500
            to-fuchsia-500
            text-white
            hover:opacity-90
            shadow-[0_0_20px_rgba(34,211,238,0.25)]
            "
                >
                  + Add Password
                </Button>

              </div>

            </CardHeader>

            <CardContent className="p-0">

              {demoPasswords.map((item) => (

                <div
                  key={item.pid}
                  className="
            p-6
            flex
            flex-col
            lg:flex-row
            lg:items-center
            lg:justify-between
            gap-4
            border-b
            border-border
            hover:bg-gradient-to-r
            hover:from-cyan-500/5
            hover:to-fuchsia-500/5
            transition-all
            "
                >

                  <div>

                    <h4 className="text-xl font-semibold">
                      {item.website}
                    </h4>

                    <p className="text-muted-foreground">
                      {item.username}
                    </p>

                    <p
                      className="
                mt-2
                font-mono
                bg-gradient-to-r
                from-cyan-400
                to-fuchsia-500
                bg-clip-text
                text-transparent
                "
                    >
                      {visiblePasswordId === item.pid
                        ? item.password
                        : "••••••••••••"}
                    </p>

                  </div>

                  <div className="flex flex-wrap gap-3">

                    <Button
                      variant="outline"
                      onClick={() => {
                        if (visiblePasswordId === item.pid) {
                          setVisiblePasswordId(null);
                        } else {
                          setVisiblePasswordId(item.pid);
                        }
                      }}
                      className="
                hover:border-cyan-400
                hover:shadow-[0_0_15px_rgba(34,211,238,0.2)]
                "
                    >
                      {visiblePasswordId === item.pid
                        ? "Hide"
                        : "View"}
                    </Button>

                    <Button
                      variant="outline"
                      className="
                border-cyan-500/20
                text-cyan-400
                bg-cyan-500/10
                hover:bg-cyan-500/20
                "
                    >
                      Copy
                    </Button>

                    <Button
                      variant="outline"
                      className="
                hover:border-fuchsia-400
                hover:shadow-[0_0_15px_rgba(217,70,239,0.2)]
                "
                    >
                      Edit
                    </Button>

                    <Button
                      variant="outline"
                      className="
                border-red-500/20
                text-red-400
                bg-red-500/10
                hover:bg-red-500/20
                "
                    >
                      Delete
                    </Button>

                  </div>

                </div>

              ))}

            </CardContent>

          </Card>

        </div>

        {/* CTA */}

        <div className="mt-16 text-center">

          <h3 className="text-4xl md:text-5xl font-bold">
            Ready to secure your passwords?
          </h3>

          <p className="mt-4 text-muted-foreground text-lg">
            Create your own encrypted vault in seconds.
          </p>

          <Button
            onClick={() => navigate("/signup")}
            size="lg"
            className="
      mt-6
      px-8
      py-6
      text-lg
      bg-gradient-to-r
      from-cyan-500
      to-fuchsia-500
      text-white
      shadow-[0_0_30px_rgba(34,211,238,0.3)]
      hover:shadow-[0_0_40px_rgba(217,70,239,0.4)]
      hover:scale-105
      transition-all
      "
          >
            Create Free Account
          </Button>

        </div>

      </main>
    </div>
  );
}
