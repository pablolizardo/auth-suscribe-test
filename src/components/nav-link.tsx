"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NavLink = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => {
  const pathname = usePathname();
  const isActive = pathname === href;
  return (
    <Link
      href={href}
      className={isActive ? "text-blue-500 underline outline-offset-8" : ""}
    >
      {children}
    </Link>
  );
};

export default NavLink;
