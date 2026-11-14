"use client";

import NavLinks from "./NavLinks";
import MobileMenu from "./MobileMenu";
import Logo from "@/app/imgs/beauty_studio_logo.png";

export default function Header() {
  return (
    <header
      className="
        sticky
        top-0
        z-50
        w-full
        border-b
        border-[#EEE7E1]
        bg-[#FCF8F5]/95
        backdrop-blur-md
        font-sans
      "
    >
      <div
        className="
          mx-auto
          flex
          h-20
          w-full
          max-w-7xl
          items-center
          justify-between
          px-6
        "
      >
        {/* Logo */}

        <a
          href="/"
          className="
            text-2xl
            font-black
            tracking-[0.2em]
            text-[#3A1C12]
          "
        >
          <img
            src={Logo.src}
            alt="Beauty Studio Logo"
            className="h-10 w-auto"
          />
        </a>

        <NavLinks />

        <div className="hidden lg:flex items-center gap-5">
          <a
            href="/login"
            className="
              text-sm
              font-medium
              text-[#8A756B]
              hover:text-[#3A1C12]
              transition-colors
            "
          >
            Admin
          </a>

          <a
            href="/agendamento"
            className="
              rounded-full
              bg-[#4B2515]
              px-6
              py-3
              text-sm
              font-semibold
              text-white
              transition-all
              hover:bg-[#2F160C]
            "
          >
            Agendar
          </a>
        </div>

        <MobileMenu />
      </div>
    </header>
  );
}