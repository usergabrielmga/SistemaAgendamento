"use client";

import SidebarItem from "./sidebarItem";
import { routes, logout } from "@/app/lib/routes";

export default function Sidebar() {
  return (
    <aside
      className="
      hidden
      lg:flex
      flex-col
      justify-between
      w-72
      h-screen
      border-r
      bg-white
      "
    >
      <div>
        <div className="h-24 flex items-center px-8 border-b">

          <h1
            className="
            text-2xl
            font-serif
            font-bold
            tracking-wide
            text-[#3a1c12]
            "
          >
            JHENNYFFER.
          </h1>

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
  );
}