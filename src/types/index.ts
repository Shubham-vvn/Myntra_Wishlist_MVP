export type ConcernType = 
  | 'size'
  | 'price'
  | 'colour'
  | 'delivery'
  | 'quality_info'
  | 'purchase_timing'
  | 'other';

export type TriggerType = 
  | 'size_available'
  | 'price_drop'
  | 'color_available'
  | 'delivery_improved'
  | 'new_reviews'
  | 'date_reminder'
  | 'stock_restock';

export interface ProductSize {
  size: 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL' | 'XXXL';
  inStock: boolean;
  stockCount: number;
  lowStockText?: string;
}

export interface ProductColor {
  name: string;
  hex: string;
  inStock: boolean;
  image: string;
}

export interface FabricDNA {
  material: string;
  composition: string;
  gsmWeight: number;
  opacityScore: number; // 1 to 5
  opacityLabel: string;
  breathabilityScore: number; // 1 to 5
  breathabilityLabel: string;
  weaveType: string;
  stretchRating: string;
  macroImages: string[];
}

export interface HeightFitDistribution {
  heightRange: string;
  runsSmallPct: number;
  trueToSizePct: number;
  runsLargePct: number;
  voterCount: number;
}

export interface FitConsensus {
  trueToSizePct: number;
  totalVoters: number;
  runsSmallPct: number;
  trueToSizeCount: number;
  runsLargePct: number;
  fitAdvice: string;
  recommendedSizeForUser: string;
  userHeightHistogram: HeightFitDistribution[];
}

export interface CustomerReview {
  id: string;
  userName: string;
  userHeight: string;
  purchasedSize: string;
  fitFeedback: 'Runs Small' | 'True to Size' | 'Runs Large';
  comment: string;
  rating: number;
  date: string;
  isVerifiedBuyer: boolean;
  photoUrl?: string;
}

export type ProductCategory = 
  | 'Shirts' 
  | 'Kurtas' 
  | 'Blazers' 
  | 'Dresses' 
  | 'Festive' 
  | 'Jeans' 
  | 'Footwear' 
  | 'Tops' 
  | 'Trousers' 
  | 'T-Shirts' 
  | 'Jackets' 
  | 'Sarees' 
  | 'Handbags' 
  | 'Activewear'
  | 'Watches'
  | 'Sandals';

export type CategoryArchetype = 
  | 'footwear' 
  | 'watches' 
  | 'bags' 
  | 'denim' 
  | 'ethnic' 
  | 'topwear' 
  | 'dresses' 
  | 'outerwear' 
  | 'activewear' 
  | 'general';

export interface Product {
  id: string;
  sku: string;
  brand: string;
  name: string;
  category: ProductCategory;
  price: number;
  mrp: number;
  discountPct: number;
  rating: number;
  ratingCount: number;
  images: string[];
  description: string;
  availableSizes: ProductSize[];
  availableColors: ProductColor[];
  fabricDNA: FabricDNA;
  fitConsensus: FitConsensus;
  swapEligible: boolean;
  deliveryEstimate: {
    minDays: number;
    maxDays: number;
    pincode: string;
    expressAvailable: boolean;
  };
  reviews: CustomerReview[];
}

export interface ActiveConcern {
  id: string;
  wishlistItemId: string;
  productId: string;
  concernType: ConcernType;
  label: string;
  categoryChip?: string;
  triggerParams: {
    targetSize?: string;
    targetShoeSize?: string;
    targetWaistSize?: string;
    targetDialSize?: string;
    laptopFitRequired?: string;
    targetPrice?: number;
    capturedPrice?: number;
    targetColor?: string;
    targetDate?: string;
    dateLabel?: string;
    customText?: string;
    notificationPreference?: string;
    warrantyAlert?: boolean;
    opacityPhotosOnly?: boolean;
    drapePhotosVerified?: boolean;
  };
  status: 'active' | 'satisfied' | 'notified' | 'dismissed';
  capturedAt: string;
  satisfiedAt?: string;
}

export interface WishlistItem {
  id: string;
  productId: string;
  product: Product;
  addedAt: string;
  dwellDays: number;
  activeConcern?: ActiveConcern;
}

export interface NotificationItem {
  id: string;
  productId?: string;
  productName?: string;
  brandName?: string;
  productImage?: string;
  categoryChip?: string;
  title: string;
  body: string;
  concernType: ConcernType;
  timestamp: string;
  isRead: boolean;
  isDigest?: boolean;
  digestItems?: Array<{
    productId: string;
    brand: string;
    name: string;
    resolvedConcern: string;
  }>;
}

export interface BagItem {
  id: string;
  productId: string;
  product: Product;
  selectedSize: string;
  selectedColor?: string;
  quantity: number;
  hasSwapWarranty: boolean;
  warrantyCertificateId: string;
  addedAt: string;
}

export interface UserProfile {
  name: string;
  age: number;
  city: string;
  pincode: string;
  heightCm: number;
  bustCm: number;
  waistCm: number;
  hipCm: number;
  usualSize: string;
  preferredFit: 'tailored' | 'relaxed';
}

export interface AnalyticsEvent {
  id: string;
  name: string;
  timestamp: string;
  payload: Record<string, any>;
}

export type SimulationType = 
  | 'size_xl_restock'
  | 'price_drop'
  | 'color_available'
  | 'express_delivery'
  | 'new_customer_reviews'
  | 'salary_date_reminder'
  | 'ai_summarized_digest'
  | 'reset_all';
