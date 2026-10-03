"use client";
import { useState } from "react";
import Link from "next/link";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await fetch(`${API_URL}/auth/forgot-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    setLoading(false);
    setSent(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        {sent ? (
          <p>If this email is registered, a password reset link has been sent. Please check your inbox.</p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <h1 className="text-2xl font-bold">Forgot Password</h1>
            <input type="email" required value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="w-full px-4 py-2.5 rounded-xl border" />
            <button disabled={loading} className="w-full py-3 rounded-xl bg-orange-500 text-white font-bold">
              {loading ? "Sending..." : "Send Reset Link"}
            </button>
          </form>
        )}
        <Link href="/auth/login" className="block text-center mt-4 text-orange-600">Back to login</Link>
      </div>
    </div>
  );
}