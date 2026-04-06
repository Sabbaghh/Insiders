"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (res.ok) {
      router.push("/admin");
    } else {
      setError("Invalid credentials");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
      <div className="w-full max-w-[380px] px-6">
        <h1 className="text-white text-[28px] font-semibold mb-2">INSIDERS CMS</h1>
        <p className="text-[#6D6E71] text-[14px] mb-8">Sign in to manage your website</p>
        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full bg-[#1a1a1a] border border-[#333] rounded-lg px-4 py-3 text-white text-[14px] outline-none focus:border-[#E02379] transition-colors"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-[#1a1a1a] border border-[#333] rounded-lg px-4 py-3 text-white text-[14px] outline-none focus:border-[#E02379] transition-colors"
          />
          {error && <p className="text-[#E02379] text-[13px]">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#E02379] text-white rounded-lg py-3 text-[14px] font-medium hover:bg-[#B92786] transition-colors disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
