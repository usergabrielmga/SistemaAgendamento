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
    label: "Contato",
    href: "#contato",
  },
];

export default function NavLinks() {
  return (
    <nav className="hidden lg:flex items-center gap-10">
      {links.map((link) => (
        <a
          key={link.href}
          href={link.href}
          className="
            text-sm
            font-medium
            text-[#6D4C41]
            transition-colors
            hover:text-[#3A1C12]
          "
        >
          {link.label}
        </a>
      ))}
    </nav>
  );
}