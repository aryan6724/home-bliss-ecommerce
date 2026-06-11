export type PublicProduct = {
  _id: string;
  name: string;
  slug: string;
  category: string;
  price: number;
  image: string;
  badge: string;
  description: string;
  material: string;
  delivery: string;
  showOnHome: boolean;
  stock: number;
  isActive: boolean;
  createdAt?: string;
};

export type AdminProduct = PublicProduct;