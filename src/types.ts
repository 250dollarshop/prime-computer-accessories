export type CategorySlug =
  | 'keyboards'
  | 'mouse'
  | 'headsets'
  | 'monitors'
  | 'laptop-accessories'
  | 'webcams'
  | 'storage'
  | 'cables-chargers'
  | 'gaming-gear'
  | 'networking';

export interface Category {
  slug: CategorySlug;
  name: string;
  tagline: string;
  image: string;
}

export interface ProductReview {
  id: string;
  author: string;
  city: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
}

export interface ProductSpec {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  slug: string;
  sku: string;
  name: string;
  brand: string;
  category: CategorySlug;
  categoryName: string;
  price: number;
  oldPrice?: number;
  rating: number;
  reviewCount: number;
  stock: number;
  warranty: string;
  isFeatured?: boolean;
  isBestSeller?: boolean;
  isNewArrival?: boolean;
  isFlashSale?: boolean;
  variants: string[];
  images: string[];
  shortDescription: string;
  description: string;
  specs: ProductSpec[];
  reviews: ProductReview[];
}

export interface CartItem {
  productId: string;
  variant: string;
  quantity: number;
}

export type PaymentMethod =
  | 'Cash on Delivery (COD)'
  | 'JazzCash'
  | 'Easypaisa'
  | 'Bank Transfer';

export interface CustomerDetails {
  fullName: string;
  phone: string;
  email: string;
  city: string;
  address: string;
  notes?: string;
}

export interface OrderRecord {
  orderId: string;
  createdAt: string;
  items: Array<{
    productId: string;
    name: string;
    brand: string;
    variant: string;
    price: number;
    quantity: number;
    image: string;
  }>;
  subtotal: number;
  shippingFee: number;
  total: number;
  paymentMethod: PaymentMethod;
  customer: CustomerDetails;
  status: 'Confirmed' | 'Dispatched' | 'Delivered';
}

export type RouteName =
  | 'home'
  | 'shop'
  | 'product'
  | 'wishlist'
  | 'checkout'
  | 'order-confirmation'
  | 'account'
  | 'about'
  | 'faq'
  | 'shipping-returns'
  | 'contact'
  | 'not-found';

export interface AppRoute {
  name: RouteName;
  param?: string;
  categoryFilter?: CategorySlug | 'all';
  collectionFilter?: 'all' | 'flash-sale' | 'best-sellers' | 'new-arrivals' | 'featured';
  brandFilter?: string;
  searchFilter?: string;
}

export type SortOption =
  | 'featured'
  | 'price-asc'
  | 'price-desc'
  | 'rating'
  | 'discount';

export type ThemeMode = 'dark' | 'light';
