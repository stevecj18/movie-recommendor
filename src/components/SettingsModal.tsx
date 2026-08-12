import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import { X, Settings, Key, Info, HelpCircle } from "lucide-react";

interface SettingsModalProps {
  onClose: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ onClose }) => {
  const { tmdbKey, setCustomTmdbKey } = useApp();
  const [tokenInput, setTokenInput] = useState(tmdbKey);
  const [statusMsg, setStatusMsg] = useState("");

  const handleSave = () => {
    setCustomTmdbKey(tokenInput);
    setStatusMsg("API Access settings updated successfully!");
    setTimeout(() => {
      setStatusMsg("");
      onClose();
    }, 1500);
  };

  const handleUseMock = () => {
    setTokenInput("");
    setCustomTmdbKey("");
    setStatusMsg("Demo Offline database activated.");
    setTimeout(() => {
      setStatusMsg("");
      onClose();
    }, 1500);
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

        {/* Title */}
        <div className="flex items-center space-x-2 text-white mb-4">
          <Settings className="h-5 w-5 text-cinema-blue hover:rotate-45 transition-transform" />
          <h3 className="text-lg font-bold">API Concierge Configuration</h3>
        </div>

        {/* Info panel */}
        <div className="flex items-start space-x-3 rounded-xl bg-white/5 p-3.5 border border-white/5 mb-6 text-xs text-slate-300 leading-relaxed">
          <Info className="h-4 w-4 text-cinema-blue shrink-0 mt-0.5" />
          <div>
            <p>
              By default, Cinema Concierge is powered by our high-quality **offline curated portfolio database**.
            </p>
            <p className="mt-1.5 text-slate-400">
              Provide a TMDb API Read Access Token to connect to the global TMDb database, enabling search across millions of films.
            </p>
          </div>
        </div>

        {/* Input fields */}
        <div className="space-y-4">
          <div className="space-y-1.5">
            <div className="flex justify-between items-center">
              <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider">TMDb Read Access Token</label>
              <a 
                href="https://www.themoviedb.org/settings/api" 
                target="_blank" 
                rel="noreferrer" 
                className="text-[10px] text-cinema-blue hover:underline flex items-center space-x-0.5"
              >
                <HelpCircle className="h-3 w-3" />
                <span>Get Token</span>
              </a>
            </div>
            
            <div className="relative flex items-center">
              <Key className="absolute left-3.5 h-4 w-4 text-slate-500" />
              <input
                type="password"
                value={tokenInput}
                onChange={e => setTokenInput(e.target.value)}
                placeholder="eyJhbGciOiJIUzI1NiJ9..."
                className="w-full rounded-xl border border-white/10 bg-cinema-void pl-11 pr-4 py-2.5 text-xs text-white placeholder-slate-700 outline-none focus:border-cinema-blue"
              />
            </div>
          </div>

          {statusMsg && (
            <div className="text-center text-xs font-semibold text-cinema-blue bg-cinema-blue/10 border border-cinema-blue/20 rounded-lg py-2">
              {statusMsg}
            </div>
          )}

          {/* Action buttons */}
          <div className="flex flex-col gap-2 pt-2">
            <button
              onClick={handleSave}
              className="w-full rounded-xl bg-gradient-to-r from-cinema-purple to-cinema-blue py-2.5 font-semibold text-xs text-white shadow-lg shadow-cinema-purple/15 transition-all hover:brightness-110 active:scale-[0.98]"
            >
              Save Token & Connect Live
            </button>
            <button
              onClick={handleUseMock}
              className="w-full rounded-xl border border-white/10 hover:border-white/20 bg-white/5 py-2.5 font-semibold text-xs text-slate-300 hover:bg-white/10 transition-all hover:text-white"
            >
              Disconnect & Return to Demo Database
            </button>
          </div>
        </div>

      </div>

      {/* Backdrop Dismiss */}
      <div className="absolute inset-0 bg-transparent cursor-pointer" onClick={onClose} />

    </div>
  );
};
