"use client";

import Link from "next/link";
import { navLinks } from "../navbar/Navbar";

const Footer = () => {
  return (
    <footer className="border-t border-black/5 bg-background">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-6 text-center lg:flex-row lg:px-12 ">
        <Link href={"/"} className="flex items-center text-2xl font-semibold">
          <span className="text-text">Right</span>
          <span className="bg-primary text-white px-2 py-1 rounded-tr-2xl rounded-bl-2xl">
            Estate
          </span>
        </Link>
        <div className="flex items-center gap-8">
          {navLinks.map((item) => (
            <Link
              href={item === "Home" ? "/" : `${item.toLowerCase()}`}
              key={item}
              className={`text-text/70 text-sm font-medium transition hover:text-primary`}
            >
              {item}
            </Link>
          ))}
        </div>

        <p className="text-sm text-text/60">
          &copy; {new Date().getFullYear()} Copyright
        </p>
      </div>
    </footer>
  );
};

export default Footer;
