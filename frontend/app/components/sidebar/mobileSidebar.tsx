"use client";

import { Menu, X } from "lucide-react";
import { useState } from "react";
import SidebarItem from "./sidebarItem";
import { routes, logout } from "@/app/lib/routes";

export default function MobileSidebar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="flex h-16 items-center justify-between border-b bg-white px-4 lg:hidden">
        <h1 className="font-serif text-2xl font-bold text-2xl text-[#3a1c12]">
          JENYFER.
        </h1>

        <button onClick={() => setOpen(true)}>
          <Menu className="text-[#3a1c12] cursor-pointer" />
        </button>
      </header>

      {open && (
        <>
          <div
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-40 bg-black/40"
          />

          <aside
            className="
            fixed
            left-0
            top-0
            z-50
            flex
            h-full
            w-72
            flex-col
            justify-between
            bg-white
            "
          >
            <div>
              <div className="flex h-20 items-center justify-between border-b px-6">
                <h1 className="font-serif text-2xl font-bold text-[#3a1c12]">
                  JHENYFFER.
                </h1>

                <button onClick={() => setOpen(false)}>
                  <X className="text-[#3a1c12] cursor-pointer" />
                </button>
              </div>

              <nav className="space-y-2 p-5">
                {routes.map((item) => (
                  <SidebarItem
                    key={item.href}
                    {...item}
                  />
                ))}
              </nav>
            </div>

            <div className="border-t p-5">
              <SidebarItem {...logout} />
            </div>
          </aside>
        </>
      )}
    </>
  );
}