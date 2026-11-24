import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import {
  AppRoute,
  CartItem,
  CategorySlug,
  CustomerDetails,
  OrderRecord,
  PaymentMethod,
  Product,
  ProductReview,
  ThemeMode,
} from '../types';
import { PRODUCTS, STORE_INFO, formatPKR } from '../data/catalog';

interface ToastMessage {
  id: string;
  text: string;
}

interface StoreContextValue {
  theme: ThemeMode;
  toggleTheme: () => void;
  route: AppRoute;
  navigate: (next: AppRoute) => void;
  cart: CartItem[];
  cartCount: number;
  subtotal: number;
  shippingFee: number;
  total: number;
  cartOpen: boolean;
  setCartOpen: (open: boolean) => void;
  addToCart: (productId: string, variant?: string, quantity?: number, openDrawer?: boolean) => void;
  updateCartQuantity: (productId: string, variant: string, quantity: number) => void;
  removeFromCart: (productId: string, variant: string) => void;
  clearCart: () => void;
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  quickViewProduct: Product | null;
  setQuickViewProduct: (product: Product | null) => void;
  orders: OrderRecord[];
  lastOrder: OrderRecord | null;
  placeOrder: (customer: CustomerDetails, paymentMethod: PaymentMethod) => OrderRecord;
  buildWhatsAppOrderUrl: (customer?: Partial<CustomerDetails>, paymentMethod?: PaymentMethod) => string;
  customReviews: Record<string, ProductReview[]>;
  addProductReview: (productId: string, review: Omit<ProductReview, 'id' | 'date' | 'verified'>) => void;
  toast: ToastMessage | null;
  showToast: (text: string) => void;
  getProductById: (id: string) => Product | undefined;
  getProductBySlug: (slug: string) => Product | undefined;
}

const StoreContext = createContext<StoreContextValue | undefined>(undefined);

const STORAGE_KEYS = {
  cart: 'prime_cart_v1',
  wishlist: 'prime_wishlist_v1',
  orders: 'prime_orders_v1',
  theme: 'prime_theme',
  reviews: 'prime_reviews_v1',
};

function safeReadStorage<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<ThemeMode>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.theme);
      return saved === 'light' ? 'light' : 'dark';
    } catch {
      return 'dark';
    }
  });

  const [route, setRoute] = useState<AppRoute>({ name: 'home' });
  const [cart, setCart] = useState<CartItem[]>(() => safeReadStorage<CartItem[]>(STORAGE_KEYS.cart, []));
  const [wishlist, setWishlist] = useState<string[]>(() => safeReadStorage<string[]>(STORAGE_KEYS.wishlist, []));
  const [orders, setOrders] = useState<OrderRecord[]>(() => safeReadStorage<OrderRecord[]>(STORAGE_KEYS.orders, []));
  const [customReviews, setCustomReviews] = useState<Record<string, ProductReview[]>>(() =>
    safeReadStorage<Record<string, ProductReview[]>>(STORAGE_KEYS.reviews, {})
  );
  const [cartOpen, setCartOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [lastOrder, setLastOrder] = useState<OrderRecord | null>(null);
  const [toast, setToast] = useState<ToastMessage | null>(null);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    try {
      localStorage.setItem(STORAGE_KEYS.theme, theme);
    } catch {
      // ignore storage quota errors
    }
  }, [theme]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.cart, JSON.stringify(cart));
    } catch {
      // ignore
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.wishlist, JSON.stringify(wishlist));
    } catch {
      // ignore
    }
  }, [wishlist]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.orders, JSON.stringify(orders));
    } catch {
      // ignore
    }
  }, [orders]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.reviews, JSON.stringify(customReviews));
    } catch {
      // ignore
    }
  }, [customReviews]);

  const showToast = (text: string) => {
    const id = `${Date.now()}`;
    setToast({ id, text });
    window.setTimeout(() => {
      setToast((prev) => (prev?.id === id ? null : prev));
    }, 2800);
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const navigate = (next: AppRoute) => {
    setRoute(next);
    setCartOpen(false);
    setQuickViewProduct(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getProductById = (id: string) => PRODUCTS.find((p) => p.id === id);
  const getProductBySlug = (slug: string) => PRODUCTS.find((p) => p.slug === slug);

  const addToCart = (
    productId: string,
    variant?: string,
    quantity = 1,
    openDrawer = true
  ) => {
    const product = getProductById(productId);
    if (!product) return;
    const chosenVariant = variant || product.variants[0] || 'Standard';

    setCart((prev) => {
      const existingIdx = prev.findIndex(
        (item) => item.productId === productId && item.variant === chosenVariant
      );
      if (existingIdx > -1) {
        const updated = [...prev];
        updated[existingIdx] = {
          ...updated[existingIdx],
          quantity: Math.min(product.stock, updated[existingIdx].quantity + quantity),
        };
        return updated;
      }
      return [...prev, { productId, variant: chosenVariant, quantity: Math.min(product.stock, quantity) }];
    });

    if (openDrawer) {
      setCartOpen(true);
    } else {
      showToast(`Added ${product.name} to cart`);
    }
  };

  const updateCartQuantity = (productId: string, variant: string, quantity: number) => {
    const product = getProductById(productId);
    const maxStock = product?.stock ?? 99;
    if (quantity <= 0) {
      removeFromCart(productId, variant);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.productId === productId && item.variant === variant
          ? { ...item, quantity: Math.min(maxStock, quantity) }
          : item
      )
    );
  };

  const removeFromCart = (productId: string, variant: string) => {
    setCart((prev) =>
      prev.filter((item) => !(item.productId === productId && item.variant === variant))
    );
  };

  const clearCart = () => setCart([]);

  const toggleWishlist = (productId: string) => {
    const product = getProductById(productId);
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast('Removed from wishlist');
        return prev.filter((id) => id !== productId);
      }
      if (product) showToast(`Saved ${product.name} to wishlist`);
      return [...prev, productId];
    });
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  const cartCount = useMemo(
    () => cart.reduce((acc, item) => acc + item.quantity, 0),
    [cart]
  );

  const subtotal = useMemo(() => {
    return cart.reduce((acc, item) => {
      const p = PRODUCTS.find((prod) => prod.id === item.productId);
      return acc + (p ? p.price * item.quantity : 0);
    }, 0);
  }, [cart]);

  const shippingFee = useMemo(() => {
    if (subtotal === 0) return 0;
    return subtotal >= STORE_INFO.freeShippingThreshold ? 0 : STORE_INFO.flatShippingFee;
  }, [subtotal]);

  const total = subtotal + shippingFee;

  const placeOrder = (customer: CustomerDetails, paymentMethod: PaymentMethod): OrderRecord => {
    const orderItems = cart
      .map((item) => {
        const prod = getProductById(item.productId);
        if (!prod) return null;
        return {
          productId: prod.id,
          name: prod.name,
          brand: prod.brand,
          variant: item.variant,
          price: prod.price,
          quantity: item.quantity,
          image: prod.images[0],
        };
      })
      .filter((x): x is NonNullable<typeof x> => x !== null);

    const newOrder: OrderRecord = {
      orderId: `PCA-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
      createdAt: new Date().toLocaleString('en-PK', {
        dateStyle: 'medium',
        timeStyle: 'short',
      }),
      items: orderItems,
      subtotal,
      shippingFee,
      total,
      paymentMethod,
      customer,
      status: 'Confirmed',
    };

    setOrders((prev) => [newOrder, ...prev]);
    setLastOrder(newOrder);
    clearCart();
    return newOrder;
  };

  const buildWhatsAppOrderUrl = (
    customer?: Partial<CustomerDetails>,
    paymentMethod?: PaymentMethod
  ): string => {
    const lines: string[] = [
      `*NEW ORDER — ${STORE_INFO.name}*`,
      '',
      '*Items:*',
    ];

    cart.forEach((item, idx) => {
      const prod = getProductById(item.productId);
      if (!prod) return;
      lines.push(
        `${idx + 1}. ${prod.name} (${item.variant}) × ${item.quantity} — ${formatPKR(
          prod.price * item.quantity
        )}`
      );
    });

    lines.push('');
    lines.push(`Subtotal: ${formatPKR(subtotal)}`);
    lines.push(`Delivery: ${shippingFee === 0 ? 'FREE' : formatPKR(shippingFee)}`);
    lines.push(`*Total Payable: ${formatPKR(total)}*`);

    if (paymentMethod) {
      lines.push(`Payment Method: ${paymentMethod}`);
    }

    if (customer && (customer.fullName || customer.phone || customer.city || customer.address)) {
      lines.push('');
      lines.push('*Customer Details:*');
      if (customer.fullName) lines.push(`Name: ${customer.fullName}`);
      if (customer.phone) lines.push(`Phone: ${customer.phone}`);
      if (customer.email) lines.push(`Email: ${customer.email}`);
      if (customer.city) lines.push(`City: ${customer.city}`);
      if (customer.address) lines.push(`Address: ${customer.address}`);
      if (customer.notes) lines.push(`Notes: ${customer.notes}`);
    }

    const encoded = encodeURIComponent(lines.join('\n'));
    return `https://wa.me/${STORE_INFO.whatsappNumber}?text=${encoded}`;
  };

  const addProductReview = (
    productId: string,
    review: Omit<ProductReview, 'id' | 'date' | 'verified'>
  ) => {
    const entry: ProductReview = {
      ...review,
      id: `rev-${Date.now()}`,
      date: new Date().toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      }),
      verified: true,
    };
    setCustomReviews((prev) => ({
      ...prev,
      [productId]: [entry, ...(prev[productId] || [])],
    }));
    showToast('Thank you! Your review has been published.');
  };

  const value: StoreContextValue = {
    theme,
    toggleTheme,
    route,
    navigate,
    cart,
    cartCount,
    subtotal,
    shippingFee,
    total,
    cartOpen,
    setCartOpen,
    addToCart,
    updateCartQuantity,
    removeFromCart,
    clearCart,
    wishlist,
    toggleWishlist,
    isInWishlist,
    quickViewProduct,
    setQuickViewProduct,
    orders,
    lastOrder,
    placeOrder,
    buildWhatsAppOrderUrl,
    customReviews,
    addProductReview,
    toast,
    showToast,
    getProductById,
    getProductBySlug,
  };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error('useStore must be used inside StoreProvider');
  return ctx;
}

export function navigateToCategory(
  navigate: (next: AppRoute) => void,
  slug: CategorySlug | 'all'
) {
  navigate({ name: 'shop', categoryFilter: slug });
}
