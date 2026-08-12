import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import { X, Sparkles, User, Mail, Lock } from "lucide-react";

interface AuthModalProps {
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ onClose }) => {
  const { login } = useApp();
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLogin) {
      login(username || "Cinephile Extraordinaire", email || "user@cinema.com");
    } else {
      login(username, email);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      
      {/* Modal Box */}
      <div className="relative w-full max-w-md rounded-2xl border border-white/10 bg-cinema-deep/95 shadow-2xl overflow-hidden p-6 sm:p-8 animate-scale-up">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-lg hover:bg-white/5 text-slate-400 hover:text-white transition-colors"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Brand */}
        <div className="flex flex-col items-center text-center mb-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-cinema-purple to-cinema-blue text-white shadow-md shadow-cinema-purple/35 mb-2">
            <Sparkles className="h-5 w-5" />
          </div>
          <h3 className="text-xl font-extrabold text-white">
            {isLogin ? "Access Your Concierge" : "Establish Film Profile"}
          </h3>
          <p className="text-xs text-slate-500 mt-1 max-w-[240px]">
            Unlock personalized analytics, favorites syncing, and recommendations refinement.
          </p>
        </div>

        {/* Forms */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Username Input */}
          <div className="space-y-1.5">
            <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Username</label>
            <div className="relative flex items-center">
              <User className="absolute left-3.5 h-4 w-4 text-slate-500" />
              <input
                type="text"
                required
                value={username}
                onChange={e => setUsername(e.target.value)}
                placeholder="e.g. CinemaLover99"
                className="w-full rounded-xl border border-white/10 bg-cinema-void pl-11 pr-4 py-2.5 text-xs text-white placeholder-slate-600 outline-none focus:border-cinema-blue"
              />
            </div>
          </div>

          {/* Email Input */}
          {!isLogin && (
            <div className="space-y-1.5">
              <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Email Address</label>
              <div className="relative flex items-center">
                <Mail className="absolute left-3.5 h-4 w-4 text-slate-500" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="name@domain.com"
                  className="w-full rounded-xl border border-white/10 bg-cinema-void pl-11 pr-4 py-2.5 text-xs text-white placeholder-slate-600 outline-none focus:border-cinema-blue"
                />
              </div>
            </div>
          )}

          {/* Password Input */}
          <div className="space-y-1.5">
            <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Password</label>
            <div className="relative flex items-center">
              <Lock className="absolute left-3.5 h-4 w-4 text-slate-500" />
              <input
                type="password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;"
                className="w-full rounded-xl border border-white/10 bg-cinema-void pl-11 pr-4 py-2.5 text-xs text-white placeholder-slate-600 outline-none focus:border-cinema-blue"
              />
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full rounded-xl bg-gradient-to-r from-cinema-purple to-cinema-blue py-3 font-semibold text-xs text-white shadow-lg shadow-cinema-purple/15 transition-all hover:brightness-110 active:scale-[0.98] mt-2"
          >
            {isLogin ? "Authenticate" : "Generate Profile"}
          </button>
        </form>

        {/* Toggle Option */}
        <div className="mt-5 text-center">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-xs text-slate-400 hover:text-cinema-blue transition-colors"
          >
            {isLogin ? "New user? Create a profile" : "Already registered? Log in here"}
          </button>
        </div>

      </div>

      {/* Backdrop Dismiss */}
      <div className="absolute inset-0 bg-transparent cursor-pointer" onClick={onClose} />

    </div>
  );
};
