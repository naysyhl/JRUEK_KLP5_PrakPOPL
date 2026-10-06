"use client";

import { useState } from "react";
import ProductCard from "@/components/ProductCard";

const PULAU = ["Sumatra", "Jawa", "Kalimantan", "Sulawesi", "Papua"];

const KATA_KUNCI = {
  Sumatra: ["aceh", "sumatera", "sumatra", "riau", "jambi", "bengkulu", "lampung", "bangka", "belitung", "nias", "batam"],
  Jawa: ["jawa", "jakarta", "banten", "yogyakarta", "madura"],
  Kalimantan: ["kalimantan"],
  Sulawesi: ["sulawesi", "gorontalo", "manado", "makassar", "toraja"],
  Papua: ["papua"],
};

function getPulau(daerah = "") {
  const d = daerah.toLowerCase();
  return PULAU.find((p) => KATA_KUNCI[p].some((k) => d.includes(k))) ?? "Lainnya";
}

function Chip({ aktif, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-lg border px-4 py-2 text-sm transition ${
        aktif
          ? "border-jruek-orange bg-jruek-orange/10 font-semibold text-jruek-orange"
          : "border-transparent bg-jruek-cream/60 text-jruek-brown hover:border-jruek-orange/50"
      }`}
    >
      {children}
    </button>
  );
}

export default function ExploreCatalog({ products }) {
  const kategoriList = ["Semua", ...new Set(products.map((p) => p.kategori))];
  const adaLainnya = products.some((p) => getPulau(p.daerah) === "Lainnya");
  const pulauList = ["Semua", ...PULAU, ...(adaLainnya ? ["Lainnya"] : [])];

  // Filter yang sedang berlaku
  const [kategori, setKategori] = useState("Semua");
  const [pulau, setPulau] = useState("Semua");

  // Pilihan sementara di dalam panel
  const [open, setOpen] = useState(false);
  const [draftKategori, setDraftKategori] = useState("Semua");
  const [draftPulau, setDraftPulau] = useState("Semua");

  const tampil = products.filter(
    (p) =>
      (kategori === "Semua" || p.kategori === kategori) &&
      (pulau === "Semua" || getPulau(p.daerah) === pulau)
  );

  const jumlahFilter =
    (kategori !== "Semua" ? 1 : 0) + (pulau !== "Semua" ? 1 : 0);

  function bukaPanel() {
    setDraftKategori(kategori);
    setDraftPulau(pulau);
    setOpen(true);
  }

  function terapkan() {
    setKategori(draftKategori);
    setPulau(draftPulau);
    setOpen(false);
  }

  function aturUlang() {
    setDraftKategori("Semua");
    setDraftPulau("Semua");
  }

  return (
    <>
      {/* Baris atas: jumlah produk + tombol Filter */}
      <div className="mt-8 flex items-center justify-between border-b border-jruek-brown/30 pb-3">
        <p className="text-xs text-jruek-brown/60">
          Menampilkan {tampil.length} produk
        </p>

        <button
          onClick={bukaPanel}
          className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-jruek-brown transition hover:text-jruek-orange"
        >
          <svg
            viewBox="0 0 24 24"
            className="h-4 w-4 fill-none stroke-current"
            strokeWidth="1.8"
          >
            <path d="M3 5h18l-7 8v6l-4-2v-4L3 5z" />
          </svg>
          Filter
          {jumlahFilter > 0 && (
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-jruek-orange text-[10px] text-white">
              {jumlahFilter}
            </span>
          )}
        </button>
      </div>

      {/* Chip filter yang sedang aktif */}
      {jumlahFilter > 0 && (
        <div className="mt-4 flex flex-wrap items-center gap-2">
          {kategori !== "Semua" && (
            <button
              onClick={() => setKategori("Semua")}
              className="rounded-full bg-jruek-orange/10 px-3 py-1 text-xs font-semibold text-jruek-orange"
            >
              {kategori} ✕
            </button>
          )}
          {pulau !== "Semua" && (
            <button
              onClick={() => setPulau("Semua")}
              className="rounded-full bg-jruek-orange/10 px-3 py-1 text-xs font-semibold text-jruek-orange"
            >
              {pulau} ✕
            </button>
          )}
          <button
            onClick={() => {
              setKategori("Semua");
              setPulau("Semua");
            }}
            className="ml-1 text-xs text-jruek-brown/60 underline"
          >
            Reset
          </button>
        </div>
      )}

      {/* Daftar produk */}
      <section className="mx-auto mt-10 flex max-w-4xl flex-col gap-24">
        {tampil.map((produk, i) => (
          <ProductCard key={produk.id} produk={produk} index={i} />
        ))}
      </section>

      {tampil.length === 0 && (
        <p className="mt-10 text-center text-sm text-jruek-brown/60">
          Tidak ada produk yang cocok dengan filter ini.
        </p>
      )}

      {/* Panel filter */}
      {open && (
        <div className="fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setOpen(false)}
          />

          <div className="absolute inset-x-0 bottom-0 flex max-h-[85vh] flex-col rounded-t-2xl bg-white md:inset-y-0 md:left-auto md:right-0 md:max-h-none md:w-[420px] md:rounded-none">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-jruek-brown/10 px-6 py-4">
              <h2 className="text-base font-bold text-jruek-brown">
                Pilih Filter
              </h2>
              <button
                onClick={() => setOpen(false)}
                aria-label="Tutup"
                className="text-xl text-jruek-brown/60 hover:text-jruek-brown"
              >
                ✕
              </button>
            </div>

            {/* Isi */}
            <div className="flex-1 overflow-y-auto px-6 py-5">
              <h3 className="text-sm font-bold text-jruek-brown">Kategori</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {kategoriList.map((k) => (
                  <Chip
                    key={k}
                    aktif={draftKategori === k}
                    onClick={() => setDraftKategori(k)}
                  >
                    {k}
                  </Chip>
                ))}
              </div>

              <h3 className="mt-8 text-sm font-bold text-jruek-brown">
                Asal Pulau
              </h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {pulauList.map((p) => (
                  <Chip
                    key={p}
                    aktif={draftPulau === p}
                    onClick={() => setDraftPulau(p)}
                  >
                    {p}
                  </Chip>
                ))}
              </div>
            </div>

            {/* Tombol bawah */}
            <div className="flex gap-3 border-t border-jruek-brown/10 px-6 py-4">
              <button
                onClick={aturUlang}
                className="flex-1 rounded-lg border border-jruek-orange py-3 text-sm font-semibold text-jruek-orange transition hover:bg-jruek-orange/10"
              >
                Atur Ulang
              </button>
              <button
                onClick={terapkan}
                className="flex-1 rounded-lg bg-jruek-orange py-3 text-sm font-semibold text-white transition hover:bg-jruek-brown"
              >
                Terapkan
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}