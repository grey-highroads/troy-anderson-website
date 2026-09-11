"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navigation = [
  { href: "/", label: "Home", number: "01" },
  { href: "/about", label: "About", number: "02" },
  { href: "/book", label: "Book", number: "03" },
  { href: "/contact", label: "Contact", number: "04" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className={`site-header${isOpen ? " is-menu-open" : ""}`}>
      <div className="site-header__identity">
        <Link className="wordmark" href="/" aria-label="Troy Anderson, home">
          Troy Anderson
        </Link>
        <p className="site-header__strapline">Life Coach, Author</p>
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
        <p>Media will be added when the library is ready.</p>
      </nav>
    </header>
  );
}
