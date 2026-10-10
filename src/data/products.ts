export interface Product {
  id: string;
  name: string;
  category: 'jackets' | 'jerseys' | 'tracksuits' | 'hoodies' | 'accessories';
  price: number;
  originalPrice: number;
  badge?: string;
  ambassador: string;
  colorName: string;
  colors: string[];
  sizes: string[];
  image: string;
  backImage?: string;
  description: string;
  features: string[];
  inStockCount: number;
  rating: number;
  reviewsCount: number;
}

export interface Photocard {
  id: string;
  member: string;
  nickname: string;
  generation: string;
  role: string;
  quote: string;
  rarity: 'SSR Gold Hologram' | 'SR Silver Prism' | 'Rare Stadium Foil' | 'Normal';
  image: string;
  color: string;
}

export interface RetailerStore {
  id: string;
  city: string;
  name: string;
  address: string;
  hours: string;
  type: 'Flagship Store' | 'Pop-up Concept' | 'Stadium Special';
  status: 'Open Now • Stock Ready' | 'Limited Batch Stock' | 'Opening Soon';
  phone: string;
}

export interface LookbookItem {
  id: string;
  title: string;
  member: string;
  location: string;
  image: string;
  quote: string;
  taggedProductIds: string[];
}

export const COLOR_THEMES = [
  { id: 'classic', name: 'Classic Victory', primary: '#f4772a', bg: '#edf0f1', border: '#f4772a' },
  { id: 'shibuya', name: 'Shibuya Night', primary: '#d4ff00', bg: '#0d0f12', border: '#d4ff00' },
  { id: 'emerald', name: 'Pitch Emerald', primary: '#10b981', bg: '#061e16', border: '#10b981' },
  { id: 'crimson', name: 'Stadium Crimson', primary: '#ef4444', bg: '#190909', border: '#ef4444' },
  { id: 'monochrome', name: 'Tokyo Silver', primary: '#ffffff', bg: '#111315', border: '#94a3b8' },
];

export const PRODUCTS: Product[] = [
  {
    id: 'erigo-jkt48-jacket-01',
    name: 'The Path To Victory Reversible Windbreaker',
    category: 'jackets',
    price: 549000,
    originalPrice: 699000,
    badge: 'Vol. 6 Hero Piece',
    ambassador: 'Freya Jayawardana',
    colorName: 'Chalk White / Pitch Orange',
    colors: ['#ffffff', '#f4772a', '#101214'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=800&q=80',
    backImage: 'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=800&q=80',
    description: 'Iconic reversible technical windbreaker featuring water-repellent Japanese ripstop nylon with bold blockcore stripes and Erigo x JKT48 crest embroidery.',
    features: ['Double-sided reversible zip', 'Water-resistant coated nylon', 'Embroidered Victory crest', 'Custom JKT48 Vol. 6 zipper puller'],
    inStockCount: 48,
    rating: 4.9,
    reviewsCount: 184,
  },
  {
    id: 'erigo-jkt48-jersey-01',
    name: 'Matchday Retro Home Jersey #48',
    category: 'jerseys',
    price: 389000,
    originalPrice: 489000,
    badge: 'Limited Batch 1',
    ambassador: 'Zee Asadel',
    colorName: 'Midnight Stadium Black',
    colors: ['#101214', '#f4772a', '#e2e8f0'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    image: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=800&q=80',
    backImage: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=800&q=80',
    description: 'Vintage 90s football jersey aesthetic with jacquard tone-on-tone pinstripes, ribbed polo collar, and custom velvet badge heat-press.',
    features: ['Aerodry breathable mesh weave', 'Custom velvet member flocking option', 'Vintage ribbed V-neck collar', 'Official hologram certification tag'],
    inStockCount: 64,
    rating: 5.0,
    reviewsCount: 312,
  },
  {
    id: 'erigo-jkt48-jacket-02',
    name: 'Stadium Padded Coach Jacket',
    category: 'jackets',
    price: 499000,
    originalPrice: 629000,
    badge: 'Best Seller',
    ambassador: 'Christy',
    colorName: 'Vintage Olive / Orange Accent',
    colors: ['#3f4f44', '#101214', '#e8eaeb'],
    sizes: ['M', 'L', 'XL', 'XXL'],
    image: 'https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=800&q=80',
    description: 'Lightweight insulated coach jacket built with snap buttons, drawstring hem, and oversized silkscreened "The Path To Victory" back statement typography.',
    features: ['Quilted thermal interior lining', 'Matte metallic snap closures', 'Elastic storm cuffs', 'Dual side slant hand pockets'],
    inStockCount: 39,
    rating: 4.8,
    reviewsCount: 97,
  },
  {
    id: 'erigo-jkt48-jersey-02',
    name: 'Away Supporter Pinstripe Kit',
    category: 'jerseys',
    price: 369000,
    originalPrice: 459000,
    badge: 'Fan Favorite',
    ambassador: 'Shani Indira',
    colorName: 'Pure Ivory / Victory Gold',
    colors: ['#f4f5f5', '#d97706', '#101214'],
    sizes: ['S', 'M', 'L', 'XL'],
    image: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&w=800&q=80',
    description: 'Crisp away matchday aesthetic honoring stadium supporter heritage with subtle tonal stripes and gold-foiled collaboration emblem.',
    features: ['Quick-dry micro-poly construction', 'Sublimated retro sponsor branding', 'Split tennis tail side vent', 'Includes 1 collectible photocard'],
    inStockCount: 52,
    rating: 4.9,
    reviewsCount: 140,
  },
  {
    id: 'erigo-jkt48-hoodie-01',
    name: 'Blockcore Heavyweight Boxy Hoodie',
    category: 'hoodies',
    price: 429000,
    originalPrice: 549000,
    badge: '450 GSM French Terry',
    ambassador: 'Gracia',
    colorName: 'Washed Ash Gray',
    colors: ['#6b7280', '#101214', '#f4772a'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80',
    description: 'Ultra-dense 450 GSM premium cotton fleece with drop shoulders, double-layered hood, and distressed Erigo football badge on chest.',
    features: ['450 GSM pure combed cotton', 'Custom heavyweight ribbing', 'Drop shoulder relaxed cut', 'Zero drawstring clean neckline'],
    inStockCount: 71,
    rating: 5.0,
    reviewsCount: 228,
  },
  {
    id: 'erigo-jkt48-track-01',
    name: 'Side-Taped Matchday Track Pants',
    category: 'tracksuits',
    price: 349000,
    originalPrice: 439000,
    badge: 'Set Coordinate',
    ambassador: 'Adel',
    colorName: 'Stadium Black / White Piping',
    colors: ['#101214', '#374151', '#f4772a'],
    sizes: ['S', 'M', 'L', 'XL'],
    image: 'https://images.unsplash.com/photo-1552902865-b72c031ac5ea?auto=format&fit=crop&w=800&q=80',
    description: 'Relaxed athletic straight-leg track pants with custom jacquard "ERIGO X JKT48" side stripe webbing and zippered ankles.',
    features: ['Zipped ankle vents for sneaker drape', 'Elastic waistband with internal cord', 'Concealed security zipper pockets', 'Anti-snag knit fabric'],
    inStockCount: 44,
    rating: 4.7,
    reviewsCount: 89,
  },
  {
    id: 'erigo-jkt48-acc-01',
    name: 'Jacquard Stadium Supporter Scarf',
    category: 'accessories',
    price: 199000,
    originalPrice: 249000,
    badge: 'Stadium Exclusive',
    ambassador: 'Marsha Lenathea',
    colorName: 'Orange / Black Duo-Knit',
    colors: ['#f4772a', '#101214'],
    sizes: ['One Size (160cm x 18cm)'],
    image: 'https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?auto=format&fit=crop&w=800&q=80',
    description: 'Classic double-sided acrylic knit supporter scarf with traditional fringed ends, reading "VICTORY" on one side and "JKT48" on the reverse.',
    features: ['Authentic stadium double-knit acrylic', 'Fringed edge detail', '160cm supporter length', 'Reversible matchday graphic'],
    inStockCount: 110,
    rating: 5.0,
    reviewsCount: 420,
  },
  {
    id: 'erigo-jkt48-acc-02',
    name: 'Padded Blockcore Mini Duffel Bag',
    category: 'accessories',
    price: 269000,
    originalPrice: 329000,
    badge: 'New Arrival',
    ambassador: 'Zee Asadel',
    colorName: 'Matte Obsidian',
    colors: ['#111827', '#e5e7eb'],
    sizes: ['One Size (12L)'],
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80',
    description: 'Compact barrel duffel designed for matchday essentials, featuring padded nylon construction and detachable crossbody shoulder strap.',
    features: ['Water-repellent ripstop shell', 'Internal key clip & phone mesh', 'YKK metal coil zips', 'Subtle reflective collaboration patch'],
    inStockCount: 56,
    rating: 4.8,
    reviewsCount: 76,
  },
];

export const PHOTOCARDS: Photocard[] = [
  {
    id: 'pc-01',
    member: 'Freya Jayawardana',
    nickname: 'Freya',
    generation: 'Gen 7',
    role: 'Captain of Victory • Forward',
    quote: 'Kemenangan sejati ada di setiap langkah keberanian kita di lapangan!',
    rarity: 'SSR Gold Hologram',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
    color: '#f4772a',
  },
  {
    id: 'pc-02',
    member: 'Azizi Asadel',
    nickname: 'Zee',
    generation: 'Gen 7',
    role: 'The Playmaker • Midfielder #01',
    quote: 'Mainkan temponya dengan gayamu sendiri, jangan pernah ragu untuk bersinar.',
    rarity: 'SSR Gold Hologram',
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80',
    color: '#3b82f6',
  },
  {
    id: 'pc-03',
    member: 'Angelina Christy',
    nickname: 'Christy',
    generation: 'Gen 7',
    role: 'Golden Wing • Winger #06',
    quote: 'Lari secepat angin, bawa mimpi kita ke podium tertinggi!',
    rarity: 'SR Silver Prism',
    image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=600&q=80',
    color: '#ec4899',
  },
  {
    id: 'pc-04',
    member: 'Shania Gracia',
    nickname: 'Gracia',
    generation: 'Gen 3',
    role: 'Defensive Anchor • Defender #99',
    quote: 'Bersama para supporter, dinding pertahanan kita tak akan pernah runtuh.',
    rarity: 'Rare Stadium Foil',
    image: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=600&q=80',
    color: '#8b5cf6',
  },
  {
    id: 'pc-05',
    member: 'Reva Fidela',
    nickname: 'Adel',
    generation: 'Gen 8',
    role: 'Speedster • Winger #12',
    quote: 'Energi penuh dari tribun ke jersey ini adalah kekuatan kita.',
    rarity: 'SR Silver Prism',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=600&q=80',
    color: '#10b981',
  },
  {
    id: 'pc-06',
    member: 'Marsha Lenathea',
    nickname: 'Marsha',
    generation: 'Gen 9',
    role: 'The Tactician • Sweeper #24',
    quote: 'Setiap jahitan di jaket ini menyimpan cerita perjalanan penuh dedikasi.',
    rarity: 'Rare Stadium Foil',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
    color: '#eab308',
  },
];

export const LOOKBOOK_SLIDES: LookbookItem[] = [
  {
    id: 'lb-1',
    title: 'The Locker Room Pre-Match Ritual',
    member: 'Freya & Zee',
    location: 'Gelora Bung Karno Tunnel, Jakarta',
    image: 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&w=1200&q=80',
    quote: 'Momen hening sebelum peluit dibunyikan adalah saat keyakinan diuji.',
    taggedProductIds: ['erigo-jkt48-jacket-01', 'erigo-jkt48-jersey-01'],
  },
  {
    id: 'lb-2',
    title: 'Shibuya Night Pitchside Walk',
    member: 'Christy & Adel',
    location: 'Miyashita Park Rooftop, Tokyo',
    image: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1200&q=80',
    quote: 'Streetwear modern berpadu dengan tradisi sepakbola era 90-an.',
    taggedProductIds: ['erigo-jkt48-jacket-02', 'erigo-jkt48-track-01'],
  },
  {
    id: 'lb-3',
    title: 'Stadium Curva Supporter Anthem',
    member: 'Gracia & Marsha',
    location: 'Stadion Utama Tribune Gate 12',
    image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1200&q=80',
    quote: 'Satu suara, ribuan syal terangkat menyambut sang juara.',
    taggedProductIds: ['erigo-jkt48-acc-01', 'erigo-jkt48-hoodie-01'],
  },
];

export const RETAILER_STORES: RetailerStore[] = [
  {
    id: 'store-1',
    city: 'Jakarta Pusat',
    name: 'Erigo Concept Store — Senayan City',
    address: 'Senayan City Mall, Level 3 Unit 3-48, Jl. Asia Afrika, Jakarta',
    hours: '10:00 - 22:00 WIB',
    type: 'Flagship Store',
    status: 'Open Now • Stock Ready',
    phone: '+62 21 7278 1248',
  },
  {
    id: 'store-2',
    city: 'Jakarta Selatan',
    name: 'Erigo Space Kemang & Pop-Up Stadium',
    address: 'Jl. Kemang Raya No. 48, Bangka, Mampang Prapatan, Jakarta',
    hours: '11:00 - 23:00 WIB',
    type: 'Pop-up Concept',
    status: 'Open Now • Stock Ready',
    phone: '+62 21 7198 4848',
  },
  {
    id: 'store-3',
    city: 'Bandung',
    name: 'Erigo Store — Paris Van Java (PVJ)',
    address: 'Paris Van Java Resort Glamour Level, Jl. Sukajadi No. 131, Bandung',
    hours: '10:00 - 22:00 WIB',
    type: 'Flagship Store',
    status: 'Open Now • Stock Ready',
    phone: '+62 22 8206 3848',
  },
  {
    id: 'store-4',
    city: 'Surabaya',
    name: 'Erigo Store — Tunjungan Plaza 6',
    address: 'Tunjungan Plaza 6 Level 2, Jl. Embong Malang No. 7-21, Surabaya',
    hours: '10:00 - 22:00 WIB',
    type: 'Flagship Store',
    status: 'Open Now • Stock Ready',
    phone: '+62 31 5116 4806',
  },
  {
    id: 'store-5',
    city: 'Tokyo, Japan',
    name: 'Erigo x JKT48 Shibuya Pop-Up Store',
    address: 'Shibuya PARCO 4F Pop-up Space, 15-1 Udagawacho, Shibuya, Tokyo',
    hours: '11:00 - 21:00 JST',
    type: 'Stadium Special',
    status: 'Limited Batch Stock',
    phone: '+81 3 3464 5111',
  },
];
