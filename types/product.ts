import { ProductType } from './item';

export interface ProductImageDetail {
  url: string;
  title: string;
  description: string;
}

export interface Product {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  price: number;
  originalPrice?: number;
  productType: ProductType;
  features: string[];
  specs: Record<string, string>;
  imageUrl: string;
  images: string[];
  imageDetails?: ProductImageDetail[];
  rating: number;
  reviewCount: number;
  badge?: string;
  inStock: boolean;
  comingSoon?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}
