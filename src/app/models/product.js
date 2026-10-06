// Model Product untuk menerapkan konsep OOP
export class Product {
  constructor(id, name, price, category, region, description, story, image) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.category = category;
    this.region = region;
    this.description = description;
    this.story = story;
    this.image = image;
  }

  // Method untuk menampilkan harga dalam format Rupiah
  getFormattedPrice() {
    return `Rp ${this.price.toLocaleString("id-ID")}`;
  }
}