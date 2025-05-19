"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Button } from "../../components/ui/button";
import { Poppins } from "next/font/google";
import NavbarSidebar from "./navbar-sidebar";
import { MenuIcon } from "lucide-react";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["700"],
});

interface navbarItemProps {
  href: string;
  children: React.ReactNode;
  isActive?: boolean;
}

const NavbarItem = ({ href, children, isActive }: navbarItemProps) => {
  return (
    <Button
      variant={"outline"}
      asChild
      className={cn(
        "bg-transparent hover:bg-transparent rounded-full hover:border-primary border-transparent px-3.5 text-lg",
        isActive && "bg-black text-white hover:bg-black hover:text-white"
      )}
    >
      <Link href={href}>{children}</Link>
    </Button>
  );
};

const navItems = [
  { href: "/", children: "Home" },
  { href: "/about", children: "About" },
  { href: "/features", children: "Features" },
  { href: "/pricing", children: "Pricing" },
  { href: "/contact", children: "Contact" },
];
export const Navbar = () => {
  const pathname = usePathname();
  const [isSidebarOpen,setSidebarOpen]=useState(false)
  return (
    <nav className="flex  h-20 justify-between border-b font-medium  bg-white ">
      <Link href={"/"} className="pl-6 flex items-center">
        <span className={cn("text-5xl font-semibold", poppins.className)}>
          funroad
        </span>
      </Link>
      
      {/* --side-navbar-- */}
      <NavbarSidebar open={isSidebarOpen} onOpenChange={setSidebarOpen} items={navItems} />

      <div className="items-center gap-4  hidden lg:flex">
        {navItems.map((nav) => (
          <NavbarItem
            key={nav.href}
            href={nav.href}
            isActive={pathname === nav.href}
          >
            {nav.children}
          </NavbarItem>
        ))}
      </div>

      <div className="hidden lg:flex ">
        <Button
            asChild
            variant="secondary"
            className="border-l border-t-0 border-r-0 border-b-0 bg-white hover:bg-orange-400/90 px-10 h-full transition-colors text-lg rounded-none"
        >
          <Link href={"/sign-in"}>Sign In</Link>
        </Button>
        <Button
            asChild
            variant="secondary"
            className="border-l border-r-0 border-t-0 border-b-0 px-10 h-full bg-white hover:bg-black hover:text-white transition-colors text-lg rounded-none"
        >
          <Link href={"/start-up"}>Start selling</Link>
        </Button>
      </div>
      <div className="flex lg:hidden items-center justify-center">
        <Button
        variant="ghost"
        className="size-12 border-transparent bg-white"
        onClick={()=>setSidebarOpen(true)}
        >
          <MenuIcon/>
        </Button>

      </div>
    </nav>
  );
};
