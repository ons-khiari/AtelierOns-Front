"use client";

import Link from "next/link";

export function Footer() {
  return (
    <footer className="">
      {/* TOP FOOTER (GRAY) */}
      {/* TOP FOOTER (GRAY) */}
      <div className="bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          {/* LEFT: Newsletter */}
          <div>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center border border-gray-400 px-6 py-3 text-xs tracking-[0.3em] uppercase text-white bg-black transition-all duration-300"
            >
              SIGN UP TO STAY IN THE KNOW
            </Link>

            {/* Social */}
            <div className="flex items-center gap-3 mt-8">
              {/* Instagram */}
              <Link
                href="#"
                className="group w-9 h-9 flex items-center justify-center rounded-full border border-gray-300 bg-white hover:bg-black transition"
              >
                <svg
                  className="w-4 h-4 text-gray-600 group-hover:text-white transition"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M7.75 2h8.5A5.76 5.76 0 0 1 22 7.75v8.5A5.76 5.76 0 0 1 16.25 22h-8.5A5.76 5.76 0 0 1 2 16.25v-8.5A5.76 5.76 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5a4.25 4.25 0 0 0 4.25-4.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5z" />
                  <path d="M12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 1.5A3.5 3.5 0 1 0 12 15a3.5 3.5 0 0 0 0-7z" />
                  <circle cx="17.5" cy="6.5" r="1.2" />
                </svg>
              </Link>

              {/* Facebook */}
              <Link
                href="#"
                className="group w-9 h-9 flex items-center justify-center rounded-full border border-gray-300 bg-white hover:bg-black transition"
              >
                <svg
                  className="w-4 h-4 text-gray-600 group-hover:text-white transition"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M22 12a10 10 0 1 0-11.6 9.9v-7H8v-3h2.4V9.7c0-2.4 1.4-3.7 3.6-3.7 1 0 2 .2 2 .2v2.2h-1.1c-1.1 0-1.4.7-1.4 1.4V12H16l-.5 3h-2.1v7A10 10 0 0 0 22 12z" />
                </svg>
              </Link>

              {/* TikTok */}
              <Link
                href="#"
                className="group w-9 h-9 flex items-center justify-center rounded-full border border-gray-300 bg-white hover:bg-black transition"
              >
                <svg
                  className="w-4 h-4 text-gray-600 group-hover:text-white transition"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z" />
                </svg>
              </Link>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="flex justify-end gap-20">
            {/* HELP */}
            <div className="flex flex-col">
              <p className="text-[10px] uppercase tracking-[0.3em] text-black font-medium mb-3">
                Help
              </p>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/contact"
                    className="text-[10px] uppercase tracking-[0.25em] text-gray-500 hover:text-black transition"
                  >
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/faq"
                    className="text-[10px] uppercase tracking-[0.25em] text-gray-500 hover:text-black transition"
                  >
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>

            {/* PAGES */}
            <div className="flex flex-col">
              <p className="text-[10px] uppercase tracking-[0.3em] text-black font-medium mb-3">
                Pages
              </p>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/journal-folios"
                    className="text-[10px] uppercase tracking-[0.25em] text-gray-500 hover:text-black transition"
                  >
                    Journal Folios
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    className="text-[10px] uppercase tracking-[0.25em] text-gray-500 hover:text-black transition"
                  >
                    About
                  </Link>
                </li>
                
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM FOOTER (WHITE) */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-6 py-16 flex flex-col items-start justify-center gap-4">
          {/* Top line */}
          <p className="text-[10px] tracking-widest text-gray-500 text-center">
            © 2026 Atelier Ons. All Rights Reserved.
          </p>

          {/* Bottom links */}
          <div className="flex flex-wrap justify-center gap-1 text-[10px] tracking-widest text-gray-500">
            <Link className="hover:text-black transition" href="#">
              Terms
            </Link>
            |
            <Link className="hover:text-black transition" href="#">
              Privacy & Security
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
