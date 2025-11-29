"use client";

import { useState } from "react";

export default function RegisterPage() {
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
      const res = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          password: form.password,
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (res.status === 201) {
        setSuccessMsg("Cadastro realizado com sucesso! Você pode entrar agora.");
        setForm({ name: "", email: "", password: "", confirmPassword: "" });
      } else if (res.status === 422 && data?.message) {
        setErrorMsg("Erro de validação: " + JSON.stringify(data.message));
      } else if (res.status === 409 && data?.message) {
        setErrorMsg(data.message);
      } else {
        setErrorMsg(data?.message || "Erro ao registrar usuário.");
      }
    } catch (err) {
      setErrorMsg("Erro de conexão com o servidor.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-cream p-6">
      <div className="w-full max-w-xl">
        <h1 className="text-4xl font-bold text-center mb-8 text-brown-text font-serif">Cadastro</h1>

        <div className="bg-terracotta-dark p-8 rounded-xl shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Nome */}
            <div>
              <label className="block text-sm text-cream font-semibold mb-2">Nome completo:</label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Nome completo"
                className="w-full rounded-md px-3 py-2 text-brown-text bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cream/50"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm text-cream font-semibold mb-2">E-mail:</label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="email@exemplo.com"
                className="w-full rounded-md px-3 py-2 text-brown-text bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cream/50"
                required
              />
            </div>

            {/* Senha */}
            <div>
              <label className="block text-sm text-cream font-semibold mb-2">Senha:</label>
              <input
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                placeholder="********"
                className="w-full rounded-md px-3 py-2 text-brown-text bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cream/50"
                required
                minLength={8}
              />
            </div>

            {/* Confirmar senha */}
            <div>
              <label className="block text-sm text-cream font-semibold mb-2">Confirmar senha:</label>
              <input
                name="confirmPassword"
                type="password"
                value={form.confirmPassword}
                onChange={handleChange}
                placeholder="********"
                className="w-full rounded-md px-3 py-2 text-brown-text bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cream/50"
                required
                minLength={8}
              />
            </div>

            {/* Mensagens */}
            {errorMsg && <div className="text-sm text-red-200 mt-1 bg-red-900/20 p-2 rounded">{errorMsg}</div>}
            {successMsg && <div className="text-sm text-green-200 mt-1 bg-green-900/20 p-2 rounded">{successMsg}</div>}

            {/* Botão */}
            <div className="pt-4">
             <button
              type="submit"
              disabled={loading}
              className="w-32 mx-auto block bg-brown-text text-white py-2 rounded-full text-sm hover:opacity-90 transition transform hover:scale-105 disabled:opacity-70">
              {loading ? "Cadastrando..." : "Cadastrar"}
            </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
