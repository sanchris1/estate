"use client";

import Link from "next/link";
import { useState } from "react";
import { IoClose } from "react-icons/io5";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import Button from "../ui/Button";
import { useAuthModal } from "@/store/useAuthModalStore";
import { useStore } from "zustand";
import { useCreatePropertyStateModal } from "@/store/useCreatePropertyModal";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

interface NavbarProps {
  variant: "transparent" | "solid";
}

export const navLinks = ["Home", "Properties", "MarketPlace"];

const Navbar = ({ variant = "transparent" }: NavbarProps) => {
  const isTransparent = variant === "transparent";
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);

  const { openLogin } = useStore(useAuthModal, (state) => state);
  const { open } = useStore(useCreatePropertyStateModal, (state) => state);

  const handleLogout = async () => {
    await authClient.signOut();
    router.refresh();
  };

  const { data: session, isPending } = authClient.useSession();

  return (
    <section
      className={`top-0 left-0 z-50 w-full  ${isTransparent ? "absolute" : "sticky border-b border-black/5 bg-card"}`}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <nav
          className={`flex h-20 items-center justify-between ${isTransparent ? "mt-6 rounded-3xl border border-white/10 bg-white/5 px-6 backdrop-blur-2xl" : "px-0"}`}
        >
          {/* logo */}
          <Link href={"/"} className="flex items-center text-2xl font-semibold">
            <span
              className={`${isTransparent ? "text-gray-300 " : "text-text"}`}
            >
              Right
            </span>
            <span className="bg-primary text-white px-2 py-1 rounded-tr-2xl rounded-bl-2xl">
              Estate
            </span>
          </Link>
          {/* links */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((item) => (
              <Link
                href={item === "Home" ? "/" : `${item.toLowerCase()}`}
                key={item}
                className={`${isTransparent ? "text-white/80" : "text-text/70"} text-sm font-medium transition hover:text-primary`}
              >
                {item}
              </Link>
            ))}
          </div>

          {/* buttons */}
          <div className="hidden lg:flex items-center gap-4">
            {session ? (
              <Button variant="outline" onclick={handleLogout}>
                Logout
              </Button>
            ) : (
              <Button variant="outline" onclick={openLogin}>
                Login
              </Button>
            )}
            {!isPending && session && (
              <Button variant="outline" onclick={open}>
                Add property
              </Button>
            )}
          </div>

          {/* mobile menu */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`${isTransparent ? "border border-white/10 bg-white/5 text-white" : "border border-black/10 bg-background text-text"} flex h-11 q-11 items-center justify-center rounded-2xl transition lg:hidden`}
          >
            {isOpen ? <IoClose size={24} /> : <HiOutlineMenuAlt3 size={24} />}
          </button>
        </nav>
        {/* mobile menu */}
        {isOpen && (
          <div
            className={`${isTransparent ? "border border-white/10 bg-secondary/95 " : "border border-black/5 bg-white"} mt-4 rounded-3xl p-6 backdrop-blur-2xl lg:hidden`}
          >
            <div className="flex flex-col gap-5">
              {" "}
              {navLinks.map((item) => (
                <Link
                  href={item === "Home" ? "/" : `${item.toLowerCase()}`}
                  key={item}
                  className={`${isTransparent ? "text-white/80" : "text-text/70"}  transition hover:text-primary`}
                >
                  {item}
                </Link>
              ))}
              <div className="flex flex-col gap-3 mt-4">
                {session ? (
                  <Button onclick={handleLogout}>Logout</Button>
                ) : (
                  <Button onclick={openLogin}>Login</Button>
                )}
                {!isPending && session && (
                  <Button onclick={open}>Add property</Button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Navbar;
