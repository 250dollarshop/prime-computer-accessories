import { Category, Product } from '../types';

export const STORE_INFO = {
  name: 'PRIME COMPUTER ACCESSORIES',
  phone: '+923298025766',
  whatsappNumber: '923298025766',
  email: '250dollarshop@gmail.com',
  country: 'Pakistan',
  currency: 'PKR',
  address: 'Suite 14, Ground Floor, Liberty Tech Arcade, Gulberg III, Lahore, Pakistan',
  hours: 'Mon – Sat: 10:00 AM – 9:00 PM PKT',
  freeShippingThreshold: 15000,
  flatShippingFee: 250,
};

const withBase = (path: string) =>
  `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`;

export const IMG = {
  heroFlagship: withBase('src/assets/images/hero_flagship_setup_1795535178774.jpg'),
  promoPeripherals: withBase('src/assets/images/promo_gaming_peripherals_1795535178307.jpg'),
  keyboard: withBase('src/assets/images/cat_keyboard_1795535178957.jpg'),
  mouse: withBase('src/assets/images/cat_mouse_1795535180380.jpg'),
  headset: withBase('src/assets/images/cat_headset_1795535178900.jpg'),
  monitor: withBase('src/assets/images/cat_monitor_1795535180273.jpg'),
  laptopAcc: withBase('src/assets/images/cat_laptop_acc_1795535180188.jpg'),
  webcam: withBase('src/assets/images/cat_webcam_1795535180636.jpg'),
  storage: withBase('src/assets/images/cat_storage_1795535180835.jpg'),
  cablesChargers: withBase('src/assets/images/cat_cables_chargers_1795535181100.jpg'),
  gamingGear: withBase('src/assets/images/cat_gaming_gear_1795535181618.jpg'),
  networking: withBase('src/assets/images/cat_networking_1795535183406.jpg'),
};

export function formatPKR(amount: number): string {
  return `Rs. ${Math.round(amount).toLocaleString('en-PK')}`;
}

export function getDiscountPercent(price: number, oldPrice?: number): number {
  if (!oldPrice || oldPrice <= price) return 0;
  return Math.round(((oldPrice - price) / oldPrice) * 100);
}

export const CATEGORIES: Category[] = [
  {
    slug: 'keyboards',
    name: 'Keyboards',
    tagline: 'CNC aluminum & hot-swappable mechanical decks',
    image: IMG.keyboard,
  },
  {
    slug: 'mouse',
    name: 'Mouse',
    tagline: 'Sub-60g esports & ergonomic productivity sensors',
    image: IMG.mouse,
  },
  {
    slug: 'headsets',
    name: 'Headsets',
    tagline: 'Lossless 2.4GHz spatial audio & ANC headsets',
    image: IMG.headset,
  },
  {
    slug: 'monitors',
    name: 'Monitors',
    tagline: '4K OLED, Fast-IPS & ultrawide creator panels',
    image: IMG.monitor,
  },
  {
    slug: 'laptop-accessories',
    name: 'Laptop Accessories',
    tagline: 'Machined stands, Thunderbolt docks & cooling',
    image: IMG.laptopAcc,
  },
  {
    slug: 'webcams',
    name: 'Webcams',
    tagline: '4K HDR Sony STARVIS glass-lens conferencing',
    image: IMG.webcam,
  },
  {
    slug: 'storage',
    name: 'SSD / RAM / Storage',
    tagline: 'PCIe Gen4/Gen5 NVMe drives & DDR5 kits',
    image: IMG.storage,
  },
  {
    slug: 'cables-chargers',
    name: 'Cables & Chargers',
    tagline: '100W–140W GaN PD adapters & braided Thunderbolt',
    image: IMG.cablesChargers,
  },
  {
    slug: 'gaming-gear',
    name: 'Gaming Gear',
    tagline: 'Pro controllers, condenser mics & control pads',
    image: IMG.gamingGear,
  },
  {
    slug: 'networking',
    name: 'Networking',
    tagline: 'Wi-Fi 6E tri-band routers & Gigabit mesh nodes',
    image: IMG.networking,
  },
];

export const BRANDS = [
  'Logitech',
  'Razer',
  'Anker',
  'Keychron',
  'Dell',
  'Redragon',
  'HyperX',
  'Corsair',
  'Crucial',
  'TP-Link',
  'UGREEN',
  'HP',
];

export const PRODUCTS: Product[] = [
  {
    id: 'pca-kb-01',
    slug: 'keychron-q1-pro-cnc-wireless-keyboard',
    sku: 'PCA-KB-901',
    name: 'Keychron Q1 Pro CNC Wireless Mechanical Keyboard',
    brand: 'Keychron',
    category: 'keyboards',
    categoryName: 'Keyboards',
    price: 38500,
    oldPrice: 44900,
    rating: 4.9,
    reviewCount: 64,
    stock: 9,
    warranty: '1 Year Official Brand Warranty',
    isFeatured: true,
    isBestSeller: true,
    isFlashSale: true,
    variants: ['Carbon Black · Red Switch', 'Carbon Black · Banana Switch', 'Silver Grey · Brown Switch'],
    images: [IMG.keyboard, IMG.promoPeripherals, IMG.heroFlagship],
    shortDescription: 'Full 6063 CNC machined aluminum 75% QMK/VIA wireless mechanical keyboard with double-gasket mount.',
    description:
      'Engineered from solid 6063 anodized aluminum, the Keychron Q1 Pro delivers an unmistakable acoustic profile and zero-flex typing feel. Supports seamless switching across 3 Bluetooth 5.1 devices plus a 1000Hz wired USB-C connection for competitive gaming and software engineering.',
    specs: [
      { label: 'Layout', value: '75% (84 Keys + Rotary Knob)' },
      { label: 'Chassis', value: 'Full CNC Machined 6063 Aluminum' },
      { label: 'Connectivity', value: 'Bluetooth 5.1 / USB-C Wired' },
      { label: 'Keycaps', value: 'OSA Profile Double-Shot PBT' },
      { label: 'Battery', value: '4000 mAh (Up to 300 Hours)' },
      { label: 'Hot-Swappable', value: 'Yes (3-Pin & 5-Pin MX)' },
    ],
    reviews: [
      {
        id: 'r1',
        author: 'Hamza Tariq',
        city: 'Lahore',
        rating: 5,
        date: '14 Oct 2026',
        comment: 'Genuine sealed unit delivered in Lahore within 24 hours. Heavy aluminum chassis feels like a tank.',
        verified: true,
      },
      {
        id: 'r2',
        author: 'Zainab Mansoor',
        city: 'Islamabad',
        rating: 5,
        date: '02 Nov 2026',
        comment: 'Banana tactile switches are sublime for coding all day. Worth every rupee.',
        verified: true,
      },
    ],
  },
  {
    id: 'pca-kb-02',
    slug: 'logitech-mx-mechanical-mini-tactile',
    sku: 'PCA-KB-902',
    name: 'Logitech MX Mechanical Mini Wireless Illuminated',
    brand: 'Logitech',
    category: 'keyboards',
    categoryName: 'Keyboards',
    price: 32900,
    oldPrice: 36500,
    rating: 4.8,
    reviewCount: 41,
    stock: 14,
    warranty: '1 Year Official Warranty',
    isFeatured: true,
    isNewArrival: true,
    variants: ['Graphite · Tactile Quiet', 'Graphite · Linear'],
    images: [IMG.keyboard, IMG.heroFlagship],
    shortDescription: 'Low-profile tactile switches with smart proximity backlighting and 3-device Easy-Switch.',
    description:
      'Built for executives, developers, and designers who demand precision without desk clutter. Features smart hand-proximity illumination, brushed aluminum top plate, and USB-C quick charging.',
    specs: [
      { label: 'Switch Type', value: 'Low-Profile Tactile Quiet' },
      { label: 'Multi-Device', value: 'Logi Bolt + 3x Bluetooth' },
      { label: 'Battery Life', value: '15 Days Backlit / 10 Months Off' },
      { label: 'Weight', value: '612 g' },
    ],
    reviews: [
      {
        id: 'r3',
        author: 'Saad Qureshi',
        city: 'Karachi',
        rating: 5,
        date: '29 Oct 2026',
        comment: 'Switches seamlessly between my MacBook Pro and Windows workstation. Very quiet for office calls.',
        verified: true,
      },
    ],
  },
  {
    id: 'pca-kb-03',
    slug: 'redragon-k617-fizz-pro-rgb-60-wireless',
    sku: 'PCA-KB-903',
    name: 'Redragon K617 Fizz Pro 60% Tri-Mode Mechanical',
    brand: 'Redragon',
    category: 'keyboards',
    categoryName: 'Keyboards',
    price: 9499,
    oldPrice: 11800,
    rating: 4.7,
    reviewCount: 118,
    stock: 28,
    warranty: '6 Months Store Replacement Warranty',
    isBestSeller: true,
    isFlashSale: true,
    variants: ['Stealth Black · Red Switch', 'Arctic Grey · Red Switch'],
    images: [IMG.promoPeripherals, IMG.keyboard],
    shortDescription: 'Compact 60% tri-mode wireless gaming keyboard with hot-swap linear switches.',
    description:
      'Ultra-compact 61-key layout leaves maximum desk space for wide mouse swipes. Equipped with 2.4GHz low-latency wireless, Bluetooth 5.0, and detachable USB-C braided cable.',
    specs: [
      { label: 'Form Factor', value: '60% Compact (61 Keys)' },
      { label: 'Modes', value: '2.4GHz Wireless / BT 5.0 / USB-C' },
      { label: 'Switches', value: 'Custom Red Linear (Hot-Swap)' },
      { label: 'Lighting', value: '20 Preset RGB Modes' },
    ],
    reviews: [
      {
        id: 'r4',
        author: 'Bilal Ahmed',
        city: 'Rawalpindi',
        rating: 5,
        date: '09 Nov 2026',
      comment: 'Best value wireless 60% mechanical board in Pakistan. Zero latency on 2.4GHz and smooth out-of-the-box red switches.',
        verified: true,
      },
    ],
  },
];
export const TESTIMONIALS = [
  {
    id: 't1',
    name: 'Shahryar Mahmood',
    role: 'Principal Software Engineer, Systems Ltd',
    city: 'Lahore',
    quote: 'Ordered a Keychron Q1 Pro and Logitech MX Master 3S on Cash on Delivery. Both arrived factory-sealed the next afternoon with proper tax invoice and warranty card.',
    product: 'Keychron Q1 Pro + MX Master 3S',
  },
  {
    id: 't2',
    name: 'Maham Farooq',
    role: 'Senior Product Designer',
    city: 'Karachi',
    quote: 'Finally a Pakistani tech store that curates genuine Dell UltraSharp monitors and Anker GaN chargers without grey-market guesswork. WhatsApp support verified stock in 2 minutes.',
    product: 'Dell UltraSharp 27" 4K',
  },
  {
    id: 't3',
    name: 'Daniyal Cheema',
    role: 'Competitive FPS Streamer',
    city: 'Islamabad',
    quote: 'Picked up the Superlight 2 and HyperX Cloud III Wireless during the flash drop. Serial numbers registered cleanly on official portals and shipping was free.',
    product: 'Logitech G PRO X Superlight 2',
  },
  {
    id: 't4',
    name: 'Ahsan Raza Kazmi',
    role: 'Video Editor & Colorist',
    city: 'Rawalpindi',
    quote: 'Upgraded my editing rig with Crucial T700 Gen5 NVMe and Corsair DDR5 RAM. Best PKR pricing online and zero hidden fees on bank transfer.',
    product: 'Crucial T700 Pro 2TB NVMe',
  },
];

export const FAQ_ITEMS = [
  {
    q: 'Are all products at PRIME COMPUTER ACCESSORIES 100% original and sealed?',
    a: 'Yes. Every keyboard, mouse, headset, monitor, NVMe SSD, and Anker/UGREEN accessory we sell is 100% genuine, brand-new, and factory sealed. Serial numbers can be verified directly on the manufacturer portal (Logitech G Hub, Razer Synapse, Anker Verify, Crucial Storage Executive).',
  },
  {
    q: 'How does Cash on Delivery (COD) work across Pakistan?',
    a: 'We offer nationwide Cash on Delivery to over 150 cities including Karachi, Lahore, Islamabad, Rawalpindi, Faisalabad, Multan, Peshawar, and Quetta. Orders above Rs. 15,000 qualify for Free Express Delivery; orders below Rs. 15,000 carry a flat Rs. 250 courier fee.',
  },
  {
    q: 'What is your 7-Day Replacement & Warranty policy?',
    a: 'All hardware carries its official brand or store warranty (6 months to 5 years depending on the item). Additionally, if any item arrives damaged in transit or has a factory defect, we provide a hassle-free 7-day replacement guarantee.',
  },
  {
    q: 'Can I place an order directly on WhatsApp?',
    a: 'Yes! Add your items to the cart, open Checkout, and click "Order on WhatsApp" — your full cart, selected variants, total PKR amount, and delivery details are automatically formatted and sent to +923298025766.',
  },
  {
    q: 'Which payment methods do you accept?',
    a: 'You can pay via Cash on Delivery (COD), JazzCash, Easypaisa, or IBFT Bank Transfer. Digital payment account details are provided cleanly at checkout and via our official WhatsApp.',
  },
  {
    q: 'How long does delivery take?',
    a: 'Lahore same-day or next-day courier. Islamabad, Rawalpindi, Karachi, and major hubs: 1–3 working days via TCS / Leopards Express.',
  },
];

export const PAKISTAN_CITIES = [
  'Lahore',
  'Karachi',
  'Islamabad',
  'Rawalpindi',
  'Faisalabad',
  'Multan',
  'Peshawar',
  'Quetta',
  'Sialkot',
  'Gujranwala',
  'Hyderabad',
  'Bahawalpur',
  'Abbottabad',
  'Sargodha',
  'Other City',
];
