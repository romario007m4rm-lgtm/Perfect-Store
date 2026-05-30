export interface Product {
  id: string;
  name: string;
  nameAr: string;
  category: "jewelry" | "watch" | "couture" | "ring" | "womens_dresses" | "maxi_dresses" | "mens_fashion" | "kids_fashion" | "watches" | "home_decor" | "shoes" | "crystal_decor";
  categoryAr: string;
  price: string;
  description: string;
  descriptionAr: string;
  image: string;
  details: string[];
  detailsAr: string[];
  craftsmanship: string;
  craftsmanshipAr: string;
  rarity: string;
  rarityAr: string;
  materials: string[];
  materialsAr: string[];
  story: string;
  storyAr: string;
  amazonUrl?: string;
  brand?: string;
  brandAr?: string;
  rating?: number;
  colors?: string[];
  sizes?: string[];
}

export interface CustomizationOptions {
  metalOrFabric: string;
  gemstoneOrThread: string;
  engravingOrPattern: string;
}

export interface CartItem {
  id: string;
  product: Product;
  customization?: CustomizationOptions;
  timestamp: number;
}

export interface ChatMessage {
  sender: "user" | "eye";
  text: string;
}

export interface AppointmentRequest {
  fullName: string;
  email: string;
  phone: string;
  preferredDate: string;
  preferredTime: string;
  interests: string[];
}
