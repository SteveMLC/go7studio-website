"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle, AlertCircle, Loader2 } from "lucide-react";

// To set up Formspree:
// 1. Go to https://formspree.io and create a free account
// 2. Create a new form and add both email recipients:
//    - stephen@go7studio.com
//    - walt@go7studio.com
// 3. Copy your form ID (e.g., "xyzabcde") and set it as NEXT_PUBLIC_FORMSPREE_ID
// Or replace the hardcoded ID below
const FORMSPREE_ID = process.env.NEXT_PUBLIC_FORMSPREE_ID || "YOUR_FORMSPREE_ID";

const projectTypes = [
  { value: "", label: "Select project type..." },
  { value: "web-dev", label: "Web Development" },
  { value: "mobile-app", label: "Mobile App" },
  { value: "game-dev", label: "Game Development" },
  { value: "ai-automation", label: "AI & Automation" },
  { value: "other", label: "Other" },
];

const budgetRanges = [
  { value: "", label: "Select budget range..." },
  { value: "under-1k", label: "Under $1,000" },
  { value: "1k-5k", label: "$1,000 - $5,000" },
  { value: "5k-10k", label: "$5,000 - $10,000" },
  { value: "10k-plus", label: "$10,000+" },
  { value: "discuss", label: "Let's Discuss" },
];

type FormStatus = "idle" | "submitting" | "success" | "error";

export default function ContactPage() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        setStatus("success");
        form.reset();
      } else {
        const data = await response.json();
        setErrorMessage(data.error || "Something went wrong. Please try again.");
        setStatus("error");
      }
    } catch {
      setErrorMessage("Network error. Please check your connection and try again.");
      setStatus("error");
    }
  }

  return (
    <div className="container-px py-16 sm:py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mx-auto max-w-2xl"
      >
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="mb-4 font-display text-4xl font-bold tracking-tight sm:text-5xl">
            Work With Us
          </h1>
          <p className="text-lg text-white/70">
            Have a project in mind? We&apos;d love to hear about it. Whether you need a
            mobile app, web platform, game, or custom automation—let&apos;s build
            something great together.
          </p>
        </div>

        {/* Success State */}
        {status === "success" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card p-8 text-center"
          >
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-state-success/20">
              <CheckCircle className="h-8 w-8 text-state-success" />
            </div>
            <h2 className="mb-2 font-display text-2xl font-semibold">
              Message Sent!
            </h2>
            <p className="mb-6 text-white/70">
              Thanks for reaching out. We typically respond within 24-48 hours.
              We&apos;ll be in touch soon!
            </p>
            <button
              onClick={() => setStatus("idle")}
              className="btn-secondary"
            >
              Send Another Message
            </button>
          </motion.div>
        )}

        {/* Form */}
        {status !== "success" && (
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="glass-card space-y-6 p-6 sm:p-8"
          >
            {/* Error Message */}
            {status === "error" && (
              <div className="flex items-start gap-3 rounded-xl bg-state-danger/10 p-4 ring-1 ring-state-danger/20">
                <AlertCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-state-danger" />
                <div>
                  <p className="font-medium text-state-danger">
                    Failed to send message
                  </p>
                  <p className="text-sm text-white/70">{errorMessage}</p>
                </div>
              </div>
            )}

            {/* Name & Email Row */}
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-medium text-white/90"
                >
                  Name <span className="text-brand-pink">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  placeholder="Your name"
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/40 outline-none transition-colors focus:border-brand-orange/50 focus:bg-white/[0.07]"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-white/90"
                >
                  Email <span className="text-brand-pink">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  placeholder="you@example.com"
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/40 outline-none transition-colors focus:border-brand-orange/50 focus:bg-white/[0.07]"
                />
              </div>
            </div>

            {/* Company */}
            <div>
              <label
                htmlFor="company"
                className="mb-2 block text-sm font-medium text-white/90"
              >
                Company{" "}
                <span className="text-sm font-normal text-white/50">
                  (optional)
                </span>
              </label>
              <input
                type="text"
                id="company"
                name="company"
                placeholder="Your company name"
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/40 outline-none transition-colors focus:border-brand-orange/50 focus:bg-white/[0.07]"
              />
            </div>

            {/* Project Type & Budget Row */}
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="projectType"
                  className="mb-2 block text-sm font-medium text-white/90"
                >
                  Project Type
                </label>
                <select
                  id="projectType"
                  name="projectType"
                  className="w-full cursor-pointer rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition-colors focus:border-brand-orange/50 focus:bg-white/[0.07]"
                >
                  {projectTypes.map((type) => (
                    <option
                      key={type.value}
                      value={type.value}
                      className="bg-ink-900 text-white"
                    >
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label
                  htmlFor="budget"
                  className="mb-2 block text-sm font-medium text-white/90"
                >
                  Budget Range
                </label>
                <select
                  id="budget"
                  name="budget"
                  className="w-full cursor-pointer rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition-colors focus:border-brand-orange/50 focus:bg-white/[0.07]"
                >
                  {budgetRanges.map((range) => (
                    <option
                      key={range.value}
                      value={range.value}
                      className="bg-ink-900 text-white"
                    >
                      {range.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Message */}
            <div>
              <label
                htmlFor="message"
                className="mb-2 block text-sm font-medium text-white/90"
              >
                Message <span className="text-brand-pink">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                placeholder="Tell us about your project, goals, and timeline..."
                className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/40 outline-none transition-colors focus:border-brand-orange/50 focus:bg-white/[0.07]"
              />
            </div>

            {/* How did you hear about us */}
            <div>
              <label
                htmlFor="referral"
                className="mb-2 block text-sm font-medium text-white/90"
              >
                How did you hear about us?{" "}
                <span className="text-sm font-normal text-white/50">
                  (optional)
                </span>
              </label>
              <input
                type="text"
                id="referral"
                name="referral"
                placeholder="Twitter, Google, friend, etc."
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/40 outline-none transition-colors focus:border-brand-orange/50 focus:bg-white/[0.07]"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={status === "submitting"}
              className="btn-primary flex w-full items-center justify-center gap-2 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {status === "submitting" ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="h-5 w-5" />
                  Send Message
                </>
              )}
            </button>

            <p className="text-center text-sm text-white/50">
              We respect your privacy and will never share your information.
            </p>
          </motion.form>
        )}

        {/* Additional Contact Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 text-center"
        >
          <p className="text-white/60">
            Prefer email?{" "}
            <a
              href="mailto:hello@go7studio.com"
              className="text-brand-orange hover:text-white"
            >
              hello@go7studio.com
            </a>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
