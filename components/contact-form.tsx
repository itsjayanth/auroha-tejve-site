"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { Loader2, CheckCircle2 } from "lucide-react";

type FormState = {
  name: string;
  email: string;
  company: string;
  message: string;
};

const initialState: FormState = { name: "", email: "", company: "", message: "" };

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ContactForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  function validate(values: FormState) {
    const next: Partial<Record<keyof FormState, string>> = {};
    if (!values.name.trim()) next.name = "Please share your name.";
    if (!values.email.trim()) next.email = "Please share your email.";
    else if (!emailPattern.test(values.email)) next.email = "That email doesn't look right.";
    if (!values.message.trim()) next.message = "Tell us a little about your project.";
    return next;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const validationErrors = validate(form);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setStatus("submitting");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!response.ok) throw new Error("Request failed");
      setStatus("success");
      setForm(initialState);
    } catch {
      setStatus("error");
    }
  }

  function handleChange<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="card-surface flex flex-col items-center justify-center rounded-2xl px-8 py-16 text-center"
      >
        <CheckCircle2 className="h-9 w-9 text-accent-soft" />
        <h3 className="mt-4 text-xl font-medium text-ink">Message sent.</h3>
        <p className="mt-2 max-w-sm text-sm leading-relaxed text-ink-muted">
          Thanks for reaching out — we&rsquo;ll get back to you within one business day.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 text-sm font-medium text-accent-soft hover:underline"
        >
          Send another message
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="card-surface space-y-5 rounded-2xl p-6 sm:p-8">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field
          label="Name"
          name="name"
          value={form.name}
          onChange={(v) => handleChange("name", v)}
          error={errors.name}
          autoComplete="name"
        />
        <Field
          label="Email"
          name="email"
          type="email"
          value={form.email}
          onChange={(v) => handleChange("email", v)}
          error={errors.email}
          autoComplete="email"
        />
      </div>

      <Field
        label="Company"
        name="company"
        value={form.company}
        onChange={(v) => handleChange("company", v)}
        optional
        autoComplete="organization"
      />

      <div>
        <label htmlFor="message" className="mb-2 block text-sm font-medium text-ink">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          value={form.message}
          onChange={(e) => handleChange("message", e.target.value)}
          placeholder="Tell us about your project, timeline, and goals."
          className="w-full resize-none rounded-xl border border-border-strong bg-white/[0.02] px-4 py-3 text-sm text-ink placeholder:text-ink-faint outline-none transition-colors focus:border-accent-soft/60"
        />
        {errors.message ? <p className="mt-1.5 text-xs text-red-400">{errors.message}</p> : null}
      </div>

      {status === "error" ? (
        <p className="text-sm text-red-400">
          Something went wrong sending your message. Please try again or email us directly.
        </p>
      ) : null}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-ink px-6 py-3.5 text-sm font-medium text-bg transition-all duration-300 hover:bg-accent hover:text-white disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
      >
        {status === "submitting" ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
        {status === "submitting" ? "Sending..." : "Send message"}
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  value,
  onChange,
  error,
  type = "text",
  optional = false,
  autoComplete,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  type?: string;
  optional?: boolean;
  autoComplete?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-2 block text-sm font-medium text-ink">
        {label} {optional ? <span className="text-ink-faint">(optional)</span> : null}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        autoComplete={autoComplete}
        onChange={(e) => onChange(e.target.value)}
        placeholder={label}
        className="w-full rounded-xl border border-border-strong bg-white/[0.02] px-4 py-3 text-sm text-ink placeholder:text-ink-faint outline-none transition-colors focus:border-accent-soft/60"
      />
      {error ? <p className="mt-1.5 text-xs text-red-400">{error}</p> : null}
    </div>
  );
}
