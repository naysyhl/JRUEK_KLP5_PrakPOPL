"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default function AuthForm() {
  const router = useRouter();

  const [mode, setMode] = useState("masuk");
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    nama: "",
    email: "",
    password: "",
    konfirmasi: "",
    peran: "pembeli",
  });

  const isDaftar = mode === "daftar";

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function gantiMode(modeBaru) {
    setMode(modeBaru);
    setError("");
  }

  function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (isDaftar && form.password !== form.konfirmasi) {
      setError("Konfirmasi password tidak sama.");
      return;
    }

    // TODO: sambungkan ke API backend (Express.js) nanti
    console.log(mode, form);

    // Setelah login/daftar berhasil, kembali ke Home
    router.push("/");
  }

  const inputClass =
    "w-full rounded-xl border border-jruek-brown/30 bg-white px-4 py-2.5 text-jruek-brown outline-none focus:border-jruek-orange focus:ring-2 focus:ring-jruek-orange/30";

  return (
    <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-lg">
      <Link href="/" className="mb-4 flex justify-center">
        <Image
          src="/logo.png"
          alt="Logo JRUEK"
          width={200}
          height={200}
          className="h-28 w-auto"
          priority
        />
      </Link>

      <div className="mb-6 grid grid-cols-2 rounded-xl bg-jruek-cream p-1 font-semibold">
        <button
          type="button"
          onClick={() => gantiMode("masuk")}
          className={`rounded-lg py-2 ${
            !isDaftar
              ? "bg-jruek-orange text-white"
              : "text-jruek-brown"
          }`}
        >
          Masuk
        </button>

        <button
          type="button"
          onClick={() => gantiMode("daftar")}
          className={`rounded-lg py-2 ${
            isDaftar
              ? "bg-jruek-orange text-white"
              : "text-jruek-brown"
          }`}
        >
          Daftar
        </button>
      </div>

      <h1 className="mb-1 text-2xl font-bold text-jruek-brown">
        {isDaftar ? "Buat akun JRUEK" : "Selamat datang kembali"}
      </h1>

      <p className="mb-6 text-sm text-jruek-brown/70">
        {isDaftar
          ? "Daftar untuk mulai menjelajah dan membeli makanan fermentasi."
          : "Masuk untuk melanjutkan menjelajah produk fermentasi."}
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        {isDaftar && (
          <div>
            <label
              htmlFor="nama"
              className="mb-1 block text-sm font-semibold text-jruek-brown"
            >
              Nama lengkap
            </label>

            <input
              id="nama"
              name="nama"
              type="text"
              required
              value={form.nama}
              onChange={handleChange}
              className={inputClass}
            />
          </div>
        )}

        <div>
          <label
            htmlFor="email"
            className="mb-1 block text-sm font-semibold text-jruek-brown"
          >
            Email
          </label>

          <input
            id="email"
            name="email"
            type="email"
            required
            value={form.email}
            onChange={handleChange}
            className={inputClass}
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="mb-1 block text-sm font-semibold text-jruek-brown"
          >
            Password
          </label>

          <input
            id="password"
            name="password"
            type="password"
            required
            minLength={8}
            value={form.password}
            onChange={handleChange}
            className={inputClass}
          />
        </div>

        {isDaftar && (
          <>
            <div>
              <label
                htmlFor="konfirmasi"
                className="mb-1 block text-sm font-semibold text-jruek-brown"
              >
                Konfirmasi password
              </label>

              <input
                id="konfirmasi"
                name="konfirmasi"
                type="password"
                required
                minLength={8}
                value={form.konfirmasi}
                onChange={handleChange}
                className={inputClass}
              />
            </div>

            <fieldset>
              <legend className="mb-1 text-sm font-semibold text-jruek-brown">
                Daftar sebagai
              </legend>

              <div className="grid grid-cols-2 gap-3">
                {["pembeli", "penjual"].map((p) => (
                  <label
                    key={p}
                    className={`cursor-pointer rounded-xl border px-4 py-2.5 text-center font-semibold capitalize ${
                      form.peran === p
                        ? "border-jruek-orange bg-jruek-orange/10 text-jruek-orange"
                        : "border-jruek-brown/30 text-jruek-brown"
                    }`}
                  >
                    <input
                      type="radio"
                      name="peran"
                      value={p}
                      checked={form.peran === p}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    {p}
                  </label>
                ))}
              </div>
            </fieldset>
          </>
        )}

        {error && (
          <p className="text-sm font-semibold text-red-600">
            {error}
          </p>
        )}

        <button
          type="submit"
          className="w-full rounded-xl bg-jruek-orange py-3 font-bold text-white hover:bg-jruek-brown"
        >
          {isDaftar ? "Daftar" : "Masuk"}
        </button>
      </form>
    </div>
  );
}