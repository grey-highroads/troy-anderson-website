import type { Metadata } from "next";

import { SubpageShell } from "@/components/subpage-shell";

export const metadata: Metadata = {
  title: "Contact",
  description: "Connect with Troy Anderson.",
};

export default function ContactPage() {
  return (
    <SubpageShell
      eyebrow="Contact"
      title="Let’s Connect"
      intro="For coaching, speaking, media, or book-related inquiries, start the conversation here."
    >
      <section className="contact-layout">
        <div className="contact-portrait" aria-label="Additional portrait of Troy to come">
          <span>Portrait</span>
          <small>Image to come</small>
        </div>

        <div className="contact-form-panel">
          <p className="section-label">Send a Note</p>
          <h2>What would you like to talk about?</h2>
          <form className="contact-form">
            <label>
              Name
              <input type="text" name="name" autoComplete="name" />
            </label>
            <label>
              Email
              <input type="email" name="email" autoComplete="email" />
            </label>
            <label>
              Inquiry type
              <select name="inquiry" defaultValue="">
                <option value="" disabled>
                  Choose one
                </option>
                <option>Coaching</option>
                <option>Speaking</option>
                <option>Media</option>
                <option>Book</option>
                <option>Other</option>
              </select>
            </label>
            <label>
              Message
              <textarea name="message" rows={6} />
            </label>
            <button type="submit" disabled>
              Send Message
            </button>
            <p className="form-note">Form delivery will be connected before launch.</p>
          </form>
        </div>
      </section>
    </SubpageShell>
  );
}
