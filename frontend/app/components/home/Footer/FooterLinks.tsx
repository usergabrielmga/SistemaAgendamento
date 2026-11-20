"use client";

const links = [
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
    label: "Agendar",
    href: "/agendamento",
  },
];

export default function FooterLinks() {
  return (
    <nav className="flex flex-col gap-2 sm:gap-3">
      {links.map((link) => (
        <a
          key={link.href}
          href={link.href}
          className="
            text-sm
            sm:text-base
            text-[#D7C9C2]
            transition-colors
            hover:text-white
          "
        >
          {link.label}
        </a>
      ))}
    </nav>
  );
}