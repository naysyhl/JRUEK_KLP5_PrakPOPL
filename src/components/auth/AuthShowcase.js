import "./AuthShowcase.css";
import { authImages } from "@/data/authImages";

function Column({ items, arah }) {
  // diulang 4x supaya loop mulus dan layar tinggi tetap penuh
  const list = [...items, ...items, ...items, ...items];

  return (
    <div className="showcase-col">
      <div className={`showcase-track ${arah === "naik" ? "showcase-up" : "showcase-down"}`}>
        {list.map((item, i) => (
          <div
            key={i}
            className="showcase-card"
            style={{
              backgroundColor: item.warna,
              backgroundImage: `url(${item.src})`,
            }}
          >
            <span className="showcase-label">{item.nama}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function AuthShowcase() {
  const tengah = Math.ceil(authImages.length / 2);
  const kiri = authImages.slice(0, tengah);
  const kanan = authImages.slice(tengah);

  return (
    <div className="showcase-wrap">
      <Column items={kiri} arah="turun" />
      <Column items={kanan} arah="naik" />
    </div>
  );
}