import AuthForm from "@/components/auth/AuthForm";
import AuthShowcase from "@/components/auth/AuthShowcase";

export const metadata = { title: "Masuk / Daftar | JRUEK" };

export default function LoginPage() {
  return (
    <main className="grid min-h-screen lg:grid-cols-2">
      <section className="relative flex items-center justify-center overflow-hidden bg-jruek-cream px-6 py-10">
        <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-jruek-yellow/40 blur-3xl" />
        <div className="absolute -bottom-24 -right-16 h-80 w-80 rounded-full bg-jruek-orange/25 blur-3xl" />
        <div className="relative z-10 flex w-full justify-center">
          <AuthForm />
        </div>
      </section>

      <section className="hidden bg-jruek-brown lg:block">
        <div className="sticky top-0 h-screen p-4">
          <AuthShowcase />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-jruek-brown via-jruek-brown/90 to-transparent px-10 pb-10 pt-24">
            <p className="text-3xl font-bold text-jruek-cream">Kenali, jelajahi, nikmati.</p>
            <p className="mt-2 max-w-sm text-jruek-cream/80">
              Cerita di balik makanan fermentasi khas Nusantara, dari daerah asalnya sampai ke mejamu.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}