"use client";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";


import { useState } from "react";
import { Eye, EyeOff, Lock, User } from "lucide-react";
import { useAuth } from "../hooks/login/login";

export default function AdminLogin() {
   const router = useRouter(); 

  const { login, error, loading } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    try {
      const data = await login(username, password);

      if (data?.accessToken) {
        Cookies.set("token", data.accessToken, {
          expires: 7,
        });

      
        router.push("/dashboard");
      }
    } catch (err) {
      console.log(err);
    }
  };


  return (
    <main className="min-h-screen bg-[#3a1c12] flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-3xl bg-white shadow-2xl p-8">

        <div className="flex flex-col items-center mb-8">
          <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-[#f8f1f0] mb-5">
            <Lock className="text-[#3a1c12]" size={28} />
          </div>

          <h1 className="text-3xl font-bold text-[#3a1c12]">
            Área Administrativa
          </h1>

          <p className="mt-2 text-sm text-[#6b4b3e]">
            Entre com seu usuário e senha de acesso.
          </p>
        </div>

        <div className="space-y-5">

          {/* Usuário */}
          <div className="relative">
            <User
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8b6b5d]"
            />

            <input
              type="text"
              placeholder="Usuário"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              className="w-full rounded-xl border border-slate-300 py-3 pl-11 pr-4 text-[#3a1c12] placeholder:text-[#9b7a6a] outline-none transition focus:border-[#3a1c12] focus:ring-4 focus:ring-[#f8f1f0]"
            />
          </div>

          {/* Senha */}
          <div className="relative">

            <input
              type={showPassword ? "text" : "password"}
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              className={`w-full rounded-xl border py-3 pl-4 pr-12 text-[#3a1c12] placeholder:text-[#9b7a6a] outline-none transition
                ${
                  error
                    ? "border-red-500 focus:ring-2 focus:ring-red-300"
                    : "border-slate-300 focus:border-[#3a1c12] focus:ring-4 focus:ring-[#f8f1f0]"
                }`}
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8b6b5d] hover:text-[#3a1c12] transition"
            >
              {showPassword ? (
                <EyeOff size={20} />
              ) : (
                <Eye size={20} />
              )}
            </button>

          </div>

          {error && (
            <p className="text-sm text-red-500">
              Usuário ou senha incorretos.
            </p>
          )}

          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full rounded-xl bg-[#3a1c12] py-3 text-white font-semibold transition hover:bg-[#5a2d20] active:scale-[.98] disabled:opacity-60 cursor-pointer"
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>

        </div>

      </div>
    </main>
  );
}