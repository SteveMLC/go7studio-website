"use client";

import { useState } from "react";
import { ArrowRight, Check, Loader2 } from "lucide-react";

interface WaitlistFormProps {
  game: string;
  buttonText?: string;
  placeholder?: string;
  successMessage?: string;
  className?: string;
}

export function WaitlistForm({
  game,
  buttonText = "Join Waitlist",
  placeholder = "Enter your email",
  successMessage = "You're on the list! We'll notify you when it's ready.",
  className = "",
}: WaitlistFormProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) return;

    setStatus("loading");

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email.trim(), game }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus("success");
        setMessage(data.alreadyExists ? "You're already on the list!" : successMessage);
        setEmail("");
      } else {
        setStatus("error");
        setMessage(data.error || "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Please try again.");
    }
  };

  if (status === "success") {
    return (
      <div className={`rounded-xl border border-green-500/30 bg-green-500/10 px-6 py-4 ${className}`}>
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500/20">
            <Check className="h-4 w-4 text-green-400" />
          </div>
          <p className="text-green-400 font-medium">{message}</p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={`flex gap-3 ${className}`}>
      <div className="flex-1">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={placeholder}
          disabled={status === "loading"}
          className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-brand-pink/50 focus:outline-none focus:ring-1 focus:ring-brand-pink/50 disabled:opacity-50"
          required
        />
      </div>
      <button
        type="submit"
        disabled={status === "loading" || !email.trim()}
        className="group inline-flex shrink-0 items-center gap-2 rounded-xl bg-gradient-to-r from-brand-pink via-brand-orange to-brand-blue px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-orange/20 transition-all hover:shadow-brand-orange/30 disabled:opacity-50"
      >
        {status === "loading" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            <span className="hidden sm:inline">Joining...</span>
          </>
        ) : (
          <>
            <span className="hidden sm:inline">{buttonText}</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 sm:hidden" />
          </>
        )}
      </button>
    </form>
  );
}
