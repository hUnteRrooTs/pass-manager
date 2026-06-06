import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import ExpiryTimer from "./Expirytimer";
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
            expiry_at: data.expiry_at
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
            expiry_at: data.expiry_at
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
        console.log(data)

        setPasswords(data);

      } catch (err) {

        console.log(err);
      }
    };

    fetchPasswords();

  }, []);

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
              Vaultify
            </h1>
          </div>

          <button
            onClick={logout}
            className="px-5 py-2 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all"
          >
            Logout
          </button>
        </div>
      </header>

      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-10">

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

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">

          <div className="p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl">
            <p className="text-slate-400 text-sm">
              Total Passwords
            </p>

            <h3 className="mt-3 text-4xl font-bold">
              {passwords.length}
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

            <h3 className={`mt-3 text-4xl font-bold text-cyan-400 ${calculateSecurityScore(passwords) > 80 ? "text-green-400" : calculateSecurityScore(passwords) < 50 ? "text-red-400" : "text-cyan-400"}`}>
              {calculateSecurityScore(passwords)}%
            </h3>
          </div>
        </div>

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

            <button
              onClick={() => setShowModal(true)}
              className="px-5 py-3 rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-bold hover:scale-[1.02] transition-transform"
            >
              + Add Password
            </button>
          </div>

          <div className="divide-y divide-white/10">

            {passwords.length === 0 ? (

              <div className="p-10 text-center text-slate-400">
                No passwords saved yet
              </div>

            ) : (

              passwords.map((item) => (

                <div
                  key={item.pid}
                  className="p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4 hover:bg-white/[0.03] transition-all"
                >

                  <div className="w-96">
                    <div className="flex w-full justify-between items-stretch">
                      <h4 className="text-xl font-semibold">
                        {item.website}
                      </h4>
                      <p className="text-sm text-gray-500">
                        Created At:
                        <span className="text-lg text-gray-300 ml-2 font-bold">{new Date(new Date(item.created_at).getTime()).toLocaleString('en-IN', { hour12: true })}</span>
                      </p>
                    </div>

                    <p className="text-slate-400">
                      {item.username}
                    </p>

                    <p className="mt-2 text-cyan-400 font-mono">
                      {visiblePasswordId === item.pid
                        ? item.password
                        : "••••••••••"}
                    </p>
                    <ExpiryTimer expiry_at={item.expiry_at} />
                    {/* <p>{item.expiry_at}</p> */}
                  </div>

                  <div className="flex items-center gap-3">

                    <button
                      onClick={() => {

                        if (visiblePasswordId === item.pid) {
                          setVisiblePasswordId(null);
                        } else {
                          setVisiblePasswordId(item.pid);
                        }
                      }}
                      className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all"
                    >
                      {visiblePasswordId === item.pid ? "Hide" : "View"}
                    </button>
                    <button
                      onClick={() => {

                        navigator.clipboard.writeText(item.password);

                        setCopiedPasswordId(item.pid);

                        setCopyTimer(30);

                        const interval = setInterval(() => {

                          setCopyTimer((prev) => {

                            if (prev <= 1) {

                              clearInterval(interval);

                              navigator.clipboard.writeText("");

                              setCopiedPasswordId(null);

                              return 0;
                            }

                            return prev - 1;
                          });

                        }, 1000);
                      }}

                      className="px-4 py-2 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 hover:bg-cyan-500/20 transition-all"
                    >
                      {
                        copiedPasswordId === item.pid
                          ? `Copied (${copyTimer}s)`
                          : "Copy"
                      }
                    </button>
                    <button className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all" onClick={() => {
                      setShowModal(true)
                      setValue("username", item.username)
                      setValue("password", item.password)
                      setValue("website", item.website)
                      setEditingPassword(item)
                    }}>
                      Edit
                    </button>

                    <button className="px-4 py-2 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 transition-all" onClick={async () => {
                      try {
                        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/vault/${item.pid}`, { method: "DELETE", credentials: "include" })
                        const text = await response.text()
                        if (!response.ok) {
                          alert(text)
                          return;
                        }
                        setPasswords(passwords.filter((password) => password.pid !== item.pid))
                      }
                      catch (err) {
                        console.log(err)
                        alert("Something went wrong")
                      }
                    }}>
                      Delete
                    </button>

                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </main>

      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center px-4">

          <div className="w-full max-w-lg rounded-[32px] bg-[#0b1120] border border-white/10 p-8 shadow-2xl shadow-cyan-500/10 relative">

            <button
              onClick={() => setShowModal(false)}
              className="absolute top-5 right-5 w-10 h-10 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all"
            >
              ✕
            </button>

            <h2 className="text-3xl font-bold">
              Add Password
            </h2>

            <p className="text-slate-400 mt-2">
              Securely save a new credential.
            </p>
            <form
              className="mt-8 space-y-5"
              onSubmit={handleSubmit(onSubmit)}
            >

              <div>
                <label className="text-sm text-slate-300 mb-2 block">
                  Website
                </label>

                <input
                  type="text"
                  placeholder="Github"
                  {...register("website", {
                    required: "Website is required",
                  })}
                  className={`w-full px-5 py-4 rounded-2xl bg-black/30 border outline-none transition-all placeholder:text-slate-500 ${errors.website
                    ? "border-red-500 focus:border-red-500"
                    : "border-white/10 focus:border-cyan-400"
                    }`}
                />

                {errors.website && (
                  <p className="text-red-400 text-sm mt-2">
                    {errors.website.message}
                  </p>
                )}
              </div>

              <div>
                <label className="text-sm text-slate-300 mb-2 block">
                  Username / Email
                </label>

                <input
                  type="text"
                  placeholder="you@example.com"
                  {...register("username", {
                    required: "Username is required",
                  })}
                  className={`w-full px-5 py-4 rounded-2xl bg-black/30 border outline-none transition-all placeholder:text-slate-500 ${errors.username
                    ? "border-red-500 focus:border-red-500"
                    : "border-white/10 focus:border-cyan-400"
                    }`}
                />

                {errors.username && (
                  <p className="text-red-400 text-sm mt-2">
                    {errors.username.message}
                  </p>
                )}
              </div>
              <div>
                <label className="text-sm text-slate-300 mb-2 block">Expiry Date</label>
                <input
                  type="datetime-local"
                  placeholder="Expiry Date"
                  {...register("expiry_at")}
                  className="w-full px-5 py-4 rounded-2xl bg-black/30 border-none outline-none transition-all placeholder:text-slate-500"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm text-slate-300">
                    Password
                  </label>

                  <button
                    type="button"
                    onClick={() => {

                      const chars = {
                        uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
                        lowercase: "abcdefghijklmnopqrstuvwxyz",
                        numbers: "0123456789",
                        special: "!@#$%^&*()_+",
                      };

                      let available = "";

                      if (includeUppercase) available += chars.uppercase;
                      if (includeLowercase) available += chars.lowercase;
                      if (includeNumbers) available += chars.numbers;
                      if (includeSpecial) available += chars.special;

                      if (!available) {
                        return alert("Select atleast one option");
                      }

                      let generated = "";

                      for (let i = 0; i < passwordLength; i++) {
                        generated += available.charAt(
                          Math.floor(Math.random() * available.length)
                        );
                      }

                      setValue("password", generated);
                    }}
                    className="text-cyan-400 text-sm hover:text-cyan-300 transition-colors"
                  >
                    Generate
                  </button>
                </div>

                <input
                  type="text"
                  placeholder="Enter password"
                  {...register("password", {
                    required: "Password is required",
                  })}
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
                <div className="mt-5 p-5 rounded-2xl bg-white/5 border border-white/10 space-y-4">

                  <div>
                    <label className="text-sm text-slate-300 block mb-2">
                      Password Length
                    </label>

                    <input
                      type="range"
                      min="4"
                      max="40"
                      value={passwordLength}
                      onChange={(e) => setPasswordLength(Number(e.target.value))}
                      className="w-full"
                    />

                    <p className="text-cyan-400 text-sm mt-1">
                      {passwordLength} Characters
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">

                    <label className="flex items-center gap-3 text-sm text-slate-300">
                      <input
                        type="checkbox"
                        checked={includeUppercase}
                        onChange={() => setIncludeUppercase(!includeUppercase)}
                      />

                      Uppercase
                    </label>

                    <label className="flex items-center gap-3 text-sm text-slate-300">
                      <input
                        type="checkbox"
                        checked={includeLowercase}
                        onChange={() => setIncludeLowercase(!includeLowercase)}
                      />

                      Lowercase
                    </label>

                    <label className="flex items-center gap-3 text-sm text-slate-300">
                      <input
                        type="checkbox"
                        checked={includeNumbers}
                        onChange={() => setIncludeNumbers(!includeNumbers)}
                      />

                      Numbers
                    </label>

                    <label className="flex items-center gap-3 text-sm text-slate-300">
                      <input
                        type="checkbox"
                        checked={includeSpecial}
                        onChange={() => setIncludeSpecial(!includeSpecial)}
                      />

                      Special
                    </label>
                  </div>
                </div>
              </div>
              <button
                type="submit"
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-bold text-lg hover:scale-[1.02] transition-transform shadow-xl shadow-cyan-500/30"
              >
                Save Password
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
