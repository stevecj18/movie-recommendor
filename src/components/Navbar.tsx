import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import { Sparkles, Heart, Bookmark, BarChart3, Settings, LogOut, Sun, Moon, Menu, X, User } from "lucide-react";

interface NavbarProps {
  onOpenSettings: () => void;
  onOpenAuth: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenSettings, onOpenAuth }) => {
  const { user, theme, activeSection, setActiveSection, toggleTheme, logout } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: "home", label: "Concierge", icon: Sparkles },
    { id: "dashboard", label: "Analytics", icon: BarChart3 },
    { id: "favorites", label: "Favorites", icon: Heart },
    { id: "watchlist", label: "Watchlist", icon: Bookmark },
  ] as const;

  const handleNavClick = (sectionId: "home" | "dashboard" | "favorites" | "watchlist") => {
    setActiveSection(sectionId);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 glass-panel">
      <div className="mx-auto flex max-w-7xl h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Logo */}
        <div 
          className="flex cursor-pointer items-center space-x-2"
          onClick={() => handleNavClick("home")}
        >
          <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-cinema-purple to-cinema-blue text-white shadow-lg shadow-cinema-purple/35 animate-pulse-slow">
            <Sparkles className="h-5 w-5" />
          </div>
          <span className="bg-gradient-to-r from-white via-cinema-gold-light to-cinema-blue bg-clip-text text-xl font-extrabold tracking-tight text-transparent">
            Cinema<span className="font-light text-slate-300">Concierge</span>
          </span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`relative flex items-center space-x-2 rounded-xl px-4 py-2 text-sm font-medium transition-all duration-300 ${
                  isActive
                    ? "bg-gradient-to-r from-cinema-purple/20 to-cinema-blue/20 text-cinema-blue border border-cinema-blue/30"
                    : "text-slate-300 hover:bg-white/5 hover:text-white border border-transparent"
                }`}
              >
                <Icon className={`h-4 w-4 ${isActive ? "text-cinema-blue" : "text-slate-400"}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Action Controls */}
        <div className="hidden md:flex items-center space-x-3">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/5 bg-white/5 text-slate-300 transition-colors hover:bg-white/10 hover:text-white"
            title="Toggle Theme"
          >
            {theme === "dark" ? <Sun className="h-5 w-5 text-cinema-gold" /> : <Moon className="h-5 w-5 text-cinema-purple" />}
          </button>

          {/* Settings Trigger */}
          <button
            onClick={onOpenSettings}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/5 bg-white/5 text-slate-300 transition-colors hover:bg-white/10 hover:text-white"
            title="TMDb API Settings"
          >
            <Settings className="h-5 w-5 hover:rotate-45 transition-transform duration-300" />
          </button>

          {/* User Profile */}
          {user ? (
            <div className="flex items-center space-x-2 rounded-xl border border-white/5 bg-white/5 p-1.5 pl-3">
              <span className="text-xs font-semibold text-slate-300">{user.username}</span>
              <button
                onClick={logout}
                className="flex h-7 w-7 items-center justify-center rounded-lg bg-red-500/20 text-red-400 transition-colors hover:bg-red-500/35 hover:text-red-300"
                title="Logout"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={onOpenAuth}
              className="flex items-center space-x-2 rounded-xl bg-gradient-to-r from-cinema-purple to-cinema-purple-light px-4 py-2 text-sm font-semibold text-white shadow-md shadow-cinema-purple/20 transition-all hover:-translate-y-0.5 hover:shadow-cinema-purple/35"
            >
              <User className="h-4 w-4" />
              <span>Sign In</span>
            </button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center space-x-2">
          {/* Theme Toggle Mobile */}
          <button
            onClick={toggleTheme}
            className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/5 text-slate-300"
          >
            {theme === "dark" ? <Sun className="h-4.5 w-4.5 text-cinema-gold" /> : <Moon className="h-4.5 w-4.5 text-cinema-purple" />}
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/5 text-slate-300 hover:text-white"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-white/5 bg-cinema-void/95 px-4 py-3 space-y-2 animate-fade-in">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`flex w-full items-center space-x-3 rounded-lg px-3 py-2 text-sm font-medium ${
                  isActive
                    ? "bg-cinema-purple/20 text-cinema-blue"
                    : "text-slate-300 hover:bg-white/5"
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{item.label}</span>
              </button>
            );
          })}
          
          <div className="border-t border-white/5 my-2 pt-2 flex flex-col space-y-2">
            <button
              onClick={() => {
                onOpenSettings();
                setMobileMenuOpen(false);
              }}
              className="flex w-full items-center space-x-3 rounded-lg px-3 py-2 text-sm font-medium text-slate-300 hover:bg-white/5"
            >
              <Settings className="h-4 w-4" />
              <span>TMDb API Settings</span>
            </button>
            
            {user ? (
              <div className="flex items-center justify-between rounded-lg bg-white/5 px-3 py-2">
                <span className="text-sm font-medium text-slate-300">{user.username}</span>
                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center space-x-1 rounded-md bg-red-500/20 px-2.5 py-1 text-xs text-red-400"
                >
                  <LogOut className="h-3 w-3" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  onOpenAuth();
                  setMobileMenuOpen(false);
                }}
                className="flex w-full items-center justify-center space-x-2 rounded-lg bg-gradient-to-r from-cinema-purple to-cinema-purple-light py-2 text-sm font-semibold text-white"
              >
                <User className="h-4 w-4" />
                <span>Sign In</span>
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
