"use client";

import { useState } from "react";

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);

    try {
      const res = await fetch("/api/users",  {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.email,
          password: form.password,
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (res.status === 200) {
        alert("Login realizado com sucesso!");
        setForm({ email: "", password: "" });
        // Aqui você pode redirecionar, ex: router.push("/")
      } else {
        setErrorMsg(data?.message || "Erro ao logar.");
      }
    } catch (err) {
      setErrorMsg("Erro de conexão com o servidor.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-cream p-6">
      <div className="w-full max-w-md">
        <h1 className="text-4xl font-bold text-center mb-8 text-brown-text font-serif">Login</h1>

        <div className="bg-terracotta p-8 rounded-xl shadow-lg">
          <form onSubmit={handleLogin} className="space-y-4">
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
              />
            </div>

            {errorMsg && <div className="text-sm text-red-200 mt-1 bg-red-900/20 p-2 rounded">{errorMsg}</div>}

            <div className="pt-4">
              <button
                type="submit"
                disabled={loading}
                className="w-32 mx-auto block bg-brown-text text-white py-2 rounded-full text-sm hover:opacity-90 transition transform hover:scale-105 disabled:opacity-70"
              >
                {loading ? "Entrando..." : "Entrar"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
