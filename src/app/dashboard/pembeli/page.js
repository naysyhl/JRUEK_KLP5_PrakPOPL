"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Bricolage_Grotesque, Figtree } from "next/font/google";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display",
});

const body = Figtree({
  subsets: ["latin"],
  variable: "--font-body",
});

const H = "font-[family-name:var(--font-display)]";

/* ==========================================================
   DATA PRODUK
========================================================== */

const products = [
  {
    id: "jruek-drien",
    name: "Jruek Drien",
    origin: "Aceh",
    price: 45000,
    sold: 120,
    rating: "4.9",
    image: "/foods/jruek-drien.jpg",
    tag: "Khas Aceh",
  },
  {
    id: "tempoyak",
    name: "Tempoyak",
    origin: "Sumatra",
    price: 38000,
    sold: 98,
    rating: "4.8",
    image: "/foods/tempoyak.jpg",
    tag: "Terpopuler",
  },
  {
    id: "bekasam",
    name: "Bekasam",
    origin: "Sumatra Selatan",
    price: 42000,
    sold: 76,
    rating: "4.8",
    image: "/foods/bekasam.jpg",
    tag: "Pilihan Baru",
  },
  {
    id: "oncom",
    name: "Oncom",
    origin: "Jawa Barat",
    price: 32000,
    sold: 154,
    rating: "4.9",
    image: "/foods/oncom.jpg",
    tag: "Favorit",
  },
  {
    id: "tempe",
    name: "Tempe",
    origin: "Jawa",
    price: 28000,
    sold: 201,
    rating: "4.9",
    image: "/foods/tempe.jpg",
    tag: "Pilihan Hemat",
  },
  {
    id: "tapai",
    name: "Tapai Singkong",
    origin: "Jawa",
    price: 25000,
    sold: 87,
    rating: "4.7",
    image: "/foods/tapai-singkong.jpg",
    tag: "Manis",
  },
];

const categories = [
  {
    name: "Semua Produk",
    icon: "grid",
  },
  {
    name: "Aceh",
    icon: "leaf",
  },
  {
    name: "Sumatra",
    icon: "mountain",
  },
  {
    name: "Jawa",
    icon: "rice",
  },
  {
    name: "Favorit",
    icon: "heart",
  },
];

const regions = [
  {
    name: "Aceh",
    description: "Rasa khas ujung barat Nusantara",
    count: "12+ produk",
    image: "/foods/jruek-drien.jpg",
  },
  {
    name: "Sumatra",
    description: "Tradisi fermentasi dari pulau Sumatra",
    count: "18+ produk",
    image: "/foods/tempoyak.jpg",
  },
  {
    name: "Jawa",
    description: "Warisan rasa dari tanah Jawa",
    count: "24+ produk",
    image: "/foods/oncom.jpg",
  },
];

const orders = [
  {
    id: "#JRK-24091",
    product: "Jruek Drien",
    date: "5 Okt 2026",
    total: 45000,
    status: "Diproses",
    image: "/foods/jruek-drien.jpg",
  },
  {
    id: "#JRK-24084",
    product: "Tempoyak",
    date: "3 Okt 2026",
    total: 38000,
    status: "Dikirim",
    image: "/foods/tempoyak.jpg",
  },
];

const rupiah = (value) =>
  "Rp" + new Intl.NumberFormat("id-ID").format(value);

/* ==========================================================
   HALAMAN DASHBOARD PEMBELI
========================================================== */

export default function DashboardPembeli() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("Semua Produk");
  const [favorites, setFavorites] = useState([]);
  const [cartCount, setCartCount] = useState(2);

  /* ========================================================
     FILTER PRODUK
  ======================================================== */

  const filteredProducts = useMemo(() => {
    const keyword = search.toLowerCase().trim();

    return products.filter((product) => {
      const searchMatch =
        product.name.toLowerCase().includes(keyword) ||
        product.origin.toLowerCase().includes(keyword);

      if (!searchMatch) {
        return false;
      }

      if (activeCategory === "Semua Produk") {
        return true;
      }

      if (activeCategory === "Favorit") {
        return favorites.includes(product.id);
      }

      return product.origin
        .toLowerCase()
        .includes(activeCategory.toLowerCase());
    });
  }, [search, activeCategory, favorites]);

  /* ========================================================
     FAVORITE
  ======================================================== */

  const toggleFavorite = (id) => {
    setFavorites((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  };

  /* ========================================================
     RESET FILTER
  ======================================================== */

  const resetFilter = () => {
    setSearch("");
    setActiveCategory("Semua Produk");
  };

  return (
    <main
      className={`${display.variable} ${body.variable} min-h-screen overflow-x-hidden bg-[#F7F4F0] font-[family-name:var(--font-body)] text-[#632713]`}
    >
      <MarketplaceHeader
        search={search}
        setSearch={setSearch}
        cartCount={cartCount}
      />

      {/* ====================================================
          QUICK CATEGORY BAR
      ==================================================== */}

      <section className="border-b border-[#632713]/8 bg-white">
        <div className="mx-auto flex max-w-[1400px] items-center gap-2 overflow-x-auto px-4 py-3 scrollbar-none sm:px-8 lg:px-10">
          {categories.map((category) => (
            <button
              key={category.name}
              type="button"
              onClick={() => setActiveCategory(category.name)}
              className={`group flex shrink-0 items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold transition sm:px-5 ${
                activeCategory === category.name
                  ? "bg-[#632713] text-[#FDE3CF] shadow-sm"
                  : "text-[#632713]/70 hover:bg-[#FDE3CF] hover:text-[#632713]"
              }`}
            >
              <CategoryIcon type={category.icon} />
              {category.name}
            </button>
          ))}
        </div>
      </section>

      <div className="mx-auto max-w-[1400px] px-4 pb-16 sm:px-8 sm:pb-20 lg:px-10">
        {/* ==================================================
            HERO MARKETPLACE
        ================================================== */}

        <section className="pt-4 sm:pt-6">
          <div className="grid gap-3 lg:grid-cols-[2fr_1fr]">
            {/* Banner utama */}

            <Link
              href="/explore"
              className="group relative min-h-[330px] overflow-hidden rounded-2xl bg-[#632713] sm:min-h-[360px]"
            >
              <img
                src="/foods/hero-bg.jpg"
                alt="Jelajah makanan fermentasi Nusantara"
                className="absolute inset-0 h-full w-full object-cover opacity-55 transition duration-700 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-r from-[#632713] via-[#632713]/75 to-transparent" />

              <div className="relative z-10 flex min-h-[330px] max-w-[650px] flex-col justify-center p-6 sm:min-h-[360px] sm:p-10 lg:p-12">
                <span className="mb-4 w-fit rounded-full bg-[#F8A91F] px-4 py-1.5 text-[10px] font-extrabold uppercase tracking-wider text-[#632713] sm:text-xs">
                  Jelajah Rasa Nusantara
                </span>

                <h1
                  className={`${H} max-w-[580px] text-3xl font-extrabold leading-[1.05] text-[#FDE3CF] sm:text-5xl`}
                >
                  Temukan rasa fermentasi dari berbagai daerah.
                </h1>

                <p className="mt-4 max-w-[470px] text-sm leading-6 text-[#FDE3CF]/80 sm:text-base">
                  Kenali makanan, asal daerah, cerita di baliknya, lalu pilih
                  yang ingin kamu bawa pulang.
                </p>

                <span className="mt-7 flex w-fit items-center gap-2 rounded-full bg-[#EC6426] px-5 py-3 text-sm font-bold text-white transition group-hover:bg-[#F8A91F] group-hover:text-[#632713] sm:px-6">
                  Mulai menjelajah
                  <IconArrow className="h-4 w-4" />
                </span>
              </div>
            </Link>

            {/* Dua banner kanan */}

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
              <PromoCard
                image="/foods/tempoyak.jpg"
                eyebrow="Paling dicari"
                title="Kenali rasa yang sedang populer"
                href="/explore"
              />

              <PromoCard
                image="/foods/oncom.jpg"
                eyebrow="Cerita Nusantara"
                title="Bukan sekadar makanan"
                href="/cerita"
              />
            </div>
          </div>
        </section>

        {/* ==================================================
            FEATURE SHORTCUT
        ================================================== */}

        <section className="mt-5 overflow-hidden rounded-2xl bg-white shadow-[0_2px_12px_rgba(99,39,19,0.04)]">
          <div className="grid grid-cols-2 divide-x divide-y divide-[#632713]/8 md:grid-cols-4 md:divide-y-0">
            <Shortcut
              icon={<IconTruck className="h-6 w-6" />}
              title="Pesanan mudah"
              text="Pantau pesananmu"
              href="/pesanan"
            />

            <Shortcut
              icon={<IconSpark className="h-6 w-6" />}
              title="Jruek AI"
              text="Cari sesuai selera"
              href="/ai"
            />

            <Shortcut
              icon={<IconMap className="h-6 w-6" />}
              title="Jelajah daerah"
              text="Temukan asal rasa"
              href="/region"
            />

            <Shortcut
              icon={<IconBook className="h-6 w-6" />}
              title="Cerita"
              text="Kenali budayanya"
              href="/cerita"
            />
          </div>
        </section>

        {/* ==================================================
            GREETING + ORDER
        ================================================== */}

        <section className="mt-7 grid gap-5 lg:grid-cols-[1.3fr_1fr]">
          <div className="rounded-2xl bg-[#FDE3CF] p-6 sm:p-8">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#EC6426]">
              Selamat datang kembali
            </p>

            <h2
              className={`${H} mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl`}
            >
              Halo, Ulya 👋
            </h2>

            <p className="mt-3 max-w-lg text-sm leading-6 text-[#632713]/70">
              Hari ini mau menemukan rasa baru dari Nusantara? Jelajahi
              berbagai makanan fermentasi favoritmu.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/explore"
                className="rounded-full bg-[#632713] px-5 py-3 text-sm font-bold text-[#FDE3CF] transition hover:bg-[#EC6426]"
              >
                Explore produk
              </Link>

              <Link
                href="/ai"
                className="rounded-full bg-white px-5 py-3 text-sm font-bold text-[#632713] ring-1 ring-[#632713]/10 transition hover:bg-[#F8A91F]"
              >
                Coba Jruek AI
              </Link>
            </div>
          </div>

          <div className="rounded-2xl bg-white p-5 shadow-[0_2px_12px_rgba(99,39,19,0.04)] sm:p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-[#632713]/45">
                  Pesanan aktif
                </p>

                <h2 className={`${H} mt-1 text-xl font-bold`}>
                  Sedang berjalan
                </h2>
              </div>

              <Link
                href="/pesanan"
                className="shrink-0 text-xs font-bold text-[#EC6426] hover:underline"
              >
                Lihat semua
              </Link>
            </div>

            <div className="mt-5 space-y-3">
              {orders.slice(0, 2).map((order) => (
                <div
                  key={order.id}
                  className="flex min-w-0 items-center gap-3 rounded-xl bg-[#F7F4F0] p-3"
                >
                  <img
                    src={order.image}
                    alt={order.product}
                    className="h-14 w-14 shrink-0 rounded-xl object-cover"
                  />

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-bold">
                      {order.product}
                    </p>

                    <p className="mt-1 text-xs text-[#632713]/50">
                      {order.id}
                    </p>
                  </div>

                  <StatusBadge status={order.status} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ==================================================
            DAERAH
        ================================================== */}

        <section className="mt-12">
          <MarketplaceHeading
            eyebrow="JELAJAHI NUSANTARA"
            title="Temukan rasa dari daerahnya"
            description="Pilih daerah dan kenali makanan fermentasi khasnya."
            href="/region"
            linkText="Lihat semua"
          />

          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {regions.map((region, index) => (
              <RegionCard
                key={region.name}
                region={region}
                featured={index === 0}
              />
            ))}
          </div>
        </section>

        {/* ==================================================
            PRODUCT MARKETPLACE
        ================================================== */}

        <section className="mt-14" id="produk">
          <MarketplaceHeading
            eyebrow="UNTUKMU"
            title="Mungkin kamu akan suka"
            description="Pilihan makanan fermentasi yang cocok untuk dijelajahi."
            href="/explore"
            linkText="Lihat semua produk"
          />

          {/* FILTER */}

          <div className="mt-5 overflow-x-auto pb-1 scrollbar-none">
            <div className="flex w-max gap-2">
              {["Semua Produk", "Aceh", "Sumatra", "Jawa", "Favorit"].map(
                (item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setActiveCategory(item)}
                    className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition ${
                      activeCategory === item
                        ? "bg-[#EC6426] text-white"
                        : "bg-white text-[#632713]/70 ring-1 ring-[#632713]/10 hover:bg-[#FDE3CF]"
                    }`}
                  >
                    {item}
                  </button>
                )
              )}
            </div>
          </div>

          {filteredProducts.length > 0 ? (
            <div className="mt-5 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
              {filteredProducts.map((product) => (
                <MarketplaceProduct
                  key={product.id}
                  product={product}
                  favorite={favorites.includes(product.id)}
                  onFavorite={() => toggleFavorite(product.id)}
                  onAdd={() => setCartCount((value) => value + 1)}
                />
              ))}
            </div>
          ) : (
            <div className="mt-5 rounded-2xl bg-white p-8 text-center sm:p-12">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#FDE3CF]">
                <IconSearch className="h-6 w-6 text-[#EC6426]" />
              </div>

              <h3 className={`${H} mt-4 text-xl font-bold`}>
                Produk tidak ditemukan
              </h3>

              <p className="mt-2 text-sm text-[#632713]/60">
                Coba cari produk atau daerah lainnya.
              </p>

              <button
                type="button"
                onClick={resetFilter}
                className="mt-5 rounded-full bg-[#632713] px-5 py-2.5 text-sm font-bold text-[#FDE3CF]"
              >
                Tampilkan semua
              </button>
            </div>
          )}
        </section>

        {/* ==================================================
            PESANAN TERBARU
        ================================================== */}

        <section className="mt-14">
          <MarketplaceHeading
            eyebrow="AKTIVITASMU"
            title="Pesanan terbaru"
            description="Pantau perjalanan pesanan yang sedang kamu tunggu."
            href="/pesanan"
            linkText="Lihat semua pesanan"
          />

          <div className="mt-5 overflow-hidden rounded-2xl bg-white shadow-[0_2px_12px_rgba(99,39,19,0.04)]">
            <div className="hidden grid-cols-[2fr_1fr_1fr_1fr_auto] border-b border-[#632713]/8 px-6 py-4 text-[11px] font-bold uppercase tracking-wider text-[#632713]/45 md:grid">
              <span>Produk</span>
              <span>Pesanan</span>
              <span>Tanggal</span>
              <span>Total</span>
              <span>Status</span>
            </div>

            {orders.map((order) => (
              <div
                key={order.id}
                className="grid gap-3 border-b border-[#632713]/8 p-4 last:border-0 sm:p-5 md:grid-cols-[2fr_1fr_1fr_1fr_auto] md:items-center md:px-6"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={order.image}
                    alt={order.product}
                    className="h-14 w-14 shrink-0 rounded-xl object-cover"
                  />

                  <div>
                    <p className="text-sm font-bold">{order.product}</p>

                    <p className="mt-1 text-xs text-[#632713]/50 md:hidden">
                      {order.id}
                    </p>
                  </div>
                </div>

                <p className="hidden text-sm md:block">{order.id}</p>

                <p className="text-xs text-[#632713]/70 sm:text-sm">
                  {order.date}
                </p>

                <p className="text-sm font-extrabold">
                  {rupiah(order.total)}
                </p>

                <StatusBadge status={order.status} />
              </div>
            ))}
          </div>
        </section>

        {/* ==================================================
            JRUEK AI
        ================================================== */}

        <section className="relative mt-14 overflow-hidden rounded-3xl bg-[#632713]">
          <div className="absolute -right-20 -top-24 h-64 w-64 rounded-full bg-[#EC6426]/30 blur-3xl" />

          <div className="absolute -bottom-32 left-1/3 h-72 w-72 rounded-full bg-[#F8A91F]/20 blur-3xl" />

          <div className="relative grid gap-8 p-7 sm:p-10 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#F8A91F] text-[#632713]">
                <IconSpark className="h-5 w-5" />
              </div>

              <p className="mt-5 text-xs font-bold uppercase tracking-[0.2em] text-[#F8A91F]">
                JRUEK AI
              </p>

              <h2
                className={`${H} mt-2 max-w-2xl text-3xl font-extrabold leading-tight text-[#FDE3CF] sm:text-4xl`}
              >
                Bingung mau coba yang mana?
              </h2>

              <p className="mt-3 max-w-xl text-sm leading-6 text-[#FDE3CF]/70">
                Ceritakan seleramu. Jruek AI akan membantu menemukan makanan
                fermentasi yang paling cocok untukmu.
              </p>
            </div>

            <Link
              href="/ai"
              className="flex h-fit w-full items-center justify-center gap-2 rounded-full bg-[#EC6426] px-7 py-3.5 text-sm font-bold text-white transition hover:bg-[#F8A91F] hover:text-[#632713] sm:w-fit"
            >
              Mulai rekomendasi
              <IconArrow className="h-4 w-4" />
            </Link>
          </div>
        </section>

        {/* ==================================================
            CERITA
        ================================================== */}

        <section className="mt-14 grid overflow-hidden rounded-3xl bg-[#FDE3CF] md:grid-cols-2">
          <div className="relative min-h-[260px] md:min-h-[320px]">
            <img
              src="/foods/tempoyak.jpg"
              alt="Cerita makanan fermentasi"
              className="absolute inset-0 h-full w-full object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#FDE3CF]/20" />
          </div>

          <div className="flex flex-col justify-center p-7 sm:p-12">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#EC6426]">
              CERITA NUSANTARA
            </p>

            <h2
              className={`${H} mt-3 text-3xl font-extrabold leading-tight sm:text-4xl`}
            >
              Di balik setiap rasa, ada cerita.
            </h2>

            <p className="mt-4 max-w-md text-sm leading-7 text-[#632713]/70">
              Kenali bagaimana makanan fermentasi dibuat, dari mana asalnya,
              dan bagaimana rasa tersebut menjadi bagian dari kehidupan
              masyarakat.
            </p>

            <Link
              href="/cerita"
              className="mt-6 flex w-fit items-center gap-2 rounded-full bg-[#632713] px-6 py-3 text-sm font-bold text-[#FDE3CF] transition hover:bg-[#EC6426]"
            >
              Baca cerita
              <IconArrow className="h-4 w-4" />
            </Link>
          </div>
        </section>

        {/* ==================================================
            FOOTER
        ================================================== */}

        <footer className="mt-14 border-t border-[#632713]/10 py-8">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
            <div className="flex items-center gap-3">
              <img
                src="/logo.png"
                alt="JRUEK"
                className="h-10 w-10 object-contain"
              />

              <div>
                <p className={`${H} text-base font-extrabold`}>JRUEK</p>

                <p className="text-xs text-[#632713]/55">
                  Kenali rasa, kenali ceritanya.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold text-[#632713]/65">
              <Link href="/tentang" className="hover:text-[#EC6426]">
                Tentang
              </Link>

              <Link href="/bantuan" className="hover:text-[#EC6426]">
                Bantuan
              </Link>

              <Link href="/cerita" className="hover:text-[#EC6426]">
                Cerita
              </Link>

              <Link href="/" className="hover:text-[#EC6426]">
                Beranda
              </Link>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}

/* ==========================================================
   HEADER MARKETPLACE
========================================================== */

function MarketplaceHeader({ search, setSearch, cartCount }) {
  return (
    <>
      {/* TOP BAR */}

      <div className="hidden bg-[#632713] text-[#FDE3CF] md:block">
        <div className="mx-auto flex h-9 max-w-[1400px] items-center justify-between px-5 text-xs sm:px-8 lg:px-10">
          <div className="flex items-center gap-5">
            <span>Fermentasi Nusantara</span>

            <span className="h-3 w-px bg-[#FDE3CF]/20" />

            <Link href="/cerita" className="hover:text-[#F8A91F]">
              Cerita Nusantara
            </Link>

            <Link href="/region" className="hover:text-[#F8A91F]">
              Jelajah Daerah
            </Link>
          </div>

          <div className="flex items-center gap-5">
            <span>Butuh bantuan?</span>

            <Link href="/bantuan" className="hover:text-[#F8A91F]">
              Pusat Bantuan
            </Link>
          </div>
        </div>
      </div>

      {/* MAIN HEADER */}

      <header className="sticky top-0 z-50 border-b border-[#632713]/8 bg-[#FFF8F2]/95 shadow-sm backdrop-blur-xl">
        <div className="mx-auto flex h-[70px] max-w-[1400px] items-center gap-3 px-4 sm:h-[76px] sm:gap-5 sm:px-8 lg:px-10">
          {/* LOGO */}

          <Link href="/" className="flex shrink-0 items-center">
            <img
              src="/logo.png"
              alt="JRUEK"
              className="h-10 w-10 object-contain sm:h-11 sm:w-11"
            />

            <div className="ml-2 hidden leading-none lg:block">
              <p className={`${H} text-xl font-extrabold tracking-tight`}>
                JRUEK
              </p>

              <p className="mt-1 text-[9px] font-semibold uppercase tracking-[0.18em] text-[#632713]/45">
                Fermentasi Nusantara
              </p>
            </div>
          </Link>

          {/* SEARCH */}

          <div className="relative min-w-0 flex-1">
            <IconSearch className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#632713]/45 sm:left-5 sm:h-5 sm:w-5" />

            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari makanan, daerah, atau cerita..."
              className="h-11 w-full rounded-full border border-[#632713]/12 bg-white pl-11 pr-12 text-xs text-[#632713] shadow-sm outline-none transition placeholder:text-[#632713]/40 focus:border-[#EC6426] focus:ring-4 focus:ring-[#EC6426]/10 sm:h-12 sm:pl-[52px] sm:pr-16 sm:text-sm"
            />

            <button
              type="button"
              className="absolute right-1 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-[#EC6426] text-white transition hover:bg-[#632713] sm:right-1.5 sm:h-9 sm:w-12"
              aria-label="Cari"
            >
              <IconSearch className="h-4 w-4" />
            </button>
          </div>

          {/* ACTIONS */}

          <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
            <Link
              href="/notifikasi"
              className="hidden h-11 w-11 items-center justify-center rounded-full bg-white text-[#632713] ring-1 ring-[#632713]/10 transition hover:bg-[#FDE3CF] sm:flex"
              aria-label="Notifikasi"
            >
              <IconBell className="h-5 w-5" />
            </Link>

            <Link
              href="/cart"
              className="relative flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#632713] ring-1 ring-[#632713]/10 transition hover:bg-[#FDE3CF] sm:h-11 sm:w-11"
              aria-label="Keranjang"
            >
              <IconBag className="h-5 w-5" />

              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#EC6426] px-1 text-[10px] font-bold text-white ring-2 ring-[#FFF8F2]">
                {cartCount}
              </span>
            </Link>

            <Link
              href="/profile"
              className="hidden items-center gap-2 rounded-full bg-[#632713] py-1 pl-1 pr-4 text-[#FDE3CF] transition hover:bg-[#EC6426] sm:flex"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#F8A91F] text-sm font-extrabold text-[#632713]">
                U
              </span>

              <span className="text-sm font-bold">Ulya</span>
            </Link>
          </div>
        </div>
      </header>
    </>
  );
}

/* ==========================================================
   PROMO CARD
========================================================== */

function PromoCard({ image, eyebrow, title, href }) {
  return (
    <Link
      href={href}
      className="group relative min-h-[145px] overflow-hidden rounded-2xl bg-[#632713]"
    >
      <img
        src={image}
        alt=""
        className="absolute inset-0 h-full w-full object-cover opacity-55 transition duration-500 group-hover:scale-105"
      />

      <div className="absolute inset-0 bg-gradient-to-r from-[#632713] via-[#632713]/70 to-transparent" />

      <div className="relative z-10 flex h-full max-w-[300px] flex-col justify-center p-6">
        <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#F8A91F]">
          {eyebrow}
        </span>

        <h3 className={`${H} mt-2 text-xl font-bold text-[#FDE3CF]`}>
          {title}
        </h3>

        <span className="mt-3 flex items-center gap-1 text-xs font-bold text-white">
          Lihat sekarang
          <IconArrow className="h-3 w-3" />
        </span>
      </div>
    </Link>
  );
}

/* ==========================================================
   SHORTCUT
========================================================== */

function Shortcut({ icon, title, text, href }) {
  return (
    <Link
      href={href}
      className="group flex min-h-[84px] items-center justify-center gap-3 px-3 py-4 transition hover:bg-[#FFF8F2] sm:px-4"
    >
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#FDE3CF] text-[#EC6426] transition group-hover:bg-[#F8A91F] group-hover:text-[#632713] sm:h-11 sm:w-11">
        {icon}
      </span>

      <div className="hidden sm:block">
        <p className="text-sm font-bold">{title}</p>

        <p className="mt-0.5 text-xs text-[#632713]/50">{text}</p>
      </div>
    </Link>
  );
}

/* ==========================================================
   REGION CARD
========================================================== */

function RegionCard({ region }) {
  return (
    <Link
      href="/region"
      className="group relative h-[270px] overflow-hidden rounded-2xl"
    >
      <img
        src={region.image}
        alt={region.name}
        className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-110"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-[#632713] via-[#632713]/35 to-transparent" />

      <div className="absolute inset-x-5 bottom-5">
        <span className="rounded-full bg-[#F8A91F] px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider text-[#632713]">
          {region.count}
        </span>

        <h3
          className={`${H} mt-3 text-2xl font-extrabold text-[#FDE3CF]`}
        >
          {region.name}
        </h3>

        <p className="mt-1 text-xs text-[#FDE3CF]/75">
          {region.description}
        </p>
      </div>

      <span className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-[#632713] opacity-0 shadow-sm transition group-hover:opacity-100">
        <IconArrow className="h-4 w-4" />
      </span>
    </Link>
  );
}

/* ==========================================================
   PRODUCT CARD
========================================================== */

function MarketplaceProduct({
  product,
  favorite,
  onFavorite,
  onAdd,
}) {
  return (
    <article className="group min-w-0 overflow-hidden rounded-2xl bg-white shadow-[0_2px_10px_rgba(99,39,19,0.05)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(99,39,19,0.12)]">
      <div className="relative aspect-square overflow-hidden bg-[#FDE3CF]">
        <Link href={`/explore/${product.id}`} className="block h-full">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        </Link>

        <span className="absolute left-2 top-2 max-w-[70%] truncate rounded-md bg-[#EC6426] px-2 py-1 text-[9px] font-bold text-white shadow-sm sm:left-3 sm:top-3 sm:px-2.5 sm:py-1">
          {product.tag}
        </span>

        <button
          type="button"
          onClick={onFavorite}
          aria-label={
            favorite
              ? `Hapus ${product.name} dari favorit`
              : `Tambah ${product.name} ke favorit`
          }
          className={`absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full shadow-sm backdrop-blur sm:right-3 sm:top-3 sm:h-9 sm:w-9 ${
            favorite
              ? "bg-[#EC6426] text-white"
              : "bg-white/90 text-[#632713]"
          }`}
        >
          <IconHeart className="h-4 w-4" filled={favorite} />
        </button>
      </div>

      <div className="p-3 sm:p-4">
        <p className="truncate text-[10px] text-[#632713]/50 sm:text-[11px]">
          {product.origin}
        </p>

        <Link href={`/explore/${product.id}`}>
          <h3
            className={`${H} mt-1 truncate text-sm font-bold transition hover:text-[#EC6426] sm:text-base`}
          >
            {product.name}
          </h3>
        </Link>

        <div className="mt-2 flex min-w-0 items-center gap-1 text-[10px] text-[#632713]/60 sm:text-xs">
          <span className="font-bold text-[#632713]">
            ★ {product.rating}
          </span>

          <span>•</span>

          <span className="truncate">{product.sold} terjual</span>
        </div>

        <div className="mt-3 flex items-center justify-between gap-2">
          <p className="truncate text-sm font-extrabold text-[#632713] sm:text-lg">
            {rupiah(product.price)}
          </p>

          <button
            type="button"
            onClick={onAdd}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#FDE3CF] text-[#632713] transition hover:bg-[#EC6426] hover:text-white sm:h-9 sm:w-9"
            aria-label={`Tambah ${product.name}`}
          >
            <IconPlus className="h-4 w-4" />
          </button>
        </div>
      </div>
    </article>
  );
}

/* ==========================================================
   HEADING
========================================================== */

function MarketplaceHeading({
  eyebrow,
  title,
  description,
  href,
  linkText,
}) {
  return (
    <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
      <div className="min-w-0">
        <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#EC6426]">
          {eyebrow}
        </p>

        <h2
          className={`${H} mt-1 text-2xl font-extrabold tracking-tight sm:text-3xl`}
        >
          {title}
        </h2>

        {description && (
          <p className="mt-1.5 max-w-2xl text-sm text-[#632713]/60">
            {description}
          </p>
        )}
      </div>

      <Link
        href={href}
        className="flex shrink-0 items-center gap-1 text-sm font-bold text-[#EC6426] hover:text-[#632713]"
      >
        {linkText}
        <IconArrow className="h-4 w-4" />
      </Link>
    </div>
  );
}

/* ==========================================================
   STATUS
========================================================== */

function StatusBadge({ status }) {
  const style =
    status === "Diproses"
      ? "bg-[#FFF0CF] text-[#9A6200]"
      : "bg-[#E5F0FF] text-[#386AA5]";

  return (
    <span
      className={`w-fit rounded-full px-3 py-1 text-[10px] font-bold ${style}`}
    >
      {status}
    </span>
  );
}

/* ==========================================================
   CATEGORY ICON
========================================================== */

function CategoryIcon({ type }) {
  if (type === "heart") {
    return <IconHeart className="h-4 w-4" />;
  }

  if (type === "leaf") {
    return <IconLeaf className="h-4 w-4" />;
  }

  if (type === "mountain") {
    return <IconMountain className="h-4 w-4" />;
  }

  if (type === "rice") {
    return <IconRice className="h-4 w-4" />;
  }

  return <IconGrid className="h-4 w-4" />;
}

/* ==========================================================
   SVG BASE
========================================================== */

function Svg({ className, children, fill = "none" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill={fill}
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

const IconSearch = ({ className }) => (
  <Svg className={className}>
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-3.5-3.5" />
  </Svg>
);

const IconBell = ({ className }) => (
  <Svg className={className}>
    <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" />
    <path d="M10 21h4" />
  </Svg>
);

const IconBag = ({ className }) => (
  <Svg className={className}>
    <path d="M5 8h14l-1 12H6L5 8Z" />
    <path d="M9 8V6a3 3 0 0 1 6 0v2" />
  </Svg>
);

const IconHeart = ({ className, filled = false }) => (
  <Svg
    className={className}
    fill={filled ? "currentColor" : "none"}
  >
    <path d="M12 20s-7-4.4-9-9a5 5 0 0 1 9-3 5 5 0 0 1 9 3c-2 4.6-9 9-9 9Z" />
  </Svg>
);

const IconPlus = ({ className }) => (
  <Svg className={className}>
    <path d="M12 5v14M5 12h14" />
  </Svg>
);

const IconArrow = ({ className }) => (
  <Svg className={className}>
    <path d="M5 12h14" />
    <path d="m13 6 6 6-6 6" />
  </Svg>
);

const IconSpark = ({ className }) => (
  <Svg className={className} fill="currentColor">
    <path d="M12 2.5 14 9l6.5 2L14 13l-2 6.5L10 13l-6.5-2L10 9l2-6.5Z" />
  </Svg>
);

const IconTruck = ({ className }) => (
  <Svg className={className}>
    <path d="M3 6h11v10H3z" />
    <path d="M14 9h4l3 3v4h-7z" />
    <circle cx="7" cy="18" r="2" />
    <circle cx="18" cy="18" r="2" />
  </Svg>
);

const IconMap = ({ className }) => (
  <Svg className={className}>
    <path d="m3 6 6-3 6 3 6-3v15l-6 3-6-3-6 3V6Z" />
    <path d="M9 3v15M15 6v15" />
  </Svg>
);

const IconBook = ({ className }) => (
  <Svg className={className}>
    <path d="M4 5a3 3 0 0 1 3-3h12v18H7a3 3 0 0 0-3 3V5Z" />
    <path d="M4 19a3 3 0 0 1 3-3h12" />
  </Svg>
);

const IconLeaf = ({ className }) => (
  <Svg className={className}>
    <path d="M20 4C11 4 5 8 5 14c0 3 2 5 5 5 6 0 10-6 10-15Z" />
    <path d="M4 21c3-6 7-9 12-11" />
  </Svg>
);

const IconMountain = ({ className }) => (
  <Svg className={className}>
    <path d="m3 19 7-12 4 7 2-3 5 8H3Z" />
    <path d="m10 7 2-3 4 7" />
  </Svg>
);

const IconRice = ({ className }) => (
  <Svg className={className}>
    <path d="M7 20h10" />
    <path d="M9 20V9a3 3 0 0 1 6 0v11" />
    <path d="M7 9h10" />
    <path d="M8 6c1-2 2-3 4-3s3 1 4 3" />
  </Svg>
);

const IconGrid = ({ className }) => (
  <Svg className={className}>
    <rect x="4" y="4" width="6" height="6" rx="1" />
    <rect x="14" y="4" width="6" height="6" rx="1" />
    <rect x="4" y="14" width="6" height="6" rx="1" />
    <rect x="14" y="14" width="6" height="6" rx="1" />
  </Svg>
);