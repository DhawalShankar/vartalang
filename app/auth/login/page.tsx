"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mail, Lock } from "lucide-react";
import { useDarkMode } from '@/lib/DarkModeContext';
import { useAuth } from '@/lib/AuthContext';

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export default function SigninPage() {
  const { darkMode } = useDarkMode();
  const { setIsLoggedIn } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Invalid email or password");
        setLoading(false);
        return;
      }

      // Save token and update auth state
      localStorage.setItem("token", data.token);
      setIsLoggedIn(true);
      
      // Redirect to learn page
      router.push("/learn");
    } catch (error) {
      console.error("Login error:", error);
      alert("Network error. Please check your connection and try again.");
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center px-4 ${darkMode ? "bg-[#1a1410]" : "bg-[#FFF9F5]"}`}>
      
      {/* Background Glow */}
      <div className={`absolute top-20 left-1/3 w-72 h-72 rounded-full blur-3xl ${darkMode ? "bg-orange-900/20" : "bg-orange-300/30"}`}></div>
      <div className={`absolute bottom-20 right-1/3 w-64 h-64 rounded-full blur-3xl ${darkMode ? "bg-red-900/20" : "bg-red-300/30"}`}></div>

      <div className="max-w-md w-full relative z-10">
        
        {/* Logo */}
        <Link href="/" className="flex items-center justify-center gap-2 mb-8">
          <div className="w-10 h-10 rounded-full bg-linear-to-br from-orange-500 to-red-700 flex items-center justify-center">
            <span className="text-white font-bold">V</span>
          </div>
          <span className={`text-xl font-bold ${darkMode ? "text-orange-100" : "text-orange-900"}`}>VartaLang</span>
        </Link>

        {/* Card */}
        <div className={`rounded-3xl p-8 ${darkMode ? "bg-orange-900/10 border border-orange-800/30" : "bg-white border border-orange-200 shadow-lg"}`}>
          
          <div className="text-center mb-6">
            <h1 className={`text-2xl font-bold mb-2 ${darkMode ? "text-orange-50" : "text-orange-950"}`}>Welcome Back</h1>
            <p className={darkMode ? "text-orange-200/70" : "text-orange-700/70"}>Sign in to continue learning</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            
            <div>
              <label className={`block text-sm font-semibold mb-2 ${darkMode ? "text-orange-100" : "text-orange-900"}`}>Email</label>
              <div className="relative">
                <Mail className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${darkMode ? "text-orange-400" : "text-orange-600"}`} />
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className={`w-full pl-11 pr-4 py-3 rounded-xl border focus:outline-none ${
                    darkMode 
                      ? "bg-orange-900/20 border-orange-800/30 text-orange-100 placeholder:text-orange-400/50 focus:border-orange-600" 
                      : "bg-orange-50 border-orange-300 text-orange-950 placeholder:text-orange-400 focus:border-orange-500"
                  }`}
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <div>
              <label className={`block text-sm font-semibold mb-2 ${darkMode ? "text-orange-100" : "text-orange-900"}`}>Password</label>
              <div className="relative">
                <Lock className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${darkMode ? "text-orange-400" : "text-orange-600"}`} />
                <input
                  type="password"
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className={`w-full pl-11 pr-4 py-3 rounded-xl border focus:outline-none ${
                    darkMode 
                      ? "bg-orange-900/20 border-orange-800/30 text-orange-100 placeholder:text-orange-400/50 focus:border-orange-600" 
                      : "bg-orange-50 border-orange-300 text-orange-950 placeholder:text-orange-400 focus:border-orange-500"
                  }`}
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className={`flex items-center gap-2 ${darkMode ? "text-orange-200/80" : "text-orange-800"}`}>
                <input type="checkbox" className="w-4 h-4 rounded accent-orange-500" />
                Remember me
              </label>
              <a href="#" className={`font-medium ${darkMode ? "text-orange-400 hover:text-orange-300" : "text-orange-600 hover:text-orange-700"}`}>Forgot password?</a>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-linear-to-r from-orange-500 to-red-600 text-white font-semibold hover:scale-[1.02] transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>
          </form>

          <p className={`text-center text-sm mt-6 ${darkMode ? "text-orange-200/70" : "text-orange-700/70"}`}>
            Don't have an account?{" "}
            <Link href="/auth/signup" className={`font-medium ${darkMode ? "text-orange-400 hover:text-orange-300" : "text-orange-600 hover:text-orange-700"}`}>
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}