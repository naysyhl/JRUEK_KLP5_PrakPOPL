"use client";

import { useEffect, useRef, useState } from "react";

/* =====================================================
   DATA PRODUK
   Foto ditaruh di: public/foods/
   ===================================================== */

const foods = [
  {
    src: "/foods/jruek-drien.jpg",
    name: "Jruek Drien",
    origin: "Aceh",
    description:
      "Fermentasi durian khas Aceh dengan cita rasa yang unik.",
  },
  {
    src: "/foods/tapai-singkong.jpg",
    name: "Tapai Singkong",
    origin: "Jawa",
    description:
      "Olahan singkong fermentasi dengan rasa manis dan khas.",
  },
  {
    src: "/foods/tempoyak.jpg",
    name: "Tempoyak",
    origin: "Sumatra",
    description:
      "Fermentasi durian yang menjadi bagian dari kuliner Nusantara.",
  },
  {
    src: "/foods/tempe.jpg",
    name: "Tempe",
    origin: "Jawa",
    description:
      "Kedelai yang difermentasi dengan kapang, dikenal luas di seluruh Indonesia.",
  },
  {
    src: "/foods/oncom.jpg",
    name: "Oncom",
    origin: "Jawa Barat",
    description:
      "Fermentasi ampas kacang atau tahu, khas masakan Sunda.",
  },
  {
    src: "/foods/bekasam.jpg",
    name: "Bekasam",
    origin: "Sumatra Selatan",
    description:
      "Ikan yang difermentasi dengan nasi dan garam, bercita rasa asam.",
  },
  {
    src: "/foods/kecap-manis.jpg",
    name: "Kecap Manis",
    origin: "Jawa",
    description:
      "Fermentasi kedelai hitam dengan gula kelapa atau gula aren.",
  },
  {
    src: "/foods/tuak-nira.jpg",
    name: "Tuak Nira",
    origin: "Sumatra Utara",
    description:
      "Minuman tradisional dari nira yang difermentasi secara alami.",
  },
  {
    src: "/foods/peuyeum.jpg",
    name: "Peuyeum",
    origin: "Jawa Barat",
    description:
      "Tapai singkong khas Sunda dengan tekstur lembut dan rasa manis asam.",
  },
];

const regions = [...new Set(foods.map((f) => f.origin))];

/* =====================================================
   FOTO BERJALAN DI HERO
   ===================================================== */

const marqueeCols = [
  {
    items: [foods[0], foods[3], foods[6], foods[1]],
    reverse: false,
  },
  {
    items: [foods[2], foods[5], foods[8], foods[4]],
    reverse: true,
  },
];

/* =====================================================
   COMPONENT FOTO
   Kalau foto tidak ditemukan, tampil blok warna
   ===================================================== */

function Photo({ src, name, className = "" }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className={`flex items-center justify-center bg-jruek-brown/90 text-4xl font-black text-white/20 ${className}`}
        role="img"
        aria-label={name}
      >
        J
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={name}
      loading="lazy"
      onError={() => setFailed(true)}
      className={`object-cover ${className}`}
    />
  );
}

/* =====================================================
   CARD FOTO HERO
   ===================================================== */

function MarqueeCard({ food, tall }) {
  return (
    <div
      className={`relative shrink-0 overflow-hidden rounded-2xl border border-white/15 shadow-xl shadow-black/30 ${
        tall ? "h-72" : "h-52"
      }`}
    >
      <Photo
        src={food.src}
        name={food.name}
        className="h-full w-full"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

      <div className="absolute inset-x-3 bottom-3 rounded-xl border border-white/20 bg-black/30 px-3.5 py-2.5 backdrop-blur-md">
        <p className="text-sm font-semibold leading-tight text-white">
          {food.name}
        </p>

        <p className="text-xs text-white/70">
          {food.origin}
        </p>
      </div>
    </div>
  );
}

/* =====================================================
   KOLOM FOTO BERJALAN
   ===================================================== */

function MarqueeColumn({ items, reverse }) {
  const loop = [...items, ...items];

  return (
    <div className="flex-1">
      <div
        className={`flex flex-col gap-4 ${
          reverse ? "jr-down" : "jr-up"
        }`}
      >
        {loop.map((f, i) => (
          <MarqueeCard
            key={`${f.name}-${i}`}
            food={f}
            tall={(i + (reverse ? 1 : 0)) % 2 === 0}
          />
        ))}
      </div>
    </div>
  );
}

/* =====================================================
   FEATURE ROW
   Animasi muncul ketika section masuk viewport
   ===================================================== */

function FeatureRow({
  image,
  title,
  text,
  points,
  flip,
  number,
  label,
}) {
  const rowRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = rowRef.current;

    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);

          observer.unobserve(element);
        }
      },
      {
        threshold: 0.2,
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={rowRef}
      className={`
        grid items-center gap-10
        lg:grid-cols-2
        lg:gap-20
        transition-all
        duration-[1200ms]
        ease-out
        ${
          visible
            ? "translate-y-0 opacity-100"
            : "translate-y-16 opacity-0"
        }
      `}
    >
      {/* =================================================
          FOTO
          ================================================= */}

      <div
        className={`
          relative
          ${flip ? "lg:order-2" : "lg:order-1"}
        `}
      >
        {/* Glow lembut di belakang foto */}

        <div className="absolute -inset-5 rounded-[2.5rem] bg-jruek-orange/10 blur-2xl" />

        {/* Container foto */}

        <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] border border-white/40 shadow-2xl shadow-jruek-brown/15">

          <Photo
            src={image.src}
            name={image.name}
            className={`
              h-full
              w-full
              scale-105
              transition
              duration-[1600ms]
              ${visible ? "scale-100" : "scale-110"}
            `}
          />

          {/* Overlay transparan */}

          <div className="absolute inset-0 bg-gradient-to-t from-jruek-brown/65 via-transparent to-transparent" />

          {/* Overlay warna tipis */}

          <div className="absolute inset-0 bg-jruek-brown/5" />

          {/* Label kaca di bawah */}

          <div className="absolute bottom-5 left-5 right-5">

            <div className="inline-flex max-w-full items-center rounded-2xl border border-white/30 bg-white/15 px-5 py-3 text-white shadow-lg backdrop-blur-xl">

              <div>

                <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/60">
                  JRUEK
                </p>

                <p className="mt-1 text-sm font-bold md:text-base">
                  {image.name}
                </p>

              </div>

            </div>

          </div>
        </div>
      </div>


      {/* =================================================
          TEKS
          ================================================= */}

      <div
        className={`
          ${flip ? "lg:order-1" : "lg:order-2"}
          transition-all
          duration-[1400ms]
          delay-200
          ease-out
          ${
            visible
              ? "translate-x-0 opacity-100"
              : flip
                ? "-translate-x-12 opacity-0"
                : "translate-x-12 opacity-0"
          }
        `}
      >

        {/* Nomor + label */}

        <div className="mb-5 flex items-center gap-3">

          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-jruek-orange text-sm font-black text-white">
            {number}
          </span>

          <span className="text-xs font-bold uppercase tracking-[0.2em] text-jruek-orange md:text-sm">
            {label}
          </span>

        </div>


        {/* Judul */}

        <h3 className="max-w-xl text-3xl font-black leading-tight md:text-4xl lg:text-5xl">
          {title}
        </h3>


        {/* Deskripsi */}

        <p className="mt-5 max-w-lg text-base leading-8 text-jruek-brown/65 md:text-lg">
          {text}
        </p>


        {/* List */}

        <ul className="mt-7 space-y-4">

          {points.map((point) => (
            <li
              key={point}
              className="flex items-start gap-3"
            >

              <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-jruek-orange text-[10px] font-black text-white">
                ✓
              </span>

              <span className="text-sm leading-6 text-jruek-brown/75 md:text-base">
                {point}
              </span>

            </li>
          ))}

        </ul>

      </div>
    </div>
  );
}


/* =====================================================
   HOME
   ===================================================== */

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [region, setRegion] = useState("Semua");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
    };

    onScroll();

    window.addEventListener("scroll", onScroll, {
      passive: true,
    });

    return () =>
      window.removeEventListener("scroll", onScroll);
  }, []);

  const visible =
    region === "Semua"
      ? foods
      : foods.filter((f) => f.origin === region);

  return (
    <main className="min-h-screen bg-jruek-cream text-jruek-brown">

      {/* =================================================
          ANIMASI
          ================================================= */}

      <style>{`
        html {
          scroll-behavior: smooth;
        }

        /* Foto hero naik */

        @keyframes jr-up {
          from {
            transform: translateY(0);
          }

          to {
            transform: translateY(calc(-50% - 8px));
          }
        }

        /* Foto hero turun */

        @keyframes jr-down {
          from {
            transform: translateY(calc(-50% - 8px));
          }

          to {
            transform: translateY(0);
          }
        }

        .jr-up {
          animation: jr-up 40s linear infinite;
        }

        .jr-down {
          animation: jr-down 46s linear infinite;
        }

        .jr-wrap:hover .jr-up,
        .jr-wrap:hover .jr-down {
          animation-play-state: paused;
        }

        /* Fade bagian atas dan bawah foto hero */

        .jr-fade {
          -webkit-mask-image: linear-gradient(
            to bottom,
            transparent,
            #000 12%,
            #000 88%,
            transparent
          );

          mask-image: linear-gradient(
            to bottom,
            transparent,
            #000 12%,
            #000 88%,
            transparent
          );
        }

        /* Mengurangi animasi jika user mengaktifkan
           reduced motion */

        @media (prefers-reduced-motion: reduce) {
          .jr-up,
          .jr-down {
            animation: none;
          }

          html {
            scroll-behavior: auto;
          }
        }
      `}</style>


      {/* =================================================
          NAVBAR
          ================================================= */}

      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "border-b border-white/10 bg-jruek-brown/80 backdrop-blur-xl"
            : "bg-transparent"
        }`}
      >

        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">

          <a
            href="/"
            className="flex items-center gap-2.5"
          >

            {/* HANYA BAGIAN INI YANG DIGANTI DARI J MENJADI FOTO LOGO */}

            <img
              src="/logo.png"
              alt="JRUEK"
              className="h-18 w-18 rounded-lg object-contain"
            />

            <span className="text-xl font-extrabold tracking-tight text-white">
              JRUEK
            </span>
          </a>


          <div className="hidden items-center gap-9 md:flex">

            {[
              ["#home", "Beranda"],
              ["#about", "Tentang Kami"],
              ["#explore", "Explore"],
            ].map(([href, label]) => (
              <a
                key={href}
                href={href}
                className="text-sm font-medium text-white/80 transition hover:text-white"
              >
                {label}
              </a>
            ))}

          </div>


          <a
            href="/login"
            className="rounded-full bg-jruek-orange px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white hover:text-jruek-brown focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Masuk / Daftar
          </a>

        </nav>
      </header>


      {/* =================================================
          HERO
          ================================================= */}

      <section
        id="home"
        className="relative isolate overflow-hidden bg-jruek-brown text-white"
      >

        {/* Foto background */}

        <div
          className="absolute inset-0 -z-30 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('/foods/hero-bg.jpg')",
          }}
        />

        {/* Lapisan gelap */}

        <div className="absolute inset-0 -z-20 bg-black/50" />

        {/* Gradient */}

        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-jruek-brown/80 via-jruek-brown/40 to-jruek-brown/10" />

        <div className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-black/40 to-transparent" />


        <div className="mx-auto grid min-h-[100svh] max-w-7xl items-center gap-12 px-6 pb-16 pt-28 lg:grid-cols-[1fr_0.85fr] lg:px-10">

          {/* Teks */}

          <div>

            <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-sm text-white/90 backdrop-blur-md">

              <span className="h-2 w-2 rounded-full bg-jruek-yellow" />

              Jelajahi rasa Nusantara

            </p>


            <h1 className="max-w-2xl text-4xl font-extrabold leading-[1.1] tracking-tight md:text-5xl lg:text-6xl">
              Kenali rasa, cerita, dan asal makanan fermentasi Indonesia.
            </h1>


            <p className="mt-6 max-w-xl text-lg leading-8 text-white/80">
              Temukan makanan fermentasi dari berbagai daerah,
              pelajari cerita di baliknya, dan kenali kekayaan
              rasa Nusantara dalam satu tempat.
            </p>


            {/* Statistik */}

            <dl className="mt-8 flex flex-wrap gap-3">

              <div className="flex items-center gap-2.5 rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-md">

                <dt className="text-sm text-white/70">
                  Produk
                </dt>

                <dd className="text-sm font-bold">
                  {foods.length}
                </dd>

              </div>


              <div className="flex items-center gap-2.5 rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-md">

                <dt className="text-sm text-white/70">
                  Daerah asal
                </dt>

                <dd className="text-sm font-bold">
                  {regions.length}
                </dd>

              </div>

            </dl>


            {/* Tombol */}

            <div className="mt-8 flex flex-wrap gap-3">

              <a
                href="#explore"
                className="rounded-full bg-jruek-orange px-7 py-3.5 font-semibold text-white transition hover:bg-white hover:text-jruek-brown focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Jelajahi produk
              </a>


              <a
                href="#about"
                className="rounded-full border border-white/30 bg-white/10 px-7 py-3.5 font-semibold text-white backdrop-blur-md transition hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Kenali JRUEK
              </a>

            </div>

          </div>


          {/* Foto jalan otomatis */}

          <div className="jr-wrap jr-fade relative h-[480px] overflow-hidden lg:h-[700px]">

            <div className="flex gap-4">

              {marqueeCols.map((c, i) => (
                <MarqueeColumn
                  key={i}
                  {...c}
                />
              ))}

            </div>

          </div>

        </div>
      </section>


      {/* =================================================
          ABOUT / SECTION KEDUA
          SEKARANG SUDAH DIBUAT SEPERTI REFERENSI
          ================================================= */}

      <section
        id="about"
        className="relative overflow-hidden px-6 py-28 lg:px-10"
      >

        {/* Dekorasi background */}

        <div className="pointer-events-none absolute -left-40 top-40 h-96 w-96 rounded-full bg-jruek-orange/10 blur-[120px]" />

        <div className="pointer-events-none absolute -right-40 bottom-20 h-96 w-96 rounded-full bg-jruek-yellow/10 blur-[120px]" />


        <div className="relative mx-auto max-w-7xl">

          {/* =================================================
              JUDUL SECTION
              ================================================= */}

          <div className="mx-auto max-w-3xl text-center">

            <p className="text-sm font-black uppercase tracking-[0.25em] text-jruek-orange">
              Mengenal JRUEK
            </p>

            <h2 className="mt-4 text-4xl font-black leading-tight md:text-5xl lg:text-6xl">
              Lebih dari sekadar
              <br />
              makanan fermentasi.
            </h2>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-jruek-brown/55 md:text-lg md:leading-8">
              JRUEK mempertemukan produk fermentasi dari berbagai
              daerah Indonesia dengan cerita dan informasi yang
              membuat setiap produk memiliki makna.
            </p>

          </div>


          {/* =================================================
              DUA FEATURE
              ================================================= */}

          <div className="mt-24 space-y-28 lg:mt-32 lg:space-y-36">

            {/* ================= ROW 1 ================= */}

            <FeatureRow
              number="01"
              label="Kenali Asalnya"
              image={{
                src: "/foods/jruek-drien.jpg",
                name: "Jruek Drien",
              }}
              title="Kenali asal setiap rasa."
              text="Setiap produk di JRUEK datang dengan daerah dan latar belakangnya, supaya kamu tahu dari mana rasa itu berasal."
              points={[
                "Asal daerah tercantum di setiap produk",
                "Deskripsi singkat tentang bahan dan rasa",
                "Dari Aceh hingga Jawa dalam satu tempat",
              ]}
              flip={false}
            />


            {/* ================= ROW 2 ================= */}

            <FeatureRow
              number="02"
              label="Cerita Nusantara"
              image={{
                src: "/foods/tapai-singkong.jpg",
                name: "Tapai Singkong",
              }}
              title="Cerita di balik setiap fermentasi."
              text="Fermentasi adalah tradisi yang diwariskan turun-temurun. Di sini, kamu bisa mengenal prosesnya dan makna di baliknya."
              points={[
                "Bandingkan makanan fermentasi antar daerah",
                "Temukan produk yang belum pernah kamu coba",
                "Pelajari budaya kuliner Nusantara",
              ]}
              flip={true}
            />

          </div>

        </div>

      </section>


      {/* =================================================
          EXPLORE
          ================================================= */}

      <section
        id="explore"
        className="bg-white px-6 py-24 lg:px-10"
      >

        <div className="mx-auto max-w-7xl">

          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">

            <div>

              <h2 className="text-3xl font-bold md:text-5xl">
                Jelajahi produk
              </h2>

              <p className="mt-3 text-lg text-jruek-brown/70">
                Pilih daerah untuk melihat makanan fermentasi khasnya.
              </p>

            </div>


            {/* Filter daerah */}

            <div
              className="flex flex-wrap gap-2"
              role="group"
              aria-label="Filter daerah"
            >

              {["Semua", ...regions].map((r) => (

                <button
                  key={r}
                  onClick={() => setRegion(r)}
                  aria-pressed={region === r}
                  className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                    region === r
                      ? "border-jruek-orange bg-jruek-orange text-white"
                      : "border-jruek-brown/15 text-jruek-brown/70 hover:border-jruek-orange hover:text-jruek-orange"
                  }`}
                >
                  {r}
                </button>

              ))}

            </div>

          </div>


          {/* Product cards */}

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

            {visible.map((p) => (

              <article
                key={p.name}
                className="group overflow-hidden rounded-2xl border border-jruek-brown/10 bg-white transition hover:shadow-xl hover:shadow-jruek-brown/10"
              >

                <div className="relative h-56 overflow-hidden">

                  <Photo
                    src={p.src}
                    name={p.name}
                    className="h-full w-full transition duration-500 group-hover:scale-105"
                  />

                  <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-jruek-brown backdrop-blur">
                    {p.origin}
                  </span>

                </div>


                <div className="p-6">

                  <h3 className="text-xl font-bold">
                    {p.name}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-jruek-brown/65">
                    {p.description}
                  </p>

                  <button className="mt-5 text-sm font-semibold text-jruek-orange transition hover:text-jruek-brown">
                    Lihat detail
                  </button>

                </div>

              </article>

            ))}

          </div>

        </div>

      </section>


      {/* =================================================
          CTA
          ================================================= */}

      <section className="relative isolate overflow-hidden bg-jruek-brown px-6 py-24 text-center text-white lg:px-10">

        <div
          className="absolute inset-0 -z-20 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('/foods/cta-bg.jpg')",
          }}
        />

        <div className="absolute inset-0 -z-10 bg-jruek-brown/85" />


        <div className="mx-auto max-w-3xl">

          <h2 className="text-3xl font-bold md:text-5xl">
            Temukan cerita di balik setiap rasa.
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-lg leading-8 text-white/75">
            Mulai perjalananmu mengenal makanan fermentasi
            dari berbagai daerah Indonesia bersama JRUEK.
          </p>


          <a
            href="#explore"
            className="mt-9 inline-block rounded-full bg-jruek-orange px-8 py-4 font-semibold transition hover:bg-white hover:text-jruek-brown"
          >
            Mulai menjelajah
          </a>

        </div>

      </section>


      {/* =================================================
          FOOTER
          ================================================= */}

      <footer className="bg-jruek-brown px-6 pb-8 pt-16 text-white lg:px-10">

        <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[1.5fr_1fr_1fr]">

          {/* Brand */}

          <div>

            <div className="flex items-center gap-2.5">

              {/* HANYA BAGIAN INI YANG DIGANTI DARI J MENJADI FOTO LOGO */}

              <img
                src="/logo.png"
                alt="JRUEK"
                className="h-9 w-9 rounded-lg object-contain"
              />

              <span className="text-xl font-extrabold tracking-tight">
                JRUEK
              </span>

            </div>

            <p className="mt-4 max-w-sm text-sm leading-6 text-white/65">
              Kenali rasa, cerita, dan asal makanan fermentasi khas Indonesia.
            </p>

          </div>


          {/* Menu */}

          <div>

            <h4 className="font-semibold">
              Menu
            </h4>

            <ul className="mt-4 space-y-2 text-sm text-white/65">

              <li>
                <a
                  href="#home"
                  className="hover:text-white"
                >
                  Beranda
                </a>
              </li>

              <li>
                <a
                  href="#about"
                  className="hover:text-white"
                >
                  Tentang Kami
                </a>
              </li>

              <li>
                <a
                  href="#explore"
                  className="hover:text-white"
                >
                  Explore
                </a>
              </li>

            </ul>

          </div>


          {/* Daerah */}

          <div>

            <h4 className="font-semibold">
              Daerah
            </h4>

            <ul className="mt-4 space-y-2 text-sm text-white/65">

              {regions.slice(0, 4).map((r) => (
                <li key={r}>
                  {r}
                </li>
              ))}

            </ul>

          </div>

        </div>


        <div className="mx-auto mt-12 max-w-7xl border-t border-white/10 pt-6 text-sm text-white/50">
          © 2026 JRUEK. All rights reserved.
        </div>

      </footer>

    </main>
  );
}