"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";

const links = [
  {
    label: "Início",
    href: "#inicio",
  },
  {
    label: "Sobre",
    href: "#sobre",
  },
  {
    label: "Serviços",
    href: "#servicos",
  },
  {
    label: "Galeria",
    href: "#galeria",
  },
  {
    label: "Contato",
    href: "#contato",
  },
];

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="text-[#3A1C12]"
        aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
      >
        {isOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {isOpen && (
        <div className="absolute left-0 top-20 w-full border-t border-[#EEE7E1] bg-[#FCF8F5] px-6 py-6 shadow-md">
          <nav className="flex flex-col gap-5">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-sm font-medium text-[#8A756B] transition-colors hover:text-[#3A1C12]"
              >
                {link.label}
              </a>
            ))}

            <a
              href="/login"
              onClick={() => setIsOpen(false)}
              className="text-sm font-medium text-[#8A756B] transition-colors hover:text-[#3A1C12]"
            >
              Admin
            </a>

            <a
              href="/agendamento"
              onClick={() => setIsOpen(false)}
              className="rounded-full bg-[#4B2515] px-6 py-3 text-center text-sm font-semibold text-white transition-all hover:bg-[#2F160C]"
            >
              Agendar
            </a>
          </nav>
        </div>
      )}
    </div>
  );
}