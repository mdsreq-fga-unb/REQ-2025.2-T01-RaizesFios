"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Mail, Lock, User, CheckCircle } from "lucide-react";
import { authService } from "@/app/services/authService";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    if (form.password !== form.confirmPassword) {
      setErrorMsg("As senhas não conferem.");
      return;
    }

    setLoading(true);
    try {
      await authService.register({
        name: form.name,
        email: form.email,
        password: form.password
      });

      setSuccessMsg("Cadastro realizado com sucesso! Redirecionando para o login...");
      setTimeout(() => {
        router.push("/auth/login");
      }, 2000);
    } catch (err: any) {
      setErrorMsg(err.response?.data?.message || "Erro ao cadastrar.");
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

      <div className="w-full max-w-xl bg-white rounded-2xl shadow-xl p-8 md:p-10 border border-terracotta/20">
        
        {/* Cabeçalho do Card */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-20 h-20 relative mb-4">
             <Image 
              src="/logo.svg" 
              alt="Raízes & Fios Logo" 
              fill
              className="object-contain"
              priority
            />
          </div>
          <h1 className="text-3xl font-serif font-bold text-brown-text">Crie sua conta</h1>
          <p className="text-gray-500 text-sm mt-2">Preencha seus dados para se cadastrar</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* Nome */}
          <div>
            <label className="block text-sm font-bold text-brown-text mb-2" htmlFor="name">
              Nome completo
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                id="name"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Seu nome completo"
                className="w-full rounded-lg pl-10 pr-4 py-3 border border-gray-200 text-brown-text placeholder-gray-400 focus:outline-none focus:border-terracotta focus:ring-1 focus:ring-terracotta transition bg-gray-50"
                required
              />
            </div>
          </div>

          {/* Email */}
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Senha */}
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
                  minLength={8}
                />
              </div>
            </div>

            {/* Confirmar Senha */}
            <div>
              <label className="block text-sm font-bold text-brown-text mb-2" htmlFor="confirmPassword">
                Confirmar senha
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  placeholder="********"
                  className="w-full rounded-lg pl-10 pr-4 py-3 border border-gray-200 text-brown-text placeholder-gray-400 focus:outline-none focus:border-terracotta focus:ring-1 focus:ring-terracotta transition bg-gray-50"
                  required
                  minLength={8}
                />
              </div>
            </div>
          </div>

          {/* Mensagens */}
          {errorMsg && (
            <div className="text-sm text-red-600 bg-red-50 p-3 rounded border border-red-100 flex items-center gap-2 animate-pulse">
              <span>⚠️</span> {errorMsg}
            </div>
          )}

          {successMsg && (
            <div className="text-sm text-green-700 bg-green-50 p-3 rounded border border-green-100 flex items-center gap-2">
              <CheckCircle className="w-5 h-5" /> {successMsg}
            </div>
          )}

          {/* Botão */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-terracotta text-white font-bold py-3 rounded-lg hover:bg-terracotta-dark transition duration-200 transform hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed shadow-md"
            >
              {loading ? "Cadastrando..." : "Criar conta"}
            </button>
          </div>
        </form>

        <div className="mt-8 pt-6 border-t border-gray-100 text-center text-sm text-gray-600">
          <p>
            Já possui uma conta?{" "}
            <Link href="/auth/login" className="text-terracotta font-bold hover:underline hover:text-terracotta-dark transition">
              Faça login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}