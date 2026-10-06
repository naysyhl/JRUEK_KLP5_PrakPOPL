import ExploreCatalog from "@/components/ExploreCatalog";
import { products } from "@/data/product";

export const metadata = { title: "Explore | JRUEK" };

export default function ExplorePage() {
  return (
    <main className="min-h-screen bg-jruek-cream">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <h1 className="font-serif text-5xl uppercase tracking-wide text-jruek-brown">
          Explore
        </h1>
        <p className="mt-2 text-sm text-jruek-brown/70">
          Kenali makanan fermentasi khas Nusantara sebelum membelinya.
        </p>

        <ExploreCatalog products={products} />
      </div>
    </main>
  );
}