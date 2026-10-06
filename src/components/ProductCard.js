"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function ProductCard({ produk, index = 0 }) {
  const [suka, setSuka] = useState(false);
  const kanan = index % 2 === 1;

  const harga = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(produk.harga);

  return (
    <article className="grid grid-cols-12 md:items-start">
      {/* Gambar */}
      <div
        className={`relative z-10 col-span-full aspect-[8/7] bg-jruek-yellow/20 md:col-span-5 md:row-start-1 md:mt-10 ${
          kanan ? "md:col-start-8" : "md:col-start-1"
        }`}
      >
        {produk.gambar ? (
          <Image
            src={produk.gambar}
            alt={produk.nama}
            fill
            sizes="(min-width: 768px) 40vw, 100vw"
            className="object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-6xl font-bold text-jruek-orange/60">
            {produk.nama.charAt(0)}
          </div>
        )}

        <button
          onClick={() => setSuka(!suka)}
          aria-label="Simpan ke favorit"
          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-jruek-paper/90 backdrop-blur transition hover:scale-110"
        >
          <svg
            viewBox="0 0 24 24"
            className={`h-5 w-5 ${
              suka ? "fill-jruek-orange stroke-jruek-orange" : "fill-none stroke-jruek-brown"
            }`}
            strokeWidth="1.5"
          >
            <path d="M12 21s-7-4.5-9.5-9A5.5 5.5 0 0 1 12 6a5.5 5.5 0 0 1 9.5 6c-2.5 4.5-9.5 9-9.5 9z" />
          </svg>
        </button>
      </div>

      {/* Kotak teks bergaris */}
      <div
        className={`relative col-span-full mt-4 border border-jruek-brown/50 bg-jruek-paper px-6 pb-12 pt-8 md:row-start-1 md:col-span-9 md:mt-0 md:min-h-[270px] md:pb-16 md:pt-12 ${
          kanan
            ? "md:col-start-1 md:pl-10 md:pr-[27%]"
            : "md:col-start-4 md:pl-[27%] md:pr-10"
        }`}
      >
        <p className="text-[11px] uppercase tracking-widest text-jruek-orange">
          {produk.kategori} · {produk.daerah}
        </p>
        <h3 className="mt-2 text-4xl font-extrabold uppercase leading-[1.05] tracking-wide text-jruek-brown">
          {produk.nama}
        </h3>
        <p className="mt-4 line-clamp-3 text-xs leading-relaxed text-jruek-brown/75">
          {produk.deskripsiSingkat}
        </p>
        <p className="mt-3 text-sm font-bold text-jruek-brown">{harga}</p>

        <Link
          href={`/explore/${produk.id}`}
          className={`absolute bottom-0 translate-y-1/2 bg-jruek-orange px-5 py-2.5 text-[10px] font-semibold uppercase tracking-[0.25em] text-white transition hover:bg-jruek-brown ${
            kanan ? "left-6 md:left-auto md:right-[27%]" : "left-6 md:left-[27%]"
          }`}
        >
          Lihat Detail
        </Link>
      </div>
    </article>
  );
}