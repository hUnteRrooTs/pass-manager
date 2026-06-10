import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import ExpiryTimer from "./Expirytimer";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";

import {
  Eye,
  EyeOff,
  Copy,
  Pencil,
  Trash2,
  CalendarDays,
  Globe,
  User,
  Lock,
  Sparkles,
  Calendar,
  Shield,
  LogOut,
  ShieldCheck,
  KeyRound,
  LockKeyhole,
  Plus,
  Sun,
  Moon
} from "lucide-react";
export default function VaultPage() {

  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const [showModal, setShowModal] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  const [passwordLength, setPasswordLength] = useState(12);

  const [includeUppercase, setIncludeUppercase] = useState(true);

  const [includeLowercase, setIncludeLowercase] = useState(true);

  const [includeNumbers, setIncludeNumbers] = useState(true);

  const [includeSpecial, setIncludeSpecial] = useState(true);

  const [passwords, setPasswords] = useState([]);

  const [visiblePasswordId, setVisiblePasswordId] = useState(null);

  const [editingPassword, setEditingPassword] = useState(null)
  const [copiedPasswordId, setCopiedPasswordId] = useState(null);

  const [copyTimer, setCopyTimer] = useState(0);
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

  const onSubmit = async (data) => {

    try {

      const user = JSON.parse(localStorage.getItem("user"));
      let response
      const date = data.expiry_at ? new Date(data.expiry_at).toISOString() : undefined

      if (editingPassword) {
        response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/vault/${editingPassword.pid}`, {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            uid: user.uid,
            website: data.website,
            username: data.username,
            password: data.password,
            expiry_at: date
          }),
        })
      }
      else {
        response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/vault`, {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            uid: user.uid,
            website: data.website,
            username: data.username,
            password: data.password,
            expiry_at: date
          }),
        });

      }
      const text = await response.text();

      if (!response.ok) {
        alert(text);
        return;
      }

      alert("Password saved");

      reset();

      setShowModal(false);
    } catch (err) {

      console.log(err);

      alert("Something went wrong");
    }
  };
  function calculateSecurityScore(passwords) {

    if (passwords.length === 0) {
      return 0;
    }

    let totalScore = 0;

    for (let i = 0; i < passwords.length; i++) {

      const password =
        passwords[i].password;

      if (!password) {
        continue;
      }

      let score = 0;

      if (password.length >= 12) {
        score += 25;
      }

      if (/[A-Z]/.test(password)) {
        score += 20;
      }

      if (/[a-z]/.test(password)) {
        score += 20;
      }

      if (/[0-9]/.test(password)) {
        score += 20;
      }

      if (/[^A-Za-z0-9]/.test(password)) {
        score += 15;
      }

      totalScore += score;
      console.log(score)
    }
    return Math.round(
      totalScore / passwords.length
    );
  }

  useEffect(() => {
    // const token = fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/me`, { method: "GET", credentials: "include" })
    // if (token.status == 401) {
    //   localStorage.clear()
    // }
    if (!JSON.parse(localStorage.getItem("user"))) {
      navigate("/login")
    }

    const fetchPasswords = async () => {

      try {

        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/vault`, {
          method: "GET",
          credentials: "include"
        }
        );

        const data = await response.json();
        console.log(`The status is ${response.status}`)
        if (response.status === 401) {
          localStorage.clear()
          navigate("/login")
        } else {
          setPasswords(data);
          console.log("All the passwords regained")
        }

      } catch (err) {

        console.log(err);
      }
    };

    fetchPasswords();

  }, []);
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

      <header className="sticky top-0 z-50 px-4 py-4">
        <div
          className="
      max-w-7xl
      mx-auto
      flex
      items-center
      justify-between

      rounded-2xl
      px-6
      py-4

      bg-white/5
      backdrop-blur-xl
      border
      border-white/10

      shadow-[0_0_40px_rgba(34,211,238,0.08)]
    "
        >

          {/* Logo */}
          <a
            href="/"
            className="flex items-center gap-3 group"
          >
            <div
              className="
          p-2
          rounded-xl
          bg-gradient-to-r
          from-cyan-500
          to-fuchsia-500

          shadow-[0_0_20px_rgba(34,211,238,0.35)]

          group-hover:scale-110
          transition-all
        "
            >
              <Lock className="w-5 h-5 text-white" />
            </div>

            <span
              className="
          text-2xl
          font-bold

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
          </a>

          {/* Right Side */}
          <div className="flex items-center gap-3">

            <div
              className="
          hidden
          md:flex

          px-4
          py-2

          rounded-xl

          border
          border-cyan-500/20

          bg-cyan-500/5

          text-sm
          text-cyan-300
        "
            >
              Secure Vault
            </div>

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
              onClick={logout}
              variant="outline"
              className="
          border-red-500/30
          text-red-400

          hover:bg-red-500/10
          hover:border-red-500

          transition-all

          hover:shadow-[0_0_20px_rgba(239,68,68,0.3)]
        "
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>

          </div>

        </div>
      </header>

      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-10">

        <div className="mb-12">

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
    "
          >
            🔐 Your Secure Password Vault
          </div>

          <h2
            className="
      mt-6

      text-4xl
      md:text-6xl

      font-extrabold
      tracking-tight
      leading-none
    "
          >
            Welcome Back,

            <span
              className={`
    block
    mt-2
    w-fit

    bg-gradient-to-r
    from-cyan-400
    via-blue-400
    to-fuchsia-500

    bg-clip-text
    text-transparent
      `}
            >
              {user?.fname}
            </span>
          </h2>

          <p
            className="
      mt-5
      max-w-2xl

      text-muted-foreground
      text-lg
      leading-relaxed
    "
          >
            Manage your passwords, credentials, and secure notes in one
            encrypted place with military-grade protection and instant access
            across all your devices.
          </p>

        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">

          {/* Total Passwords */}
          <div
            className="
      group
      relative
      overflow-hidden

      rounded-3xl
      border border-cyan-500/20

      bg-white/5
      backdrop-blur-xl

      p-6

      hover:border-cyan-500/50
      hover:shadow-[0_0_30px_rgba(34,211,238,0.15)]
      transition-all
    "
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/10 blur-3xl rounded-full" />

            <KeyRound className="w-8 h-8 text-cyan-400 mb-4" />

            <p className="text-muted-foreground text-sm">
              Total Passwords
            </p>

            <h3 className="mt-2 text-4xl font-bold">
              {passwords.length}
            </h3>
          </div>

          {/* Encryption */}
          <div
            className="
      group
      relative
      overflow-hidden

      rounded-3xl
      border border-fuchsia-500/20

      bg-white/5
      backdrop-blur-xl

      p-6

      hover:border-fuchsia-500/50
      hover:shadow-[0_0_30px_rgba(217,70,239,0.15)]
      transition-all
    "
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-fuchsia-500/10 blur-3xl rounded-full" />

            <LockKeyhole className="w-8 h-8 text-fuchsia-400 mb-4" />

            <p className="text-muted-foreground text-sm">
              Encryption
            </p>

            <h3
              className="
        mt-2
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
          </div>

          {/* Security Score */}
          <div
            className="
      group
      relative
      overflow-hidden

      rounded-3xl
      border border-cyan-500/20

      bg-white/5
      backdrop-blur-xl

      p-6

      hover:border-cyan-500/50
      transition-all
    "
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/10 blur-3xl rounded-full" />

            <ShieldCheck
              className={`w-8 h-8 mb-4 ${calculateSecurityScore(passwords) > 80
                ? "text-green-400"
                : calculateSecurityScore(passwords) < 50
                  ? "text-red-400"
                  : "text-cyan-400"
                }`}
            />

            <p className="text-muted-foreground text-sm">
              Security Score
            </p>

            <h3
              className={`mt-2 text-4xl font-bold ${calculateSecurityScore(passwords) > 80
                ? "text-green-400"
                : calculateSecurityScore(passwords) < 50
                  ? "text-red-400"
                  : "text-cyan-400"
                }`}
            >
              {calculateSecurityScore(passwords)}%
            </h3>
          </div>

        </div>

        <div className="rounded-[32px] bg-white/5 border border-white/10 backdrop-blur-2xl overflow-hidden">

          <div
            className="
    p-6

    border-b
    border-white/10

    flex
    flex-col
    sm:flex-row
    sm:items-center
    sm:justify-between

    gap-4
  "
          >

            <div className="flex items-center gap-4">

              <div
                className="
        p-3

        rounded-2xl

        bg-gradient-to-r
        from-cyan-500/20
        to-fuchsia-500/20

        border
        border-cyan-500/20
      "
              >
                <ShieldCheck className="w-6 h-6 text-cyan-400" />
              </div>

              <div>
                <h3
                  className="
          text-2xl
          font-bold

          bg-gradient-to-r
          from-cyan-400
          to-fuchsia-500

          bg-clip-text
          text-transparent
        "
                >
                  Saved Passwords
                </h3>

                <p className="text-muted-foreground mt-1">
                  Your encrypted credentials
                </p>
              </div>

            </div>

            <Button
              onClick={() => {
                setShowModal(true);
                setValue("username", "");
                setValue("password", "");
                setValue("website", "");
              }}
              className="
      bg-gradient-to-r
      from-cyan-500
      to-fuchsia-500

      text-white

      hover:scale-105
      transition-all

      shadow-[0_0_25px_rgba(34,211,238,0.25)]

      hover:shadow-[0_0_35px_rgba(217,70,239,0.35)]
    "
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Password
            </Button>

          </div>

          <div className="grid gap-5">
            {passwords.length === 0 ? (

              <div
                className="
        p-16
        text-center

        rounded-3xl

        bg-white/5
        border border-white/10
        backdrop-blur-xl
      "
              >
                <div className="text-6xl mb-4">🔐</div>

                <h3 className="text-xl font-semibold">
                  No Passwords Yet
                </h3>

                <p className="text-muted-foreground mt-2">
                  Add your first password to start securing your accounts.
                </p>
              </div>

            ) : (

              passwords.map((item) => (

                <div
                  key={item.pid}
                  className="
          group

          relative
          overflow-hidden

          rounded-3xl

          border
          border-cyan-500/15

          bg-white/5
          backdrop-blur-xl

          p-6

          hover:border-cyan-500/40
          hover:shadow-[0_0_30px_rgba(34,211,238,0.12)]

          transition-all
        "
                >

                  <div
                    className="
            absolute
            top-0
            right-0

            h-32
            w-32

            bg-cyan-500/5
            blur-3xl
            rounded-full
          "
                  />

                  <div className="flex flex-col lg:flex-row lg:justify-between gap-6">

                    {/* Left Side */}
                    <div className="flex-1">

                      <div className="flex items-center gap-3">

                        <div
                          className="
                  p-2
                  rounded-xl

                  bg-gradient-to-r
                  from-cyan-500/20
                  to-fuchsia-500/20
                "
                        >
                          <Globe className="w-5 h-5 text-cyan-400" />
                        </div>

                        <h4 className="text-xl font-bold">
                          {item.website}
                        </h4>

                      </div>

                      <p className="mt-3 text-muted-foreground">
                        {item.username}
                      </p>

                      <p
                        className="
                mt-4

                font-mono
                text-lg

                text-cyan-400
              "
                      >
                        {visiblePasswordId === item.pid
                          ? item.password
                          : "••••••••••••••"}
                      </p>

                      <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">

                        <CalendarDays className="w-4 h-4" />

                        <span>
                          {new Date(item.created_at).toLocaleString("en-IN", {
                            hour12: true,
                          })}
                        </span>

                      </div>

                      <div className="mt-3">
                        <ExpiryTimer
                          expiry_at={item.expiry_at}
                          pid={item.pid}
                        />
                      </div>

                    </div>

                    {/* Actions */}
                    <div className="flex flex-wrap items-center gap-2">

                      <button
                        onClick={() =>
                          setVisiblePasswordId(
                            visiblePasswordId === item.pid
                              ? null
                              : item.pid
                          )
                        }
                        className="
                flex items-center gap-2

                px-4 py-2

                rounded-xl

                bg-white/5
                border border-white/10

                hover:bg-white/10
                transition-all
              "
                      >
                        {visiblePasswordId === item.pid
                          ? <EyeOff size={16} />
                          : <Eye size={16} />}

                        {visiblePasswordId === item.pid
                          ? "Hide"
                          : "View"}
                      </button>

                      <button
                        className="
                flex items-center gap-2

                px-4 py-2

                rounded-xl

                bg-cyan-500/10
                border border-cyan-500/20

                text-cyan-400

                hover:bg-cyan-500/20
                transition-all
              "
                        onClick={() => { navigator.clipboard.writeText(item.password); setCopiedPasswordId(item.pid); setCopyTimer(30); const interval = setInterval(() => { setCopyTimer((prev) => { if (prev <= 1) { clearInterval(interval); navigator.clipboard.writeText(""); setCopiedPasswordId(null); return 0; } return prev - 1; }); }, 1000); }}
                      >
                        <Copy size={16} />

                        {copiedPasswordId === item.pid
                          ? `Copied (${copyTimer}s)`
                          : "Copy"}
                      </button>

                      <button
                        className="
                flex items-center gap-2

                px-4 py-2

                rounded-xl

                bg-fuchsia-500/10
                border border-fuchsia-500/20

                text-fuchsia-400

                hover:bg-fuchsia-500/20
                transition-all
              "
                        onClick={() => {
                          setShowModal(true)
                          setValue("username", item.username)
                          setValue("password", item.password)
                          setValue("website", item.website)
                          setValue("expiry_at", item.expiry_at)
                          setEditingPassword(item)
                        }}
                      >
                        <Pencil size={16} />
                        Edit
                      </button>

                      <button
                        className="
                flex items-center gap-2

                px-4 py-2

                rounded-xl

                bg-red-500/10
                border border-red-500/20

                text-red-400

                hover:bg-red-500/20
                transition-all
              "
                        onClick={async () => {
                          try {
                            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/vault/${item.pid}`, { method: "DELETE", credentials: "include" })
                            const text = await response.text()
                            if (!response.ok) { alert(text); return; }
                            setPasswords(passwords.filter((password) => password.pid !== item.pid))
                            console.log("Delete clicked")
                          }
                          catch (err) { console.log(err); alert("Something went wrong") }
                        }}
                      >
                        <Trash2 size={16} />
                        Delete
                      </button>

                    </div>

                  </div>

                </div>
              ))
            )}
          </div>
        </div>
      </main >

      {showModal && (
        <Dialog open={showModal} onOpenChange={setShowModal}>
          <DialogContent
            className="
    max-w-2xl
    border-border
    bg-card/95
    backdrop-blur-2xl
    shadow-[0_0_40px_rgba(34,211,238,0.15)]
    overflow-hidden
    "
          >

            {/* Glow */}

            <div className="absolute inset-0 pointer-events-none">

              <div
                className="
        absolute
        top-0
        left-0
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
        bottom-0
        right-0
        w-72
        h-72
        bg-fuchsia-500/10
        blur-3xl
        rounded-full
        "
              />

            </div>

            <DialogHeader className="relative z-10">

              <div className="flex items-center gap-3">

                <div
                  className="
          p-3
          rounded-2xl
          bg-gradient-to-r
          from-cyan-500
          to-fuchsia-500
          "
                >
                  <Shield className="w-5 h-5 text-white" />
                </div>

                <div>

                  <DialogTitle className="text-3xl font-bold">

                    <span
                      className="
              bg-gradient-to-r
              from-cyan-400
              to-fuchsia-500
              bg-clip-text
              text-transparent
              "
                    >
                      Add Password
                    </span>

                  </DialogTitle>

                  <DialogDescription>
                    Securely save a new credential.
                  </DialogDescription>

                </div>

              </div>

            </DialogHeader>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="relative z-10 space-y-6 mt-4"
            >

              {/* Website */}

              <div className="space-y-2">

                <Label>Website</Label>

                <div className="relative">

                  <Globe className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-cyan-400" />

                  <Input
                    placeholder="Github"
                    {...register("website", {
                      required: "Website is required",
                    })}
                    className="pl-11"
                  />

                </div>

                {errors.website && (
                  <p className="text-sm text-red-500">
                    {errors.website.message}
                  </p>
                )}

              </div>

              {/* Username */}

              <div className="space-y-2">

                <Label>Username / Email</Label>

                <div className="relative">

                  <User className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-cyan-400" />

                  <Input
                    placeholder="you@example.com"
                    {...register("username", {
                      required: "Username is required",
                    })}
                    className="pl-11"
                  />

                </div>

              </div>

              {/* Expiry */}

              <div className="space-y-2">

                <Label>Expiry Date</Label>

                <div className="relative">

                  <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-cyan-400" />

                  <Input
                    type="datetime-local"
                    {...register("expiry_at")}
                    className="pl-11"
                  />

                </div>

              </div>

              {/* Password */}

              <div className="space-y-2">

                <div className="flex items-center justify-between">

                  <Label>Password</Label>

                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      const chars = {
                        uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
                        lowercase: "abcdefghijklmnopqrstuvwxyz",
                        numbers: "0123456789",
                        special: "!@#$%^&*()_+-=[]{}|;:,.<>?",
                      };

                      let available = "";

                      if (includeUppercase) available += chars.uppercase;
                      if (includeLowercase) available += chars.lowercase;
                      if (includeNumbers) available += chars.numbers;
                      if (includeSpecial) available += chars.special;

                      if (!available) {
                        alert("Select at least one character type");
                        return;
                      }

                      let generated = "";

                      for (let i = 0; i < passwordLength; i++) {
                        generated += available.charAt(
                          Math.floor(Math.random() * available.length)
                        );
                      }

                      setValue("password", generated, {
                        shouldValidate: true,
                        shouldDirty: true,
                      });
                    }}
                    className="
            border-cyan-500/20
            hover:border-fuchsia-500/30
            "
                  >
                    <Sparkles className="mr-2 h-4 w-4" />
                    Generate
                  </Button>

                </div>

                <div className="relative">

                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-cyan-400" />

                  <Input
                    placeholder="Enter password"
                    {...register("password", {
                      required: "Password is required",
                    })}
                    className="pl-11"
                  />

                </div>

              </div>

              {/* Generator Card */}

              <div
                className="
        rounded-3xl
        border
        border-border
        bg-background/50
        backdrop-blur-xl
        p-6
        space-y-5
        "
              >

                <div>

                  <Label>Password Length</Label>

                  <Slider
                    value={[passwordLength]}
                    min={4}
                    max={40}
                    step={1}
                    onValueChange={(v) => setPasswordLength(v[0])}
                    className="mt-4"
                  />

                  <p className="mt-2 text-cyan-400 font-medium">
                    {passwordLength} Characters
                  </p>

                </div>

                <div className="grid grid-cols-2 gap-4">

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      checked={includeUppercase}
                      onCheckedChange={() =>
                        setIncludeUppercase(!includeUppercase)
                      }
                    />
                    <Label>Uppercase</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      checked={includeLowercase}
                      onCheckedChange={() =>
                        setIncludeLowercase(!includeLowercase)
                      }
                    />
                    <Label>Lowercase</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      checked={includeNumbers}
                      onCheckedChange={() =>
                        setIncludeNumbers(!includeNumbers)
                      }
                    />
                    <Label>Numbers</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      checked={includeSpecial}
                      onCheckedChange={() =>
                        setIncludeSpecial(!includeSpecial)
                      }
                    />
                    <Label>Special</Label>
                  </div>

                </div>

              </div>

              <Button
                type="submit"
                className="
        w-full
        h-12
        text-lg
        font-semibold
        bg-gradient-to-r
        from-cyan-500
        to-fuchsia-500
        hover:opacity-90
        shadow-[0_0_25px_rgba(34,211,238,0.25)]
        hover:shadow-[0_0_35px_rgba(217,70,239,0.35)]
        transition-all
        "
              >
                Save Password
              </Button>

            </form>

          </DialogContent>
        </Dialog>
      )
      }
    </div >
  );
}
