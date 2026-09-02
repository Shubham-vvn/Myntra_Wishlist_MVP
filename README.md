# 🛍️ Myntra Personalized Wishlist & Concern Resolution Engine

[![React](https://img.shields.io/badge/React-18.2.0-61DAFB?logo=react&logoColor=black)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.2.2-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-4.5.3-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Capacitor Android](https://img.shields.io/badge/Capacitor-Android_Native-119EFF?logo=capacitor&logoColor=white)](https://capacitorjs.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Build Status](https://img.shields.io/badge/Build-Passing-brightgreen.svg)]()

> A high-fidelity, interactive **MVP application for Myntra** designed to eliminate wishlist dwell paralysis by capturing explicit customer postponement reasons and proactively resolving them through intelligent, zero-clutter push notifications and fit assurance.

---

## 📱 Live Demo & Device Frame

The application is rendered inside a **dedicated iPhone 15 Pro chassis** featuring:
- 🏝️ **Dynamic Island** with interactive camera sensor and status indicators.
- ⏱️ **Live Real-Time Clock** that automatically syncs with the viewer's local device timezone.
- 📱 **Natural Titanium Bezels** (`393px × 844px`), iOS 17 status bar (5G/Wifi/Battery), and bottom Home Indicator.
- 🧭 **Authentic 4-Tab Navigation:** Home, Wishlist, Bag, and Profile.

---

## 💡 The Core Problem & Solution

### The Challenge
**Over 68% of wishlisted fashion items languish for weeks without converting.** Shoppers add items to their wishlist not because they lack interest, but because of specific, unaddressed hesitations:
1. **Size Availability:** Their exact size is out of stock.
2. **Price Sensitivity:** Waiting for a sale or price drop.
3. **Color/Variant:** Waiting for their preferred shade.
4. **Delivery Speed:** Standard shipping is too slow for an upcoming event.
5. **Fabric & Fit Uncertainty:** Unsure about material transparency, drape, or sizing accuracy.
6. **Purchase Timing:** Postponing purchase until payday / salary day.

### The Solution
Instead of generic, spammy promotional notifications, **Myntra's Concern Resolution Engine** prompts the user with an intelligent, bottom-anchored prompt when they wishlist an item. Shoppers select their exact concern and set precise triggers. When the condition is met (e.g., *Size XL Restocked* or *14 daylight customer photos added*), a targeted, high-relevance notification is delivered directly to the user.

---

## ✨ Key Features & User Experience

### 1. 7-Step Concern Capture & Resolution Flow
- **Step 1 — Product Details (PDP):** View authentic fashion items, available sizes, customer fit consensus, and fabric DNA.
- **Step 2 — Wishlist Confirmation Toast:** Immediate feedback with 1-tap shortcut to view saved items.
- **Step 3 — Interactive Bottom Sheet Prompt:** Non-intrusive vibrating bell prompt asking if the shopper wants updates on their specific hesitation.
- **Step 4 — 8-Category Concern Selector:** Size, Price, Colour, Delivery, Quality & Fit Info, Purchase Timing, and Custom Notes.
- **Step 5 — Dynamic Sub-Flow Configuration:** Granular trigger setup (e.g., target size selection, target price threshold, salary date reminder).
- **Step 6 — Personalized Confirmation Screen:** Visual feedback confirming the exact watch condition saved.
- **Step 7 — Realistic Lockscreen Push Notification:** Direct simulated push banner showing the resolution in action.

### 2. Fit & Fabric Assurance Bridge
- **True-to-Size Consensus:** Community crowd-sizing analytics based on verified buyer body heights and fits.
- **Fabric DNA Transparency:** Weave pattern, opacity index, stretch factor, and daylight fabric photography.
- **100% Genuine Quality Guarantee:** Backed by Myntra's easy 14-day exchange and return assurance.

### 3. Rich Fashion Catalog
- **28 Handpicked Apparel Products** across 15 high-intent categories:
  - *Shirts, Kurtas, Blazers, Dresses, Festive Wear, Jeans, Footwear, Tops, Trousers, T-Shirts, Jackets, Sarees, Handbags, Activewear*.
- High-resolution editorial photography powered by optimized CDN endpoints.

### 4. Interactive Bag & Checkout
- 1-Tap *"Move to Bag"* flow from Wishlist and PDP.
- Price detail breakdown with free convenience fees.
- Animated multi-color celebratory confetti on order completion.

---

## 🖼️ Wireframes

The 7-step user journey is documented with high-resolution wireframe blueprints in the [`wireframes/`](./wireframes) directory:

| Step | Wireframe Blueprint | Description |
| :---: | :--- | :--- |
| **01** | [`wireframes/step1_product_page.png`](./wireframes/step1_product_page.png) | Product Display Page with fabric consensus |
| **02** | [`wireframes/step2_add_to_wishlist.png`](./wireframes/step2_add_to_wishlist.png) | Wishlist toast confirmation banner |
| **03** | [`wireframes/step3_popup_after_wishlist.png`](./wireframes/step3_popup_after_wishlist.png) | Bottom-anchored bell concern prompt |
| **04** | [`wireframes/step4_select_notify_me.png`](./wireframes/step4_select_notify_me.png) | 8-concern category selection sheet |
| **05** | [`wireframes/step5_select_size_subflow.png`](./wireframes/step5_select_size_subflow.png) | Granular size subflow with XL active |
| **06** | [`wireframes/step6_confirmation_message.png`](./wireframes/step6_confirmation_message.png) | Confirmation of saved concern trigger |
| **07** | [`wireframes/step7_receive_notification.png`](./wireframes/step7_receive_notification.png) | Lockscreen simulated push banner |

Master composite: [`wireframes.png`](./wireframes.png)

---

## 🛠️ Tech Stack & Architecture

- **Frontend Framework:** [React 18](https://reactjs.org/) + [TypeScript](https://www.typescriptlang.org/)
- **Build Tool:** [Vite 4](https://vitejs.dev/)
- **Styling:** Vanilla CSS Custom Design Tokens (`index.css` with Myntra color system `#ff3f6c`, `#282c3f`, `#03a685`)
- **Iconography:** [Lucide React](https://lucide.dev/)
- **Visual Effects:** [Canvas Confetti](https://www.npmjs.com/package/canvas-confetti)
- **Mobile Native Wrapper:** [Capacitor 5](https://capacitorjs.com/) (Android platform support)
- **State Management:** Reactive In-Memory Single Source of Truth (`src/store/appStore.ts`)

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- npm (v9 or higher)

### 1. Installation
Clone the repository and install dependencies:
```bash
git clone https://github.com/your-username/myntra-wishlist-project.git
cd myntra-wishlist-project
npm install
```

### 2. Run Locally in Development Mode
Start the Vite development server:
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser to view the app.

### 3. Build for Production
Create an optimized production bundle:
```bash
npm run build
```
The compiled output will be generated in the `dist/` directory.

### 4. Preview Production Build
```bash
npm run preview
```

---

## 📱 Android Native App (Capacitor)

The project includes pre-configured Android native assets inside the `android/` directory:

1. **Sync Web Build to Android:**
   ```bash
   npm run android:sync
   ```
2. **Open in Android Studio:**
   ```bash
   npm run android:open
   ```
3. **Build APK in Android Studio:**
   - Go to `Build` → `Build Bundle(s) / APK(s)` → `Build APK(s)`.

---

## 🌐 Deployment Guide

This project is a 100% self-contained Single Page Application (SPA) that requires **no external backend or database**. It can be deployed in under 2 minutes:

### Deploying to Vercel
1. Import your GitHub repository into [Vercel](https://vercel.com).
2. Configure settings:
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
3. Click **Deploy**.

### Deploying to Netlify
1. Connect your repository on [Netlify](https://netlify.com).
2. Set **Build command** to `npm run build` and **Publish directory** to `dist`.
3. Deploy!

### Deploying to GitHub Pages
1. Install `gh-pages`: `npm install -D gh-pages`
2. Add deploy script to `package.json`: `"deploy": "gh-pages -d dist"`
3. Run `npm run build && npm run deploy`.

---

## 📂 Project Structure

```
├── android/                   # Capacitor native Android project
├── dist/                      # Production build output
├── public/                    # Static assets
├── src/
│   ├── components/
│   │   ├── concern/           # Concern capture bottom sheets & toasts (Steps 2-6)
│   │   ├── confidence/        # Fit & Fabric Assurance modal
│   │   ├── notifications/     # Lockscreen push banner & notification center (Step 7)
│   │   ├── pages/             # Home, Wishlist, Bag, and Profile tab views
│   │   ├── pdp/               # Product Details modal (Step 1)
│   │   └── shell/             # iPhone 15 Pro chassis, TopBar, BottomNavBar
│   ├── data/
│   │   └── mockCatalog.ts     # 28 authentic fashion products across 15 categories
│   ├── store/
│   │   └── appStore.ts        # In-memory reactive state manager
│   ├── types/
│   │   └── index.ts           # TypeScript interfaces & domain models
│   ├── App.tsx                # Master container & overlay mounts
│   ├── main.tsx               # Application entry point
│   └── index.css              # Myntra design tokens & typography
├── wireframes/                # 7 separate step-by-step wireframe images
├── capacitor.config.ts        # Capacitor mobile configuration
├── index.html                 # HTML shell
├── package.json               # Dependencies and scripts
└── vite.config.ts             # Vite bundler configuration
```

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
