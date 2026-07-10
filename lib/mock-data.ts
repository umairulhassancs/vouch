import { Product } from '@/types/product';
import { Review, ReviewSummary } from '@/types/review';

// ─── Products ────────────────────────────────────────────────────────────────
export const products: Product[] = [
  {
    slug: 'qr-sticker',
    name: 'QR Sticker',
    tagline: 'Stick on anything. Never lose it.',
    description:
      'The most versatile way to protect your belongings. Our ultra-thin, weatherproof QR stickers adhere to any surface — wallets, laptops, water bottles, luggage, passports, and more. No battery, no charging, no bulk. Just peel, stick, and your item is protected for life.',
    price: 199,
    originalPrice: 499,
    productType: 'sticker',
    features: [
      'Ultra-thin weatherproof design',
      'Sticks to any smooth surface',
      'No battery or charging needed',
      'UV-resistant — lasts 3+ years outdoors',
      'Pack of 3 stickers included',
      'Instant QR scan activation',
      'Privacy-safe finder contact page',
    ],
    specs: {
      'Material': 'Premium vinyl with 3M adhesive',
      'Dimensions': '45mm × 45mm × 0.2mm',
      'Water Resistance': 'IP68 rated',
      'Durability': '3+ years outdoor use',
      'Pack Size': '3 stickers per pack',
      'Weight': '< 1g per sticker',
    },
    imageUrl: '/products/qr-sticker.png',
    images: ['/products/qr-sticker.png'],
    imageDetails: [
      {
        url: '/products/qr-sticker.png',
        title: 'Universal Placement & Durability',
        description: 'An ultra-thin, scratch-resistant vinyl sticker with high-grade 3M adhesive. Designed to withstand weather, water (IP68), and heavy daily wear. Perfect for wallets, notebooks, laptops, passports, and more.',
      }
    ],
    rating: 4.7,
    reviewCount: 186,
    badge: 'Best Value',
    inStock: true,
  },
  {
    slug: 'classic-keychain',
    name: 'Classic Keychain',
    tagline: 'Your keys, always findable.',
    description:
      'The flagship Vouch product. A beautifully crafted keychain with an embedded QR code that connects your keys to you — without exposing your personal information. Premium zinc-alloy build, satisfying weight, and a QR code that scans perfectly every time. The keychain that pays for itself the first time it saves you from losing your keys.',
    price: 299,
    originalPrice: 1199,
    productType: 'classic',
    features: [
      'Premium zinc-alloy construction',
      'Laser-engraved QR code — never fades',
      'No battery or charging needed',
      'Split-ring attachment fits any keyring',
      'Elegant matte-black finish',
      'Instant owner notification on scan',
      'Privacy-first finder contact page',
    ],
    specs: {
      'Material': 'Zinc alloy with matte-black PVD coating',
      'Dimensions': '38mm × 38mm × 4mm',
      'Weight': '22g',
      'Ring Type': '25mm hardened steel split ring',
      'QR Code': 'Laser-engraved, permanent',
      'Finish': 'Matte Black',
    },
    imageUrl: '/products/classic-keychain.png',
    images: ['/products/classic-keychain.png'],
    imageDetails: [
      {
        url: '/products/classic-keychain.png',
        title: 'Premium Anodized Zinc Alloy',
        description: 'Features a heavy-duty zinc-alloy metal frame with matte-black finish and a laser-engraved QR code that will never fade or wear off over time.',
      }
    ],
    rating: 4.9,
    reviewCount: 312,
    badge: 'Flagship',
    inStock: true,
  },
  {
    slug: 'whistle-keychain',
    name: 'Whistle Keychain',
    tagline: 'Whistle and it rings back.',
    description:
      'Lost your keys somewhere at home? Just whistle. The Vouch Whistle Keychain responds to your whistle with a clear beep so you can locate it instantly — no app required, no Bluetooth pairing, no battery charging. Plus, it has the same QR code as our Classic Keychain, so if you lose it outside, anyone who finds it can reach you privately.',
    price: 1299,
    originalPrice: 1799,
    productType: 'whistle',
    features: [
      'Responds to whistle — no app needed',
      'Built-in speaker with 90dB beep',
      'No Bluetooth pairing required',
      'Embedded QR code for lost-item recovery',
      'Coin-cell battery lasts 12+ months',
      'Water-resistant housing',
      'Most unique product in the lineup',
    ],
    specs: {
      'Material': 'ABS plastic with soft-touch coating',
      'Dimensions': '52mm × 30mm × 12mm',
      'Weight': '15g (with battery)',
      'Battery': 'CR2032 coin cell (included, replaceable)',
      'Battery Life': '12+ months typical use',
      'Speaker': '90dB piezo buzzer',
      'Water Resistance': 'IPX4 splash-proof',
    },
    imageUrl: '/products/whistle-1.png',
    images: [
      '/products/whistle-1.png',
      '/products/whistle-2.png',
      '/products/whistle-3.png',
      '/products/whistle-4.png',
      '/products/whistle-5.png',
    ],
    imageDetails: [
      {
        url: '/products/whistle-1.png',
        title: 'Whistle to Locate',
        description: 'A built-in microphone listens for a sharp whistle, triggering the 90dB loud beep alarm immediately so you can find your keys in any room.',
      },
      {
        url: '/products/whistle-2.png',
        title: 'Dual-Action QR Code',
        description: 'Includes the permanent laser-engraved QR code on the back. If you lose it outside, a finder can scan it to get in touch with you anonymously.',
      },
      {
        url: '/products/whistle-3.png',
        title: 'Premium Matte Soft-Touch Housing',
        description: 'Constructed from premium impact-resistant ABS plastic with a soft-touch texture that is comfortable to hold and scratch-resistant.',
      },
      {
        url: '/products/whistle-4.png',
        title: 'Replaceable CR2032 Coin-Cell Battery',
        description: 'Powered by a standard, easily replaceable CR2032 battery that lasts up to 12+ months under daily use. No charging cords required.',
      },
      {
        url: '/products/whistle-5.png',
        title: 'Splash-Proof Construction',
        description: 'An IPX4 weather-resistant rating guarantees the whistle keychain functions normally in rainy weather or after accidental water splashes.',
      }
    ],
    rating: 4.8,
    reviewCount: 147,
    badge: 'Most Unique',
    inStock: true,
  },
  {
    slug: 'gps-ring-keychain',
    name: 'GPS Ring Keychain',
    tagline: 'Track, ring, and recover.',
    description:
      'The ultimate Vouch product. Combines a Bluetooth alarm (ring it from the app or website), real-time GPS tracking, and the same QR code system that powers our entire lineup. When you misplace your keys at home, ring the keychain. When you lose them outside, track their last known location on a map. And if a stranger finds them, the QR code connects them to you privately.',
    price: 2999,
    originalPrice: 3499,
    productType: 'gps',
    features: [
      'Bluetooth alarm — ring from app or website',
      'GPS tracking with live map view',
      'QR code for stranger-powered recovery',
      'Rechargeable battery — lasts 2 months',
      'USB-C fast charging (30 min to full)',
      'Separation alert when you walk away',
      'Track via the Vouch dashboard',
    ],
    specs: {
      'Material': 'Anodized aluminum + polycarbonate',
      'Dimensions': '42mm × 42mm × 9mm',
      'Weight': '28g',
      'Connectivity': 'Bluetooth 5.2 + GPS',
      'Battery': '200mAh rechargeable Li-Po',
      'Battery Life': '~60 days (2 months)',
      'Charging': 'USB-C, 30 min full charge',
      'Speaker': '95dB buzzer',
      'Range': '100m Bluetooth / unlimited GPS',
    },
    imageUrl: '/products/gps-1.png',
    images: [
      '/products/gps-1.png',
      '/products/gps-2.png',
      '/products/gps-3.png',
    ],
    imageDetails: [
      {
        url: '/products/gps-1.png',
        title: 'Real-Time GPS Tracking',
        description: 'Embeds a real-time GPS module so you can check your keychain\'s exact location on a map inside the Vouch Dashboard.',
      },
      {
        url: '/products/gps-2.png',
        title: 'Supercharged 2-Month Battery Life',
        description: 'Equipped with an advanced power-saving chipset providing up to 2 months (60 days) of battery life on a single charge. Rechargeable via USB-C.',
      },
      {
        url: '/products/gps-3.png',
        title: '95dB Loud Ring & Separation Alert',
        description: 'Features a high-pitch buzzer you can trigger remotely. It also sounds an automatic warning alert on your phone if you walk away and leave your keys behind.',
      }
    ],
    rating: 4.9,
    reviewCount: 89,
    badge: 'Premium',
    inStock: true,
  },
];

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

// ─── Reviews ─────────────────────────────────────────────────────────────────
export const mockReviews: Review[] = [
  {
    reviewId: 'r1',
    productSlug: 'classic-keychain',
    createdAt: '2025-06-15T10:30:00Z',
    reviewerName: 'Ahmed Raza',
    rating: 5,
    text: 'Bought this for my car keys and it saved me within the first week. Someone found my keys at a mall and scanned the QR code — I got the notification instantly. Build quality is excellent, feels premium in hand.',
    verifiedPurchase: true,
  },
  {
    reviewId: 'r2',
    productSlug: 'qr-sticker',
    createdAt: '2025-06-10T14:20:00Z',
    reviewerName: 'Sara Khan',
    rating: 5,
    text: 'I stuck these on my laptop, wallet, and passport case. The stickers are incredibly thin — you barely notice them. Peace of mind for Rs. 199 is a no-brainer.',
    verifiedPurchase: true,
  },
  {
    reviewId: 'r3',
    productSlug: 'whistle-keychain',
    createdAt: '2025-05-28T09:15:00Z',
    reviewerName: 'Bilal Hussain',
    rating: 5,
    text: 'The whistle feature is genuinely magical. I lose my keys in my apartment almost daily and this thing responds every time. The QR code is a bonus — it is like having two products in one.',
    verifiedPurchase: true,
  },
  {
    reviewId: 'r4',
    productSlug: 'gps-ring-keychain',
    createdAt: '2025-06-01T16:45:00Z',
    reviewerName: 'Fatima Noor',
    rating: 5,
    text: 'The GPS tracking is a game-changer. Left my bag at a restaurant and tracked it right on the map. The ring feature is also super loud. Worth every rupee of the premium price.',
    verifiedPurchase: true,
  },
  {
    reviewId: 'r5',
    productSlug: 'classic-keychain',
    createdAt: '2025-05-20T11:00:00Z',
    reviewerName: 'Usman Ali',
    rating: 4,
    text: 'Great build quality and the QR system works flawlessly. Only reason for 4 stars is I wish it came in more colors. But functionally, it is perfect.',
    verifiedPurchase: true,
  },
  {
    reviewId: 'r6',
    productSlug: 'qr-sticker',
    createdAt: '2025-06-05T08:30:00Z',
    reviewerName: 'Ayesha Malik',
    rating: 5,
    text: 'Ordered a pack for my family. Everyone loves them. My mom stuck one on her reading glasses case and my dad put one inside his wallet. Simple but genius idea.',
    verifiedPurchase: true,
  },
  {
    reviewId: 'r7',
    productSlug: 'whistle-keychain',
    createdAt: '2025-05-15T13:10:00Z',
    reviewerName: 'Hassan Javed',
    rating: 4,
    text: 'Works great with a sharp whistle. Sometimes it picks up other loud sounds but the QR part works perfectly. My wife got one too after seeing mine.',
    verifiedPurchase: true,
  },
  {
    reviewId: 'r8',
    productSlug: 'gps-ring-keychain',
    createdAt: '2025-06-08T19:20:00Z',
    reviewerName: 'Zainab Sheikh',
    rating: 5,
    text: 'I was skeptical about the battery life claims but it actually lasted 16 days on a single charge. The separation alert saved me twice already — it beeps when I walk away from my bag.',
    verifiedPurchase: true,
  },
  {
    reviewId: 'r9',
    productSlug: 'classic-keychain',
    createdAt: '2025-04-30T07:50:00Z',
    reviewerName: 'Omar Farooq',
    rating: 5,
    text: 'Bought 5 of these for our office. Every team member has one for the office keys. The notification system means we always know when someone scans a key — incredibly useful for a shared workspace.',
    verifiedPurchase: true,
  },
];

export const aggregateReviewSummary: ReviewSummary = {
  averageRating: 4.8,
  totalReviews: 320,
  distribution: {
    5: 248,
    4: 51,
    3: 14,
    2: 5,
    1: 2,
  },
};

export function getReviewsForProduct(slug: string): Review[] {
  return mockReviews.filter((r) => r.productSlug === slug);
}

// ─── Subscription Plans ──────────────────────────────────────────────────────
export interface PricingPlan {
  name: string;
  monthlyPrice: number;
  annualPrice: number;
  description: string;
  features: string[];
  highlighted?: boolean;
  badge?: string;
  cta: string;
}

export const pricingPlans: PricingPlan[] = [
  {
    name: 'Free',
    monthlyPrice: 0,
    annualPrice: 0,
    description: 'Perfect for getting started with one item.',
    features: [
      'Up to 1 item',
      'QR scan notifications',
      'Basic finder contact page',
      'Email notifications only',
      'Scan history (7 days)',
    ],
    cta: 'Get Started Free',
  },
  {
    name: 'Standard',
    monthlyPrice: 199,
    annualPrice: 159,
    description: 'For individuals who need to protect more items.',
    features: [
      'Up to 5 items',
      'QR scan notifications',
      'Custom finder messages',
      'Email + push notifications',
      'Scan history (30 days)',
      'Masked calling',
      'Emergency contact info',
    ],
    cta: 'Start Standard',
  },
  {
    name: 'Premium',
    monthlyPrice: 499,
    annualPrice: 399,
    description: 'Full power for families and heavy travelers.',
    features: [
      'Up to 20 items',
      'Everything in Standard',
      'SMS notifications',
      'GPS tracking (for GPS products)',
      'Scan history (unlimited)',
      'Priority support',
      'Custom QR code designs',
      'Family sharing (up to 4)',
    ],
    highlighted: true,
    badge: 'Most Popular',
    cta: 'Go Premium',
  },
  {
    name: 'Business',
    monthlyPrice: 1499,
    annualPrice: 1199,
    description: 'For organizations managing assets at scale.',
    features: [
      'Unlimited items',
      'Everything in Premium',
      'Team management dashboard',
      'Bulk QR generation',
      'API access',
      'Custom branding',
      'Dedicated account manager',
      'SLA guarantee',
    ],
    cta: 'Contact Sales',
  },
];

// ─── FAQ ──────────────────────────────────────────────────────────────────────
export interface FAQItem {
  question: string;
  answer: string;
}

export const faqItems: FAQItem[] = [
  {
    question: 'How does Vouch protect my privacy?',
    answer:
      'When someone scans your QR code, they see a contact page — not your personal information. Your real name, phone number, and email are never shared. The finder can send you a message or make a masked call, and you decide how to respond.',
  },
  {
    question: 'Do I need the app to use Vouch?',
    answer:
      'No. The finder does not need any app — they just scan the QR code with their phone camera. As an owner, you manage everything through the web dashboard at vouch.pk. No app download required for either party.',
  },
  {
    question: 'What if someone scans my QR code with bad intentions?',
    answer:
      'Every scan is logged with a timestamp and approximate location. The finder never sees your real contact details. You are always in control of what information is shared and can disable the QR code at any time from your dashboard.',
  },
  {
    question: 'How long do the products last?',
    answer:
      'QR Stickers last 3+ years even outdoors. The Classic Keychain is built from zinc alloy with a laser-engraved QR that never fades. The Whistle Keychain battery lasts 12+ months and is replaceable. The GPS Ring Keychain lasts ~2 months per charge with USB-C fast charging.',
  },
  {
    question: 'Is Cash on Delivery really the only payment option?',
    answer:
      'Yes, for now. We want to make ordering as friction-free as possible. Place your order, and pay cash when it arrives at your door. Free shipping on orders over Rs. 2,000.',
  },
  {
    question: 'Can I change my subscription plan later?',
    answer:
      'Absolutely. You can upgrade or downgrade your plan at any time from your dashboard. If you upgrade mid-cycle, you will be charged the prorated difference. If you downgrade, the change takes effect at the next billing cycle.',
  },
  {
    question: 'What happens if I lose the QR sticker or keychain itself?',
    answer:
      'If your Vouch product is found and scanned, you get notified — just like any other lost item. You can also deactivate the QR code from your dashboard and activate a new one as a replacement.',
  },
];

// ─── Stats ────────────────────────────────────────────────────────────────────
export const heroStats = [
  { label: 'Items Protected', value: 10000, suffix: '+' },
  { label: 'Recovery Rate', value: 98, suffix: '%' },
  { label: 'Average Rating', value: 4.9, suffix: '★' },
];

// ─── How It Works Steps ──────────────────────────────────────────────────────
export const howItWorksSteps = [
  {
    step: '01',
    title: 'Attach Your Vouch',
    description:
      'Stick a QR sticker or clip a keychain to your valuable item — wallet, keys, backpack, laptop, anything you care about.',
  },
  {
    step: '02',
    title: 'Someone Finds It',
    description:
      'If your item is lost, the finder scans the QR code with any phone camera. No app needed. They land on a private contact page instantly.',
  },
  {
    step: '03',
    title: 'You Get It Back',
    description:
      'You receive an instant notification with the finder\'s message and location. Coordinate the return — all without sharing your personal information.',
  },
];
