"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Mail, Lock } from "lucide-react";
import { useAuthStore } from "@/app/stores/useAuthStore";
import { authService } from "@/app/services/authService";

export default function LoginPage() {
  const router = useRouter();
  const login = useAuthStore((state) => state.login);
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [rememberEmail, setRememberEmail] = useState(false);

  // Carrega o e-mail salvo ao montar o componente
  useEffect(() => {
    const savedEmail = localStorage.getItem("savedEmail");
    if (savedEmail) {
      setForm((f) => ({ ...f, email: savedEmail }));
      setRememberEmail(true);
    }
  }, []);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);

    try {
      const data = await authService.login({
        email: form.email,
        password: form.password,
      });

      login(data.user, data.accessToken);

      // Lógica para salvar ou remover o e-mail
      if (rememberEmail) {
        localStorage.setItem("savedEmail", form.email);
      } else {
        localStorage.removeItem("savedEmail");
      }
      
      // Pequeno delay para feedback visual se necessário, ou redirecionamento imediato
      router.push("/");
    } catch (err: any) {
      setErrorMsg(err.response?.data?.message || "Erro ao logar. Verifique suas credenciais.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-cream p-4 md:p-6 relative">
      {/* Botão de Voltar */}
      <Link 
        href="/" 
        className="absolute top-6 left-6 flex items-center gap-2 text-brown-text hover:text-terracotta transition font-medium group"
      >
        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
        Voltar para o início
      </Link>

      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 md:p-10 border border-terracotta/20">
        
        {/* Cabeçalho do Card */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-24 h-24 relative mb-4">
             <Image 
              src="/logo.svg" 
              alt="Raízes & Fios Logo" 
              fill
              className="object-contain"
              priority
            />
          </div>
          <h1 className="text-3xl font-serif font-bold text-brown-text">Bem-vindo</h1>
          <p className="text-gray-500 text-sm mt-2">Faça login para continuar</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-bold text-brown-text mb-2" htmlFor="email">
              E-mail
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="seu@email.com"
                className="w-full rounded-lg pl-10 pr-4 py-3 border border-gray-200 text-brown-text placeholder-gray-400 focus:outline-none focus:border-terracotta focus:ring-1 focus:ring-terracotta transition bg-gray-50"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-brown-text mb-2" htmlFor="password">
              Senha
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                id="password"
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                placeholder="********"
                className="w-full rounded-lg pl-10 pr-4 py-3 border border-gray-200 text-brown-text placeholder-gray-400 focus:outline-none focus:border-terracotta focus:ring-1 focus:ring-terracotta transition bg-gray-50"
                required
              />
            </div>
          </div>

          {/* Opção de Lembrar E-mail */}
          <div className="flex items-center">
            <input
              id="remember-email"
              type="checkbox"
              checked={rememberEmail}
              onChange={(e) => setRememberEmail(e.target.checked)}
              className="h-4 w-4 text-terracotta focus:ring-terracotta border-gray-300 rounded cursor-pointer accent-terracotta"
            />
            <label htmlFor="remember-email" className="ml-2 block text-sm text-gray-700 cursor-pointer select-none">
              Lembrar meu e-mail
            </label>
          </div>

          {errorMsg && (
            <div className="text-sm text-red-600 bg-red-50 p-3 rounded border border-red-100 flex items-center gap-2">
              <span>⚠️</span> {errorMsg}
            </div>
          )}

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-terracotta text-white font-bold py-3 rounded-lg hover:bg-terracotta-dark transition duration-200 transform hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed shadow-md"
            >
              {loading ? "Entrando..." : "Entrar"}
            </button>
          </div>
        </form>

        <div className="mt-8 pt-6 border-t border-gray-100 text-center text-sm text-gray-600">
          <p>
            Não tem uma conta?{" "}
            <Link href="/auth/register" className="text-terracotta font-bold hover:underline hover:text-terracotta-dark transition">
              Cadastre-se
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}