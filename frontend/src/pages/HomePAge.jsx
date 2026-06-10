import { useEffect, useState } from 'react'
import LockSVG from "../assets/lock-svgrepo-com.svg"
import "./HomePage.css"
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import HeroText from './HeroText';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

import {
  Shield,
  KeyRound,
  Cloud,
  Lock,
  Sun,
  Moon
} from "lucide-react";

function HomePage() {
  const [user, setUser] = useState(null)
  const logout = async () => {
    localStorage.removeItem("user");
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/logout`, {
      method: "GET",
      credentials: "include"
    })
    if (response.ok) {
      navigate("/login");
      return;
    }
    alert("Something went wrong")
  };
  const features = [
    {
      icon: Shield,
      title: "End-to-End Encryption",
      description:
        "Your passwords are encrypted before they leave your device.",
    },
    {
      icon: KeyRound,
      title: "Password Generator",
      description:
        "Generate strong and unique passwords instantly.",
    },
    {
      icon: Cloud,
      title: "Cross Device Sync",
      description:
        "Access your vault securely from any device.",
    },
    {
      icon: Lock,
      title: "Zero Knowledge",
      description:
        "Only you can view your passwords. Not even us.",
    },
  ];
  const [darkMode, setDarkMode] = useState(true);
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")))
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
    <>
      <div className="min-h-screen w-full bg-background relative text-foreground">
        {/* Moonlight Silver Background */}
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
        <main className="relative z-10 max-w-7xl mx-auto px-6 py-20">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* LEFT SIDE */}
            <div className="flex flex-col gap-8">

              <div
                className="
        w-fit
        px-4 py-2
        rounded-full
        border border-cyan-500/20
        bg-cyan-500/10
        text-cyan-400
        text-sm
        "
              >
                🔒 Trusted Password Security
              </div>

              <HeroText />

              <p className="text-muted-foreground text-lg leading-relaxed max-w-xl">
                Store, generate, and autofill passwords with end-to-end encryption.
                Access your vault anywhere while keeping your digital life secure.
              </p>

              <div className="flex gap-4 flex-wrap">
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
                  size="lg"
                >
                  Start Free
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  className="
          border-cyan-400
          text-cyan-400
          bg-transparent
          hover:bg-transparent
          hover:shadow-[0_0_20px_rgba(34,211,238,0.4)]
          "
                >
                  Live Demo
                </Button>
              </div>

              <div className="flex flex-wrap gap-6 text-muted-foreground text-sm">
                <span>🔒 AES-256 Encryption</span>
                <span>☁️ Cloud Sync</span>
                <span>🛡️ Zero Knowledge</span>
              </div>

            </div>

            {/* RIGHT SIDE */}
            <div className="relative flex justify-center">

              <div
                className="
        absolute
        w-[500px]
        h-[500px]
        bg-gradient-to-r
        from-cyan-500/20
        to-fuchsia-500/20
        blur-3xl
        rounded-full
        animate-pulse
        "
              />

              <div
                className="
        relative
        w-full
        max-w-md
        rounded-3xl
        border
        border-border
        bg-card
        backdrop-blur-xl
        p-6
        shadow-[0_0_40px_rgba(34,211,238,0.15)]
                animate-[float_5s_ease-in-out_infinite]
        "
              >

                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold">Your Vault</h3>

                  <div
                    className="
            px-3 py-1
            rounded-full
            bg-green-500/10
            text-green-400
            text-xs
            "
                  >
                    Secure
                  </div>
                </div>

                {[
                  {
                    site: "Instagram",
                    email: "goat@example.com",
                  },
                  {
                    site: "GitHub",
                    email: "coder@example.com",
                  },
                  {
                    site: "Google",
                    email: "mail@example.com",
                  },
                ].map((item) => (
                  <div
                    key={item.site}
                    className="
            p-4
            rounded-2xl
            bg-background/50
            border
            border-foreground/5
            mb-4
            hover:border-cyan-500/30
            transition-all
            "
                  >
                    <div className="flex justify-between">
                      <span className="font-semibold">
                        {item.site}
                      </span>

                      <span className="text-gray-500">
                        👁
                      </span>
                    </div>

                    <p className="text-muted-foreground text-sm mt-1">
                      {item.email}
                    </p>

                    <p className="text-cyan-400 mt-2">
                      ••••••••••••••
                    </p>
                  </div>
                ))}

                <div
                  className="
          mt-6
          p-4
          rounded-2xl
          bg-gradient-to-r
          from-cyan-500/10
          to-fuchsia-500/10
          border
          border-cyan-500/10
          "
                >
                  <p className="text-sm text-muted-foreground">
                    Security Score
                  </p>

                  <div className="w-full h-2 bg-slate-800 rounded-full mt-2">
                    <div
                      className="
              h-2
              w-[92%]
              rounded-full
              bg-gradient-to-r
              from-cyan-400
              to-fuchsia-500
              "
                    />
                  </div>

                  <p className="text-cyan-400 mt-2 text-sm">
                    Excellent Protection
                  </p>
                </div>

              </div>
            </div>
          </div>
        </main>
        <section
          id="features"
          className="w-full flex flex-col items-center py-24 px-6"
        >
          <h2 className="text-4xl font-bold mb-4">
            Why Choose{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-fuchsia-500 bg-clip-text text-transparent">
              Vaultify
            </span>
            ?
          </h2>

          <p className="text-muted-foreground mb-14 text-center max-w-2xl">
            Everything you need to keep your passwords secure and accessible.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 max-w-7xl w-full">
            {features.map((feature, index) => {
              const Icon = feature.icon;

              return (
                <Card
                  key={index}
                  className="
                bg-background/40
                border-slate-800
                backdrop-blur-xl
                transition-all
                duration-300
                hover:-translate-y-2
                hover:border-cyan-400/50
                hover:shadow-[0_0_25px_rgba(34,211,238,0.25)]
              "
                >
                  <CardHeader>
                    <div
                      className="
                    w-14 h-14
                    rounded-xl
                    flex items-center justify-center
                    bg-gradient-to-r
                    from-cyan-500/20
                    to-fuchsia-500/20
                    mb-4
                  "
                    >
                      <Icon
                        size={28}
                        className="text-cyan-400"
                      />
                    </div>

                    <CardTitle className="text-foreground">
                      {feature.title}
                    </CardTitle>

                    <CardDescription className="text-muted-foreground">
                      {feature.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent />
                </Card>
              );
            })}
          </div>
        </section>
      </div>
    </ >
  );
}
export default HomePage
