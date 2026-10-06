"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";

import { products } from "@/data/product";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";

  const results = useMemo(() => {
    const keyword = query.toLowerCase().trim();

    if (!keyword) {
      return [];
    }

    return products.filter((product) => {
      const nama = product.nama?.toLowerCase() || "";
      const daerah = product.daerah?.toLowerCase() || "";
      const kategori = product.kategori?.toLowerCase() || "";

      return (
        nama.includes(keyword) ||
        daerah.includes(keyword) ||
        kategori.includes(keyword)
      );
    });
  }, [query]);

  return (
    <main className="min-h-screen bg-[#F7F4F0] text-[#632713]">
      {/* HEADER */}
      <header className="border-b border-[#632713]/10 bg-[#FFF8F2]">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-4 py-5 sm:px-8 lg:px-10">
          <Link
            href="/"
            className="flex items-center gap-3"
          >
            <img
              src="/logo.png"
              alt="JRUEK"
              className="h-10 w-10 object-contain"
            />

            <div>
              <p className="font-bold tracking-tight">
                JRUEK
              </p>

              <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-[#632713]/45">
                Fermentasi Nusantara
              </p>
            </div>
          </Link>

          <Link
            href="/explore"
            className="rounded-full bg-[#632713] px-5 py-2.5 text-sm font-bold text-[#FDE3CF] transition hover:bg-[#EC6426]"
          >
            Explore
          </Link>
        </div>
      </header>

      {/* CONTENT */}
      <section className="mx-auto max-w-[1400px] px-4 py-10 sm:px-8 lg:px-10">
        <div>
          <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#EC6426]">
            PENCARIAN
          </p>

          <h1 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
            Hasil pencarian
          </h1>

          {query && (
            <p className="mt-3 text-sm text-[#632713]/60">
              Menampilkan hasil untuk{" "}
              <span className="font-bold text-[#632713]">
                "{query}"
              </span>
            </p>
          )}
        </div>

        {/* HASIL */}
        {results.length > 0 ? (
          <>
            <div className="mt-8 flex items-center justify-between">
              <p className="text-sm font-semibold text-[#632713]/60">
                {results.length} produk ditemukan
              </p>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">
              {results.map((product) => (
                <Link
                  key={product.id}
                  href={`/explore/${product.id}`}
                  className="group overflow-hidden rounded-2xl bg-white shadow-[0_2px_10px_rgba(99,39,19,0.05)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(99,39,19,0.12)]"
                >
                  <div className="aspect-square overflow-hidden bg-[#FDE3CF]">
                    <img
                      src={product.gambar}
                      alt={product.nama}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  </div>

                  <div className="p-4">
                    <p className="text-xs text-[#632713]/50">
                      {product.daerah}
                    </p>

                    <h2 className="mt-1 truncate text-base font-bold group-hover:text-[#EC6426]">
                      {product.nama}
                    </h2>

                    <p className="mt-2 text-xs text-[#632713]/55">
                      {product.kategori}
                    </p>

                    <p className="mt-3 text-lg font-extrabold text-[#632713]">
                      Rp {product.harga.toLocaleString("id-ID")}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </>
        ) : (
          <div className="mt-10 rounded-3xl bg-white px-6 py-16 text-center shadow-sm">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#FDE3CF]">
              <span className="text-2xl">⌕</span>
            </div>

            <h2 className="mt-5 text-xl font-bold">
              Produk tidak ditemukan
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#632713]/60">
              Coba gunakan nama makanan, daerah, atau kategori
              yang berbeda.
            </p>

            <Link
              href="/explore"
              className="mt-6 inline-flex rounded-full bg-[#EC6426] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#632713]"
            >
              Jelajahi semua produk
            </Link>
          </div>
        )}
      </section>
    </main>
  );
}