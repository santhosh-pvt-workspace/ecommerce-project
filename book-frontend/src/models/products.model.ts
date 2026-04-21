// models/product.model.ts

export type Product = {
  id: string;
  name: string;
  image: string | null;

  price: number;
  rating: number | null;

  offerPercentage: number | null;
  promotionLabel: string | null;
  specialFor: string | null;
};