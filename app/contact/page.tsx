import type { Metadata } from "next";
import Image from "next/image";

import { ContactForm } from "@/components/contact-form";
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

          <h2>{contact?.formHeading || "What would you like to talk about?"}</h2>
          <ContactForm runtime={process.env.CLOUDFLARE_RUNTIME === "true"} />
        </div>
      </section>
    </SubpageShell>
  );
}
