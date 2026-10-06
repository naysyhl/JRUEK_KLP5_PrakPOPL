"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SearchProduct() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    const keyword = query.trim();

    if (!keyword) {
      return;
    }

    router.push(`/search?q=${encodeURIComponent(keyword)}`);
  }

  return (
    <form onSubmit={handleSubmit} className="relative w-full">
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#632713]/45 sm:left-5 sm:h-5 sm:w-5"
        aria-hidden="true"
      >
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-3.5-3.5" />
      </svg>

      <input
        type="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Cari makanan, daerah, atau cerita..."
        className="h-11 w-full rounded-full border border-[#632713]/12 bg-white pl-11 pr-12 text-xs text-[#632713] shadow-sm outline-none transition placeholder:text-[#632713]/40 focus:border-[#EC6426] focus:ring-4 focus:ring-[#EC6426]/10 sm:h-12 sm:pl-[52px] sm:pr-16 sm:text-sm"
        aria-label="Cari produk JRUEK"
      />

      <button
        type="submit"
        className="absolute right-1 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-[#EC6426] text-white transition hover:bg-[#632713] sm:right-1.5 sm:h-9 sm:w-12"
        aria-label="Cari"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-4 w-4"
          aria-hidden="true"
        >
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.5-3.5" />
        </svg>
      </button>
    </form>
  );
}