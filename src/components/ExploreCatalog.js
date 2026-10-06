"use client";

import { useState } from "react";
import ProductCard from "@/components/ProductCard";

export default function ExploreCatalog({ products }) {
  const kategoriList = ["Semua", ...new Set(products.map((p) => p.kategori))];
  const [aktif, setAktif] = useState("Semua");

  const tampil =
    aktif === "Semua" ? products : products.filter((p) => p.kategori === aktif);

  return (
    <>
      {/* Tab kategori */}
      <nav className="mt-8 flex flex-wrap gap-6 border-b border-jruek-brown/30 pb-3">
        {kategoriList.map((k) => (
          <button
            key={k}
            onClick={() => setAktif(k)}
            className={`text-xs uppercase tracking-widest transition ${
              aktif === k
                ? "border-b border-jruek-brown font-semibold text-jruek-brown"
                : "text-jruek-brown/50 hover:text-jruek-brown"
            }`}
          >
            {k}
          </button>
        ))}
      </nav>

      {/* Ruang untuk Search (US-03) */}
      <div className="mt-6" />

      {/* Daftar bergantian kiri-kanan */}
      <section className="mx-auto mt-14 flex max-w-4xl flex-col gap-24">
        {tampil.map((produk, i) => (
          <ProductCard key={produk.id} produk={produk} index={i} />
        ))}
      </section>

      {tampil.length === 0 && (
        <p className="mt-10 text-center text-sm text-jruek-brown/60">
          Belum ada produk di kategori ini.
        </p>
      )}
    </>
  );
}