"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface Props {
  title: string;
  href: string;
  icon: any;
}

export default function SidebarItem({
  title,
  href,
  icon: Icon,
}: Props) {
  const pathname = usePathname();

  const active = pathname === href;

  return (
    <Link
      href={href}
      className={`
        flex
        items-center
        gap-3
        rounded-xl
        px-4
        py-3
        transition-all
        duration-200
        ${
          active
            ? "bg-[#4A2414] text-white shadow"
            : "text-[#6E584D] hover:bg-[#F5F2EE]"
        }
      `}
    >
      <Icon size={20} />

      <span className="font-medium">
        {title}
      </span>
    </Link>
  );
}