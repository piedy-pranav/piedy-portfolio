"use client";

import { useState, type FormEvent } from "react";

type Status = "idle" | "pending" | "success" | "error";

const fieldClass =
  "contact-field w-full border-0 border-b border-ink-int/30 bg-transparent pb-2 text-[15px] outline-none transition-colors duration-200 placeholder:text-ink-int/35 focus:border-beam-contact dark:border-ink/30 dark:placeholder:text-ink/35";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("pending");
    setErrorMessage("");

    const form = event.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          message: data.get("message"),
          company: data.get("company"), // honeypot
        }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        setErrorMessage(body.message || "Something went wrong. Try again.");
        setStatus("error");
        return;
      }

      setStatus("success");
      form.reset();
    } catch {
      setErrorMessage("Something went wrong. Try again.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <p className="text-[15px] leading-[1.7] text-ink-int/65 dark:text-ink/60">
        Sent! I&apos;ll reply soon :)
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-8" noValidate>
      {/* Honeypot — hidden from sighted and screen-reader users, must stay empty */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="company">Company</label>
        <input type="text" id="company" name="company" tabIndex={-1} autoComplete="off" />
      </div>

      <div>
        <label htmlFor="name" className="text-[13px] tracking-[0.06em] text-ink-int/50 dark:text-ink/45">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          maxLength={100}
          className={`${fieldClass} mt-2`}
        />
      </div>

      <div>
        <label htmlFor="email" className="text-[13px] tracking-[0.06em] text-ink-int/50 dark:text-ink/45">
          Your contact (email)
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className={`${fieldClass} mt-2`}
        />
      </div>

      <div>
        <label htmlFor="message" className="text-[13px] tracking-[0.06em] text-ink-int/50 dark:text-ink/45">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          maxLength={2000}
          className={`${fieldClass} mt-2 resize-none`}
        />
      </div>

      {status === "error" && (
        <p role="alert" className="text-[13px] text-beam-contact">
          {errorMessage}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "pending"}
        className="contact-field w-fit rounded-full border border-ink-int/40 px-6 py-2.5 text-[13px] tracking-[0.06em] transition-colors duration-250 hover:bg-beam-contact hover:text-white disabled:opacity-50 dark:border-ink/40"
      >
        {status === "pending" ? "Sending…" : "Send"}
      </button>
    </form>
  );
}
