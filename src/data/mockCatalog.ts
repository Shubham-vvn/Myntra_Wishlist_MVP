import { Product, UserProfile } from '../types';

export const DEMO_USER_PROFILE: UserProfile = {
  name: 'Priya Sharma',
  age: 24,
  city: 'Bengaluru',
  pincode: '560001',
  heightCm: 163, // 5'4"
  bustCm: 88,
  waistCm: 72,
  hipCm: 94,
  usualSize: 'M',
  preferredFit: 'relaxed'
};

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    sku: 'HRX-SH-GRN-01',
    brand: 'HRX by Hrithik Roshan',
    name: 'Men Green Solid Casual Shirt',
    category: 'Shirts',
    price: 1299,
    mrp: 1799,
    discountPct: 28,
    rating: 4.3,
    ratingCount: 12600,
    images: [
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Olive green solid casual shirt with spread collar, button placket, 1 patch pocket, long regular sleeves, curved hem. Designed for athletic movement with breathable micro-cotton twill.',
    availableSizes: [
      { size: 'S', inStock: true, stockCount: 14 },
      { size: 'M', inStock: true, stockCount: 8 },
      { size: 'L', inStock: true, stockCount: 2, lowStockText: 'Only 2 left' },
      { size: 'XL', inStock: false, stockCount: 0, lowStockText: 'Out of Stock' },
      { size: 'XXL', inStock: true, stockCount: 5 }
    ],
    availableColors: [
      { name: 'Olive Green', hex: '#3d4d3d', inStock: true, image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=80' },
      { name: 'Navy Blue', hex: '#1c2841', inStock: true, image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=800&q=80' },
      { name: 'Charcoal Black', hex: '#222222', inStock: true, image: 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=800&q=80' }
    ],
    fabricDNA: {
      material: '100% Combed Cotton Twill',
      composition: 'Pure Natural Cotton Weave',
      gsmWeight: 175,
      opacityScore: 4.8,
      opacityLabel: 'Completely Opaque (Zero Show-through)',
      breathabilityScore: 4.6,
      breathabilityLabel: 'High Airflow Ventilation',
      weaveType: 'Dense 40s Twill Weave',
      stretchRating: 'Natural mechanical 2-way stretch',
      macroImages: [
        'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=800&q=80'
      ]
    },
    fitConsensus: {
      trueToSizePct: 88,
      totalVoters: 320,
      runsSmallPct: 8,
      trueToSizeCount: 282,
      runsLargePct: 4,
      fitAdvice: 'Fits true to size for athletic and regular body profiles. Tailored chest taper with extra shoulder mobility.',
      recommendedSizeForUser: 'L',
      userHeightHistogram: [
        { heightRange: "5'2\" - 5'5\"", runsSmallPct: 6, trueToSizePct: 89, runsLargePct: 5, voterCount: 94 },
        { heightRange: "5'6\" - 5'9\"", runsSmallPct: 7, trueToSizePct: 91, runsLargePct: 2, voterCount: 142 },
        { heightRange: "5'10\" - 6'2\"", runsSmallPct: 12, trueToSizePct: 84, runsLargePct: 4, voterCount: 84 }
      ]
    },
    swapEligible: true,
    deliveryEstimate: {
      minDays: 2,
      maxDays: 4,
      pincode: '560001',
      expressAvailable: true
    },
    reviews: [
      {
        id: 'rev-1',
        userName: 'Vikram Mehta',
        userHeight: "5'10\"",
        purchasedSize: 'L',
        fitFeedback: 'True to Size',
        comment: 'Great heavy cotton fabric, collar holds crisp shape even after 4 machine washes. Sleeves taper well.',
        rating: 5,
        date: '24 Aug 2026',
        isVerifiedBuyer: true
      },
      {
        id: 'rev-2',
        userName: 'Arjun Sen',
        userHeight: "5'8\"",
        purchasedSize: 'M',
        fitFeedback: 'True to Size',
        comment: 'Color is exact daylight forest green, zero chemical odor. Worth the price.',
        rating: 4,
        date: '18 Aug 2026',
        isVerifiedBuyer: true
      }
    ]
  },
  {
    id: 'prod-2',
    sku: 'RDS-KR-CTN-02',
    brand: 'Roadster',
    name: 'Women Embroidered Pure Cotton A-Line Kurta',
    category: 'Kurtas',
    price: 899,
    mrp: 1499,
    discountPct: 40,
    rating: 4.4,
    ratingCount: 8900,
    images: [
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Navy blue and rust orange embroidered A-line kurta with mandarin collar, three-quarter sleeves, flared hem with side slits. 100% pre-shrunk cotton.',
    availableSizes: [
      { size: 'XS', inStock: true, stockCount: 5 },
      { size: 'S', inStock: true, stockCount: 12 },
      { size: 'M', inStock: true, stockCount: 18 },
      { size: 'L', inStock: true, stockCount: 7 },
      { size: 'XL', inStock: true, stockCount: 4 },
      { size: 'XXL', inStock: false, stockCount: 0, lowStockText: 'Out of Stock' }
    ],
    availableColors: [
      { name: 'Navy Blue', hex: '#16233b', inStock: true, image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80' },
      { name: 'Rust Maroon', hex: '#7c2d28', inStock: true, image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80' }
    ],
    fabricDNA: {
      material: '100% Slub Cotton',
      composition: 'Breathable Pure Cotton Yarns',
      gsmWeight: 160,
      opacityScore: 4.7,
      opacityLabel: 'High Opacity (No slip required)',
      breathabilityScore: 4.9,
      breathabilityLabel: 'Ultra Breathable Summer Weave',
      weaveType: 'Textured Slub Weave',
      stretchRating: 'Zero synthetic stretch, pre-washed against shrinkage',
      macroImages: [
        'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80'
      ]
    },
    fitConsensus: {
      trueToSizePct: 86,
      totalVoters: 245,
      runsSmallPct: 9,
      trueToSizeCount: 211,
      runsLargePct: 5,
      fitAdvice: 'Fits identical to standard Mango kurtas in Size M. Relaxed A-line silhouette below waist.',
      recommendedSizeForUser: 'M',
      userHeightHistogram: [
        { heightRange: "5'0\" - 5'3\"", runsSmallPct: 4, trueToSizePct: 88, runsLargePct: 8, voterCount: 80 },
        { heightRange: "5'4\" - 5'7\"", runsSmallPct: 8, trueToSizePct: 87, runsLargePct: 5, voterCount: 120 },
        { heightRange: "5'8\" - 6'0\"", runsSmallPct: 15, trueToSizePct: 82, runsLargePct: 3, voterCount: 45 }
      ]
    },
    swapEligible: true,
    deliveryEstimate: {
      minDays: 3,
      maxDays: 5,
      pincode: '560001',
      expressAvailable: false
    },
    reviews: [
      {
        id: 'rev-3',
        userName: 'Ananya Roy',
        userHeight: "5'4\"",
        purchasedSize: 'M',
        fitFeedback: 'True to Size',
        comment: 'Fabric is not see-through at all! Washed twice and no color bleeding. Beautiful embroidery.',
        rating: 5,
        date: '20 Aug 2026',
        isVerifiedBuyer: true
      }
    ]
  },
  {
    id: 'prod-3',
    sku: 'MNG-BLZ-LNN-03',
    brand: 'Mango',
    name: 'Women Relaxed Fit Linen Blend Tailored Blazer',
    category: 'Blazers',
    price: 3490,
    mrp: 4990,
    discountPct: 30,
    rating: 4.6,
    ratingCount: 3400,
    images: [
      'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1548624149-f9b1859aa9d0?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Earthy beige single-breasted tailored blazer in breathable European flax linen blend. Notched lapel, horn buttons, interior satin piping.',
    availableSizes: [
      { size: 'XS', inStock: true, stockCount: 3 },
      { size: 'S', inStock: true, stockCount: 6 },
      { size: 'M', inStock: true, stockCount: 4 },
      { size: 'L', inStock: true, stockCount: 2, lowStockText: 'Only 2 left' },
      { size: 'XL', inStock: false, stockCount: 0, lowStockText: 'Out of Stock' }
    ],
    availableColors: [
      { name: 'Oatmeal Beige', hex: '#d9cdb8', inStock: true, image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=800&q=80' },
      { name: 'Sage Green', hex: '#8a9a86', inStock: true, image: 'https://images.unsplash.com/photo-1548624149-f9b1859aa9d0?auto=format&fit=crop&w=800&q=80' }
    ],
    fabricDNA: {
      material: '55% European Linen, 45% Viscose',
      composition: 'Linen Viscose Blend with Structure',
      gsmWeight: 220,
      opacityScore: 5.0,
      opacityLabel: '100% Opaque Heavy Weave',
      breathabilityScore: 4.5,
      breathabilityLabel: 'Airy Linen Breathability',
      weaveType: 'Tailored Twill Canvas',
      stretchRating: 'Zero stretch, structured shoulder pad',
      macroImages: [
        'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=800&q=80'
      ]
    },
    fitConsensus: {
      trueToSizePct: 91,
      totalVoters: 180,
      runsSmallPct: 3,
      trueToSizeCount: 164,
      runsLargePct: 6,
      fitAdvice: 'Relaxed oversized European silhouette. If you prefer a snug fitted waist, size down.',
      recommendedSizeForUser: 'S',
      userHeightHistogram: [
        { heightRange: "5'2\" - 5'5\"", runsSmallPct: 2, trueToSizePct: 92, runsLargePct: 6, voterCount: 75 },
        { heightRange: "5'6\" - 5'9\"", runsSmallPct: 4, trueToSizePct: 90, runsLargePct: 6, voterCount: 85 },
        { heightRange: "5'10\" - 6'2\"", runsSmallPct: 5, trueToSizePct: 88, runsLargePct: 7, voterCount: 20 }
      ]
    },
    swapEligible: true,
    deliveryEstimate: {
      minDays: 2,
      maxDays: 3,
      pincode: '560001',
      expressAvailable: true
    },
    reviews: [
      {
        id: 'rev-4',
        userName: 'Sanya Kapoor',
        userHeight: "5'5\"",
        purchasedSize: 'S',
        fitFeedback: 'True to Size',
        comment: 'Looks effortlessly high-end! Shoulder structure is immaculate and fabric does not crease excessively.',
        rating: 5,
        date: '15 Aug 2026',
        isVerifiedBuyer: true
      }
    ]
  },
  {
    id: 'prod-4',
    sku: 'TT-DRS-FLR-04',
    brand: 'Tokyo Talkies',
    name: 'Floral Print Flared Midi Dress with Tie-Up',
    category: 'Dresses',
    price: 999,
    mrp: 1999,
    discountPct: 50,
    rating: 4.2,
    ratingCount: 6200,
    images: [
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Blush pink floral printed woven midi fit & flare dress, sweetheart neck, short puff sleeves, smocked back for flexible bust fit.',
    availableSizes: [
      { size: 'XS', inStock: true, stockCount: 6 },
      { size: 'S', inStock: true, stockCount: 14 },
      { size: 'M', inStock: true, stockCount: 9 },
      { size: 'L', inStock: false, stockCount: 0, lowStockText: 'Out of Stock' },
      { size: 'XL', inStock: true, stockCount: 3 }
    ],
    availableColors: [
      { name: 'Blush Pink', hex: '#e8b4b8', inStock: true, image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=800&q=80' },
      { name: 'Powder Blue', hex: '#a4c2db', inStock: true, image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=800&q=80' }
    ],
    fabricDNA: {
      material: '100% Georgette with Butter Crepe Lining',
      composition: 'Lightweight Georgette with Opaque Inner Lining',
      gsmWeight: 140,
      opacityScore: 4.6,
      opacityLabel: 'Fully Lined (Zero transparency)',
      breathabilityScore: 4.4,
      breathabilityLabel: 'Breezy & Flowing Drape',
      weaveType: 'Fine Crepe Chiffon Weave',
      stretchRating: 'Smocked elastic back bodice',
      macroImages: [
        'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=800&q=80'
      ]
    },
    fitConsensus: {
      trueToSizePct: 87,
      totalVoters: 210,
      runsSmallPct: 10,
      trueToSizeCount: 183,
      runsLargePct: 3,
      fitAdvice: 'Smocked elastic back accommodates variable bust sizes comfortably. Length reaches mid-calf.',
      recommendedSizeForUser: 'M',
      userHeightHistogram: [
        { heightRange: "5'0\" - 5'3\"", runsSmallPct: 8, trueToSizePct: 85, runsLargePct: 7, voterCount: 70 },
        { heightRange: "5'4\" - 5'7\"", runsSmallPct: 9, trueToSizePct: 89, runsLargePct: 2, voterCount: 105 },
        { heightRange: "5'8\" - 6'0\"", runsSmallPct: 15, trueToSizePct: 83, runsLargePct: 2, voterCount: 35 }
      ]
    },
    swapEligible: true,
    deliveryEstimate: {
      minDays: 3,
      maxDays: 4,
      pincode: '560001',
      expressAvailable: true
    },
    reviews: [
      {
        id: 'rev-5',
        userName: 'Deepika Nair',
        userHeight: "5'3\"",
        purchasedSize: 'S',
        fitFeedback: 'True to Size',
        comment: 'Drapes like a dream! The smocked back gives a flattering cinch at the waist without squeezing.',
        rating: 5,
        date: '10 Aug 2026',
        isVerifiedBuyer: true
      }
    ]
  },
  {
    id: 'prod-5',
    sku: 'ANK-KRT-SLK-05',
    brand: 'Anouk',
    name: 'Chanderi Silk Festive Kurta with Dupatta',
    category: 'Festive',
    price: 1899,
    mrp: 3299,
    discountPct: 42,
    rating: 4.5,
    ratingCount: 5100,
    images: [
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Emerald green and gold zari woven chanderi silk straight kurta with round neck, side slits, paired with organza zari border dupatta.',
    availableSizes: [
      { size: 'S', inStock: true, stockCount: 8 },
      { size: 'M', inStock: true, stockCount: 15 },
      { size: 'L', inStock: true, stockCount: 6 },
      { size: 'XL', inStock: false, stockCount: 0, lowStockText: 'Out of Stock' },
      { size: 'XXL', inStock: true, stockCount: 2 }
    ],
    availableColors: [
      { name: 'Emerald Green', hex: '#0f523f', inStock: true, image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80' },
      { name: 'Royal Ruby', hex: '#8b1e2f', inStock: true, image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80' }
    ],
    fabricDNA: {
      material: 'Chanderi Silk Blend (80% Silk, 20% Cotton)',
      composition: 'Traditional Chanderi Loom Weave with Cotton Lining',
      gsmWeight: 190,
      opacityScore: 4.9,
      opacityLabel: 'Opaque with Cotton Inner Slip',
      breathabilityScore: 4.2,
      breathabilityLabel: 'Festive Silk Comfort',
      weaveType: 'Chanderi Zari Brocade',
      stretchRating: 'Zero stretch, tailored royal drape',
      macroImages: [
        'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80'
      ]
    },
    fitConsensus: {
      trueToSizePct: 89,
      totalVoters: 160,
      runsSmallPct: 6,
      trueToSizeCount: 142,
      runsLargePct: 5,
      fitAdvice: 'Straight cut royal silhouette. If between sizes, size up for comfortable seated posture.',
      recommendedSizeForUser: 'M',
      userHeightHistogram: [
        { heightRange: "5'0\" - 5'3\"", runsSmallPct: 5, trueToSizePct: 90, runsLargePct: 5, voterCount: 50 },
        { heightRange: "5'4\" - 5'7\"", runsSmallPct: 6, trueToSizePct: 89, runsLargePct: 5, voterCount: 85 },
        { heightRange: "5'8\" - 6'0\"", runsSmallPct: 8, trueToSizePct: 86, runsLargePct: 6, voterCount: 25 }
      ]
    },
    swapEligible: true,
    deliveryEstimate: {
      minDays: 2,
      maxDays: 4,
      pincode: '560001',
      expressAvailable: true
    },
    reviews: [
      {
        id: 'rev-6',
        userName: 'Pooja Hegde',
        userHeight: "5'6\"",
        purchasedSize: 'M',
        fitFeedback: 'True to Size',
        comment: 'Zari work is real refined metallic thread, not cheap glitter print. Received endless compliments at cousin wedding.',
        rating: 5,
        date: '28 Aug 2026',
        isVerifiedBuyer: true
      }
    ]
  },
  {
    id: 'prod-6',
    sku: 'LEV-511-SLM-06',
    brand: "Levi's",
    name: '511 Slim Fit Stretchable Denim Jeans',
    category: 'Jeans',
    price: 2499,
    mrp: 3999,
    discountPct: 37,
    rating: 4.7,
    ratingCount: 18400,
    images: [
      'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1582552938357-32b906df40cb?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1604176354204-9268737828e4?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Dark indigo washed 5-pocket mid-rise jeans, clean look with light whiskering, slim leg from hip to ankle with Levi\'s Flex comfort stretch.',
    availableSizes: [
      { size: 'S', inStock: true, stockCount: 10 },
      { size: 'M', inStock: true, stockCount: 20 },
      { size: 'L', inStock: true, stockCount: 15 },
      { size: 'XL', inStock: true, stockCount: 8 },
      { size: 'XXL', inStock: true, stockCount: 3 }
    ],
    availableColors: [
      { name: 'Dark Indigo', hex: '#1e2b3c', inStock: true, image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=800&q=80' }
    ],
    fabricDNA: {
      material: '98% Cotton, 2% Elastane',
      composition: 'Heavyweight Denim with Flex Elasticity',
      gsmWeight: 340,
      opacityScore: 5.0,
      opacityLabel: 'Completely Opaque Heavyweight Denim',
      breathabilityScore: 4.0,
      breathabilityLabel: 'Structured All-Season Denim',
      weaveType: '3x1 Right Hand Twill',
      stretchRating: '2-way elastane recovery stretch',
      macroImages: [
        'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=800&q=80'
      ]
    },
    fitConsensus: {
      trueToSizePct: 92,
      totalVoters: 410,
      runsSmallPct: 4,
      trueToSizeCount: 377,
      runsLargePct: 4,
      fitAdvice: 'Legendary 511 slim cut. True to waist size with 2% elastane giving comfortable knee flex.',
      recommendedSizeForUser: 'M',
      userHeightHistogram: [
        { heightRange: "5'4\" - 5'7\"", runsSmallPct: 3, trueToSizePct: 93, runsLargePct: 4, voterCount: 150 },
        { heightRange: "5'8\" - 5'11\"", runsSmallPct: 4, trueToSizePct: 92, runsLargePct: 4, voterCount: 200 },
        { heightRange: "6'0\" - 6'3\"", runsSmallPct: 5, trueToSizePct: 90, runsLargePct: 5, voterCount: 60 }
      ]
    },
    swapEligible: true,
    deliveryEstimate: {
      minDays: 2,
      maxDays: 3,
      pincode: '560001',
      expressAvailable: true
    },
    reviews: [
      {
        id: 'rev-7',
        userName: 'Rohan Sharma',
        userHeight: "5'11\"",
        purchasedSize: 'L',
        fitFeedback: 'True to Size',
        comment: 'Authentic red tab quality. Deep indigo tint stays dark after multiple washes.',
        rating: 5,
        date: '22 Aug 2026',
        isVerifiedBuyer: true
      }
    ]
  },
  {
    id: 'prod-7',
    sku: 'RDT-SNK-LTH-07',
    brand: 'Red Tape',
    name: 'Men Classic White Leather Court Sneakers',
    category: 'Footwear',
    price: 1599,
    mrp: 3599,
    discountPct: 55,
    rating: 4.3,
    ratingCount: 11200,
    images: [
      'https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Crisp all-white low-top court sneakers with perforated toe box, cushioned memory foam insole, durable vulcanized rubber grip outsole.',
    availableSizes: [
      { size: 'S', inStock: true, stockCount: 8 },
      { size: 'M', inStock: true, stockCount: 12 },
      { size: 'L', inStock: false, stockCount: 0, lowStockText: 'Out of Stock' },
      { size: 'XL', inStock: true, stockCount: 4 }
    ],
    availableColors: [
      { name: 'Triple White', hex: '#f8f8f8', inStock: true, image: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=800&q=80' }
    ],
    fabricDNA: {
      material: 'Genuine PU Leather Upper & Rubber Sole',
      composition: 'Water-Resistant Synthetic Leather',
      gsmWeight: 450,
      opacityScore: 5.0,
      opacityLabel: 'Solid Leather Structure',
      breathabilityScore: 3.8,
      breathabilityLabel: 'Perforated Toe Ventilation',
      weaveType: 'Smooth Grain Leatherette',
      stretchRating: 'Molds to foot shape after 2 days wear',
      macroImages: [
        'https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=800&q=80'
      ]
    },
    fitConsensus: {
      trueToSizePct: 85,
      totalVoters: 290,
      runsSmallPct: 11,
      trueToSizeCount: 246,
      runsLargePct: 4,
      fitAdvice: 'Runs slightly snug around wider toe beds. If you wear thick sports socks, consider 0.5 size up.',
      recommendedSizeForUser: 'M',
      userHeightHistogram: [
        { heightRange: "All Profiles", runsSmallPct: 11, trueToSizePct: 85, runsLargePct: 4, voterCount: 290 }
      ]
    },
    swapEligible: true,
    deliveryEstimate: {
      minDays: 2,
      maxDays: 4,
      pincode: '560001',
      expressAvailable: true
    },
    reviews: [
      {
        id: 'rev-8',
        userName: 'Tanmay Bhatt',
        userHeight: "5'9\"",
        purchasedSize: 'M',
        fitFeedback: 'True to Size',
        comment: 'Memory foam padding is super plush for daily commute. Easy to wipe clean with wet cloth.',
        rating: 4,
        date: '12 Aug 2026',
        isVerifiedBuyer: true
      }
    ]
  },
  {
    id: 'prod-8',
    sku: 'HM-KNT-TOP-08',
    brand: 'H&M',
    name: 'Ribbed Knit Cropped Top with Square Neck',
    category: 'Tops',
    price: 699,
    mrp: 999,
    discountPct: 30,
    rating: 4.1,
    ratingCount: 4300,
    images: [
      'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1503342394128-c104d54dba01?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Black ribbed fine-knit cropped top in soft cotton blend with square neckline and wide shoulder straps. Fitted silhouette.',
    availableSizes: [
      { size: 'XS', inStock: true, stockCount: 10 },
      { size: 'S', inStock: true, stockCount: 16 },
      { size: 'M', inStock: true, stockCount: 8 },
      { size: 'L', inStock: true, stockCount: 3 }
    ],
    availableColors: [
      { name: 'Pitch Black', hex: '#111111', inStock: true, image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=800&q=80' },
      { name: 'Warm Cream', hex: '#f5f0e6', inStock: true, image: 'https://images.unsplash.com/photo-1503342394128-c104d54dba01?auto=format&fit=crop&w=800&q=80' }
    ],
    fabricDNA: {
      material: '95% Cotton, 5% Elastane',
      composition: 'Ribbed Stretch Cotton Knit',
      gsmWeight: 195,
      opacityScore: 4.5,
      opacityLabel: 'Opaque Ribbed Weave',
      breathabilityScore: 4.7,
      breathabilityLabel: 'High Stretch Breathability',
      weaveType: '2x2 Rib Knit',
      stretchRating: '4-way high elasticity recovery',
      macroImages: [
        'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=800&q=80'
      ]
    },
    fitConsensus: {
      trueToSizePct: 88,
      totalVoters: 150,
      runsSmallPct: 7,
      trueToSizeCount: 132,
      runsLargePct: 5,
      fitAdvice: 'Flattering bodycon rib knit that expands to body contours without losing elasticity.',
      recommendedSizeForUser: 'S',
      userHeightHistogram: [
        { heightRange: "All Profiles", runsSmallPct: 7, trueToSizePct: 88, runsLargePct: 5, voterCount: 150 }
      ]
    },
    swapEligible: true,
    deliveryEstimate: {
      minDays: 2,
      maxDays: 4,
      pincode: '560001',
      expressAvailable: true
    },
    reviews: [
      {
        id: 'rev-9',
        userName: 'Meera Iyer',
        userHeight: "5'2\"",
        purchasedSize: 'S',
        fitFeedback: 'True to Size',
        comment: 'Thick ribbed fabric that does not become transparent when stretched over bust. High quality basic!',
        rating: 5,
        date: '02 Sep 2026',
        isVerifiedBuyer: true
      }
    ]
  },
  // --- 20 NEW AUTHENTIC FASHION PRODUCTS ---
  {
    id: 'prod-9',
    sku: 'NKE-RUN-TSH-09',
    brand: 'Nike',
    name: 'Men Dri-FIT Breathe Running T-Shirt',
    category: 'Activewear',
    price: 1695,
    mrp: 2295,
    discountPct: 26,
    rating: 4.8,
    ratingCount: 14500,
    images: [
      'https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Anthracite grey solid training t-shirt engineered with Nike Dri-FIT technology for ultra-fast sweat evaporation during intense marathon training.',
    availableSizes: [
      { size: 'S', inStock: true, stockCount: 12 },
      { size: 'M', inStock: true, stockCount: 22 },
      { size: 'L', inStock: true, stockCount: 14 },
      { size: 'XL', inStock: true, stockCount: 6 }
    ],
    availableColors: [
      { name: 'Charcoal Grey', hex: '#333338', inStock: true, image: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&w=800&q=80' }
    ],
    fabricDNA: {
      material: '100% Recycled Polyester Micro-Mesh',
      composition: 'Engineered Technical Knit',
      gsmWeight: 130,
      opacityScore: 4.4,
      opacityLabel: 'Breathable Lightweight Mesh',
      breathabilityScore: 5.0,
      breathabilityLabel: 'Maximum Airflow Evaporation',
      weaveType: 'Perforated Hexagonal Mesh',
      stretchRating: 'Mechanical 4-way freedom stretch',
      macroImages: ['https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&w=800&q=80']
    },
    fitConsensus: {
      trueToSizePct: 94,
      totalVoters: 520,
      runsSmallPct: 3,
      trueToSizeCount: 488,
      runsLargePct: 3,
      fitAdvice: 'Standard athletic fit with ergonomic flatlock shoulder seams preventing chafing.',
      recommendedSizeForUser: 'M',
      userHeightHistogram: [{ heightRange: 'All Profiles', runsSmallPct: 3, trueToSizePct: 94, runsLargePct: 3, voterCount: 520 }]
    },
    swapEligible: true,
    deliveryEstimate: { minDays: 2, maxDays: 3, pincode: '560001', expressAvailable: true },
    reviews: []
  },
  {
    id: 'prod-10',
    sku: 'BBA-ANK-GLD-10',
    brand: 'Biba',
    name: 'Women Printed Anarkali Kurta with Churidar',
    category: 'Festive',
    price: 2299,
    mrp: 4599,
    discountPct: 50,
    rating: 4.5,
    ratingCount: 7800,
    images: [
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Crimson red gold foil printed flared anarkali kurta, round neck with keyhole, three-quarter flared sleeves, matching solid cotton churidar.',
    availableSizes: [
      { size: 'S', inStock: true, stockCount: 9 },
      { size: 'M', inStock: true, stockCount: 16 },
      { size: 'L', inStock: true, stockCount: 8 },
      { size: 'XL', inStock: false, stockCount: 0, lowStockText: 'Out of Stock' }
    ],
    availableColors: [
      { name: 'Crimson Red', hex: '#8b0000', inStock: true, image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80' }
    ],
    fabricDNA: {
      material: '100% Pure Viscose Rayon',
      composition: 'Soft Heavy Rayon with Gold Foil',
      gsmWeight: 180,
      opacityScore: 4.8,
      opacityLabel: 'Completely Opaque Festive Drape',
      breathabilityScore: 4.5,
      breathabilityLabel: 'Flowing Festive Breathability',
      weaveType: 'Fine Drape Weave',
      stretchRating: 'Zero stretch, tailored flare',
      macroImages: ['https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80']
    },
    fitConsensus: {
      trueToSizePct: 90,
      totalVoters: 280,
      runsSmallPct: 5,
      trueToSizeCount: 252,
      runsLargePct: 5,
      fitAdvice: 'Fitted at bust with generous 32-panel anarkali flare. True to size.',
      recommendedSizeForUser: 'M',
      userHeightHistogram: [{ heightRange: 'All Profiles', runsSmallPct: 5, trueToSizePct: 90, runsLargePct: 5, voterCount: 280 }]
    },
    swapEligible: true,
    deliveryEstimate: { minDays: 2, maxDays: 4, pincode: '560001', expressAvailable: true },
    reviews: []
  },
  {
    id: 'prod-11',
    sku: 'PMA-SMH-LTH-11',
    brand: 'Puma',
    name: 'Men Smash v2 Leather Low-Top Sneakers',
    category: 'Footwear',
    price: 2499,
    mrp: 3999,
    discountPct: 37,
    rating: 4.4,
    ratingCount: 16200,
    images: [
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Classic tennis-inspired silhouette in supple white leather with contrasting black Puma formstrip and SoftFoam+ comfort sockliner.',
    availableSizes: [
      { size: 'S', inStock: true, stockCount: 10 },
      { size: 'M', inStock: true, stockCount: 18 },
      { size: 'L', inStock: true, stockCount: 12 },
      { size: 'XL', inStock: true, stockCount: 5 }
    ],
    availableColors: [
      { name: 'White & Black', hex: '#f0f0f0', inStock: true, image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=800&q=80' }
    ],
    fabricDNA: {
      material: 'Genuine Soft Leather Upper & Rubber Cupsole',
      composition: 'Premium Cowhide Leather',
      gsmWeight: 420,
      opacityScore: 5.0,
      opacityLabel: 'Solid Leather Upper',
      breathabilityScore: 3.9,
      breathabilityLabel: 'Perforated Side Ventilation',
      weaveType: 'Smooth Leather',
      stretchRating: 'Molds to foot shape',
      macroImages: ['https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=800&q=80']
    },
    fitConsensus: {
      trueToSizePct: 89,
      totalVoters: 390,
      runsSmallPct: 6,
      trueToSizeCount: 347,
      runsLargePct: 5,
      fitAdvice: 'Standard UK sizing. SoftFoam insole provides arch cushioning immediately.',
      recommendedSizeForUser: 'M',
      userHeightHistogram: [{ heightRange: 'All Profiles', runsSmallPct: 6, trueToSizePct: 89, runsLargePct: 5, voterCount: 390 }]
    },
    swapEligible: true,
    deliveryEstimate: { minDays: 2, maxDays: 3, pincode: '560001', expressAvailable: true },
    reviews: []
  },
  {
    id: 'prod-12',
    sku: 'FAB-LNN-KRT-12',
    brand: 'Fabindia',
    name: 'Men Pure Linen Handloom Long Kurta',
    category: 'Kurtas',
    price: 2190,
    mrp: 2990,
    discountPct: 26,
    rating: 4.6,
    ratingCount: 5400,
    images: [
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Natural ivory handwoven pure linen kurta with mandarin collar, side pockets, knee-length straight hem. Naturally cooling for Indian summer.',
    availableSizes: [
      { size: 'M', inStock: true, stockCount: 14 },
      { size: 'L', inStock: true, stockCount: 19 },
      { size: 'XL', inStock: true, stockCount: 7 },
      { size: 'XXL', inStock: true, stockCount: 3 }
    ],
    availableColors: [
      { name: 'Natural Ivory', hex: '#fdfbf7', inStock: true, image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80' }
    ],
    fabricDNA: {
      material: '100% Organic European Flax Linen',
      composition: 'Handcrafted Loom Linen',
      gsmWeight: 185,
      opacityScore: 4.6,
      opacityLabel: 'Crisp Opaque Natural Weave',
      breathabilityScore: 5.0,
      breathabilityLabel: 'Ultra Breathable Thermal Conduction',
      weaveType: 'Handloom Plain Weave',
      stretchRating: 'Zero synthetic stretch',
      macroImages: ['https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80']
    },
    fitConsensus: {
      trueToSizePct: 91,
      totalVoters: 210,
      runsSmallPct: 3,
      trueToSizeCount: 191,
      runsLargePct: 6,
      fitAdvice: 'Relaxed airy cut typical of Fabindia handlooms. Drapes cleanly over shoulders.',
      recommendedSizeForUser: 'L',
      userHeightHistogram: [{ heightRange: 'All Profiles', runsSmallPct: 3, trueToSizePct: 91, runsLargePct: 6, voterCount: 210 }]
    },
    swapEligible: true,
    deliveryEstimate: { minDays: 2, maxDays: 4, pincode: '560001', expressAvailable: true },
    reviews: []
  },
  {
    id: 'prod-13',
    sku: 'VRM-TRS-WID-13',
    brand: 'Vero Moda',
    name: 'Women High-Waist Wide Leg Pleated Trousers',
    category: 'Trousers',
    price: 1799,
    mrp: 2999,
    discountPct: 40,
    rating: 4.3,
    ratingCount: 3800,
    images: [
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Mocha brown high-rise wide leg trousers with inverted front pleats, slant pockets, belt loops, relaxed fluid fall from hip to ankle.',
    availableSizes: [
      { size: 'XS', inStock: true, stockCount: 4 },
      { size: 'S', inStock: true, stockCount: 11 },
      { size: 'M', inStock: true, stockCount: 15 },
      { size: 'L', inStock: true, stockCount: 5 }
    ],
    availableColors: [
      { name: 'Mocha Brown', hex: '#6b4423', inStock: true, image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80' }
    ],
    fabricDNA: {
      material: '78% Polyester, 18% Rayon, 4% Spandex',
      composition: 'Suiting Twill with Fluid Drape',
      gsmWeight: 230,
      opacityScore: 4.9,
      opacityLabel: 'Completely Opaque Heavy Suiting',
      breathabilityScore: 4.3,
      breathabilityLabel: 'Comfortable All-Day Office Wear',
      weaveType: 'Fine Suiting Twill',
      stretchRating: '2-way mechanical stretch',
      macroImages: ['https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80']
    },
    fitConsensus: {
      trueToSizePct: 87,
      totalVoters: 165,
      runsSmallPct: 8,
      trueToSizeCount: 143,
      runsLargePct: 5,
      fitAdvice: 'High waist cinches snugly. If between waist measurements, size up for all-day seated ease.',
      recommendedSizeForUser: 'M',
      userHeightHistogram: [{ heightRange: 'All Profiles', runsSmallPct: 8, trueToSizePct: 87, runsLargePct: 5, voterCount: 165 }]
    },
    swapEligible: true,
    deliveryEstimate: { minDays: 2, maxDays: 3, pincode: '560001', expressAvailable: true },
    reviews: []
  },
  {
    id: 'prod-14',
    sku: 'TMY-OXF-SHT-14',
    brand: 'Tommy Hilfiger',
    name: 'Men Classic Oxford Cotton Button-Down Shirt',
    category: 'Shirts',
    price: 3999,
    mrp: 5999,
    discountPct: 33,
    rating: 4.7,
    ratingCount: 8100,
    images: [
      'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Sky blue yarn-dyed pure oxford cotton shirt with iconic embroidered flag logo on chest, button-down collar, box pleat with locker loop.',
    availableSizes: [
      { size: 'S', inStock: true, stockCount: 6 },
      { size: 'M', inStock: true, stockCount: 14 },
      { size: 'L', inStock: true, stockCount: 10 },
      { size: 'XL', inStock: true, stockCount: 4 }
    ],
    availableColors: [
      { name: 'Sky Blue', hex: '#87ceeb', inStock: true, image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=800&q=80' }
    ],
    fabricDNA: {
      material: '100% 2-Ply Combed Oxford Cotton',
      composition: 'Traditional Basketweave Oxford',
      gsmWeight: 210,
      opacityScore: 5.0,
      opacityLabel: 'Heavy Substantial Oxford Weave',
      breathabilityScore: 4.6,
      breathabilityLabel: 'Crisp Breathable Texture',
      weaveType: '2-Ply Pinpoint Oxford',
      stretchRating: 'Zero synthetic stretch, softens per wash',
      macroImages: ['https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=800&q=80']
    },
    fitConsensus: {
      trueToSizePct: 93,
      totalVoters: 340,
      runsSmallPct: 3,
      trueToSizeCount: 316,
      runsLargePct: 4,
      fitAdvice: 'Regular American heritage cut. Generous room through chest and arms.',
      recommendedSizeForUser: 'L',
      userHeightHistogram: [{ heightRange: 'All Profiles', runsSmallPct: 3, trueToSizePct: 93, runsLargePct: 4, voterCount: 340 }]
    },
    swapEligible: true,
    deliveryEstimate: { minDays: 2, maxDays: 3, pincode: '560001', expressAvailable: true },
    reviews: []
  },
  {
    id: 'prod-15',
    sku: 'ONL-LTH-JKT-15',
    brand: 'Only',
    name: 'Women Faux Leather Asymmetrical Biker Jacket',
    category: 'Jackets',
    price: 2999,
    mrp: 4999,
    discountPct: 40,
    rating: 4.4,
    ratingCount: 4600,
    images: [
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1521223890158-f9f7c3d5d504?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Pitch black faux leather cropped biker jacket with asymmetrical silver metal zip closure, notched lapels with snaps, silky inner lining.',
    availableSizes: [
      { size: 'XS', inStock: true, stockCount: 5 },
      { size: 'S', inStock: true, stockCount: 12 },
      { size: 'M', inStock: true, stockCount: 7 },
      { size: 'L', inStock: false, stockCount: 0, lowStockText: 'Out of Stock' }
    ],
    availableColors: [
      { name: 'Onyx Black', hex: '#111111', inStock: true, image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=800&q=80' }
    ],
    fabricDNA: {
      material: '100% Polyurethane Surface with 100% Polyester Backing',
      composition: 'Matte Finish Synthetic Leather',
      gsmWeight: 380,
      opacityScore: 5.0,
      opacityLabel: '100% Windproof Solid Shield',
      breathabilityScore: 3.5,
      breathabilityLabel: 'Insulated Winter Outerwear',
      weaveType: 'Micro-Grain Faux Nappa',
      stretchRating: 'Zero stretch, tailored biker fit',
      macroImages: ['https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=800&q=80']
    },
    fitConsensus: {
      trueToSizePct: 86,
      totalVoters: 190,
      runsSmallPct: 10,
      trueToSizeCount: 163,
      runsLargePct: 4,
      fitAdvice: 'Cropped biker cut. If you plan to layer thick knit sweaters underneath, size up one size.',
      recommendedSizeForUser: 'M',
      userHeightHistogram: [{ heightRange: 'All Profiles', runsSmallPct: 10, trueToSizePct: 86, runsLargePct: 4, voterCount: 190 }]
    },
    swapEligible: true,
    deliveryEstimate: { minDays: 2, maxDays: 4, pincode: '560001', expressAvailable: true },
    reviews: []
  },
  {
    id: 'prod-16',
    sku: 'WFW-TIER-DRS-16',
    brand: 'W for Woman',
    name: 'Georgette Foil Print Tiered Maxi Dress',
    category: 'Dresses',
    price: 1899,
    mrp: 3599,
    discountPct: 47,
    rating: 4.5,
    ratingCount: 3900,
    images: [
      'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Teal green tiered maxi dress in flowing georgette with subtle gold micro foil motifs, mandarin neck, three-quarter sleeves, tiered gathered skirt.',
    availableSizes: [
      { size: 'S', inStock: true, stockCount: 8 },
      { size: 'M', inStock: true, stockCount: 14 },
      { size: 'L', inStock: true, stockCount: 9 },
      { size: 'XL', inStock: true, stockCount: 3 }
    ],
    availableColors: [
      { name: 'Teal Green', hex: '#005f60', inStock: true, image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=800&q=80' }
    ],
    fabricDNA: {
      material: '100% Poly Georgette with Voile Lining',
      composition: 'Light Georgette with Full Body Slip',
      gsmWeight: 145,
      opacityScore: 4.7,
      opacityLabel: 'Opaque Full Inner Voile Slip',
      breathabilityScore: 4.6,
      breathabilityLabel: 'Flowing Airy Silhouette',
      weaveType: 'Crepe Weave',
      stretchRating: 'Zero stretch, gathered waist ease',
      macroImages: ['https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=800&q=80']
    },
    fitConsensus: {
      trueToSizePct: 90,
      totalVoters: 215,
      runsSmallPct: 5,
      trueToSizeCount: 193,
      runsLargePct: 5,
      fitAdvice: 'Ankle-length tiered flare. True to size with comfortable bust fitting.',
      recommendedSizeForUser: 'M',
      userHeightHistogram: [{ heightRange: 'All Profiles', runsSmallPct: 5, trueToSizePct: 90, runsLargePct: 5, voterCount: 215 }]
    },
    swapEligible: true,
    deliveryEstimate: { minDays: 2, maxDays: 3, pincode: '560001', expressAvailable: true },
    reviews: []
  },
  {
    id: 'prod-17',
    sku: 'ADI-TGT-AER-17',
    brand: 'Adidas',
    name: 'Women Aeroready High-Rise Training Tights',
    category: 'Activewear',
    price: 2299,
    mrp: 3799,
    discountPct: 39,
    rating: 4.7,
    ratingCount: 11800,
    images: [
      'https://images.unsplash.com/photo-1506152983158-b4a74a01c721?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Black full-length compression training tights with wide stay-put high waistband, Aeroready moisture control, hidden waist key pocket.',
    availableSizes: [
      { size: 'XS', inStock: true, stockCount: 8 },
      { size: 'S', inStock: true, stockCount: 18 },
      { size: 'M', inStock: true, stockCount: 20 },
      { size: 'L', inStock: true, stockCount: 12 }
    ],
    availableColors: [
      { name: 'Pure Black', hex: '#0a0a0a', inStock: true, image: 'https://images.unsplash.com/photo-1506152983158-b4a74a01c721?auto=format&fit=crop&w=800&q=80' }
    ],
    fabricDNA: {
      material: '89% Recycled Polyester, 11% Elastane Interlock',
      composition: 'Squat-Proof Interlock Knit',
      gsmWeight: 260,
      opacityScore: 5.0,
      opacityLabel: '100% Squat-Proof Non-Sheer',
      breathabilityScore: 4.8,
      breathabilityLabel: 'Rapid Moisture Extraction',
      weaveType: 'Dense Interlock Compression',
      stretchRating: '4-way maximum rebound compression',
      macroImages: ['https://images.unsplash.com/photo-1506152983158-b4a74a01c721?auto=format&fit=crop&w=800&q=80']
    },
    fitConsensus: {
      trueToSizePct: 95,
      totalVoters: 480,
      runsSmallPct: 3,
      trueToSizeCount: 456,
      runsLargePct: 2,
      fitAdvice: 'High waist stays anchored through squats and high-intensity jumps without rolling down.',
      recommendedSizeForUser: 'S',
      userHeightHistogram: [{ heightRange: 'All Profiles', runsSmallPct: 3, trueToSizePct: 95, runsLargePct: 2, voterCount: 480 }]
    },
    swapEligible: true,
    deliveryEstimate: { minDays: 2, maxDays: 3, pincode: '560001', expressAvailable: true },
    reviews: []
  },
  {
    id: 'prod-18',
    sku: 'JNJ-DNM-TRK-18',
    brand: 'Jack & Jones',
    name: 'Men Regular Fit Washed Denim Trucker Jacket',
    category: 'Jackets',
    price: 2799,
    mrp: 4499,
    discountPct: 37,
    rating: 4.6,
    ratingCount: 6100,
    images: [
      'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Mid-blue washed classic denim trucker jacket with buttoned flap chest pockets, point collar, shank buttons, adjustable waist tabs.',
    availableSizes: [
      { size: 'M', inStock: true, stockCount: 15 },
      { size: 'L', inStock: true, stockCount: 22 },
      { size: 'XL', inStock: true, stockCount: 9 },
      { size: 'XXL', inStock: true, stockCount: 4 }
    ],
    availableColors: [
      { name: 'Vintage Stone Blue', hex: '#466288', inStock: true, image: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=800&q=80' }
    ],
    fabricDNA: {
      material: '100% Heavy Cotton Denim',
      composition: 'Rigid Heavy Denim Twill',
      gsmWeight: 360,
      opacityScore: 5.0,
      opacityLabel: 'Heavy Rigid All-Weather Denim',
      breathabilityScore: 4.1,
      breathabilityLabel: 'Layered Seasonal Comfort',
      weaveType: '3x1 Twill Denim',
      stretchRating: 'Rigid 100% cotton structure',
      macroImages: ['https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=800&q=80']
    },
    fitConsensus: {
      trueToSizePct: 91,
      totalVoters: 270,
      runsSmallPct: 5,
      trueToSizeCount: 245,
      runsLargePct: 4,
      fitAdvice: 'Classic regular trucker fit. Sits right at the waist with room for a hoodie underneath.',
      recommendedSizeForUser: 'L',
      userHeightHistogram: [{ heightRange: 'All Profiles', runsSmallPct: 5, trueToSizePct: 91, runsLargePct: 4, voterCount: 270 }]
    },
    swapEligible: true,
    deliveryEstimate: { minDays: 2, maxDays: 4, pincode: '560001', expressAvailable: true },
    reviews: []
  },
  {
    id: 'prod-19',
    sku: 'LBS-KRT-SET-19',
    brand: 'Libas',
    name: 'Women Pure Cotton Straight Kurta Trouser Set',
    category: 'Kurtas',
    price: 1299,
    mrp: 2799,
    discountPct: 53,
    rating: 4.3,
    ratingCount: 9400,
    images: [
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Mustard yellow hand block printed straight kurta with round neck, paired with elasticated cropped ankle trousers and matching dupatta.',
    availableSizes: [
      { size: 'S', inStock: true, stockCount: 14 },
      { size: 'M', inStock: true, stockCount: 24 },
      { size: 'L', inStock: true, stockCount: 16 },
      { size: 'XL', inStock: true, stockCount: 8 }
    ],
    availableColors: [
      { name: 'Mustard Yellow', hex: '#d4af37', inStock: true, image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80' }
    ],
    fabricDNA: {
      material: '100% Pure Cambric Cotton',
      composition: 'Natural Breathable Cotton Set',
      gsmWeight: 155,
      opacityScore: 4.7,
      opacityLabel: 'Opaque Daily Cotton',
      breathabilityScore: 4.9,
      breathabilityLabel: 'High Summer Breathability',
      weaveType: 'Cambric Weave',
      stretchRating: 'Zero stretch, elasticated trouser back',
      macroImages: ['https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80']
    },
    fitConsensus: {
      trueToSizePct: 88,
      totalVoters: 310,
      runsSmallPct: 7,
      trueToSizeCount: 272,
      runsLargePct: 5,
      fitAdvice: 'Straight regular fit. Trouser includes deep side pocket and comfortable elasticated waistband.',
      recommendedSizeForUser: 'M',
      userHeightHistogram: [{ heightRange: 'All Profiles', runsSmallPct: 7, trueToSizePct: 88, runsLargePct: 5, voterCount: 310 }]
    },
    swapEligible: true,
    deliveryEstimate: { minDays: 2, maxDays: 3, pincode: '560001', expressAvailable: true },
    reviews: []
  },
  {
    id: 'prod-20',
    sku: 'USP-POL-TSH-20',
    brand: 'US Polo Assn',
    name: 'Men Solid Pique Cotton Polo T-Shirt',
    category: 'T-Shirts',
    price: 1199,
    mrp: 1999,
    discountPct: 40,
    rating: 4.5,
    ratingCount: 13900,
    images: [
      'https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Burgundy maroon solid pique polo t-shirt with ribbed collar, two-button placket, short sleeves with ribbed cuffs, signature double-horseman embroidery.',
    availableSizes: [
      { size: 'S', inStock: true, stockCount: 10 },
      { size: 'M', inStock: true, stockCount: 18 },
      { size: 'L', inStock: true, stockCount: 15 },
      { size: 'XL', inStock: true, stockCount: 7 }
    ],
    availableColors: [
      { name: 'Burgundy Maroon', hex: '#65000b', inStock: true, image: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&w=800&q=80' }
    ],
    fabricDNA: {
      material: '100% Combed Pique Cotton',
      composition: 'Honeycomb Textured Knit',
      gsmWeight: 220,
      opacityScore: 5.0,
      opacityLabel: 'Substantial Opaque Pique Knit',
      breathabilityScore: 4.7,
      breathabilityLabel: 'Airy Honeycomb Texture',
      weaveType: 'Double Pique Knit',
      stretchRating: 'Natural 2-way ribbed stretch',
      macroImages: ['https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&w=800&q=80']
    },
    fitConsensus: {
      trueToSizePct: 92,
      totalVoters: 440,
      runsSmallPct: 4,
      trueToSizeCount: 404,
      runsLargePct: 4,
      fitAdvice: 'True to US Polo slim fit standards. Ribbed sleeve cuffs hug biceps cleanly.',
      recommendedSizeForUser: 'L',
      userHeightHistogram: [{ heightRange: 'All Profiles', runsSmallPct: 4, trueToSizePct: 92, runsLargePct: 4, voterCount: 440 }]
    },
    swapEligible: true,
    deliveryEstimate: { minDays: 2, maxDays: 3, pincode: '560001', expressAvailable: true },
    reviews: []
  },
  {
    id: 'prod-21',
    sku: 'SAN-BNR-SAR-21',
    brand: 'Sangria',
    name: 'Banarasi Art Silk Woven Festive Saree',
    category: 'Sarees',
    price: 1699,
    mrp: 3999,
    discountPct: 57,
    rating: 4.4,
    ratingCount: 5200,
    images: [
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Peacock blue and antique gold zari woven banarasi art silk saree with floral jaal pattern, dense zari pallu, paired with unstitched blouse piece.',
    availableSizes: [
      { size: 'M', inStock: true, stockCount: 25 } // Free size standard
    ],
    availableColors: [
      { name: 'Peacock Blue', hex: '#004953', inStock: true, image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80' }
    ],
    fabricDNA: {
      material: 'Art Silk with Metallic Zari Weft',
      composition: 'Smooth Synthetic Silk Brocade',
      gsmWeight: 210,
      opacityScore: 5.0,
      opacityLabel: 'Completely Opaque Rich Weave',
      breathabilityScore: 4.2,
      breathabilityLabel: 'Rich Festive Fall',
      weaveType: 'Banarasi Jacquard Loom',
      stretchRating: 'Zero stretch, crisp royal pleats',
      macroImages: ['https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80']
    },
    fitConsensus: {
      trueToSizePct: 96,
      totalVoters: 180,
      runsSmallPct: 2,
      trueToSizeCount: 172,
      runsLargePct: 2,
      fitAdvice: 'Full 5.5-meter length with 0.8m blouse piece. Holds sharp, crisp pleats without ballooning.',
      recommendedSizeForUser: 'M',
      userHeightHistogram: [{ heightRange: 'All Profiles', runsSmallPct: 2, trueToSizePct: 96, runsLargePct: 2, voterCount: 180 }]
    },
    swapEligible: true,
    deliveryEstimate: { minDays: 2, maxDays: 4, pincode: '560001', expressAvailable: true },
    reviews: []
  },
  {
    id: 'prod-22',
    sku: 'ALS-FRM-TRS-22',
    brand: 'Allen Solly',
    name: 'Men Slim Fit Formal Poly-Viscose Trousers',
    category: 'Trousers',
    price: 1599,
    mrp: 2499,
    discountPct: 36,
    rating: 4.5,
    ratingCount: 10400,
    images: [
      'https://images.unsplash.com/photo-1479064555552-3ef4979f8908?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Charcoal grey mid-rise flat front slim fit formal trousers with autoflex expandable waistband, 4 pockets, crease-resistant coating.',
    availableSizes: [
      { size: 'S', inStock: true, stockCount: 8 },
      { size: 'M', inStock: true, stockCount: 16 },
      { size: 'L', inStock: true, stockCount: 14 },
      { size: 'XL', inStock: true, stockCount: 6 }
    ],
    availableColors: [
      { name: 'Charcoal Grey', hex: '#36454f', inStock: true, image: 'https://images.unsplash.com/photo-1479064555552-3ef4979f8908?auto=format&fit=crop&w=800&q=80' }
    ],
    fabricDNA: {
      material: '65% Polyester, 33% Viscose, 2% Spandex',
      composition: 'Wrinkle-Resistant Suiting Blend',
      gsmWeight: 240,
      opacityScore: 5.0,
      opacityLabel: 'Heavy Formal Suiting',
      breathabilityScore: 4.4,
      breathabilityLabel: 'All-Day Corporate Breathability',
      weaveType: 'Fine Serge Weave',
      stretchRating: 'Autoflex 2-inch waist expansion',
      macroImages: ['https://images.unsplash.com/photo-1479064555552-3ef4979f8908?auto=format&fit=crop&w=800&q=80']
    },
    fitConsensus: {
      trueToSizePct: 91,
      totalVoters: 360,
      runsSmallPct: 4,
      trueToSizeCount: 327,
      runsLargePct: 5,
      fitAdvice: 'Tapered leg profile with Autoflex waistband that accommodates seated posture smoothly.',
      recommendedSizeForUser: 'L',
      userHeightHistogram: [{ heightRange: 'All Profiles', runsSmallPct: 4, trueToSizePct: 91, runsLargePct: 5, voterCount: 360 }]
    },
    swapEligible: true,
    deliveryEstimate: { minDays: 2, maxDays: 3, pincode: '560001', expressAvailable: true },
    reviews: []
  },
  {
    id: 'prod-23',
    sku: 'MNH-SAF-BAG-23',
    brand: 'Mast & Harbour',
    name: 'Women Structured Saffiano Shoulder Handbag',
    category: 'Handbags',
    price: 1399,
    mrp: 2999,
    discountPct: 53,
    rating: 4.3,
    ratingCount: 6700,
    images: [
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Tan brown structured faux leather shoulder tote with dual rolled handles, main zipper compartment, gold-tone hardware, detachable shoulder strap.',
    availableSizes: [
      { size: 'M', inStock: true, stockCount: 18 }
    ],
    availableColors: [
      { name: 'Tan Brown', hex: '#b06500', inStock: true, image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80' }
    ],
    fabricDNA: {
      material: '100% Textured Saffiano PU with Polyester Twill Lining',
      composition: 'Scratch-Resistant Vegan Leather',
      gsmWeight: 520,
      opacityScore: 5.0,
      opacityLabel: 'Rigid Structured Shell',
      breathabilityScore: 3.5,
      breathabilityLabel: 'Water-Resistant Outer',
      weaveType: 'Crosshatch Saffiano Texture',
      stretchRating: 'Rigid structured shape retention',
      macroImages: ['https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80']
    },
    fitConsensus: {
      trueToSizePct: 95,
      totalVoters: 220,
      runsSmallPct: 2,
      trueToSizeCount: 209,
      runsLargePct: 3,
      fitAdvice: 'Holds 13-inch laptop, water bottle, and wallet comfortably with structured base studs.',
      recommendedSizeForUser: 'M',
      userHeightHistogram: [{ heightRange: 'All Profiles', runsSmallPct: 2, trueToSizePct: 95, runsLargePct: 3, voterCount: 220 }]
    },
    swapEligible: true,
    deliveryEstimate: { minDays: 2, maxDays: 3, pincode: '560001', expressAvailable: true },
    reviews: []
  },
  {
    id: 'prod-24',
    sku: 'FLM-CRG-PNT-24',
    brand: 'Flying Machine',
    name: 'Men Relaxed Fit Cargo Utility Pants',
    category: 'Trousers',
    price: 1899,
    mrp: 3299,
    discountPct: 42,
    rating: 4.2,
    ratingCount: 5100,
    images: [
      'https://images.unsplash.com/photo-1517445312882-bc9910d016b7?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Olive green heavy cotton ripstop utility cargo pants with 6 multi-function pockets, relaxed thigh cut, adjustable toggle cuffs at ankles.',
    availableSizes: [
      { size: 'S', inStock: true, stockCount: 7 },
      { size: 'M', inStock: true, stockCount: 15 },
      { size: 'L', inStock: true, stockCount: 11 },
      { size: 'XL', inStock: true, stockCount: 4 }
    ],
    availableColors: [
      { name: 'Combat Olive', hex: '#4b5320', inStock: true, image: 'https://images.unsplash.com/photo-1517445312882-bc9910d016b7?auto=format&fit=crop&w=800&q=80' }
    ],
    fabricDNA: {
      material: '100% Heavyweight Cotton Ripstop',
      composition: 'Durable Military Grid Cotton',
      gsmWeight: 280,
      opacityScore: 5.0,
      opacityLabel: 'Heavy Tear-Resistant Ripstop',
      breathabilityScore: 4.5,
      breathabilityLabel: 'Rugged All-Day Airflow',
      weaveType: 'Grid Ripstop Weave',
      stretchRating: 'Zero stretch, pre-shrunk wash',
      macroImages: ['https://images.unsplash.com/photo-1517445312882-bc9910d016b7?auto=format&fit=crop&w=800&q=80']
    },
    fitConsensus: {
      trueToSizePct: 87,
      totalVoters: 240,
      runsSmallPct: 4,
      trueToSizeCount: 208,
      runsLargePct: 9,
      fitAdvice: 'Baggy streetwear silhouette. If you prefer a tailored fit, size down one waist size.',
      recommendedSizeForUser: 'L',
      userHeightHistogram: [{ heightRange: 'All Profiles', runsSmallPct: 4, trueToSizePct: 87, runsLargePct: 9, voterCount: 240 }]
    },
    swapEligible: true,
    deliveryEstimate: { minDays: 2, maxDays: 4, pincode: '560001', expressAvailable: true },
    reviews: []
  },
  {
    id: 'prod-25',
    sku: 'CLN-BLK-SDL-25',
    brand: 'Carlton London',
    name: 'Women Block Heel Ankle Strap Sandals',
    category: 'Footwear',
    price: 1799,
    mrp: 3290,
    discountPct: 45,
    rating: 4.4,
    ratingCount: 3900,
    images: [
      'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Nude beige open-toe ankle strap sandals with 2.5-inch sturdy block heel, cushioned insole, non-slip textured outsole for party & office comfort.',
    availableSizes: [
      { size: 'S', inStock: true, stockCount: 6 },
      { size: 'M', inStock: true, stockCount: 14 },
      { size: 'L', inStock: true, stockCount: 8 }
    ],
    availableColors: [
      { name: 'Nude Beige', hex: '#e8d3c1', inStock: true, image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=800&q=80' }
    ],
    fabricDNA: {
      material: 'Synthetic Suede Upper & Memory Foam Footbed',
      composition: 'Soft Micro-Suede with Arch Cushion',
      gsmWeight: 380,
      opacityScore: 5.0,
      opacityLabel: 'Solid Strap Structure',
      breathabilityScore: 4.8,
      breathabilityLabel: 'Open-Air Ventilation',
      weaveType: 'Micro-Suede Finish',
      stretchRating: 'Elasticated buckle strap',
      macroImages: ['https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=800&q=80']
    },
    fitConsensus: {
      trueToSizePct: 90,
      totalVoters: 170,
      runsSmallPct: 6,
      trueToSizeCount: 153,
      runsLargePct: 4,
      fitAdvice: 'Block heel provides solid balance. Memory foam cushions the ball of foot for 6+ hours standing.',
      recommendedSizeForUser: 'M',
      userHeightHistogram: [{ heightRange: 'All Profiles', runsSmallPct: 6, trueToSizePct: 90, runsLargePct: 4, voterCount: 170 }]
    },
    swapEligible: true,
    deliveryEstimate: { minDays: 2, maxDays: 3, pincode: '560001', expressAvailable: true },
    reviews: []
  },
  {
    id: 'prod-26',
    sku: 'LVE-QLT-CRS-26',
    brand: 'Lavie',
    name: 'Women Quilted Flap Crossbody Handbag',
    category: 'Handbags',
    price: 1499,
    mrp: 3499,
    discountPct: 57,
    rating: 4.6,
    ratingCount: 7100,
    images: [
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Blush pink diamond quilted faux leather crossbody bag with metallic twist lock clasp, interwoven gold chain strap, dual interior card slots.',
    availableSizes: [
      { size: 'M', inStock: true, stockCount: 16 }
    ],
    availableColors: [
      { name: 'Blush Pink', hex: '#ffb6c1', inStock: true, image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=80' }
    ],
    fabricDNA: {
      material: 'Quilted Synthetic Nappa with Satin Jacquard Lining',
      composition: 'Plush Diamond Quilted PU',
      gsmWeight: 440,
      opacityScore: 5.0,
      opacityLabel: 'Padded Structured Shell',
      breathabilityScore: 3.5,
      breathabilityLabel: 'Weatherproof Coating',
      weaveType: 'Diamond Quilted Stitch',
      stretchRating: 'Zero stretch shape holding',
      macroImages: ['https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=80']
    },
    fitConsensus: {
      trueToSizePct: 96,
      totalVoters: 250,
      runsSmallPct: 2,
      trueToSizeCount: 240,
      runsLargePct: 2,
      fitAdvice: 'Compact everyday evening size. Fits iPhone Pro Max, cardholder, keys, and lipstick.',
      recommendedSizeForUser: 'M',
      userHeightHistogram: [{ heightRange: 'All Profiles', runsSmallPct: 2, trueToSizePct: 96, runsLargePct: 2, voterCount: 250 }]
    },
    swapEligible: true,
    deliveryEstimate: { minDays: 2, maxDays: 3, pincode: '560001', expressAvailable: true },
    reviews: []
  },
  {
    id: 'prod-27',
    sku: 'FSL-CLF-WCH-27',
    brand: 'Fossil',
    name: 'Men The Minimalist Slim Analog Leather Watch',
    category: 'Footwear',
    price: 4499,
    mrp: 8995,
    discountPct: 50,
    rating: 4.8,
    ratingCount: 12200,
    images: [
      'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Smokey grey stainless steel 44mm case with clean sunray satin dial, quartz movement, interchangeable 22mm genuine brown luggage leather strap.',
    availableSizes: [
      { size: 'M', inStock: true, stockCount: 12 }
    ],
    availableColors: [
      { name: 'Saddle Brown & Grey', hex: '#5c4033', inStock: true, image: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=800&q=80' }
    ],
    fabricDNA: {
      material: '316L Surgical Stainless Steel & Genuine Calfskin Leather',
      composition: '5 ATM Water Resistant Construction',
      gsmWeight: 490,
      opacityScore: 5.0,
      opacityLabel: 'Hardened Mineral Crystal Glass',
      breathabilityScore: 4.0,
      breathabilityLabel: 'Natural Leather Patina',
      weaveType: 'Full Grain Leather',
      stretchRating: 'Softens with wrist warmth',
      macroImages: ['https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=800&q=80']
    },
    fitConsensus: {
      trueToSizePct: 97,
      totalVoters: 380,
      runsSmallPct: 1,
      trueToSizeCount: 368,
      runsLargePct: 2,
      fitAdvice: '44mm dial sits flat on wrist (8mm slim profile). Fits wrist circumferences 160mm–215mm.',
      recommendedSizeForUser: 'M',
      userHeightHistogram: [{ heightRange: 'All Profiles', runsSmallPct: 1, trueToSizePct: 97, runsLargePct: 2, voterCount: 380 }]
    },
    swapEligible: true,
    deliveryEstimate: { minDays: 2, maxDays: 3, pincode: '560001', expressAvailable: true },
    reviews: []
  },
  {
    id: 'prod-28',
    sku: 'RDS-VNT-TEE-28',
    brand: 'Roadster',
    name: 'Men Vintage Heavyweight Cotton Graphic Tee',
    category: 'T-Shirts',
    price: 599,
    mrp: 1199,
    discountPct: 50,
    rating: 4.4,
    ratingCount: 17400,
    images: [
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Off-white washed 220 GSM heavyweight combed cotton graphic t-shirt with ribbed crew neck, dropped shoulders, vintage distressed motorcycle print.',
    availableSizes: [
      { size: 'S', inStock: true, stockCount: 15 },
      { size: 'M', inStock: true, stockCount: 28 },
      { size: 'L', inStock: true, stockCount: 19 },
      { size: 'XL', inStock: true, stockCount: 8 }
    ],
    availableColors: [
      { name: 'Vintage Off-White', hex: '#f8f6f0', inStock: true, image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80' }
    ],
    fabricDNA: {
      material: '100% Bio-Washed Combed Cotton',
      composition: 'Heavy 220 GSM Streetwear Cotton',
      gsmWeight: 220,
      opacityScore: 5.0,
      opacityLabel: 'Completely Opaque Heavyweight Knit',
      breathabilityScore: 4.8,
      breathabilityLabel: 'Pure Natural Cotton Airflow',
      weaveType: 'Single Jersey Heavy Knit',
      stretchRating: 'Natural mechanical flex',
      macroImages: ['https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80']
    },
    fitConsensus: {
      trueToSizePct: 91,
      totalVoters: 490,
      runsSmallPct: 3,
      trueToSizeCount: 446,
      runsLargePct: 6,
      fitAdvice: 'Slightly relaxed boxy streetwear drop-shoulder fit. Heavy collar doesn\'t sag after washing.',
      recommendedSizeForUser: 'L',
      userHeightHistogram: [{ heightRange: 'All Profiles', runsSmallPct: 3, trueToSizePct: 91, runsLargePct: 6, voterCount: 490 }]
    },
    swapEligible: true,
    deliveryEstimate: { minDays: 2, maxDays: 3, pincode: '560001', expressAvailable: true },
    reviews: []
  }
];
