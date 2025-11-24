"use client";

import Link from "next/link";
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
            // Ajustar a URL do endpoint se o back estiver em outra porta
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
        <div className="min-h-screen flex items-center justify-center bg-[#FDF6EB] p-6">
            <div className="w-full max-w-xl">
                <h1 className="text-4xl font-bold text-center mb-8 text-[#4A3B32]">Cadastro</h1>

                <div className="bg-[#9E7262] p-8 rounded-xl shadow-lg">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Nome */}
                        <div>
                            <label className="block text-sm text-[#FDF6EB] font-semibold mb-2">Nome completo:</label>
                            <input
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                placeholder="Nome completo"
                                className="w-full rounded-md px-3 py-2 text-[#4A3B32] bg-white placeholder-gray-400 focus:outline-none"
                                required
                            />
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-sm text-[#FDF6EB] font-semibold mb-2">E-mail:</label>
                            <input
                                name="email"
                                type="email"
                                value={form.email}
                                onChange={handleChange}
                                placeholder="email@exemplo.com"
                                className="w-full rounded-md px-3 py-2 text-[#4A3B32] bg-white placeholder-gray-400 focus:outline-none"
                                required
                            />
                        </div>

                        {/* Senha */}
                        <div>
                            <label className="block text-sm text-[#FDF6EB] font-semibold mb-2">Senha:</label>
                            <input
                                name="password"
                                type="password"
                                value={form.password}
                                onChange={handleChange}
                                placeholder="********"
                                className="w-full rounded-md px-3 py-2 text-[#4A3B32] bg-white placeholder-gray-400 focus:outline-none"
                                required
                                minLength={8}
                            />
                        </div>

                        {/* Confirmar senha */}
                        <div>
                            <label className="block text-sm text-[#FDF6EB] font-semibold mb-2">Confirmar senha:</label>
                            <input
                                name="confirmPassword"
                                type="password"
                                value={form.confirmPassword}
                                onChange={handleChange}
                                placeholder="********"
                                className="w-full rounded-md px-3 py-2 text-[#4A3B32] bg-white placeholder-gray-400 focus:outline-none"
                                required
                                minLength={8}
                            />
                        </div>

                        {/* Mensagens */}
                        {errorMsg && <div className="text-sm text-red-600 mt-1">{errorMsg}</div>}
                        {successMsg && <div className="text-sm text-green-700 mt-1">{successMsg}</div>}

                        {/* Botão */}
                        <div className="pt-4">
                            <button
                                type="submit"
                                className="w-32 mx-auto block bg-[#4A3B32] text-white py-2 rounded-full text-sm hover:bg-[#3d312b] transition">
                                Cadastrar
                            </button>
                        </div>

                        <div className="text-center text-white">
                            <p className="font-bold">Tem uma conta?</p>
                            <Link href="/auth/login" className="underline hover:text-orange-200 transition">
                                Fazer Login
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}