"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";

import { products } from "@/data/product";

export default function ProductDetailPage() {
  const { id } = useParams();

  const product = products.find(
    (item) => item.id === Number(id)
  );

  if (!product) {
    return (
      <main className="min-h-screen bg-jruek-cream px-6 py-20">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="font-serif text-4xl font-bold text-jruek-brown">
            Produk tidak ditemukan
          </h1>

          <p className="mt-3 text-jruek-brown/70">
            Produk yang kamu cari tidak tersedia.
          </p>

          <Link
            href="/explore"
            className="mt-6 inline-block rounded-full bg-jruek-orange px-6 py-3 font-semibold text-white"
          >
            Kembali ke Explore
          </Link>
        </div>
      </main>
    );
  }

  return <ProductDetail product={product} />;
}

function ProductDetail({ product }) {
  const [jumlah, setJumlah] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);

  function tambahJumlah() {
    setJumlah((prev) => prev + 1);
  }

  function kurangiJumlah() {
    setJumlah((prev) => Math.max(1, prev - 1));
  }

  function tambahKeKeranjang() {
    try {
      const cart = JSON.parse(
        localStorage.getItem("jruek-cart") || "[]"
      );

      const existingProduct = cart.find(
        (item) => item.id === product.id
      );

      let updatedCart;

      if (existingProduct) {
        updatedCart = cart.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: item.quantity + jumlah,
              }
            : item
        );
      } else {
        updatedCart = [
          ...cart,
          {
            id: product.id,
            nama: product.nama,
            harga: product.harga,
            gambar: product.gambar,
            quantity: jumlah,
          },
        ];
      }

      localStorage.setItem(
        "jruek-cart",
        JSON.stringify(updatedCart)
      );

      setAddedToCart(true);

      setTimeout(() => {
        setAddedToCart(false);
      }, 2000);
    } catch (error) {
      console.error(
        "Gagal menambahkan produk ke keranjang:",
        error
      );
    }
  }

  return (
    <main className="min-h-screen bg-jruek-cream">
      {/* Breadcrumb */}
      <div className="mx-auto max-w-6xl px-6 pt-8">
        <div className="flex flex-wrap items-center gap-2 text-sm text-jruek-brown/60">
          <Link
            href="/"
            className="hover:text-jruek-orange"
          >
            Home
          </Link>

          <span>/</span>

          <Link
            href="/explore"
            className="hover:text-jruek-orange"
          >
            Explore
          </Link>

          <span>/</span>

          <span className="text-jruek-brown">
            {product.nama}
          </span>
        </div>
      </div>

      {/* Detail Produk */}
      <section className="mx-auto max-w-6xl px-6 py-10">
        <div className="grid gap-10 lg:grid-cols-2">
          {/* Gambar Produk */}
          <div className="overflow-hidden rounded-3xl bg-white shadow-sm">
            <div className="aspect-square w-full">
              <img
                src={product.gambar}
                alt={product.nama}
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          {/* Informasi Produk */}
          <div className="flex flex-col justify-center">
            <div className="mb-4 flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-jruek-orange/10 px-4 py-2 text-sm font-semibold text-jruek-orange">
                {product.kategori}
              </span>

              <span className="text-sm text-jruek-brown/60">
                {product.daerah}
              </span>
            </div>

            <h1 className="font-serif text-5xl font-bold text-jruek-brown">
              {product.nama}
            </h1>

            <p className="mt-5 text-3xl font-bold text-jruek-orange">
              Rp {product.harga.toLocaleString("id-ID")}
            </p>

            <p className="mt-5 leading-7 text-jruek-brown/75">
              {product.deskripsiSingkat}
            </p>

            {/* Favorit */}
            <button
              type="button"
              onClick={() =>
                setIsFavorite((prev) => !prev)
              }
              className="mt-6 flex w-fit items-center gap-2 text-sm font-semibold text-jruek-brown"
            >
              <span className="text-2xl">
                {isFavorite ? "♥" : "♡"}
              </span>

              {isFavorite
                ? "Ditambahkan ke favorit"
                : "Tambah ke favorit"}
            </button>

            {/* Jumlah */}
            <div className="mt-8">
              <p className="mb-3 text-sm font-semibold text-jruek-brown">
                Jumlah
              </p>

              <div className="flex w-fit items-center overflow-hidden rounded-full border border-jruek-brown/20 bg-white">
                <button
                  type="button"
                  onClick={kurangiJumlah}
                  className="px-5 py-3 text-lg hover:bg-jruek-cream"
                >
                  −
                </button>

                <span className="min-w-12 text-center font-semibold text-jruek-brown">
                  {jumlah}
                </span>

                <button
                  type="button"
                  onClick={tambahJumlah}
                  className="px-5 py-3 text-lg hover:bg-jruek-cream"
                >
                  +
                </button>
              </div>
            </div>

            {/* Keranjang */}
            <button
              type="button"
              onClick={tambahKeKeranjang}
              className="mt-6 rounded-full bg-jruek-orange px-7 py-4 font-bold text-white transition hover:opacity-90"
            >
              {addedToCart
                ? "✓ Berhasil ditambahkan"
                : "Tambah ke Keranjang"}
            </button>
          </div>
        </div>
      </section>

      {/* Cerita Produk */}
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-widest text-jruek-orange">
              Cerita Produk
            </p>

            <h2 className="mt-3 font-serif text-4xl font-bold text-jruek-brown">
              Cerita di balik {product.nama}
            </h2>

            <p className="mt-6 leading-8 text-jruek-brown/75">
              {product.deskripsiSingkat}
            </p>

            <p className="mt-4 leading-8 text-jruek-brown/75">
              {product.nama} merupakan salah satu produk
              fermentasi yang berasal dari {product.daerah}.
              Setiap daerah memiliki cara dan karakteristik
              fermentasi yang berbeda sehingga menghasilkan
              cita rasa yang khas.
            </p>
          </div>
        </div>
      </section>

      {/* Informasi */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-6 md:grid-cols-3">
          <InfoCard
            title="Asal Daerah"
            value={product.daerah}
          />

          <InfoCard
            title="Kategori"
            value={product.kategori}
          />

          <InfoCard
            title="Harga"
            value={`Rp ${product.harga.toLocaleString("id-ID")}`}
          />
        </div>
      </section>

      {/* Kembali */}
      <section className="mx-auto max-w-6xl px-6 pb-16">
        <Link
          href="/explore"
          className="inline-flex rounded-full border border-jruek-brown/20 px-6 py-3 font-semibold text-jruek-brown transition hover:bg-white"
        >
          ← Kembali ke Explore
        </Link>
      </section>
    </main>
  );
}

function InfoCard({ title, value }) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">
      <p className="text-sm text-jruek-brown/60">
        {title}
      </p>

      <p className="mt-2 text-xl font-bold text-jruek-brown">
        {value}
      </p>
    </div>
  );
}