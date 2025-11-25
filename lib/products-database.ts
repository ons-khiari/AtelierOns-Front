// Product database with stock information
export interface ProductData {
  id: string
  name: string
  price: number
  image: string
  category: string
  description: string
  details: string[]
  specifications: { label: string; value: string }[]
  images: string[]
  stock: number
  variants?: {
    name: string
    stock: number
  }[]
}

export const productsDatabase: { [key: string]: ProductData } = {
  "1": {
    id: "1",
    name: "Velvet Burgundy Journal",
    price: 45,
    image: "/luxury-burgundy-velvet-journal.jpg",
    category: "Journal Folios",
    description:
      "Indulge in the luxurious feel of our Velvet Burgundy Journal. This exquisite piece features a soft velvet cover in deep burgundy, perfect for capturing your most intimate thoughts.",
    details: [
      "Premium soft velvet cover in deep burgundy",
      "Gold foil accents and embossing",
      "Cream colored 120gsm premium paper",
      "Ribbon bookmark included",
      "Elastic closure band",
      "Perfect for daily journaling or special occasions",
    ],
    specifications: [
      { label: "Size", value: '6" x 8.5"' },
      { label: "Pages", value: "200 pages" },
      { label: "Cover Material", value: "Velvet with gold foil" },
      { label: "Paper Weight", value: "120gsm" },
      { label: "Binding", value: "Thread-sewn hardcover" },
    ],
    images: ["/luxury-burgundy-velvet-journal.jpg", "/dusty-rose-planner.jpg", "/rose-gold-planner.jpg"],
    stock: 12,
    variants: [
      { name: "Small", stock: 6 },
      { name: "Medium", stock: 6 },
    ],
  },
  "2": {
    id: "2",
    name: "Rose Gold Planner",
    price: 52,
    image: "/rose-gold-planner.jpg",
    category: "Inserts",
    description:
      "Stay elegantly organized with our Rose Gold Planner. This sophisticated monthly planner combines functionality with aesthetics.",
    details: [
      "Monthly and weekly layout options",
      "Rose gold foil stamping",
      "Soft matte cover in dusty rose",
      "Ribbon marker and elastic band",
      "Full 12-month calendar",
      "Includes goal-setting pages",
    ],
    specifications: [
      { label: "Size", value: '7" x 9"' },
      { label: "Pages", value: "256 pages" },
      { label: "Cover Material", value: "Matte finish with foil accents" },
      { label: "Layout", value: "Monthly and weekly" },
      { label: "Format", value: "Hardcover" },
    ],
    images: ["/rose-gold-planner.jpg", "/dusty-rose-planner.jpg", "/romantic-agenda.jpg"],
    stock: 3,
  },
  "3": {
    id: "3",
    name: "Midnight Pearl Pen Set",
    price: 38,
    image: "/midnight-pearl-pen-set.jpg",
    category: "Inserts",
    description:
      "Write with elegance using our Midnight Pearl Pen Set. This luxurious set includes two premium writing instruments.",
    details: [
      "Set of 2 premium pens",
      "Pearl finish with gold accents",
      "Smooth gel ink flow",
      "Comes in luxurious gift box",
      "Perfect for gifting",
      "Refillable cartridges",
    ],
    specifications: [
      { label: "Quantity", value: "2 pens" },
      { label: "Finish", value: "Pearl with gold accents" },
      { label: "Ink Type", value: "Smooth gel" },
      { label: "Packaging", value: "Gift box" },
      { label: "Refillable", value: "Yes" },
    ],
    images: ["/midnight-pearl-pen-set.jpg", "/vintage-ink-set.jpg", "/gold-bookmark-collection.jpg"],
    stock: 0,
  },
}

export function getProduct(id: string): ProductData | undefined {
  return productsDatabase[id]
}

export function getStockStatus(stock: number): "in-stock" | "low-stock" | "sold-out" {
  if (stock === 0) return "sold-out"
  if (stock < 5) return "low-stock"
  return "in-stock"
}

export function getStockMessage(stock: number): string {
  if (stock === 0) return "Sold Out"
  if (stock === 1) return "Only 1 left"
  if (stock < 5) return `Only ${stock} left`
  return "In Stock"
}
