import { useState, useEffect } from 'react';
import { 
  Product, 
  WishlistItem, 
  BagItem, 
  NotificationItem, 
  ActiveConcern, 
  ConcernType, 
  AnalyticsEvent, 
  UserProfile,
  SimulationType 
} from '../types';
import { INITIAL_PRODUCTS, DEMO_USER_PROFILE } from '../data/mockCatalog';
import { generateCategoryNotification, getWishlistWatchBadge, getCategoryArchetype } from '../utils/categoryNotificationConfig';
import confetti from 'canvas-confetti';

interface ConcernModalState {
  isOpen: boolean;
  step: 3 | 4 | 5 | 6; // 3=Initial Bell Prompt, 4=Categories, 5=SubFlow, 6=Confirmation
  productId: string | null;
  selectedConcern: ConcernType | null;
  tempTriggerParams: Record<string, any>;
  confirmationMessage?: string;
}

interface AssuranceModalState {
  isOpen: boolean;
  productId: string | null;
  selectedSize: string;
  userHeightCm: number;
  fitPreference: 'tailored' | 'relaxed';
}

class AppStore {
  // Subscribers for React re-renders
  private listeners: Set<() => void> = new Set();

  // State properties
  public activeTab: 'home' | 'wishlist' | 'bag' | 'profile' = 'home';
  public deviceFrame: 'iphone15' | 'pixel8' | 'fullscreen' = 'iphone15';
  
  public products: Product[] = [...INITIAL_PRODUCTS];
  public userProfile: UserProfile = { ...DEMO_USER_PROFILE };
  
  // Wishlist with default items pre-populated for rich immediate demo
  public wishlist: WishlistItem[] = [
    {
      id: 'wi-1',
      productId: 'prod-2',
      product: INITIAL_PRODUCTS[1], // Roadster Kurta
      addedAt: '12 Aug 2026',
      dwellDays: 21,
      activeConcern: {
        id: 'con-1',
        wishlistItemId: 'wi-1',
        productId: 'prod-2',
        concernType: 'quality_info',
        label: 'Watching: Verified Fabric Opacity Reviews',
        triggerParams: { notificationPreference: 'Verified Fabric Reviews' },
        status: 'active',
        capturedAt: '12 Aug 2026'
      }
    },
    {
      id: 'wi-2',
      productId: 'prod-3',
      product: INITIAL_PRODUCTS[2], // Mango Blazer
      addedAt: '18 Aug 2026',
      dwellDays: 15,
      activeConcern: {
        id: 'con-2',
        wishlistItemId: 'wi-2',
        productId: 'prod-3',
        concernType: 'price',
        label: 'Watching: Price Drop < ₹3,000',
        triggerParams: { targetPrice: 2999, capturedPrice: 3490 },
        status: 'active',
        capturedAt: '18 Aug 2026'
      }
    },
    {
      id: 'wi-3',
      productId: 'prod-5',
      product: INITIAL_PRODUCTS[4], // Anouk Silk Kurta
      addedAt: '25 Aug 2026',
      dwellDays: 8,
      activeConcern: {
        id: 'con-3',
        wishlistItemId: 'wi-3',
        productId: 'prod-5',
        concernType: 'purchase_timing',
        label: 'Remind on 3rd Sept (Salary)',
        triggerParams: { targetDate: '2026-09-03', dateLabel: '3rd of Month (Salary)' },
        status: 'active',
        capturedAt: '25 Aug 2026'
      }
    }
  ];

  public bag: BagItem[] = [];

  // Modals & UI View State
  public activePdpProductId: string | null = null;
  public wishlistToast: { isOpen: boolean; productId: string | null } = { isOpen: false, productId: null };
  
  public concernModal: ConcernModalState = {
    isOpen: false,
    step: 3,
    productId: null,
    selectedConcern: null,
    tempTriggerParams: {}
  };

  public assuranceModal: AssuranceModalState = {
    isOpen: false,
    productId: null,
    selectedSize: 'M',
    userHeightCm: 163,
    fitPreference: 'relaxed'
  };

  public isSimulatorOpen: boolean = false;
  public isAnalyticsOpen: boolean = false;
  public isNotificationCenterOpen: boolean = false;

  public notifications: NotificationItem[] = [
    {
      id: 'notif-watch-1',
      productId: 'prod-29',
      brandName: 'Fossil',
      productName: 'Men Grant Chronograph Watch',
      productImage: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=800&q=80',
      categoryChip: '⌚ Horology Watch Alert',
      title: 'Dial Size In Stock: 44mm Case Diameter ⌚',
      body: 'Fossil Grant Chronograph is now available in 44mm dial with 2-year official brand warranty registered.',
      concernType: 'size',
      timestamp: '15m ago',
      isRead: false
    },
    {
      id: 'notif-shoe-1',
      productId: 'prod-7',
      brandName: 'Puma',
      productName: 'Men Retaliate 2 Running Shoes',
      productImage: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80',
      categoryChip: '👟 Footwear Restock Alert',
      title: 'Shoe Size Restocked: UK 9 Available! 👟',
      body: 'Puma Men Running Shoes in size UK 9 are back in stock (4 pairs left). 18 verified runners rated arch cushioning 4.8/5.',
      concernType: 'size',
      timestamp: '1h ago',
      isRead: false
    },
    {
      id: 'notif-bag-1',
      productId: 'prod-13',
      brandName: 'Mango',
      productName: 'Women Structured Leather Tote Bag',
      productImage: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80',
      categoryChip: '👜 Handbag Dimension Alert',
      title: 'Laptop Fit & Capacity Photos Verified 💻',
      body: 'Verified photos uploaded: Easily accommodates 14" MacBook & 11" iPad with padded protection & reinforced gold-tone zips.',
      concernType: 'quality_info',
      timestamp: '3h ago',
      isRead: false
    },
    {
      id: 'notif-saree-1',
      productId: 'prod-12',
      brandName: 'Anouk',
      productName: 'Pure Banarasi Woven Zari Saree',
      productImage: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
      categoryChip: '🥻 Saree Drape Verified',
      title: 'Daylight Drape & Blouse Piece Photos Uploaded 🥻',
      body: '14 high-resolution daylight drape photos added. 0.8m unstitched matching blouse piece with genuine Zari border verified.',
      concernType: 'quality_info',
      timestamp: '5h ago',
      isRead: false
    },
    {
      id: 'notif-denim-1',
      productId: 'prod-6',
      brandName: "Levi's",
      productName: "Men 511 Slim Fit Flex Jeans",
      productImage: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=800&q=80',
      categoryChip: '👖 Denim Waist Alert',
      title: 'Denim Size Restocked: Waist 32 Available 👖',
      body: "Levi's 511 Slim Fit Jeans in Waist 32 (32 Inseam) are back in stock. 94% stretch retention after 10 washes verified.",
      concernType: 'size',
      timestamp: '1d ago',
      isRead: true
    }
  ];

  public activePushBanner: NotificationItem | null = null;
  public analyticsEvents: AnalyticsEvent[] = [];

  constructor() {
    this.logEvent('app_initialized', { timestamp: new Date().toISOString() });
  }

  // Subscribe / Unsubscribe for React Hook
  public subscribe(listener: () => void) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notify() {
    this.listeners.forEach((listener) => listener());
  }

  // Analytics Telemetry
  public logEvent(name: string, payload: Record<string, any> = {}) {
    const newEvent: AnalyticsEvent = {
      id: `evt-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      name,
      timestamp: new Date().toLocaleTimeString(),
      payload
    };
    this.analyticsEvents = [newEvent, ...this.analyticsEvents.slice(0, 49)];
    this.notify();
  }

  // Tab & Frame Actions
  public setActiveTab(tab: 'home' | 'wishlist' | 'bag' | 'profile') {
    this.activeTab = tab;
    this.activePdpProductId = null;
    this.concernModal.isOpen = false;
    this.assuranceModal.isOpen = false;
    this.isNotificationCenterOpen = false;
    this.logEvent('tab_navigated', { tab });
    this.notify();
  }

  public setDeviceFrame(frame: 'iphone15' | 'pixel8' | 'fullscreen') {
    this.deviceFrame = frame;
    this.notify();
  }

  // PDP Management
  public openPdp(productId: string) {
    this.activePdpProductId = productId;
    const prod = this.products.find(p => p.id === productId);
    this.logEvent('pdp_viewed', { productId, brand: prod?.brand, name: prod?.name });
    this.notify();
  }

  public closePdp() {
    this.activePdpProductId = null;
    this.notify();
  }

  // Layer A: Wishlist & Concern Flow (Wireframe steps 1 -> 7)
  public toggleWishlist(productId: string) {
    const existingIndex = this.wishlist.findIndex(item => item.productId === productId);
    const prod = this.products.find(p => p.id === productId);
    if (!prod) return;

    if (existingIndex >= 0) {
      // Remove from wishlist
      this.wishlist = this.wishlist.filter(item => item.productId !== productId);
      this.logEvent('wishlist_removed', { productId });
      this.notify();
    } else {
      // Step 2: Add to wishlist + Show Step 2 Toast & Step 3 Bell Prompt
      const newItem: WishlistItem = {
        id: `wi-${Date.now()}`,
        productId,
        product: prod,
        addedAt: 'Just now',
        dwellDays: 0
      };
      this.wishlist = [newItem, ...this.wishlist];
      this.logEvent('wishlist_added', { productId, brand: prod.brand, price: prod.price });

      // Trigger Step 2 Floating Banner
      this.wishlistToast = { isOpen: true, productId };
      
      // Trigger Step 3 Bell Prompt Popup Bottomsheet
      this.concernModal = {
        isOpen: true,
        step: 3,
        productId,
        selectedConcern: null,
        tempTriggerParams: {}
      };
      this.logEvent('concern_prompt_shown', { productId, step: 3 });
      this.notify();
    }
  }

  public closeWishlistToast() {
    this.wishlistToast = { isOpen: false, productId: null };
    this.notify();
  }

  public proceedToConcernCategories() {
    // Step 3 "YES, NOTIFY ME" -> Step 4 Category list
    this.concernModal.step = 4;
    this.logEvent('notification_opted_in', { productId: this.concernModal.productId });
    this.notify();
  }

  public dismissConcernModal() {
    // Step 3 "NOT NOW" or close
    this.logEvent('concern_prompt_dismissed', { productId: this.concernModal.productId });
    this.concernModal = {
      isOpen: false,
      step: 3,
      productId: null,
      selectedConcern: null,
      tempTriggerParams: {}
    };
    this.notify();
  }

  public selectConcernCategory(concern: ConcernType) {
    // Step 4 Selection -> Step 5 Sub-Flow modal
    this.concernModal.selectedConcern = concern;
    this.concernModal.step = 5;
    this.logEvent('concern_selected', { productId: this.concernModal.productId, concern });
    this.notify();
  }

  public backToConcernCategories() {
    this.concernModal.step = 4;
    this.notify();
  }

  public saveConcernTrigger(params: Record<string, any>) {
    const { productId, selectedConcern } = this.concernModal;
    if (!productId || !selectedConcern) return;

    const wishItem = this.wishlist.find(w => w.productId === productId);
    const product = this.products.find(p => p.id === productId);

    const generated = product 
      ? generateCategoryNotification(product, selectedConcern, params)
      : null;

    const label = (product && wishItem)
      ? getWishlistWatchBadge({
          id: 'temp',
          wishlistItemId: wishItem.id,
          productId,
          concernType: selectedConcern,
          label: '',
          triggerParams: params,
          status: 'active',
          capturedAt: 'Just now'
        }, product)
      : 'Watching concern';

    const confirmationMsg = generated 
      ? generated.body 
      : 'We will notify you as soon as this update is available.';

    if (wishItem) {
      wishItem.activeConcern = {
        id: `con-${Date.now()}`,
        wishlistItemId: wishItem.id,
        productId,
        concernType: selectedConcern,
        label,
        categoryChip: generated?.categoryChip,
        triggerParams: params,
        status: 'active',
        capturedAt: 'Just now'
      };
    }

    this.logEvent('trigger_configured', { 
      productId, 
      concernType: selectedConcern, 
      params 
    });

    // Step 6: Show Confirmation Modal
    this.concernModal.step = 6;
    this.concernModal.confirmationMessage = confirmationMsg;
    this.notify();
  }

  public completeConcernFlow() {
    const { productId, selectedConcern, tempTriggerParams } = this.concernModal;
    this.concernModal.isOpen = false;
    this.closeWishlistToast();
    this.notify();

    // Trigger realistic category-intelligent simulated push notification banner for this exact item
    if (productId && selectedConcern) {
      const prod = this.products.find(p => p.id === productId);
      const wishItem = this.wishlist.find(w => w.productId === productId);
      const currentParams = wishItem?.activeConcern?.triggerParams || tempTriggerParams || {};

      setTimeout(() => {
        if (prod) {
          const generated = generateCategoryNotification(prod, selectedConcern, currentParams);
          const pushNotif: NotificationItem = {
            id: `notif-${Date.now()}`,
            productId: prod.id,
            brandName: prod.brand,
            productName: prod.name,
            productImage: prod.images[0],
            categoryChip: generated.categoryChip,
            title: generated.title,
            body: generated.body,
            concernType: selectedConcern,
            timestamp: 'Just now',
            isRead: false
          };
          this.activePushBanner = pushNotif;
          this.notifications = [pushNotif, ...this.notifications];
          this.logEvent('notification_sent', { productId: prod.id, concern: selectedConcern });
          this.notify();
        }
      }, 2200);
    }
  }

  // Layer B: Pre-Purchase Confidence Bridge
  public openAssuranceModal(productId: string) {
    const prod = this.products.find(p => p.id === productId);
    if (!prod) return;

    this.assuranceModal = {
      isOpen: true,
      productId,
      selectedSize: prod.fitConsensus.recommendedSizeForUser || 'M',
      userHeightCm: this.userProfile.heightCm,
      fitPreference: this.userProfile.preferredFit
    };
    this.logEvent('assurance_modal_opened', { productId, brand: prod.brand });
    this.notify();
  }

  public closeAssuranceModal() {
    this.assuranceModal.isOpen = false;
    this.notify();
  }

  public updateAssuranceHeight(heightCm: number) {
    this.assuranceModal.userHeightCm = heightCm;
    this.notify();
  }

  public updateAssuranceSize(size: string) {
    this.assuranceModal.selectedSize = size;
    this.notify();
  }

  // Bag & Swap Guarantee Flow
  public moveToBagWithSwap(productId: string, size?: string) {
    const prod = this.products.find(p => p.id === productId);
    if (!prod) return;

    const chosenSize = size || this.assuranceModal.selectedSize || 'M';
    const newBagItem: BagItem = {
      id: `bag-${Date.now()}`,
      productId,
      product: prod,
      selectedSize: chosenSize,
      quantity: 1,
      hasSwapWarranty: true,
      warrantyCertificateId: `SWAP-GUARANTEE-${Math.floor(100000 + Math.random() * 900000)}`,
      addedAt: 'Just now'
    };

    this.bag = [newBagItem, ...this.bag];

    // Trigger celebration confetti
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#ff3f6c', '#03a685', '#282c3f', '#f5a623']
    });

    this.logEvent('move_to_bag_clicked', { 
      productId, 
      size: chosenSize, 
      warrantyAttached: true 
    });

    // Close any open modals
    this.assuranceModal.isOpen = false;
    this.activePdpProductId = null;
    this.notify();
  }

  public removeFromBag(bagItemId: string) {
    this.bag = this.bag.filter(item => item.id !== bagItemId);
    this.logEvent('bag_item_removed', { bagItemId });
    this.notify();
  }

  // Live Simulator Engine
  public triggerSimulation(type: SimulationType) {
    this.logEvent('simulation_triggered', { type });

    if (type === 'size_xl_restock') {
      // Restock Size XL on HRX Shirt (prod-1)
      const hrx = this.products.find(p => p.id === 'prod-1');
      if (hrx) {
        const xlSize = hrx.availableSizes.find(s => s.size === 'XL');
        if (xlSize) {
          xlSize.inStock = true;
          xlSize.stockCount = 4;
          xlSize.lowStockText = 'Only 4 left';
        }
      }

      // Step 7: Push banner
      const pushNotif: NotificationItem = {
        id: `notif-${Date.now()}`,
        productId: 'prod-1',
        brandName: 'HRX by Hrithik Roshan',
        productName: 'Men Green Solid Casual Shirt',
        productImage: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=80',
        title: 'Good news!',
        body: 'The XL size you wanted is now available. Tap to view the product.',
        concernType: 'size',
        timestamp: 'Just now',
        isRead: false
      };

      this.activePushBanner = pushNotif;
      this.notifications = [pushNotif, ...this.notifications];
      this.logEvent('notification_sent', { type: 'size_xl_restock', productId: 'prod-1' });

    } else if (type === 'price_drop') {
      // Price drop on Roadster Kurta (prod-2)
      const roadster = this.products.find(p => p.id === 'prod-2');
      if (roadster) {
        roadster.price = 749;
        roadster.discountPct = 50;
      }

      const pushNotif: NotificationItem = {
        id: `notif-${Date.now()}`,
        productId: 'prod-2',
        brandName: 'Roadster',
        productName: 'Women Pure Cotton A-Line Kurta',
        productImage: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80',
        title: 'Price Drop Alert! 💰',
        body: 'Price dropped from ₹899 to ₹749 for your wishlisted Kurta.',
        concernType: 'price',
        timestamp: 'Just now',
        isRead: false
      };

      this.activePushBanner = pushNotif;
      this.notifications = [pushNotif, ...this.notifications];
      this.logEvent('notification_sent', { type: 'price_drop', productId: 'prod-2' });

    } else if (type === 'color_available') {
      const pushNotif: NotificationItem = {
        id: `notif-${Date.now()}`,
        productId: 'prod-3',
        brandName: 'Mango',
        productName: 'Women Relaxed Fit Linen Blazer',
        productImage: 'https://images.unsplash.com/photo-1548624149-f9b1859aa9d0?auto=format&fit=crop&w=800&q=80',
        title: 'Colour Available! 🎨',
        body: 'Sage Green variant is now in stock in your size.',
        concernType: 'colour',
        timestamp: 'Just now',
        isRead: false
      };

      this.activePushBanner = pushNotif;
      this.notifications = [pushNotif, ...this.notifications];
      this.logEvent('notification_sent', { type: 'color_available', productId: 'prod-3' });

    } else if (type === 'new_customer_reviews') {
      const pushNotif: NotificationItem = {
        id: `notif-${Date.now()}`,
        productId: 'prod-2',
        brandName: 'Roadster',
        productName: 'Women Cotton A-Line Kurta',
        title: 'New Daylight Fabric Photos Added! 📸',
        body: '14 new verified customer daylight photos & weave ratings added.',
        concernType: 'quality_info',
        timestamp: 'Just now',
        isRead: false
      };

      this.activePushBanner = pushNotif;
      this.notifications = [pushNotif, ...this.notifications];
      this.logEvent('notification_sent', { type: 'new_customer_reviews', productId: 'prod-2' });

    } else if (type === 'salary_date_reminder') {
      const pushNotif: NotificationItem = {
        id: `notif-${Date.now()}`,
        productId: 'prod-5',
        brandName: 'Anouk',
        productName: 'Chanderi Silk Festive Kurta Set',
        productImage: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80',
        title: 'Your Saved Date Reminder 📅',
        body: "You saved this festive piece for today (Salary Day). Ready to complete your order?",
        concernType: 'purchase_timing',
        timestamp: 'Just now',
        isRead: false
      };

      this.activePushBanner = pushNotif;
      this.notifications = [pushNotif, ...this.notifications];
      this.logEvent('notification_sent', { type: 'salary_date_reminder', productId: 'prod-5' });

    } else if (type === 'ai_summarized_digest') {
      // Multi-Product AI Digest Card
      const digestNotif: NotificationItem = {
        id: `digest-${Date.now()}`,
        title: '✨ AI Wishlist Digest (3 Updates)',
        body: 'We consolidated updates for your wishlisted items into one clutter-free summary:',
        concernType: 'other',
        timestamp: 'Just now',
        isRead: false,
        isDigest: true,
        digestItems: [
          {
            productId: 'prod-1',
            brand: 'HRX',
            name: 'Men Casual Shirt',
            resolvedConcern: 'Size XL restocked (Only 4 left)'
          },
          {
            productId: 'prod-2',
            brand: 'Roadster',
            name: 'Pure Cotton Kurta',
            resolvedConcern: '14 verified daylight fabric reviews uploaded'
          },
          {
            productId: 'prod-5',
            brand: 'Anouk',
            name: 'Chanderi Silk Kurta',
            resolvedConcern: 'Saved salary date reminder'
          }
        ]
      };

      this.activePushBanner = digestNotif;
      this.notifications = [digestNotif, ...this.notifications];
      this.logEvent('notification_sent', { type: 'ai_summarized_digest', count: 3 });

    } else if (type === 'reset_all') {
      this.products = [...INITIAL_PRODUCTS];
      this.activePushBanner = null;
      this.notify();
    }

    this.notify();
  }

  public dismissPushBanner() {
    this.activePushBanner = null;
    this.notify();
  }

  public openNotificationCenter() {
    this.isNotificationCenterOpen = true;
    this.notify();
  }

  public closeNotificationCenter() {
    this.isNotificationCenterOpen = false;
    this.notify();
  }

  public toggleSimulator() {
    this.isSimulatorOpen = !this.isSimulatorOpen;
    this.notify();
  }

  public toggleAnalytics() {
    this.isAnalyticsOpen = !this.isAnalyticsOpen;
    this.notify();
  }
}

export const appStore = new AppStore();

// React Custom Hook
export function useAppStore() {
  const [, setTick] = useState(0);

  useEffect(() => {
    const unsubscribe = appStore.subscribe(() => {
      setTick(t => t + 1);
    });
    return unsubscribe;
  }, []);

  return appStore;
}
