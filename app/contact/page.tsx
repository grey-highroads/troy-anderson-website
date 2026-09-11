import type { Metadata } from "next";
import Image from "next/image";

import { SubpageShell } from "@/components/subpage-shell";
import { getContactContent } from "@/lib/sanity/contact";

export const metadata: Metadata = {
  title: "Contact",
  description: "Connect with Troy Anderson.",
};

export default async function ContactPage() {
  const contact = await getContactContent();

  return (
    <SubpageShell
      eyebrow="Contact"
      title={contact?.title || "Let’s Connect"}
      intro={
        contact?.intro ||
        "For coaching, speaking, media, or book-related inquiries, start the conversation here."
      }
    >
      <section className="contact-layout">
        {contact?.portraitImageUrl ? (
          <Image
            className="portrait-image"
            src={contact.portraitImageUrl}
            alt={contact.portraitImageAlt || "Portrait of Troy Anderson"}
            width={contact.portraitImageWidth || 1200}
            height={contact.portraitImageHeight || 1500}
            sizes="(max-width: 900px) 91vw, 43vw"
          />
        ) : (
          <div className="contact-portrait" aria-label="Additional portrait of Troy to come">
            <span>Portrait</span>
            <small>Image to come</small>
          </div>
        )}

        <div className="contact-form-panel">
          <p className="section-label">Send a Note</p>
          <h2>{contact?.formHeading || "What would you like to talk about?"}</h2>
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
