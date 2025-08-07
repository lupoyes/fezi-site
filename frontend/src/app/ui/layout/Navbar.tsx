"use client";

import type { NavbarLink } from "@/app/lib/types";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import clsx from "clsx";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { Triangle } from "lucide-react";

const links: NavbarLink[] = [
  { name: "Start", url: "/" },
  { name: "Über uns", url: "/ueber-uns" },
  { name: "Menü", url: "/menue" },
  {
    name: "Reservierung",
    url: "/reservierung",
    sub: [
      { name: "Tischplatz", url: "/tischplatz" },
      { name: "Events & Feiern", url: "/events-feiern" },
    ],
  },
  { name: "Kontakt", url: "/kontakt" },
];

export default function Navbar() {
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [extendMenu, setExtendMenu] = useState<string>("");
  const [hoveredMenu, setHoveredMenu] = useState<string>("");

  const toggleMenu = (toggleMenu: string) => {
    if (!toggleMenu) {
      setShowMenu(!showMenu);
      return;
    }
    if (extendMenu) {
      setExtendMenu("");
      return;
    }
    setExtendMenu(toggleMenu);
  };

  const pathname = "/" + usePathname().split("/")[1];

  const linkClassName =
    "m-auto p-4 py-3 border-b-1 hover:border-primary transition relative";

  return (
    <nav className="z-50 md:px-6">
      <div className="flex flex-row min-h-18">
        <div className="flex-8/10 md:flex-2/10">
          {/*
        <Image
            src="/logos/logo-fezi.svg"
            width={100}
            height={50}
            alt="Logo FeZi Cafébar"
            className="size-150 h-22"
          />
        */}
        </div>
        <button
          className="flex-2/10 content-center md:hidden"
          onClick={() => toggleMenu("")}
        >
          {showMenu ? (
            <X className="m-auto z-100" />
          ) : (
            <Menu className="m-auto z-100" />
          )}
        </button>

        {/* Desktop Navigation */}
        <div className="hidden md:flex flex-row content-center gap-6 my-auto">
          {links.map((link, index) => (
            <div
              key={index}
              className="relative"
              onMouseEnter={() => link.sub && setHoveredMenu(link.name)}
              onMouseLeave={() => link.sub && setHoveredMenu("")}
            >
              <Link
                href={link.sub ? "#" : link.url}
                onClick={(e) => {
                  if (link.sub) {
                    e.preventDefault();
                  }
                }}
                className={clsx(
                  `${linkClassName} flex items-center gap-1`,
                  { "text-primary border-primary": link.url == pathname },
                  { "border-neutral-200": link.url != pathname }
                )}
              >
                {link.name}
                {link.sub && (
                  <Triangle
                    className={clsx(
                      "transition-transform duration-200 ml-1",
                      { "rotate-180": hoveredMenu === link.name },
                      { "rotate-0": hoveredMenu !== link.name }
                    )}
                    size={12}
                  />
                )}
              </Link>

              {/* Desktop Submenu Dropdown */}
              {link.sub && (
                <div
                  className={clsx(
                    "absolute top-full left-0 mt-1 bg-white shadow-lg rounded-lg border border-gray-100 min-w-48 overflow-hidden transition-all duration-300 ease-in-out z-50",
                    {
                      "opacity-100 translate-y-0 visible":
                        hoveredMenu === link.name,
                      "opacity-0 -translate-y-2 invisible":
                        hoveredMenu !== link.name,
                    }
                  )}
                >
                  <div className="">
                    {link.sub.map((subLink, subIndex) => (
                      <Link
                        key={subIndex}
                        href={`${link.url}${subLink.url}`}
                        className="block p-4 text-gray-700 hover:bg-primary/5 hover:text-primary transition-colors duration-200"
                      >
                        {subLink.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://feinesundzimt.de"
            className={`border-neutral-200 text-white italic font-bold bg-primary rounded ${linkClassName}`}
          >
            Feines & Zimt
          </a>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={clsx(
          "fixed top-0 bottom-0 w-[80%] max-w-sm font-medium transition-transform duration-300 ease-in-out p-6 bg-white shadow-2xl z-20 md:hidden",
          { "translate-x-0": showMenu == true },
          { "-translate-x-full": showMenu == false }
        )}
      >
        {/* Header */}
        <div className="border-b border-gray-100 pb-4 mb-6">
          <h2 className="text-lg font-semibold text-gray-800">Navigation</h2>
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-col gap-2">
          {links.map((link, index) => (
            <div className="flex flex-col" key={index}>
              <Link
                href={link.sub ? "#" : link.url}
                onClick={(e) => {
                  if (link.sub) {
                    e.preventDefault();
                  }
                  toggleMenu(link.sub ? link.name : "");
                }}
                className={clsx(
                  "flex items-center justify-between py-3 px-4 rounded transition-all duration-200 hover:bg-gray-50",
                  {
                    "bg-primary/10 text-primary border-l-4 border-primary font-semibold":
                      link.url == pathname,
                    "text-gray-700 hover:text-primary": link.url != pathname,
                  }
                )}
              >
                <span className="text-lg">{link.name}</span>
                {link.sub && (
                  <Triangle
                    className={clsx(
                      "transition-transform duration-200",
                      { "rotate-180": extendMenu !== link.name },
                      { "rotate-0": extendMenu === link.name },
                      { "text-primary": link.url == pathname }
                    )}
                    size={16}
                  />
                )}
              </Link>

              {/* Mobile Submenu */}
              <div
                className={clsx(
                  "overflow-hidden transition-all duration-300 ease-in-out",
                  {
                    "max-h-96 opacity-100": extendMenu == link.name,
                    "max-h-0 opacity-0": extendMenu != link.name,
                  }
                )}
              >
                <div className="ml-4 mt-2 space-y-1">
                  {link.sub?.map((subLink, subLink_index) => (
                    <Link
                      href={`${link.url}${subLink.url}`}
                      key={subLink_index}
                      className="block py-2 px-4 text-base text-gray-600 hover:text-primary hover:bg-primary/5 rounded-md transition-colors duration-200"
                      onClick={() => toggleMenu("")}
                    >
                      {subLink.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ))}

          {/* Mobile External Link */}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://feinesundzimt.de"
            className="flex items-center py-3 px-4 rounded transition-all duration-200 hover:bg-gray-50 text-gray-700 hover:text-primary"
            onClick={() => toggleMenu("")}
          >
            <span className="text-lg">Feines & Zimt</span>
          </a>
        </nav>
      </div>

      {/* Overlay */}
      {showMenu && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-10 md:hidden"
          onClick={() => setShowMenu(false)}
        />
      )}
    </nav>
  );
}
