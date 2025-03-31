
export interface Shoe {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  images: string[];
  colors: string[];
  sizes: string[];
  category: 'men' | 'women' | 'unisex';
  tags: string[];
  description: string;
  details: string[];
  isNew?: boolean;
  onSale?: boolean;
}

export const shoes: Shoe[] = [
  {
    id: "1",
    name: "Air Cloud Runner",
    price: 129.99,
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      "https://images.unsplash.com/photo-1608231387042-66d1773070a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1374&q=80"
    ],
    colors: ["Red", "Black", "White"],
    sizes: ["7", "7.5", "8", "8.5", "9", "9.5", "10", "10.5", "11"],
    category: "men",
    tags: ["running", "athletic", "sneakers"],
    description: "Experience ultimate comfort with the Air Cloud Runner. These lightweight shoes feature responsive cushioning and breathable mesh upper for all-day comfort and performance.",
    details: [
      "Breathable mesh upper with synthetic overlays",
      "Responsive foam midsole for cushioning",
      "Rubber outsole for durability and traction",
      "Padded collar and tongue for added comfort",
      "Reflective details for visibility in low light"
    ],
    isNew: true
  },
  {
    id: "2",
    name: "Classic Leather Loafers",
    price: 159.99,
    images: [
      "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      "https://images.unsplash.com/photo-1531310197839-ccf54634509e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1565&q=80"
    ],
    colors: ["Black", "Brown", "Tan"],
    sizes: ["7", "7.5", "8", "8.5", "9", "9.5", "10", "10.5", "11", "11.5", "12"],
    category: "men",
    tags: ["casual", "formal", "leather"],
    description: "Step up your style with our Classic Leather Loafers. Crafted from premium leather with a timeless design that transitions seamlessly from office to evening occasions.",
    details: [
      "Premium full-grain leather upper",
      "Leather lining for breathability",
      "Cushioned footbed for comfort",
      "Flexible rubber outsole",
      "Hand-stitched detailing"
    ]
  },
  {
    id: "3",
    name: "Velocity Performance",
    price: 119.99,
    originalPrice: 149.99,
    images: [
      "https://images.unsplash.com/photo-1539185441755-769473a23570?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80",
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1364&q=80"
    ],
    colors: ["Blue", "Black", "Gray"],
    sizes: ["7", "7.5", "8", "8.5", "9", "9.5", "10", "10.5", "11"],
    category: "unisex",
    tags: ["running", "athletic", "training"],
    description: "Push your limits with the Velocity Performance shoes. Designed for serious runners with advanced cushioning technology and superior stability for both training and race day.",
    details: [
      "Engineered mesh upper for targeted support",
      "Responsive cushioning for energy return",
      "Durable rubber outsole with multi-directional traction",
      "Reinforced heel counter for stability",
      "Lightweight construction (9.5 oz for men's size 9)"
    ],
    onSale: true
  },
  {
    id: "4",
    name: "Elegant Heels",
    price: 99.99,
    images: [
      "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2680&q=80",
      "https://images.unsplash.com/photo-1536922246289-88c42f957773?ixlib=rb-4.0.3&auto=format&fit=crop&w=2504&q=80"
    ],
    colors: ["Black", "Red", "Nude"],
    sizes: ["5", "5.5", "6", "6.5", "7", "7.5", "8", "8.5", "9"],
    category: "women",
    tags: ["formal", "heels", "elegant"],
    description: "Elevate your style with our Elegant Heels. The perfect blend of comfort and sophistication, these versatile heels feature a sleek design that complements any outfit.",
    details: [
      "Soft synthetic upper with pointed toe",
      "Cushioned footbed for comfort",
      "3.5 inch stiletto heel",
      "Non-slip outsole",
      "Padded insole with arch support"
    ]
  },
  {
    id: "5",
    name: "Urban Street Style",
    price: 89.99,
    images: [
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
      "https://images.unsplash.com/photo-1604671801908-6f0c6a092c05?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80"
    ],
    colors: ["White", "Black", "Gray", "Pink"],
    sizes: ["5", "5.5", "6", "6.5", "7", "7.5", "8", "8.5", "9", "9.5", "10"],
    category: "unisex",
    tags: ["casual", "street", "trendy"],
    description: "Make a statement with our Urban Street Style shoes. These trendy sneakers combine contemporary design with comfort for the fashion-forward individual.",
    details: [
      "Canvas and synthetic leather upper",
      "Cushioned insole for all-day comfort",
      "Durable rubber outsole",
      "Padded collar and tongue",
      "Lace-up closure for a secure fit"
    ]
  },
  {
    id: "6",
    name: "Trail Blazer Hiking Boots",
    price: 149.99,
    originalPrice: 179.99,
    images: [
      "https://images.unsplash.com/photo-1520219306100-ec4afeeefe48?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1935&q=80",
      "https://images.unsplash.com/photo-1542837336-d14bdf342f9d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80"
    ],
    colors: ["Brown", "Gray", "Green"],
    sizes: ["7", "7.5", "8", "8.5", "9", "9.5", "10", "10.5", "11", "11.5", "12"],
    category: "men",
    tags: ["hiking", "outdoor", "boots"],
    description: "Conquer any trail with our Trail Blazer Hiking Boots. Designed for outdoor enthusiasts, these rugged boots offer superior traction, waterproof protection, and ankle support.",
    details: [
      "Waterproof leather and textile upper",
      "Breathable membrane to keep feet dry",
      "Cushioned EVA midsole for comfort",
      "Vibram outsole for superior traction",
      "Padded collar and tongue for ankle support"
    ],
    onSale: true
  },
  {
    id: "7",
    name: "Ballet Flats",
    price: 69.99,
    images: [
      "https://images.unsplash.com/photo-1566454419290-57a0589c9c51?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1980&q=80",
      "https://images.unsplash.com/photo-1581101767113-1677fc2beaa8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1780&q=80"
    ],
    colors: ["Black", "Nude", "Red", "Blue"],
    sizes: ["5", "5.5", "6", "6.5", "7", "7.5", "8", "8.5", "9"],
    category: "women",
    tags: ["casual", "flats", "comfortable"],
    description: "Experience all-day comfort with our Ballet Flats. These versatile shoes feature a soft, flexible design that's perfect for work, weekends, and everything in between.",
    details: [
      "Soft faux leather upper",
      "Memory foam insole for cushioning",
      "Flexible rubber outsole",
      "Elastic topline for a secure fit",
      "Rounded toe design"
    ]
  },
  {
    id: "8",
    name: "Pro Basketball Shoes",
    price: 139.99,
    images: [
      "https://images.unsplash.com/photo-1608231387042-66d1773070a5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
      "https://images.unsplash.com/photo-1605348532760-6753d2c43329?ixlib=rb-4.0.3&auto=format&fit=crop&w=1872&q=80"
    ],
    colors: ["Black/Red", "Blue/White", "Gray/Orange"],
    sizes: ["7", "7.5", "8", "8.5", "9", "9.5", "10", "10.5", "11", "11.5", "12", "12.5", "13"],
    category: "men",
    tags: ["basketball", "athletic", "sport"],
    description: "Dominate the court with our Pro Basketball Shoes. Engineered for serious players, these shoes offer superior ankle support, cushioning, and traction for explosive moves.",
    details: [
      "Synthetic leather and mesh upper for durability and breathability",
      "Zoom Air cushioning for responsive performance",
      "High-top design for ankle support",
      "Herringbone pattern outsole for multi-directional traction",
      "Reinforced toe cap for durability"
    ],
    isNew: true
  }
];

export const getShoeById = (id: string): Shoe | undefined => {
  return shoes.find(shoe => shoe.id === id);
};

export const getShoesByCategory = (category: 'men' | 'women' | 'unisex'): Shoe[] => {
  return shoes.filter(shoe => shoe.category === category);
};

export const getNewArrivals = (): Shoe[] => {
  return shoes.filter(shoe => shoe.isNew);
};

export const getSaleItems = (): Shoe[] => {
  return shoes.filter(shoe => shoe.onSale);
};
