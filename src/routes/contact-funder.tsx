import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { sendContactFunderEmail } from "../lib/contact-email.functions";
import { TopNav, Footer } from "./index";

export const Route = createFileRoute("/contact-funder")({
  head: () => ({
    meta: [
      { title: "Contact Funder · doggy" },
      { name: "description", content: "Request access to doggy's execution roadmap." },
    ],
  }),
  component: ContactFunderPage,
});

function ContactFunderPage() {
  const navigate = useNavigate();
  const sendContactEmail = useServerFn(sendContactFunderEmail);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    organization: "",
    role: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);
    try {
      await sendContactEmail({ data: form });
      setSubmitted(true);
    } catch {
      setError("Email couldn't be sent yet. Please try again in a moment.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--ink)] flex flex-col">
      <TopNav />
      <main className="flex-1 px-6 md:px-10 py-20 md:py-28">
        <div className="max-w-[640px] mx-auto">
          <div className="font-mono text-[12px] tracking-[0.2em] text-[var(--orange)] mb-6">
            00 / RESTRICTED ACCESS
          </div>
          <h1 className="text-[clamp(2rem,4.6vw,3.6rem)] font-extrabold leading-[1.05] tracking-tight mb-6">
            Contact Funder.
          </h1>
          <p className="text-lg text-[var(--ink-muted)] leading-relaxed mb-10">
            The execution roadmap contains crucial information about the application.
            Share a few details and we'll be in touch.
          </p>

          {submitted ? (
            <div className="border border-[var(--orange)] bg-[var(--panel)] p-8">
              <div className="font-mono text-[12px] tracking-[0.2em] text-[var(--orange)] mb-3">
                REQUEST RECEIVED
              </div>
              <div className="text-xl font-bold mb-2">Thanks, {form.name || "we got it"}.</div>
              <p className="text-[var(--ink-muted)] mb-6">
                We'll review your request and reach out at {form.email || "your email"} shortly.
              </p>
              <button
                type="button"
                onClick={() => navigate({ to: "/market-research" })}
                className="font-mono text-[12px] tracking-[0.2em] uppercase text-[var(--orange)] hover:underline"
              >
                ← Back to research
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {[
                { k: "name", label: "Full name", type: "text", required: true },
                { k: "email", label: "Email", type: "email", required: true },
                { k: "organization", label: "Organization", type: "text", required: false },
                { k: "role", label: "Role", type: "text", required: false },
              ].map((f) => (
                <div key={f.k}>
                  <label className="block font-mono text-[10px] tracking-[0.2em] uppercase text-[var(--ink-dim)] mb-2">
                    {f.label}
                    {f.required && " *"}
                  </label>
                  <input
                    type={f.type}
                    required={f.required}
                    value={(form as Record<string, string>)[f.k]}
                    onChange={(e) => setForm({ ...form, [f.k]: e.target.value })}
                    className="w-full bg-[var(--panel)] border border-[var(--line)] px-4 py-3 text-[var(--ink)] focus:outline-none focus:border-[var(--orange)] transition-colors"
                  />
                </div>
              ))}
              <div>
                <label className="block font-mono text-[10px] tracking-[0.2em] uppercase text-[var(--ink-dim)] mb-2">
                  Message
                </label>
                <textarea
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full bg-[var(--panel)] border border-[var(--line)] px-4 py-3 text-[var(--ink)] focus:outline-none focus:border-[var(--orange)] transition-colors resize-none"
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[var(--orange)] text-white font-bold py-4 px-6 hover:opacity-90 transition-opacity font-mono text-[12px] tracking-[0.2em] uppercase"
              >
                {isSubmitting ? "Sending..." : "Submit Request"}
              </button>
              {error && <p className="text-sm text-[var(--orange)]">{error}</p>}
            </form>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
