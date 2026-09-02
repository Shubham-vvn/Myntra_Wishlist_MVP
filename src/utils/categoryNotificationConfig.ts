import React from 'react';
import { ProductCategory, CategoryArchetype, ConcernType, Product, ActiveConcern, NotificationItem } from '../types';
import { 
  Shirt, 
  Tag, 
  Palette, 
  Truck, 
  FileText, 
  Calendar, 
  MessageSquare, 
  Watch, 
  ShoppingBag, 
  Footprints, 
  ShieldCheck, 
  Sparkles, 
  Scissors, 
  Maximize2, 
  Droplet, 
  Layers, 
  RefreshCw,
  Sun,
  Activity,
  CheckCircle2
} from 'lucide-react';

export interface CategoryConcernOption {
  id: ConcernType;
  title: string;
  subtitle: string;
  icon: React.ComponentType<{ size?: number; color?: string; strokeWidth?: number }>;
  priority: number;
  badgeLabel: string;
  subflowType: 'size_apparel' | 'size_shoes' | 'size_waist' | 'size_watch' | 'laptop_fit' | 'price' | 'color' | 'delivery' | 'quality_fabric' | 'quality_watch' | 'quality_saree' | 'quality_active' | 'timing' | 'custom';
}

/**
 * Maps any product category to its high-level behavioral fashion archetype
 */
export function getCategoryArchetype(category: ProductCategory): CategoryArchetype {
  switch (category) {
    case 'Footwear':
    case 'Sandals':
      return 'footwear';
    case 'Watches':
      return 'watches';
    case 'Handbags':
      return 'bags';
    case 'Jeans':
    case 'Trousers':
      return 'denim';
    case 'Sarees':
    case 'Festive':
      return 'ethnic';
    case 'Shirts':
    case 'T-Shirts':
    case 'Tops':
      return 'topwear';
    case 'Dresses':
    case 'Kurtas':
      return 'dresses';
    case 'Blazers':
    case 'Jackets':
      return 'outerwear';
    case 'Activewear':
      return 'activewear';
    default:
      return 'general';
  }
}

/**
 * Returns the 5-7 most relevant, prioritized notification and concern signals for any category
 */
export function getCategoryConcerns(category: ProductCategory): CategoryConcernOption[] {
  const archetype = getCategoryArchetype(category);

  switch (archetype) {
    case 'watches':
      return [
        {
          id: 'price',
          title: 'Price Drop & Bank Offers',
          subtitle: 'Notify when price drops or card discount applies',
          icon: Tag,
          priority: 1,
          badgeLabel: 'Price Drop Watch',
          subflowType: 'price'
        },
        {
          id: 'size',
          title: 'Dial Diameter & Case Size',
          subtitle: 'Notify for 38mm, 40mm, 42mm, or 44mm dial options',
          icon: Watch,
          priority: 2,
          badgeLabel: 'Dial Size Watch',
          subflowType: 'size_watch'
        },
        {
          id: 'colour',
          title: 'Strap Material & Colorway',
          subtitle: 'Notify when Leather, Mesh, or Steel variant is in stock',
          icon: Palette,
          priority: 3,
          badgeLabel: 'Strap Variant Watch',
          subflowType: 'color'
        },
        {
          id: 'quality_info',
          title: 'Official 2-Yr Warranty & Water Resistance',
          subtitle: 'Notify when verified brand certificate is attached',
          icon: ShieldCheck,
          priority: 4,
          badgeLabel: 'Warranty & Water Resistance',
          subflowType: 'quality_watch'
        },
        {
          id: 'delivery',
          title: 'Insured Express Courier Dispatch',
          subtitle: 'Notify when 24hr guaranteed delivery is available',
          icon: Truck,
          priority: 5,
          badgeLabel: 'Insured Delivery Watch',
          subflowType: 'delivery'
        },
        {
          id: 'purchase_timing',
          title: 'Gifting / Salary Day Reminder',
          subtitle: 'Remind me on a specific birthday or payday',
          icon: Calendar,
          priority: 6,
          badgeLabel: 'Gifting Date Reminder',
          subflowType: 'timing'
        },
        {
          id: 'other',
          title: 'Other Watch Inquiry',
          subtitle: 'Battery life, movement, or custom request',
          icon: MessageSquare,
          priority: 7,
          badgeLabel: 'Custom Inquiry',
          subflowType: 'custom'
        }
      ];

    case 'footwear':
      return [
        {
          id: 'size',
          title: 'UK / Euro Shoe Size Restock',
          subtitle: 'Notify when UK 6, 7, 8, 9, 10, or 11 is available',
          icon: Footprints,
          priority: 1,
          badgeLabel: 'Shoe Size Watch',
          subflowType: 'size_shoes'
        },
        {
          id: 'price',
          title: 'Price Drop Alert',
          subtitle: 'Notify when price drops below current price',
          icon: Tag,
          priority: 2,
          badgeLabel: 'Price Drop Watch',
          subflowType: 'price'
        },
        {
          id: 'quality_info',
          title: 'Arch Cushioning & Comfort Feedback',
          subtitle: 'Notify when verified walking & running ratings are added',
          icon: Activity,
          priority: 3,
          badgeLabel: 'Arch & Sole Feedback',
          subflowType: 'quality_fabric'
        },
        {
          id: 'colour',
          title: 'Colorway In Stock',
          subtitle: 'Notify when desired colorway or edition is back',
          icon: Palette,
          priority: 4,
          badgeLabel: 'Colorway Watch',
          subflowType: 'color'
        },
        {
          id: 'delivery',
          title: 'Try-and-Buy / Express Dispatch',
          subtitle: 'Notify when 1-day delivery with size trial is active',
          icon: Truck,
          priority: 5,
          badgeLabel: 'Try-and-Buy Delivery',
          subflowType: 'delivery'
        },
        {
          id: 'purchase_timing',
          title: 'Payday Reminder',
          subtitle: 'Remind me when my monthly budget renews',
          icon: Calendar,
          priority: 6,
          badgeLabel: 'Payday Reminder',
          subflowType: 'timing'
        },
        {
          id: 'other',
          title: 'Toe-Box / Width Inquiry',
          subtitle: 'Ask about wide-foot fit or custom questions',
          icon: MessageSquare,
          priority: 7,
          badgeLabel: 'Custom Fit Inquiry',
          subflowType: 'custom'
        }
      ];

    case 'bags':
      return [
        {
          id: 'price',
          title: 'Price Drop Alert',
          subtitle: 'Notify when price drops below current price',
          icon: Tag,
          priority: 1,
          badgeLabel: 'Price Drop Watch',
          subflowType: 'price'
        },
        {
          id: 'quality_info',
          title: 'Laptop Fit & Capacity Dimensions',
          subtitle: 'Notify when verified 13"/14"/15.6" laptop fit photos are uploaded',
          icon: Maximize2,
          priority: 2,
          badgeLabel: 'Laptop Fit & Volume',
          subflowType: 'laptop_fit'
        },
        {
          id: 'colour',
          title: 'Leather Shade & Hardware Finish',
          subtitle: 'Notify when Tan, Midnight Black, or Gold zipper variant is in stock',
          icon: Palette,
          priority: 3,
          badgeLabel: 'Color & Hardware Finish',
          subflowType: 'color'
        },
        {
          id: 'delivery',
          title: 'Fast Event Delivery',
          subtitle: 'Notify when express doorstep shipping is active',
          icon: Truck,
          priority: 4,
          badgeLabel: 'Express Delivery Watch',
          subflowType: 'delivery'
        },
        {
          id: 'size',
          title: 'Strap Drop & Crossbody Convertibility',
          subtitle: 'Notify about shoulder vs sling strap dimensions',
          icon: ShoppingBag,
          priority: 5,
          badgeLabel: 'Strap Dimensions',
          subflowType: 'size_apparel'
        },
        {
          id: 'purchase_timing',
          title: 'Monthly Budget Reminder',
          subtitle: 'Remind me on salary date',
          icon: Calendar,
          priority: 6,
          badgeLabel: 'Salary Day Reminder',
          subflowType: 'timing'
        },
        {
          id: 'other',
          title: 'Material Authenticity Inquiry',
          subtitle: 'Ask about Genuine Leather vs Vegan PU',
          icon: MessageSquare,
          priority: 7,
          badgeLabel: 'Material Inquiry',
          subflowType: 'custom'
        }
      ];

    case 'denim':
      return [
        {
          id: 'size',
          title: 'Waist & Inseam Size Restock',
          subtitle: 'Notify when Waist 28, 30, 32, 34, 36, or 38 is available',
          icon: Scissors,
          priority: 1,
          badgeLabel: 'Waist Size Watch',
          subflowType: 'size_waist'
        },
        {
          id: 'price',
          title: 'Price Drop Alert',
          subtitle: 'Notify when price drops below current price',
          icon: Tag,
          priority: 2,
          badgeLabel: 'Price Drop Watch',
          subflowType: 'price'
        },
        {
          id: 'quality_info',
          title: 'Stretch % & Knee Shape Retention',
          subtitle: 'Notify when verified elastane retention & fade reviews are added',
          icon: RefreshCw,
          priority: 3,
          badgeLabel: 'Stretch & Wash Consensus',
          subflowType: 'quality_fabric'
        },
        {
          id: 'colour',
          title: 'Wash & Indigo Shade',
          subtitle: 'Notify when Raw Indigo, Light Wash, or Black is back',
          icon: Droplet,
          priority: 4,
          badgeLabel: 'Wash Shade Watch',
          subflowType: 'color'
        },
        {
          id: 'delivery',
          title: 'Weekend Outing Express Delivery',
          subtitle: 'Notify when fast courier shipping is available',
          icon: Truck,
          priority: 5,
          badgeLabel: 'Weekend Delivery Watch',
          subflowType: 'delivery'
        },
        {
          id: 'purchase_timing',
          title: 'Salary Date Reminder',
          subtitle: 'Remind me on 3rd of month',
          icon: Calendar,
          priority: 6,
          badgeLabel: 'Salary Day Reminder',
          subflowType: 'timing'
        },
        {
          id: 'other',
          title: 'High vs Mid-Rise Fit Inquiry',
          subtitle: 'Ask about ankle taper or thigh clearance',
          icon: MessageSquare,
          priority: 7,
          badgeLabel: 'Fit Inquiry',
          subflowType: 'custom'
        }
      ];

    case 'ethnic':
      return [
        {
          id: 'quality_info',
          title: 'Blouse Piece & Daylight Drape Photos',
          subtitle: 'Notify when verified unstitched blouse & weave photos are uploaded',
          icon: Sun,
          priority: 1,
          badgeLabel: 'Drape & Blouse Verification',
          subflowType: 'quality_saree'
        },
        {
          id: 'price',
          title: 'Festive Flash Sale & Price Drop',
          subtitle: 'Notify when price drops or festive discount applies',
          icon: Tag,
          priority: 2,
          badgeLabel: 'Festive Sale Watch',
          subflowType: 'price'
        },
        {
          id: 'colour',
          title: 'Zari Border & Color Variant',
          subtitle: 'Notify when specific zari colorway is available',
          icon: Sparkles,
          priority: 3,
          badgeLabel: 'Zari Colorway Watch',
          subflowType: 'color'
        },
        {
          id: 'size',
          title: 'Custom Stitching & Sizing',
          subtitle: 'Notify when ready-to-wear / stitched sizes are available',
          icon: Scissors,
          priority: 4,
          badgeLabel: 'Stitched Sizing Watch',
          subflowType: 'size_apparel'
        },
        {
          id: 'delivery',
          title: 'Guaranteed Festive Delivery',
          subtitle: 'Notify when delivery before Puja / Wedding date is guaranteed',
          icon: Truck,
          priority: 5,
          badgeLabel: 'Guaranteed Event Delivery',
          subflowType: 'delivery'
        },
        {
          id: 'purchase_timing',
          title: 'Wedding / Festival Date Reminder',
          subtitle: 'Remind me 2 weeks prior to festive occasion',
          icon: Calendar,
          priority: 6,
          badgeLabel: 'Festive Date Reminder',
          subflowType: 'timing'
        },
        {
          id: 'other',
          title: 'Dry Clean & Care Guidance',
          subtitle: 'Ask about pure silk hallmark or wash care',
          icon: MessageSquare,
          priority: 7,
          badgeLabel: 'Fabric Care Inquiry',
          subflowType: 'custom'
        }
      ];

    case 'activewear':
      return [
        {
          id: 'size',
          title: 'Size Availability',
          subtitle: 'Notify when XS, S, M, L, or XL is available',
          icon: Shirt,
          priority: 1,
          badgeLabel: 'Size Restock Watch',
          subflowType: 'size_apparel'
        },
        {
          id: 'quality_info',
          title: 'Squat-Proof Opacity & Non-Slip Waistband',
          subtitle: 'Notify when verified high-impact stretch ratings are added',
          icon: Activity,
          priority: 2,
          badgeLabel: 'Squat-Proof Ratings',
          subflowType: 'quality_active'
        },
        {
          id: 'price',
          title: 'Price Drop Alert',
          subtitle: 'Notify when price drops below current price',
          icon: Tag,
          priority: 3,
          badgeLabel: 'Price Drop Watch',
          subflowType: 'price'
        },
        {
          id: 'colour',
          title: 'Colorway In Stock',
          subtitle: 'Notify when desired color or pattern is back',
          icon: Palette,
          priority: 4,
          badgeLabel: 'Colorway Watch',
          subflowType: 'color'
        },
        {
          id: 'delivery',
          title: 'Express 24-hr Dispatch',
          subtitle: 'Notify when fast gym kit shipping is active',
          icon: Truck,
          priority: 5,
          badgeLabel: 'Express Dispatch Watch',
          subflowType: 'delivery'
        },
        {
          id: 'purchase_timing',
          title: 'Fitness Goal / Salary Reminder',
          subtitle: 'Remind me on a specific date',
          icon: Calendar,
          priority: 6,
          badgeLabel: 'Goal Date Reminder',
          subflowType: 'timing'
        },
        {
          id: 'other',
          title: 'Compression Level Inquiry',
          subtitle: 'Ask about high vs medium support',
          icon: MessageSquare,
          priority: 7,
          badgeLabel: 'Support Inquiry',
          subflowType: 'custom'
        }
      ];

    default: // Standard Apparel (Shirts, T-Shirts, Kurtas, Dresses, Blazers, Tops, etc.)
      return [
        {
          id: 'size',
          title: 'Size Availability',
          subtitle: 'Notify when XS, S, M, L, XL, or XXL is back in stock',
          icon: Shirt,
          priority: 1,
          badgeLabel: 'Size Restock Watch',
          subflowType: 'size_apparel'
        },
        {
          id: 'price',
          title: 'Price Drop Alert',
          subtitle: 'Notify when price drops below current price',
          icon: Tag,
          priority: 2,
          badgeLabel: 'Price Drop Watch',
          subflowType: 'price'
        },
        {
          id: 'quality_info',
          title: 'Daylight Opacity & Fabric Reviews',
          subtitle: 'Notify when verified daylight photos & weave ratings are added',
          icon: Sun,
          priority: 3,
          badgeLabel: 'Fabric Opacity Photos',
          subflowType: 'quality_fabric'
        },
        {
          id: 'colour',
          title: 'Preferred Colour / Shade',
          subtitle: 'Notify when preferred color variant is available',
          icon: Palette,
          priority: 4,
          badgeLabel: 'Colorway Watch',
          subflowType: 'color'
        },
        {
          id: 'delivery',
          title: 'Express 24-hr Delivery',
          subtitle: 'Notify when next-day doorstep delivery is active',
          icon: Truck,
          priority: 5,
          badgeLabel: 'Express Delivery Watch',
          subflowType: 'delivery'
        },
        {
          id: 'purchase_timing',
          title: 'Salary Date Reminder',
          subtitle: 'Remind me on 3rd of month (Salary Day)',
          icon: Calendar,
          priority: 6,
          badgeLabel: 'Salary Day Reminder',
          subflowType: 'timing'
        },
        {
          id: 'other',
          title: 'Wash Shrinkage & Cut Inquiry',
          subtitle: 'Ask about shoulder taper or wash care',
          icon: MessageSquare,
          priority: 7,
          badgeLabel: 'Fit & Cut Inquiry',
          subflowType: 'custom'
        }
      ];
  }
}

/**
 * Generates category-tailored notification copy with rich context
 */
export function generateCategoryNotification(
  product: Product,
  concernType: ConcernType,
  params: Record<string, any> = {}
): { title: string; body: string; categoryChip: string } {
  const archetype = getCategoryArchetype(product.category);

  switch (archetype) {
    case 'watches':
      if (concernType === 'price') {
        return {
          title: `Price Drop Alert: ${product.brand} Watch! 💰`,
          body: `Price reduced from ₹${product.mrp} to ₹${product.price}. Includes 2-Yr Official Brand Warranty + 10% Instant Bank Discount.`,
          categoryChip: '⌚ Horology Watch Alert'
        };
      }
      if (concernType === 'size') {
        const dial = params.targetDialSize || '42mm';
        return {
          title: `Dial Size In Stock: ${dial} Case Diameter ⌚`,
          body: `${product.brand} ${product.name} is now available in ${dial} dial size with genuine strap options.`,
          categoryChip: '⌚ Dial Size Alert'
        };
      }
      if (concernType === 'quality_info') {
        return {
          title: `Official Brand Warranty & Water Resistance Verified 🛡️`,
          body: `2-Year Manufacturer Warranty Certificate & 5 ATM Water Resistance rating verified by Myntra Quality Lab.`,
          categoryChip: '⌚ Authenticity Verified'
        };
      }
      if (concernType === 'colour') {
        return {
          title: `Strap Variant Restocked: ${params.targetColor || 'Selected Finish'} 🎨`,
          body: `The ${params.targetColor || 'Leather/Mesh'} strap edition is back in stock with quick-release spring bars.`,
          categoryChip: '⌚ Strap Variant Alert'
        };
      }
      return {
        title: `Your Saved Watch Reminder 📅`,
        body: `You saved this ${product.brand} timepiece for today (${params.dateLabel || 'Payday'}). Ready to complete your order?`,
        categoryChip: '⌚ Timepiece Reminder'
      };

    case 'footwear':
      if (concernType === 'size') {
        const size = params.targetShoeSize || 'UK 9';
        return {
          title: `Shoe Size Restocked: ${size} Available Now! 👟`,
          body: `${product.brand} ${product.name} in size ${size} is back in stock (4 pairs left). Backed by 14-day size trial.`,
          categoryChip: '👟 Footwear Restock Alert'
        };
      }
      if (concernType === 'quality_info') {
        return {
          title: `Arch Cushioning & Comfort Ratings Added ☁️`,
          body: `18 verified runners & daily walkers rated sole comfort 4.8/5. Fits true-to-size with spacious toe-box.`,
          categoryChip: '👟 Comfort Feedback'
        };
      }
      if (concernType === 'price') {
        return {
          title: `Price Drop on ${product.brand} Footwear 👟`,
          body: `Price dropped from ₹${product.mrp} to ₹${product.price} (${product.discountPct}% OFF). Available with 24hr dispatch.`,
          categoryChip: '👟 Price Drop Alert'
        };
      }
      return {
        title: `Your Saved Footwear Reminder 👟`,
        body: `You saved ${product.brand} shoes for today. Grab your size before stock sells out.`,
        categoryChip: '👟 Footwear Reminder'
      };

    case 'bags':
      if (concernType === 'quality_info') {
        return {
          title: `Laptop Fit & Capacity Photos Verified 💻`,
          body: `Verified photos uploaded: Easily accommodates 14" MacBook & 11" iPad with padded protection & reinforced zips.`,
          categoryChip: '👜 Capacity & Laptop Fit'
        };
      }
      if (concernType === 'colour') {
        return {
          title: `Leather Finish Restocked: ${params.targetColor || 'Selected Color'} 👜`,
          body: `Premium ${params.targetColor || 'Tan/Black'} finish with gold-toned hardware is now back in stock.`,
          categoryChip: '👜 Handbag Colorway Alert'
        };
      }
      if (concernType === 'price') {
        return {
          title: `Price Drop on ${product.brand} Handbag 👜`,
          body: `Price reduced to ₹${product.price}. Handcrafted structured silhouette with detachable crossbody strap.`,
          categoryChip: '👜 Handbag Price Alert'
        };
      }
      return {
        title: `Your Saved Bag Reminder 👜`,
        body: `Your wishlisted ${product.brand} bag is reserved at special price for your scheduled reminder date.`,
        categoryChip: '👜 Handbag Reminder'
      };

    case 'denim':
      if (concernType === 'size') {
        const waist = params.targetWaistSize || 'Waist 32';
        return {
          title: `Denim Size Restocked: ${waist} Available 👖`,
          body: `${product.brand} ${product.name} in ${waist} (32 Inseam) is back in stock. 2-way flex elastane with zero knee-bagging.`,
          categoryChip: '👖 Denim Waist Alert'
        };
      }
      if (concernType === 'quality_info') {
        return {
          title: `Stretch & Wash Fade Ratings Uploaded 🌊`,
          body: `Verified stretch consensus: 94% retention after 10 washes with zero color bleeding in cold wash.`,
          categoryChip: '👖 Denim Quality Consensus'
        };
      }
      if (concernType === 'price') {
        return {
          title: `Price Drop on ${product.brand} Jeans 👖`,
          body: `Price slashed from ₹${product.mrp} to ₹${product.price}. Authentic denim twill with reinforced rivets.`,
          categoryChip: '👖 Denim Price Alert'
        };
      }
      return {
        title: `Denim Restock Reminder 👖`,
        body: `Your saved ${product.brand} jeans are ready for checkout on your chosen payday.`,
        categoryChip: '👖 Denim Reminder'
      };

    case 'ethnic':
      if (concernType === 'quality_info') {
        return {
          title: `Daylight Drape & Blouse Piece Photos Uploaded 🥻`,
          body: `14 high-resolution daylight drape photos added. 0.8m unstitched matching blouse piece with genuine Zari border verified.`,
          categoryChip: '🥻 Saree Drape & Blouse Verified'
        };
      }
      if (concernType === 'price') {
        return {
          title: `Festive Price Drop: ${product.brand} Ethnic 🥻`,
          body: `Special festive discount active: Now ₹${product.price} (Save ${product.discountPct}%). Pure weave quality guaranteed.`,
          categoryChip: '🥻 Festive Sale Alert'
        };
      }
      if (concernType === 'delivery') {
        return {
          title: `Guaranteed Festive Delivery Active 🥻`,
          body: `Express shipping available: Guaranteed doorstep delivery before the upcoming festive weekend.`,
          categoryChip: '🥻 Guaranteed Festive Shipping'
        };
      }
      return {
        title: `Festive Occasion Reminder 🥻`,
        body: `You saved this ${product.brand} festive piece for today. Ready to complete your ethnic ensemble?`,
        categoryChip: '🥻 Festive Reminder'
      };

    default: // Standard Apparel (Shirts, Tops, Kurtas, Dresses, Jackets, etc.)
      if (concernType === 'size') {
        const sz = params.targetSize || 'XL';
        return {
          title: `Good news! Size ${sz} is Now Available 👕`,
          body: `The ${sz} size you wanted for ${product.brand} ${product.name} is restocked (Only 4 left). Tap to view.`,
          categoryChip: '👕 Apparel Size Restock'
        };
      }
      if (concernType === 'quality_info') {
        return {
          title: `New Daylight Fabric & Opacity Reviews Added 📸`,
          body: `Verified customer photos show zero show-through with 100% natural cotton breathability rating.`,
          categoryChip: '📸 Fabric Opacity Verified'
        };
      }
      if (concernType === 'price') {
        return {
          title: `Price Drop Alert on ${product.brand} 💰`,
          body: `Price dropped from ₹${product.mrp} to ₹${product.price} for your wishlisted ${product.name}.`,
          categoryChip: '💰 Price Drop Alert'
        };
      }
      return {
        title: `Your Saved Date Reminder 📅`,
        body: `You saved this ${product.brand} item for today (${params.dateLabel || 'Salary Day'}). Ready to complete your order?`,
        categoryChip: '📅 Purchase Reminder'
      };
  }
}

/**
 * Returns a category-smart badge label for wishlist items
 */
export function getWishlistWatchBadge(activeConcern: ActiveConcern, product: Product): string {
  const archetype = getCategoryArchetype(product.category);

  switch (activeConcern.concernType) {
    case 'size':
      if (archetype === 'footwear') {
        return `Watching: Shoe Size ${activeConcern.triggerParams.targetShoeSize || 'UK 9'} Restock`;
      }
      if (archetype === 'watches') {
        return `Watching: Dial Size ${activeConcern.triggerParams.targetDialSize || '42mm'}`;
      }
      if (archetype === 'denim') {
        return `Watching: Waist ${activeConcern.triggerParams.targetWaistSize || '32'} Restock`;
      }
      return `Watching: Size ${activeConcern.triggerParams.targetSize || 'XL'} Restock`;

    case 'price':
      return activeConcern.triggerParams.targetPrice 
        ? `Watching: Price Drop < ₹${activeConcern.triggerParams.targetPrice}`
        : 'Watching: Price Drop & Bank Offers';

    case 'quality_info':
      if (archetype === 'watches') return 'Watching: Official 2-Yr Warranty & Water Rating';
      if (archetype === 'bags') return 'Watching: Verified 14" Laptop Fit Photos';
      if (archetype === 'ethnic') return 'Watching: Blouse Piece & Daylight Drape Photos';
      if (archetype === 'footwear') return 'Watching: Arch Cushion & Comfort Ratings';
      if (archetype === 'denim') return 'Watching: Stretch & Wash Fade Ratings';
      return 'Watching: Verified Fabric Opacity Reviews';

    case 'colour':
      return `Watching: ${activeConcern.triggerParams.targetColor || 'Preferred Colorway'}`;

    case 'delivery':
      if (archetype === 'ethnic') return 'Watching: Guaranteed Festive Date Delivery';
      if (archetype === 'watches') return 'Watching: Insured Express Dispatch';
      return 'Watching: 24hr Express Delivery';

    case 'purchase_timing':
      return `Remind on ${activeConcern.triggerParams.dateLabel || '3rd Sept (Salary)'}`;

    default:
      return 'Watching: Custom Concern Alert';
  }
}
