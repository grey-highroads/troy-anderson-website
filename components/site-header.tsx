"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import headerArtwork from "../public/images/ta-site-header.svg";

const navigation = [
  { href: "/", label: "Home", number: "01" },
  { href: "/about", label: "About", number: "02" },
  { href: "/book", label: "Book", number: "03" },
  { href: "/media", label: "Media", number: "04" },
  { href: "/contact", label: "Contact", number: "05" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className={`site-header${isOpen ? " is-menu-open" : ""}`}>
      <div className="site-header__identity">
        <Link className="wordmark" href="/" aria-label="Troy Anderson, home">
          <Image
            className="site-header__artwork"
            src={headerArtwork}
            alt="Troy Anderson — Life Coach, Author"
            sizes="100vw"
            preload
          />
        </Link>
      </div>

      <button
        className="menu-mark"
        type="button"
        aria-label={isOpen ? "Close site navigation" : "Open site navigation"}
        aria-expanded={isOpen}
        aria-controls="site-navigation"
        onClick={() => setIsOpen((current) => !current)}
      >
        <span />
        <span />
        <span />
      </button>

      <nav
        id="site-navigation"
        className="site-navigation"
        aria-label="Primary navigation"
        hidden={!isOpen}
      >
        <ul>
          {navigation.map((item) => {
            const isActive = pathname === item.href;

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  onClick={() => setIsOpen(false)}
                >
                  <span>{item.label}</span>
                  <small>{item.number}</small>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
