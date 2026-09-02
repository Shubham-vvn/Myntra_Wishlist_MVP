# 🏗️ Myntra Wishlist AI — System Architecture Document

> **Document Type:** Technical Architecture & Engineering Blueprint  
> **Platform:** Mobile-First Web Application (Standalone MVP)  
> **Tech Stack:** Next.js · React · Node.js · Redis · PostgreSQL · Gemini AI  
> **SLA Target:** P95 < 120ms end-to-end  
> **Last Updated:** September 2026

---

## 📑 Table of Contents

1. [Architecture Overview](#1-architecture-overview)
2. [System Context & Boundaries](#2-system-context--boundaries)
3. [High-Level System Architecture](#3-high-level-system-architecture)
4. [Frontend Architecture](#4-frontend-architecture)
5. [Backend Architecture](#5-backend-architecture)
6. [Data Architecture & Schema Design](#6-data-architecture--schema-design)
7. [Concern Capture & Notification Pipeline](#7-concern-capture--notification-pipeline)
8. [Pre-Purchase Confidence Bridge Pipeline](#8-pre-purchase-confidence-bridge-pipeline)
9. [AI / ML Architecture](#9-ai--ml-architecture)
10. [Notification Delivery System](#10-notification-delivery-system)
11. [Trigger Monitoring Engine](#11-trigger-monitoring-engine)
12. [Caching Strategy](#12-caching-strategy)
13. [API Design & Contracts](#13-api-design--contracts)
14. [State Management](#14-state-management)
15. [Analytics & Event Pipeline](#15-analytics--event-pipeline)
16. [Security Architecture](#16-security-architecture)
17. [Performance & Latency Budget](#17-performance--latency-budget)
18. [Scalability & Infrastructure](#18-scalability--infrastructure)
19. [Error Handling & Resilience](#19-error-handling--resilience)
20. [Deployment Architecture](#20-deployment-architecture)
21. [Technology Stack Summary](#21-technology-stack-summary)
22. [Component Dependency Map](#22-component-dependency-map)

---

## 1. Architecture Overview

### 1.1 Architectural Philosophy

The Myntra Wishlist AI MVP follows a **modular, event-driven architecture** with strict separation between:

- **Deterministic Rules Engine** — Business logic that is predictable, auditable, and zero-latency (hesitation filters, inventory checks, policy enforcement)
- **AI/ML Inference Layer** — Probabilistic intelligence that is cached, async, and gracefully degradable (fit consensus, assurance copy, notification summarization)

This separation ensures that the system remains **fast, explainable, and reliable** — the rules layer never depends on AI availability, and AI enhances rather than gates the core user experience.

### 1.2 Core Architecture Principles

| Principle | Implementation |
|:---|:---|
| **Unified Single-Bundle** | All-in-One codebase bundling UI, in-memory service layer, mock inventory, and AI simulators into a single deployable repository (zero independent backend server setup) |
| **Mobile-First** | All UI components designed for 360px–428px viewports; desktop is a phone-frame wrapper |
| **Offline-Resilient** | Concern captures queue locally if network is unavailable; sync on reconnect |
| **Cache-Heavy** | Pre-computed confidence badges served from in-memory cache (sub-5ms); AI inference is async background |
| **Event-Sourced Analytics** | Every user interaction emits a structured event to the analytics pipeline |
| **Zero-Discount Constraint** | No monetary incentive logic exists anywhere in the codebase |
| **Graceful AI Degradation** | If AI services are unavailable, system falls back to rules-only confidence badges |

### 1.3 Unified Single-Bundle ("One-Go") Deployment Architecture

To facilitate zero-friction review, demonstration, and 1-click deployment, the MVP is structured as an **All-in-One Unified Application Bundle**:

```mermaid
graph TD
    subgraph "Unified Deployable Bundle (Single Repo / Single Process)"
        UI["📱 Mobile-First React UI Shell<br>(Wireframe-Matched Screens)"]
        STORE["⚡ Reactive In-Memory State & Cache<br>(Wishlist, Concerns, Bag, Notifications)"]
        SVC["🧠 Integrated Service & Simulation Layer<br>(Trigger Evaluator, Confidence Engine, AI Synthesis)"]
        DATA["📦 Mock Fashion Catalog & Fabric DNA<br>(8 Multi-Brand Products, Review Clusters)"]
        TEL["📊 Event Telemetry Streamer<br>(Real-time Debug Drawer)"]

        UI <--> STORE
        STORE <--> SVC
        SVC <--> DATA
        SVC --> TEL
    end
```

- **Single Command Startup:** Runs completely with `npm run dev` or builds into a standalone production bundle with `npm run build`.
- **Zero External Infrastructure Prerequisite:** No external database provisioning, Redis server configuration, or separate backend daemon required for testing and evaluation.
- **Enterprise-Ready Parity:** While self-contained for the MVP bundle, all data schemas, service signatures, and API contracts follow strict enterprise Myntra REST/JSON specifications for straightforward extraction into production microservices.

---

## 2. System Context & Boundaries

### 2.1 System Context Diagram

```mermaid
graph TB
    subgraph "External Actors"
        U["👤 Myntra User<br>(Mobile/Desktop Browser)"]
        E["📧 Email Service<br>(SendGrid / SES)"]
        P["📱 Push Service<br>(FCM / APNs)"]
    end

    subgraph "Myntra Wishlist AI MVP"
        APP["🌐 Next.js Web App<br>(Mobile-First PWA)"]
        API["⚡ API Gateway<br>(Node.js / Express)"]
        CORE["🧠 Core Services"]
        DATA["💾 Data Layer"]
    end

    subgraph "External Data Sources (Simulated in MVP)"
        CAT["📦 Product Catalog API"]
        INV["📊 Inventory Service"]
        PRICE["💰 Price Feed"]
        DEL["🚚 Delivery Estimator"]
        REV["⭐ Reviews & Ratings"]
    end

    subgraph "AI Services"
        GEM["🤖 Gemini Flash API"]
        EMB["🔢 MiniLM Embeddings"]
    end

    U --> APP
    APP --> API
    API --> CORE
    CORE --> DATA
    CORE --> CAT
    CORE --> INV
    CORE --> PRICE
    CORE --> DEL
    CORE --> REV
    CORE --> GEM
    CORE --> EMB
    CORE --> E
    CORE --> P
```

### 2.2 MVP Boundary Definition

| In Scope (MVP) | Out of Scope (MVP) |
|:---|:---|
| Wishlist management with concern capture | Real Myntra API integrations (simulated with mock data) |
| 8 concern types with personalized flows | Real payment / checkout processing |
| Confidence badges (True-to-Size, Fabric DNA, Swap) | Actual doorstep swap fulfillment |
| Trigger monitoring & notification dispatch | Cross-device session continuity |
| AI-powered fit synthesis & notification summarization | A/B testing infrastructure |
| Analytics event emission | Real-time inventory webhooks from warehouses |
| Mobile-first responsive UI | Native mobile app (iOS/Android) |

---

## 3. High-Level System Architecture

### 3.1 Layered Architecture Diagram

```mermaid
graph TD
    subgraph "Layer 1: Presentation (Frontend)"
        A1["Next.js App Shell"]
        A2["React Component Library"]
        A3["Zustand State Store"]
        A4["Service Worker (PWA)"]
    end

    subgraph "Layer 2: API Gateway"
        B1["REST API Routes<br>/api/v1/*"]
        B2["Authentication Middleware"]
        B3["Rate Limiter"]
        B4["Request Validator"]
    end

    subgraph "Layer 3: Business Logic (Core Services)"
        C1["Wishlist Service"]
        C2["Concern Capture Service"]
        C3["Trigger Monitor Service"]
        C4["Notification Orchestrator"]
        C5["Confidence Engine"]
        C6["AI Personalization Service"]
    end

    subgraph "Layer 4: Data & Infrastructure"
        D1["PostgreSQL<br>(Primary Store)"]
        D2["Redis<br>(Cache + Pub/Sub)"]
        D3["Cron Scheduler<br>(Trigger Evaluator)"]
        D4["Event Queue<br>(Analytics Pipeline)"]
    end

    subgraph "Layer 5: External AI"
        E1["Gemini Flash API"]
        E2["Groq Fallback"]
    end

    A1 --> B1
    A2 --> A3
    B1 --> B2 --> B3 --> B4
    B4 --> C1
    B4 --> C2
    B4 --> C5
    B4 --> C6
    C1 --> D1
    C2 --> D1
    C2 --> D2
    C3 --> D1
    C3 --> D3
    C4 --> D2
    C5 --> D2
    C5 --> E1
    C6 --> E1
    C6 --> E2
    C4 --> C3
```

### 3.2 Service Responsibility Matrix

| Service | Responsibility | Latency Budget | Dependencies |
|:---|:---|:---:|:---|
| **Wishlist Service** | CRUD for wishlist items; product catalog queries | 30 ms | PostgreSQL, Redis |
| **Concern Capture Service** | Capture user concern + trigger condition; store preference | 20 ms | PostgreSQL, Redis |
| **Trigger Monitor Service** | Evaluate trigger conditions on schedule; detect satisfied triggers | 50 ms | PostgreSQL, Cron |
| **Notification Orchestrator** | Format & dispatch notifications across channels | 100 ms | Redis Pub/Sub, Email/Push |
| **Confidence Engine** | Generate dynamic confidence badges per product | 80 ms | Redis Cache, AI Service |
| **AI Personalization Service** | Fit synthesis, concern ordering, notification summarization | 40 ms (cached) | Gemini Flash, Redis |

---

## 4. Frontend Architecture

### 4.1 Component Architecture

```mermaid
graph TD
    subgraph "App Shell"
        SHELL["MyntraShell<br>(Mobile Frame + Bottom Nav)"]
    end

    subgraph "Pages (Next.js Routes)"
        HOME["/home<br>Landing + Featured"]
        EXPLORE["/explore<br>AI Discovery Assistant"]
        WISHLIST["/wishlist<br>Smart Wishlist Grid"]
        BAG["/bag<br>Zero-Risk Bag"]
        PROFILE["/profile<br>User Settings"]
        PDP["/product/:id<br>Product Detail"]
    end

    subgraph "Core UI Components"
        CARD["WishlistCard<br>+ ConfidenceBadge"]
        POPUP["ConcernCapturePopup<br>(Bottom Sheet)"]
        MODAL["AssuranceModal<br>(Pre-Purchase Bridge)"]
        NOTIF["NotificationCenter"]
        SEARCH["AISearchBar"]
        FILTER["FilterChipBar"]
    end

    subgraph "Shared Components"
        BADGE["ConfidenceBadgePill"]
        CHIP["SelectableChip"]
        SLIDER["RangeSlider"]
        HISTOGRAM["FitHistogram"]
        GALLERY["FabricDNAGallery"]
        TOAST["ToastNotification"]
    end

    SHELL --> HOME
    SHELL --> EXPLORE
    SHELL --> WISHLIST
    SHELL --> BAG
    SHELL --> PROFILE
    WISHLIST --> CARD
    CARD --> BADGE
    CARD --> POPUP
    POPUP --> CHIP
    CARD --> MODAL
    MODAL --> HISTOGRAM
    MODAL --> GALLERY
    MODAL --> SLIDER
    EXPLORE --> SEARCH
    WISHLIST --> FILTER
```

### 4.2 Page Structure & Routing

| Route | Page | Key Components | Data Requirements |
|:---|:---|:---|:---|
| `/` | Home | Featured products, trending, personalized picks | Product catalog (cached) |
| `/explore` | AI Discovery | AISearchBar, query chips, filtered results | AI search API, product catalog |
| `/wishlist` | Smart Wishlist | WishlistCard grid, FilterChipBar, ConfidenceBadges | Wishlist items, confidence data, concerns |
| `/product/:id` | Product Detail | Full PDP, size chart, reviews, Add to Wishlist CTA | Product data, reviews, inventory |
| `/bag` | Zero-Risk Bag | Bag items, Swap Warranty Certificate, checkout preview | Bag items, swap eligibility |
| `/profile` | User Profile | Notification preferences, concern history, settings | User preferences |
| `/notifications` | Notification Center | Triggered notifications, AI digest summary | Notification history |

### 4.3 Component Hierarchy — Wishlist Card (Critical Path)

```
WishlistCard
├── ProductImage (lazy-loaded, blur placeholder)
├── ProductInfo (brand, name, price, MRP strikethrough)
├── ConfidenceBadgeRow
│   ├── TrueToSizeBadge ("88% True to Size")
│   ├── FabricDNABadge ("Pure Cotton 4.6★")
│   └── SwapGuaranteeBadge ("Zero-Fee Swap ✓")
├── ConcernStatusIndicator (if concern is set: "Watching: Size XL")
├── ActionBar
│   ├── ViewAssuranceButton → opens AssuranceModal
│   ├── MoveToBagButton → "Move to Bag with Free Swap"
│   └── RemoveButton
└── ConcernCapturePopup (triggered on initial wishlist add)
    ├── PromptHeader ("Want to get notified?")
    ├── YesNoSelector
    ├── ConcernChipSelector (Price, Size, Colour, etc.)
    ├── DynamicFollowUp (size picker / color picker / date picker)
    └── ConfirmationToast
```

### 4.4 Authentic Myntra Web Interface Specifications (Derived from wireframes.png)

The application UI must faithfully replicate the authentic **Myntra Mobile Web interface** across all interactive states, matching the typography, spacing, brand tokens, and interaction flows from `wireframes.png`:

```
┌────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│                              PIXEL-ACCURATE WIREFRAME SPECIFICATIONS                                   │
├─────────┬───────────────────────────────┬──────────────────────────────────────────────────────────────┤
│ Screen 1│ Product Detail Page (PDP)     │ • Top Header: Back Arrow, Myntra Logo, Search, Heart, Bag    │
│         │                               │ • Hero Image with floating "View Similar" pill tag           │
│         │                               │ • Brand: "HRX by Hrithik Roshan" (bold uppercase)            │
│         │                               │ • Title: "Men Green Solid Casual Shirt"                      │
│         │                               │ • Rating: "4.3 ★ | 12.6k" (green star pill)                  │
│         │                               │ • Price: "₹1,299" (bold) "₹1,799" (strike) "(28% OFF)"       │
│         │                               │ • Size Boxes: S, M, L, XL ("Only 2 left" red tag), XXL       │
│         │                               │ • Bottom Bar: Share [📤], Heart [♡], "ADD TO BAG" [🛒]       │
├─────────┼───────────────────────────────┼──────────────────────────────────────────────────────────────┤
│ Screen 2│ Wishlist Banner Toast         │ • Heart filled red [♥]                                       │
│         │                               │ • Floating Green Toast: "Added to Wishlist"                  │
│         │                               │ • Subtext: "We'll notify you if there are updates..."        │
│         │                               │ • Action: "View Wishlist >" link + "✕" close button          │
├─────────┼───────────────────────────────┼──────────────────────────────────────────────────────────────┤
│ Screen 3│ Initial Bell Prompt Modal     │ • Bottomsheet with soft backdrop blur                        │
│         │                               │ • Illustrated vibrating bell icon in soft pink circle        │
│         │                               │ • "Want to get notified when your concern is resolved?"      │
│         │                               │ • Subtitle: "We'll notify you when there's an update."       │
│         │                               │ • Button 1: "YES, NOTIFY ME" (Solid #ff3f6c Pink)            │
│         │                               │ • Button 2: "NOT NOW" (Ghost text button)                    │
├─────────┼───────────────────────────────┼──────────────────────────────────────────────────────────────┤
│ Screen 4│ Concern Category Selector     │ • Header: "What would you like to be notified about?"        │
│         │                               │ • 7 Radio Options with icons:                                │
│         │                               │   1. Size ("When my size is available")                      │
│         │                               │   2. Price ("When price drops")                              │
│         │                               │   3. Colour ("When my preferred colour is available")        │
│         │                               │   4. Delivery ("When delivery is faster / policy changes")   │
│         │                               │   5. Quality / Product info ("When more info/reviews...")    │
│         │                               │   6. Purchase timing ("Remind me on a specific date")       │
│         │                               │   7. Other ("Other concern")                                 │
├─────────┼───────────────────────────────┼──────────────────────────────────────────────────────────────┤
│ Screen 5│ Size Follow-Up Modal          │ • Header: Back arrow "←", Title "Size"                       │
│         │                               │ • Prompt: "Which size are you looking for?"                  │
│         │                               │ • Size Grid: XS, S, M, L, XL (active pink outline), XXL, XXXL│
│         │                               │ • Action: "SAVE" (Solid #ff3f6c Pink) / "CANCEL"             │
├─────────┼───────────────────────────────┼──────────────────────────────────────────────────────────────┤
│ Screen 6│ Confirmation Modal            │ • Centered Emerald Green Check Circle (#03a685)              │
│         │                               │ • Headline: "You're all set!"                                │
│         │                               │ • Subtitle: "We'll notify you when XL size is available."    │
│         │                               │ • Action: "DONE" (Solid #ff3f6c Pink)                        │
├─────────┼───────────────────────────────┼──────────────────────────────────────────────────────────────┤
│ Screen 7│ Push Notification Simulation  │ • iOS / In-App Notification Card:                            │
│         │                               │   - Myntra 'M' Icon + "Myntra • now"                         │
│         │                               │   - "🔔 Good news! The XL size you wanted is now available." │
│         │                               │   - "Tap to view the product."                               │
└─────────┴───────────────────────────────┴──────────────────────────────────────────────────────────────┘
```

### 4.5 Myntra Visual Design Token Specifications

| Token | Value | Applied To |
|:---|:---|:---|
| **Primary Brand Pink** | `#ff3f6c` | Primary CTAs (`ADD TO BAG`, `YES, NOTIFY ME`, `SAVE`, `DONE`), active selection borders, links |
| **Primary Pink Hover/Active** | `#e72754` | Button active/pressed states |
| **Soft Pink Background** | `#fff1f4` | Bell illustration circle, active chip background, notification pill tints |
| **Deep Brand Charcoal** | `#282c3f` | Product titles, section headers, primary text hierarchy |
| **Secondary Gray** | `#535766` | Category names, subtitles, helper text |
| **Muted Slate Gray** | `#94969f` | Strikethrough MRP prices, inactive radio borders, icon strokes |
| **Success Emerald** | `#03a685` | Confirmation checkmark, rating badges, "Added to Wishlist" toast, True-to-Size badges |
| **Success Background** | `#e6f7f4` | Toast background, confidence pill container |
| **Alert Red** | `#ff5722` | Stock scarcity alerts (*"Only 2 left"*), discount percentage labels |
| **Border Gray** | `#eaeaec` | Size box borders, card dividers, bottom nav border |
| **Typography Family** | `Assistant`, `Inter`, `sans-serif` | Global font with explicit 400, 600, 700 weights |
| **Corner Radii** | `4px` (size boxes), `8px` (cards), `16px` (modals), `9999px` (pills) | High-fidelity component borders |

---

### 4.4 Bottom Navigation Structure

```
┌─────────────────────────────────────────────┐
│                                             │
│              [Page Content]                 │
│                                             │
├──────┬──────┬──────┬──────┬─────────────────┤
│ 🏠   │ 🔍   │ ❤️   │ 🛍️   │ 👤             │
│ Home │Explore│Wish  │ Bag  │ Profile        │
│      │      │ (3)  │ (1)  │                │
└──────┴──────┴──────┴──────┴─────────────────┘

- Wishlist badge: count of items with active concern triggers
- Bag badge: count of items with swap guarantee attached
```

---

## 5. Backend Architecture

### 5.1 Service Architecture Diagram

```mermaid
graph LR
    subgraph "API Layer (Node.js / Express)"
        R1["POST /api/v1/wishlist/add"]
        R2["POST /api/v1/concern/capture"]
        R3["GET /api/v1/wishlist/:userId"]
        R4["GET /api/v1/confidence/:productId"]
        R5["POST /api/v1/bag/move"]
        R6["GET /api/v1/notifications/:userId"]
        R7["POST /api/v1/search/ai"]
        R8["POST /api/v1/analytics/event"]
    end

    subgraph "Core Services"
        WS["Wishlist<br>Service"]
        CS["Concern<br>Service"]
        CE["Confidence<br>Engine"]
        NO["Notification<br>Orchestrator"]
        AI["AI<br>Service"]
        TM["Trigger<br>Monitor"]
        AN["Analytics<br>Service"]
    end

    R1 --> WS
    R2 --> CS
    R3 --> WS
    R4 --> CE
    R5 --> WS
    R6 --> NO
    R7 --> AI
    R8 --> AN
    CS --> TM
```

### 5.2 Service Details

#### Wishlist Service

```
Responsibilities:
- Add/remove products from wishlist
- Retrieve user's wishlist with enriched product data
- Move item from wishlist to bag (with swap guarantee attachment)
- Track wishlist item dwell time (days since added)

Key Operations:
- addToWishlist(userId, productId) → wishlistItem
- removeFromWishlist(userId, productId) → void
- getUserWishlist(userId, filters?) → wishlistItem[]
- moveToBag(userId, productId, sizeId) → bagItem
```

#### Concern Capture Service

```
Responsibilities:
- Present concern options (filtered by product category)
- Capture user's selected concern + trigger parameters
- Store concern preference linked to wishlist item
- Update/modify existing concern for a wishlist item

Key Operations:
- getConcernOptions(productId, categoryId) → concernOption[]
- captureConcern(userId, productId, concernType, triggerParams) → concern
- updateConcern(concernId, newTriggerParams) → concern
- deleteConcern(concernId) → void
```

#### Confidence Engine

```
Responsibilities:
- Generate confidence badge data per product
- Compute "True to Size" percentage from review aggregation
- Compute "Fabric DNA Score" from material analysis
- Determine "Zero-Fee Swap" eligibility from policy + inventory

Pipeline:
1. [RULES] Check Redis cache for pre-computed badge → if hit, return (5ms)
2. [RULES] Aggregate review sentiment for size consensus
3. [AI/ML] Run fit clustering model on review corpus
4. [RULES] Query inventory for swap-eligible stock
5. [AI/ML] Generate personalized assurance copy
6. Cache result in Redis (TTL: 1 hour)

Key Operations:
- getConfidenceBadge(productId) → confidenceBadge
- getAssuranceData(productId, userId?) → assuranceModal
- refreshConfidenceCache(productId) → void
```

#### Trigger Monitor Service

```
Responsibilities:
- Periodically evaluate all active trigger conditions
- Detect when a trigger condition is satisfied
- Emit trigger-satisfied events to notification orchestrator
- Handle trigger lifecycle (active → satisfied → notified → expired)

Trigger Types:
- SIZE_AVAILABLE: Check inventory for specific size
- PRICE_DROP: Compare current price vs. captured price
- COLOR_AVAILABLE: Check variant availability
- STOCK_RESTOCK: Check inventory replenishment
- NEW_REVIEWS: Check review count delta
- DELIVERY_IMPROVED: Compare delivery estimate vs. threshold
- DATE_REMINDER: Compare current date vs. target date

Evaluation Frequency:
- Price/Inventory triggers: Every 15 minutes
- Review triggers: Every 6 hours
- Date triggers: Daily at 8:00 AM user-local time
```

---

## 6. Data Architecture & Schema Design

### 6.1 Entity Relationship Diagram

```mermaid
erDiagram
    USERS ||--o{ WISHLIST_ITEMS : "has many"
    USERS ||--o{ BAG_ITEMS : "has many"
    USERS ||--o{ NOTIFICATIONS : "receives"
    USERS ||--o{ NOTIFICATION_PREFERENCES : "configures"

    PRODUCTS ||--o{ WISHLIST_ITEMS : "wishlisted by"
    PRODUCTS ||--o{ PRODUCT_VARIANTS : "has variants"
    PRODUCTS ||--o{ REVIEWS : "has reviews"
    PRODUCTS ||--o{ CONFIDENCE_BADGES : "has badge"
    PRODUCTS }o--|| CATEGORIES : "belongs to"

    WISHLIST_ITEMS ||--o| CONCERNS : "may have concern"
    CONCERNS ||--o{ TRIGGERS : "monitored by"
    TRIGGERS ||--o{ TRIGGER_EVALUATIONS : "evaluated in"
    TRIGGERS ||--o| NOTIFICATIONS : "generates"

    ANALYTICS_EVENTS }o--|| USERS : "emitted by"
    ANALYTICS_EVENTS }o--o| PRODUCTS : "references"
```

### 6.2 Core Database Tables

#### `users`

```sql
CREATE TABLE users (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    display_name    VARCHAR(100) NOT NULL,
    email           VARCHAR(255) UNIQUE,
    phone           VARCHAR(15),
    avatar_url      TEXT,
    body_profile    JSONB,          -- { height_cm, bust_cm, waist_cm, hip_cm, preferred_fit }
    location        JSONB,          -- { city, state, pincode }
    created_at      TIMESTAMPTZ DEFAULT NOW(),
    updated_at      TIMESTAMPTZ DEFAULT NOW()
);
```

#### `products`

```sql
CREATE TABLE products (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    sku             VARCHAR(50) UNIQUE NOT NULL,
    name            VARCHAR(255) NOT NULL,
    brand           VARCHAR(100) NOT NULL,
    category_id     UUID REFERENCES categories(id),
    price           DECIMAL(10,2) NOT NULL,
    mrp             DECIMAL(10,2),              -- original MRP for strikethrough
    discount_pct    SMALLINT DEFAULT 0,
    images          TEXT[] NOT NULL,             -- array of image URLs
    description     TEXT,
    fabric_info     JSONB,          -- { material, weave, weight_gsm, opacity, breathability }
    size_chart      JSONB,          -- brand-specific size chart data
    available_sizes TEXT[],         -- ['XS','S','M','L','XL']
    available_colors JSONB[],      -- [{ name: 'Navy Blue', hex: '#1a237e', image_url: '...' }]
    delivery_estimate JSONB,       -- { min_days: 3, max_days: 5, express_available: true }
    rating          DECIMAL(2,1),
    review_count    INTEGER DEFAULT 0,
    is_active       BOOLEAN DEFAULT true,
    created_at      TIMESTAMPTZ DEFAULT NOW(),
    updated_at      TIMESTAMPTZ DEFAULT NOW()
);
```

#### `categories`

```sql
CREATE TABLE categories (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name            VARCHAR(100) NOT NULL,      -- 'Clothing', 'Footwear', 'Accessories'
    sub_category    VARCHAR(100),               -- 'Kurtas', 'Dresses', 'Blazers'
    default_concerns TEXT[] NOT NULL,            -- ordered list of relevant concern types
    concern_weights JSONB                       -- { "size": 0.9, "colour": 0.7, ... }
);
```

#### `wishlist_items`

```sql
CREATE TABLE wishlist_items (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id         UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    product_id      UUID NOT NULL REFERENCES products(id),
    added_at        TIMESTAMPTZ DEFAULT NOW(),
    dwell_days      INTEGER GENERATED ALWAYS AS (
                        EXTRACT(DAY FROM NOW() - added_at)
                    ) STORED,
    selected_size   VARCHAR(10),
    selected_color  VARCHAR(50),
    status          VARCHAR(20) DEFAULT 'active',   -- active, moved_to_bag, purchased, removed
    moved_to_bag_at TIMESTAMPTZ,
    purchased_at    TIMESTAMPTZ,

    UNIQUE(user_id, product_id)
);

CREATE INDEX idx_wishlist_user ON wishlist_items(user_id) WHERE status = 'active';
CREATE INDEX idx_wishlist_dwell ON wishlist_items(dwell_days) WHERE status = 'active';
```

#### `concerns`

```sql
CREATE TABLE concerns (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    wishlist_item_id UUID NOT NULL REFERENCES wishlist_items(id) ON DELETE CASCADE,
    user_id         UUID NOT NULL REFERENCES users(id),
    product_id      UUID NOT NULL REFERENCES products(id),
    concern_type    VARCHAR(30) NOT NULL,
        -- ENUM: 'price', 'size', 'availability', 'colour', 'quality_info',
        --       'delivery', 'purchase_timing', 'other'
    trigger_params  JSONB NOT NULL,
        -- Examples:
        -- { "target_size": "XL" }
        -- { "price_at_capture": 1299.00 }
        -- { "target_color": "Black" }
        -- { "reminder_date": "2026-10-03" }
        -- { "free_text": "Want to see real customer photos" }
    status          VARCHAR(20) DEFAULT 'active',   -- active, satisfied, notified, expired, cancelled
    captured_at     TIMESTAMPTZ DEFAULT NOW(),
    satisfied_at    TIMESTAMPTZ,
    notified_at     TIMESTAMPTZ,
    expires_at      TIMESTAMPTZ DEFAULT (NOW() + INTERVAL '90 days'),

    UNIQUE(wishlist_item_id)
);

CREATE INDEX idx_concern_active ON concerns(concern_type, status) WHERE status = 'active';
CREATE INDEX idx_concern_user ON concerns(user_id) WHERE status = 'active';
```

#### `triggers`

```sql
CREATE TABLE triggers (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    concern_id      UUID NOT NULL REFERENCES concerns(id) ON DELETE CASCADE,
    trigger_type    VARCHAR(30) NOT NULL,
        -- 'size_available', 'price_drop', 'color_available',
        -- 'stock_restock', 'new_reviews', 'delivery_improved', 'date_reminder'
    condition       JSONB NOT NULL,
        -- { "check": "inventory.size_available", "target": "XL", "product_id": "..." }
        -- { "check": "price.current < price.captured", "threshold_pct": 5 }
        -- { "check": "date.current >= date.target", "target": "2026-10-03" }
    evaluation_frequency VARCHAR(20) DEFAULT '15min',
        -- '15min', '1hour', '6hour', 'daily'
    last_evaluated_at TIMESTAMPTZ,
    is_satisfied    BOOLEAN DEFAULT false,
    satisfied_at    TIMESTAMPTZ,
    created_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_trigger_pending ON triggers(trigger_type, evaluation_frequency)
    WHERE is_satisfied = false;
```

#### `confidence_badges`

```sql
CREATE TABLE confidence_badges (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id      UUID NOT NULL REFERENCES products(id),
    true_to_size_pct SMALLINT,              -- 0-100, e.g., 88
    true_to_size_voters INTEGER,            -- e.g., 320
    fabric_score    DECIMAL(2,1),           -- e.g., 4.6
    fabric_material VARCHAR(100),           -- e.g., "Pure Combed Cotton"
    swap_eligible   BOOLEAN DEFAULT false,
    assurance_copy  TEXT,                    -- AI-generated personalized copy
    fit_histogram   JSONB,                  -- { "runs_small": 12, "true_to_size": 280, "runs_large": 28 }
    fabric_gallery  TEXT[],                 -- array of macro photo URLs
    computed_at     TIMESTAMPTZ DEFAULT NOW(),
    expires_at      TIMESTAMPTZ DEFAULT (NOW() + INTERVAL '1 hour')
);

CREATE UNIQUE INDEX idx_badge_product ON confidence_badges(product_id);
```

#### `notifications`

```sql
CREATE TABLE notifications (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id         UUID NOT NULL REFERENCES users(id),
    trigger_id      UUID REFERENCES triggers(id),
    concern_id      UUID REFERENCES concerns(id),
    product_id      UUID REFERENCES products(id),
    channel         VARCHAR(20) NOT NULL,       -- 'in_app', 'push', 'email'
    title           VARCHAR(255) NOT NULL,
    body            TEXT NOT NULL,
    deep_link       TEXT,                       -- URL to product/wishlist
    is_digest       BOOLEAN DEFAULT false,      -- true if AI-summarized digest
    digest_product_ids UUID[],                  -- for digest notifications
    status          VARCHAR(20) DEFAULT 'pending',  -- pending, sent, opened, dismissed
    sent_at         TIMESTAMPTZ,
    opened_at       TIMESTAMPTZ,
    dismissed_at    TIMESTAMPTZ,
    created_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_notif_user ON notifications(user_id, status);
CREATE INDEX idx_notif_sent ON notifications(sent_at) WHERE status = 'sent';
```

#### `analytics_events`

```sql
CREATE TABLE analytics_events (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    event_name      VARCHAR(50) NOT NULL,
    user_id         UUID NOT NULL,
    product_id      UUID,
    session_id      VARCHAR(100),
    category        VARCHAR(50),
    concern_type    VARCHAR(30),
    trigger_type    VARCHAR(30),
    platform        VARCHAR(20),        -- 'web', 'email', 'push'
    metadata        JSONB,              -- additional event-specific data
    timestamp       TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_event_name ON analytics_events(event_name, timestamp);
CREATE INDEX idx_event_user ON analytics_events(user_id, timestamp);
```

---

## 7. Concern Capture & Notification Pipeline

### 7.1 End-to-End Pipeline Flow

```mermaid
sequenceDiagram
    participant U as User
    participant UI as Frontend
    participant API as API Gateway
    participant CS as Concern Service
    participant DB as PostgreSQL
    participant RC as Redis Cache
    participant TM as Trigger Monitor
    participant NO as Notification Orchestrator
    participant AI as Gemini AI
    participant CH as Delivery Channel

    U->>UI: Taps "Add to Wishlist"
    UI->>API: POST /wishlist/add
    API->>DB: Insert wishlist_item
    API->>UI: 200 OK + wishlist_item_id
    UI->>U: Show ConcernCapturePopup

    alt User selects "Yes, notify me"
        U->>UI: Selects concern type (e.g., "Size")
        UI->>U: Show follow-up (size picker)
        U->>UI: Selects "XL"
        UI->>API: POST /concern/capture { type: "size", params: { target_size: "XL" } }
        API->>CS: captureConcern()
        CS->>DB: Insert concern + trigger
        CS->>RC: Cache active trigger key
        API->>UI: 200 OK + confirmation
        UI->>U: Toast: "You're all set!"
    else User selects "No"
        UI->>U: Close popup, continue browsing
    end

    Note over TM: Cron: Every 15 minutes
    TM->>DB: Query active triggers (type=size_available)
    TM->>DB: Check inventory for product + size XL
    alt Size XL is now available
        TM->>DB: Mark trigger.is_satisfied = true
        TM->>DB: Mark concern.status = 'satisfied'
        TM->>NO: Emit TRIGGER_SATISFIED event
        NO->>DB: Check user notification preferences
        NO->>AI: Generate personalized notification copy
        AI->>NO: "Great news! Your wishlisted Roadster Cotton Shirt is now available in XL!"
        NO->>DB: Insert notification record
        NO->>CH: Dispatch via in-app + push
        CH->>U: 🔔 Notification delivered
    end

    U->>UI: Opens notification
    UI->>API: POST /analytics/event { name: "notification_opened" }
    UI->>U: Navigate to product page
```

### 7.2 Concern Type → Trigger Type Mapping

| Concern Type | Trigger Type | Condition Logic | Eval Frequency |
|:---|:---|:---|:---:|
| `price` | `price_drop` | `current_price < captured_price` | 15 min |
| `size` | `size_available` | `inventory[target_size] > 0` | 15 min |
| `availability` | `stock_restock` | `inventory[variant] > 0` | 15 min |
| `colour` | `color_available` | `variant[target_color].in_stock = true` | 15 min |
| `quality_info` | `new_reviews` | `review_count > captured_count + threshold` | 6 hours |
| `delivery` | `delivery_improved` | `delivery_days <= user_threshold` | 1 hour |
| `purchase_timing` | `date_reminder` | `current_date >= target_date` | Daily 8AM |
| `other` | _none (data capture only)_ | N/A | N/A |

---

## 8. Pre-Purchase Confidence Bridge Pipeline

### 8.1 Badge Computation Pipeline

```mermaid
graph TD
    subgraph "Stage 1: Cache Check [RULES] (5ms)"
        A["Redis: GET badge:{productId}"] -->|"Cache HIT"| Z["Return cached badge"]
        A -->|"Cache MISS"| B
    end

    subgraph "Stage 2: Review Aggregation [RULES] (15ms)"
        B["Query reviews for product"] --> C["Aggregate size consensus"]
        C --> D["Compute True-to-Size %"]
        D --> E["Build fit histogram<br>{runs_small, true_to_size, runs_large}"]
    end

    subgraph "Stage 3: Fabric Analysis [RULES + AI] (25ms)"
        E --> F["Extract fabric_info from product"]
        F --> G["Score fabric quality (weight, breathability, opacity)"]
        G --> H["Query customer photo URLs"]
    end

    subgraph "Stage 4: Swap Eligibility [RULES] (10ms)"
        H --> I["Check inventory: swap stock available?"]
        I --> J["Check policy: product category eligible?"]
        J --> K["Check logistics: user pincode serviceable?"]
    end

    subgraph "Stage 5: AI Copy [AI/ML] (40ms, async)"
        K --> L["Gemini: Generate assurance copy"]
        L --> M["Personalize against user's body profile"]
    end

    subgraph "Stage 6: Cache & Return (5ms)"
        M --> N["Assemble ConfidenceBadge object"]
        N --> O["Redis: SET badge:{productId} TTL=3600"]
        O --> Z
    end
```

### 8.2 Assurance Modal Data Structure

```json
{
  "product_id": "uuid-123",
  "confidence_badge": {
    "true_to_size_pct": 88,
    "true_to_size_voters": 320,
    "fabric_score": 4.6,
    "fabric_material": "Pure Combed Cotton",
    "swap_eligible": true
  },
  "assurance_modal": {
    "fit_histogram": {
      "runs_small": 12,
      "true_to_size": 280,
      "runs_large": 28,
      "total_voters": 320
    },
    "fabric_dna": {
      "material": "100% Combed Cotton",
      "weight_gsm": 180,
      "opacity_score": 4.2,
      "breathability_score": 4.8,
      "macro_photos": [
        "https://cdn.example.com/fabric/prod123_macro1.jpg",
        "https://cdn.example.com/fabric/prod123_macro2.jpg"
      ]
    },
    "ai_fit_advice": "Fits identical to your Roadster Cotton Dress in Size M. The waist runs true-to-size with a relaxed drape below the hip.",
    "recommended_size": "M",
    "fit_type": "Relaxed",
    "swap_guarantee": {
      "eligible": true,
      "swap_fee": 0,
      "estimated_swap_days": 2,
      "coverage": "Size exchange within 7 days of delivery"
    }
  }
}
```

---

## 9. AI / ML Architecture

### 9.1 AI Service Components

```mermaid
graph TD
    subgraph "AI Service Layer"
        A["AI Gateway<br>(Request Router)"]
    end

    subgraph "Model 1: Fit Consensus Engine"
        B["MiniLM Sentence Embeddings"]
        C["Review Clustering Pipeline"]
        D["Size Consensus Aggregator"]
    end

    subgraph "Model 2: Assurance Copy Generator"
        E["Gemini Flash 2.0"]
        F["Prompt Template Engine"]
        G["User Context Injector"]
    end

    subgraph "Model 3: Notification Summarizer"
        H["Gemini Flash 2.0"]
        I["Multi-Product Digest Builder"]
        J["Priority Scorer"]
    end

    subgraph "Model 4: Concern Ranker"
        K["Category-Concern Weight Matrix"]
        L["User History Personalization"]
        M["Concern Ordering Engine"]
    end

    A --> B --> C --> D
    A --> E
    F --> E
    G --> F
    A --> H --> I --> J
    A --> K --> L --> M
```

### 9.2 AI Use Cases & Fallbacks

| AI Component | Primary Model | Fallback | Graceful Degradation |
|:---|:---|:---|:---|
| **Fit Consensus** | MiniLM-L6 (local embeddings) | Pre-computed static clusters | Show raw review count instead of % |
| **Assurance Copy** | Gemini Flash 2.0 | Groq (Mixtral) | Template-based static copy |
| **Notification Summarization** | Gemini Flash 2.0 | Rule-based concatenation | Send individual notifications instead of digest |
| **Concern Ordering** | User-history ML model | Category-default weights | Show all 8 concerns in default order |
| **AI Search** | Gemini Flash 2.0 | Keyword search fallback | Standard filter-based search |

### 9.3 Prompt Templates

#### Assurance Copy Prompt

```
You are a fashion fit advisor for Myntra. Generate a single, confident, 
conversational sentence (max 25 words) that helps a shopper feel confident 
about purchasing this item.

Product: {product_name} by {brand}
Category: {category}
Fabric: {fabric_material}, {weight_gsm}gsm
True-to-Size: {true_to_size_pct}% ({voter_count} buyers)
User's body: Height {height_cm}cm, typical size {usual_size}
User's past purchase: {similar_past_purchase}

Rules:
- Never mention discounts, sales, or prices
- Focus on fit, fabric feel, and comparison to owned items
- Be specific and personal, not generic
- Use warm, reassuring tone
```

#### Notification Digest Prompt

```
You are Myntra's shopping assistant. Summarize these wishlist notifications 
into a single friendly, scannable digest message (max 80 words).

Triggered notifications:
{notification_list}

Rules:
- Group by concern type (size restocks together, price drops together)
- Highlight the most time-sensitive items first
- Use bullet points for clarity
- Include specific product names and the resolved concern
- End with a single CTA: "Open your Wishlist to check them out"
```

---

## 10. Notification Delivery System

### 10.1 Multi-Channel Architecture

```mermaid
graph TD
    subgraph "Notification Orchestrator"
        A["Trigger Satisfied Event"]
        B["User Preference Checker"]
        C["Digest Aggregator"]
        D["Channel Router"]
    end

    subgraph "Channel Handlers"
        E["In-App Handler<br>(WebSocket / SSE)"]
        F["Push Handler<br>(FCM / APNs)"]
        G["Email Handler<br>(SendGrid / SES)"]
    end

    subgraph "Delivery"
        H["In-App Notification Center"]
        I["Mobile Push Notification"]
        J["Email Inbox"]
    end

    A --> B
    B --> C
    C -->|"Single product"| D
    C -->|"7+ products matched"| AI["AI Digest Generator"]
    AI --> D
    D --> E --> H
    D --> F --> I
    D --> G --> J
```

### 10.2 Digest Logic

```
IF user has >= 7 active concerns with satisfied triggers in same evaluation window:
    → Route to AI Digest Generator
    → Generate summarized multi-product notification
    → Deliver as single digest (in-app + email)
ELSE:
    → Deliver individual notification per trigger
    → in-app (always) + push (if enabled)
```

### 10.3 Notification Priority & Throttling

| Priority | Trigger Type | Max Notifications / Day | Channels |
|:---|:---|:---:|:---|
| **P0 Critical** | Date reminder | 1 | In-app + Push + Email |
| **P1 High** | Size available, Color available | 3 | In-app + Push |
| **P2 Medium** | Price drop, Delivery improved | 5 | In-app + Push |
| **P3 Low** | New reviews, Stock restock | 5 | In-app only |
| **Digest** | Multi-trigger batch | 1 per batch | In-app + Email |

---

## 11. Trigger Monitoring Engine

### 11.1 Cron-Based Evaluation Architecture

```mermaid
graph TD
    subgraph "Scheduler (Node-Cron)"
        A["15-min Cron<br>Price + Inventory Triggers"]
        B["1-hour Cron<br>Delivery Triggers"]
        C["6-hour Cron<br>Review Triggers"]
        D["Daily 8AM Cron<br>Date Reminders"]
    end

    subgraph "Evaluation Pipeline"
        E["Load pending triggers by type + frequency"]
        F["Batch evaluate conditions"]
        G["Mark satisfied triggers"]
        H["Emit TRIGGER_SATISFIED events"]
    end

    subgraph "Data Sources"
        I["Product Inventory Cache"]
        J["Price History Table"]
        K["Review Count Cache"]
        L["System Clock"]
    end

    A --> E
    B --> E
    C --> E
    D --> E
    E --> F
    F --> I
    F --> J
    F --> K
    F --> L
    F --> G --> H
```

### 11.2 Trigger Evaluation Pseudocode

```javascript
// Runs every 15 minutes for price/inventory triggers
async function evaluatePriceTriggers() {
    const pendingTriggers = await db.triggers.findAll({
        where: { trigger_type: 'price_drop', is_satisfied: false },
        include: [{ model: Concern, include: [Product] }]
    });

    for (const trigger of pendingTriggers) {
        const currentPrice = await getProductPrice(trigger.concern.product_id);
        const capturedPrice = trigger.condition.captured_price;
        const thresholdPct = trigger.condition.threshold_pct || 5;

        const dropPct = ((capturedPrice - currentPrice) / capturedPrice) * 100;

        if (dropPct >= thresholdPct) {
            await markTriggerSatisfied(trigger.id);
            await emitEvent('TRIGGER_SATISFIED', {
                triggerId: trigger.id,
                concernId: trigger.concern_id,
                userId: trigger.concern.user_id,
                productId: trigger.concern.product_id,
                notificationData: {
                    type: 'price_drop',
                    oldPrice: capturedPrice,
                    newPrice: currentPrice,
                    dropPct: dropPct.toFixed(1)
                }
            });
        }
    }
}
```

---

## 12. Caching Strategy

### 12.1 Redis Cache Architecture

```mermaid
graph LR
    subgraph "Cache Layers"
        L1["L1: Browser Cache<br>(Service Worker)<br>TTL: Session"]
        L2["L2: CDN Edge Cache<br>(Static Assets)<br>TTL: 24h"]
        L3["L3: Redis Application Cache<br>(Dynamic Data)<br>TTL: Variable"]
        L4["L4: PostgreSQL<br>(Source of Truth)"]
    end

    L1 --> L2 --> L3 --> L4
```

### 12.2 Redis Key Structure

| Key Pattern | Data | TTL | Purpose |
|:---|:---|:---:|:---|
| `badge:{productId}` | ConfidenceBadge JSON | 1 hour | Pre-computed badge for wishlist cards |
| `assurance:{productId}` | AssuranceModal JSON | 1 hour | Pre-computed assurance modal data |
| `wishlist:{userId}` | WishlistItem[] summary | 5 min | User's wishlist item IDs + status |
| `concerns:active:{userId}` | Concern[] summary | 5 min | User's active concerns for badge counters |
| `price:{productId}` | Current price | 15 min | Price feed for trigger evaluation |
| `inventory:{productId}:{size}` | Stock count | 15 min | Inventory for trigger evaluation |
| `reviews:{productId}:count` | Review count | 6 hours | Review count for trigger evaluation |
| `delivery:{productId}:{pincode}` | Delivery estimate | 1 hour | Delivery estimate for trigger evaluation |
| `ai:copy:{productId}:{userId}` | AI assurance copy | 2 hours | Personalized AI-generated copy |
| `session:{sessionId}` | Session data | 30 min | User session with browse context |

### 12.3 Cache Invalidation Strategy

| Event | Cache Keys Invalidated | Strategy |
|:---|:---|:---|
| Price change detected | `price:{productId}`, `badge:{productId}` | Write-through |
| Inventory update | `inventory:{productId}:{size}`, `badge:{productId}` | Write-through |
| New review added | `reviews:{productId}:count`, `badge:{productId}` | TTL expiry (6h) |
| User modifies concern | `concerns:active:{userId}` | Write-through |
| Wishlist add/remove | `wishlist:{userId}` | Write-through |

---

## 13. API Design & Contracts

### 13.1 API Endpoint Summary

| Method | Endpoint | Description | Auth |
|:---|:---|:---|:---:|
| `POST` | `/api/v1/auth/login` | User login (simplified for MVP) | No |
| `GET` | `/api/v1/products` | List products with filters | Yes |
| `GET` | `/api/v1/products/:id` | Product detail with reviews | Yes |
| `GET` | `/api/v1/wishlist` | Get user's wishlist | Yes |
| `POST` | `/api/v1/wishlist/add` | Add product to wishlist | Yes |
| `DELETE` | `/api/v1/wishlist/:itemId` | Remove from wishlist | Yes |
| `POST` | `/api/v1/wishlist/:itemId/move-to-bag` | Move to bag with swap guarantee | Yes |
| `GET` | `/api/v1/concerns/options/:productId` | Get concern options for product | Yes |
| `POST` | `/api/v1/concerns/capture` | Capture user concern + trigger | Yes |
| `PUT` | `/api/v1/concerns/:id` | Update existing concern | Yes |
| `DELETE` | `/api/v1/concerns/:id` | Cancel concern | Yes |
| `GET` | `/api/v1/confidence/:productId` | Get confidence badge data | Yes |
| `GET` | `/api/v1/assurance/:productId` | Get full assurance modal data | Yes |
| `GET` | `/api/v1/notifications` | Get user's notifications | Yes |
| `PUT` | `/api/v1/notifications/:id/read` | Mark notification as read | Yes |
| `POST` | `/api/v1/search/ai` | AI-powered natural language search | Yes |
| `GET` | `/api/v1/bag` | Get user's bag items | Yes |
| `POST` | `/api/v1/analytics/event` | Track analytics event | Yes |

### 13.2 Key API Contracts

#### POST `/api/v1/concerns/capture`

**Request:**
```json
{
  "wishlist_item_id": "uuid-456",
  "product_id": "uuid-123",
  "concern_type": "size",
  "trigger_params": {
    "target_size": "XL"
  }
}
```

**Response (201 Created):**
```json
{
  "concern_id": "uuid-789",
  "trigger_id": "uuid-012",
  "concern_type": "size",
  "status": "active",
  "notification_message_preview": "We'll notify you when this item is available in XL.",
  "estimated_check_frequency": "Every 15 minutes"
}
```

#### GET `/api/v1/confidence/:productId`

**Response (200 OK):**
```json
{
  "product_id": "uuid-123",
  "badges": {
    "true_to_size": {
      "percentage": 88,
      "voter_count": 320,
      "label": "88% True to Size"
    },
    "fabric_dna": {
      "score": 4.6,
      "material": "Pure Combed Cotton",
      "label": "Pure Cotton 4.6★"
    },
    "swap_guarantee": {
      "eligible": true,
      "fee": 0,
      "label": "Zero-Fee Swap ✓"
    }
  },
  "cached": true,
  "computed_at": "2026-09-02T12:00:00Z"
}
```

#### GET `/api/v1/wishlist`

**Response (200 OK):**
```json
{
  "user_id": "uuid-user",
  "total_items": 12,
  "items_with_concerns": 5,
  "items": [
    {
      "wishlist_item_id": "uuid-wi-1",
      "product": {
        "id": "uuid-prod-1",
        "name": "Cotton Embroidered Kurta",
        "brand": "Mango",
        "price": 1299.00,
        "mrp": 1999.00,
        "image": "https://cdn.example.com/img1.jpg",
        "category": "Ethnic Wear"
      },
      "confidence_badge": {
        "true_to_size_pct": 88,
        "fabric_score": 4.6,
        "swap_eligible": true
      },
      "concern": {
        "type": "size",
        "status": "active",
        "label": "Watching: Size XL",
        "trigger_params": { "target_size": "XL" }
      },
      "added_at": "2026-08-15T10:30:00Z",
      "dwell_days": 18
    }
  ]
}
```

---

## 14. State Management

### 14.1 Zustand Store Architecture

```
RootStore
├── AuthStore
│   ├── user: User | null
│   ├── isAuthenticated: boolean
│   └── bodyProfile: BodyProfile | null
│
├── WishlistStore
│   ├── items: WishlistItem[]
│   ├── isLoading: boolean
│   ├── filters: FilterState
│   ├── addToWishlist(productId)
│   ├── removeFromWishlist(itemId)
│   ├── moveToBag(itemId, size)
│   └── refreshWishlist()
│
├── ConcernStore
│   ├── activeConcerns: Map<wishlistItemId, Concern>
│   ├── capturePopup: { isOpen, wishlistItemId, step }
│   ├── openCapturePopup(wishlistItemId)
│   ├── selectConcernType(type)
│   ├── submitConcern(params)
│   └── dismissPopup()
│
├── ConfidenceStore
│   ├── badges: Map<productId, ConfidenceBadge>
│   ├── assuranceModal: { isOpen, productId, data }
│   ├── fetchBadge(productId)
│   └── openAssuranceModal(productId)
│
├── NotificationStore
│   ├── notifications: Notification[]
│   ├── unreadCount: number
│   ├── fetchNotifications()
│   └── markAsRead(notificationId)
│
├── BagStore
│   ├── items: BagItem[]
│   ├── totalAmount: number
│   └── swapWarranties: Map<bagItemId, SwapWarranty>
│
├── SearchStore
│   ├── query: string
│   ├── results: Product[]
│   ├── suggestions: string[]
│   └── searchAI(query)
│
└── UIStore
    ├── activeTab: 'home' | 'explore' | 'wishlist' | 'bag' | 'profile'
    ├── toasts: Toast[]
    └── isBottomSheetOpen: boolean
```

### 14.2 State Flow — Concern Capture

```mermaid
stateDiagram-v2
    [*] --> Idle: Page Load

    Idle --> PopupPrompt: User taps "Add to Wishlist"
    PopupPrompt --> Dismissed: User taps "No"
    PopupPrompt --> ConcernSelector: User taps "Yes"

    ConcernSelector --> FollowUp_Size: Selects "Size"
    ConcernSelector --> FollowUp_Price: Selects "Price"
    ConcernSelector --> FollowUp_Colour: Selects "Colour"
    ConcernSelector --> FollowUp_Delivery: Selects "Delivery"
    ConcernSelector --> FollowUp_Date: Selects "Purchase Timing"
    ConcernSelector --> FollowUp_Other: Selects "Other"

    FollowUp_Size --> Submitting: Selects specific size
    FollowUp_Price --> Submitting: Confirms price watch
    FollowUp_Colour --> Submitting: Selects specific colour
    FollowUp_Delivery --> Submitting: Sets delivery preference
    FollowUp_Date --> Submitting: Picks reminder date
    FollowUp_Other --> Submitting: Enters free text

    Submitting --> Confirmed: API success
    Submitting --> Error: API failure
    Error --> ConcernSelector: Retry

    Confirmed --> Idle: Toast shown, popup closes
    Dismissed --> Idle: Popup closes
```

---

## 15. Analytics & Event Pipeline

### 15.1 Event Architecture

```mermaid
graph LR
    subgraph "Event Sources"
        FE["Frontend<br>(User Interactions)"]
        BE["Backend<br>(System Events)"]
        TM["Trigger Monitor<br>(Condition Events)"]
    end

    subgraph "Event Pipeline"
        Q["Event Queue<br>(In-Memory Buffer)"]
        P["Event Processor<br>(Batch Writer)"]
    end

    subgraph "Storage"
        DB["PostgreSQL<br>analytics_events"]
    end

    subgraph "Consumers"
        DASH["Dashboard<br>(Metrics)"]
        ALERT["Alert System<br>(Guardrails)"]
    end

    FE -->|"Async POST"| Q
    BE -->|"Direct emit"| Q
    TM -->|"Direct emit"| Q
    Q -->|"Batch flush<br>every 5s"| P
    P --> DB
    DB --> DASH
    DB --> ALERT
```

### 15.2 Event Taxonomy (Complete)

| Event Name | Source | Trigger | Key Metadata |
|:---|:---:|:---|:---|
| `wishlist_added` | FE | User taps Add to Wishlist | `product_id, category, price` |
| `concern_prompt_shown` | FE | ConcernCapturePopup renders | `product_id, category` |
| `concern_prompt_dismissed` | FE | User taps "No" | `product_id, dismiss_time_ms` |
| `notification_opted_in` | FE | User taps "Yes" | `product_id` |
| `concern_selected` | FE | User selects concern type | `product_id, concern_type` |
| `trigger_configured` | FE | User completes trigger setup | `concern_type, trigger_params` |
| `confidence_badge_viewed` | FE | Badge enters viewport (IntersectionObserver) | `product_id, badge_type` |
| `assurance_modal_opened` | FE | User taps confidence badge | `product_id, dwell_days` |
| `assurance_modal_dwell` | FE | Time spent in modal (on close) | `product_id, dwell_seconds` |
| `fit_histogram_interacted` | FE | User adjusts body measurements | `product_id, selected_size` |
| `fabric_gallery_viewed` | FE | User swipes fabric photos | `product_id, photos_viewed` |
| `move_to_bag_clicked` | FE | User taps Move to Bag CTA | `product_id, selected_size, has_swap` |
| `trigger_evaluated` | BE | Cron evaluates a trigger | `trigger_type, result, eval_time_ms` |
| `trigger_satisfied` | BE | Condition met | `trigger_type, concern_id, product_id` |
| `notification_sent` | BE | Notification dispatched | `channel, concern_type, is_digest` |
| `notification_opened` | FE | User taps notification | `notification_id, concern_type, latency_hours` |
| `product_revisited` | FE | User lands on PDP from notification | `product_id, source: 'notification'` |
| `added_to_cart` | FE | User adds to bag from any source | `product_id, source, has_concern` |
| `purchase_completed` | FE | User completes checkout (simulated) | `product_id, concern_type, days_in_wishlist` |
| `notification_opted_out` | FE | User disables notifications | `user_id` |
| `ai_search_query` | FE | User submits AI search | `query_text, result_count` |

---

## 16. Security Architecture

### 16.1 Authentication & Authorization

```mermaid
graph LR
    subgraph "Auth Flow (Simplified for MVP)"
        A["User opens app"] --> B["Demo user selector<br>(no real auth in MVP)"]
        B --> C["JWT token issued<br>(userId in payload)"]
        C --> D["Token stored in<br>httpOnly cookie"]
        D --> E["All API requests<br>include token"]
    end

    subgraph "Authorization"
        E --> F["Auth middleware<br>validates JWT"]
        F --> G["Extract userId"]
        G --> H["Scope queries to userId<br>(row-level security)"]
    end
```

### 16.2 Security Measures

| Layer | Measure | Implementation |
|:---|:---|:---|
| **Transport** | HTTPS everywhere | TLS 1.3, HSTS headers |
| **Authentication** | JWT tokens | Short-lived tokens (1h), httpOnly cookies |
| **Authorization** | Row-level scoping | All DB queries filtered by authenticated userId |
| **Input Validation** | Schema validation | Zod schemas on all API inputs |
| **Rate Limiting** | Per-user throttling | 100 req/min per user, 10 req/min for AI endpoints |
| **XSS Prevention** | Content Security Policy | Strict CSP headers, React auto-escaping |
| **CSRF Protection** | SameSite cookies | `SameSite=Strict` on auth cookies |
| **Data Privacy** | PII minimization | No real PII stored; demo data only in MVP |
| **AI Safety** | Prompt injection guard | Input sanitization before LLM calls |

---

## 17. Performance & Latency Budget

### 17.1 End-to-End Latency SLA

```
Total Target: < 120ms (P95 < 95ms)
```

| Component | Budget | Strategy |
|:---|:---:|:---|
| **Client → API Gateway** | 20 ms | Edge CDN, connection pooling |
| **Auth Middleware** | 2 ms | JWT verification (no DB call) |
| **Redis Cache Lookup** | 5 ms | Co-located Redis, connection pool |
| **Rules Engine** | 5 ms | In-memory evaluation, pre-loaded config |
| **AI Inference (cached)** | 0 ms | Pre-computed, served from Redis |
| **AI Inference (miss)** | 40 ms | Async Gemini call, warm cache fallback |
| **Database Query** | 15 ms | Indexed queries, connection pooling |
| **Inventory Check** | 10 ms | Redis-cached inventory snapshots |
| **Response Serialization** | 3 ms | JSON streaming |
| **Network + Render** | 20 ms | Optimistic UI, skeleton loading |
| **TOTAL** | **≤ 120 ms** | |

### 17.2 Frontend Performance Targets

| Metric | Target | Strategy |
|:---|:---:|:---|
| **First Contentful Paint** | < 1.2s | SSR, critical CSS inlining |
| **Largest Contentful Paint** | < 2.0s | Image lazy loading, blur placeholders |
| **Time to Interactive** | < 2.5s | Code splitting, deferred hydration |
| **Cumulative Layout Shift** | < 0.05 | Fixed skeleton dimensions |
| **Bundle Size (JS)** | < 180 KB gzipped | Tree shaking, dynamic imports |
| **Image Format** | WebP/AVIF | Next.js Image optimization |

---

## 18. Scalability & Infrastructure

### 18.1 Infrastructure Diagram

```mermaid
graph TD
    subgraph "CDN Layer"
        CDN["Vercel Edge Network<br>(Static Assets + SSR)"]
    end

    subgraph "Application Layer"
        APP1["Next.js Instance 1"]
        APP2["Next.js Instance 2"]
        APP3["Next.js Instance N"]
    end

    subgraph "API Layer"
        API1["API Server 1"]
        API2["API Server 2"]
    end

    subgraph "Data Layer"
        REDIS["Redis Cluster<br>(Cache + Pub/Sub)"]
        PG["PostgreSQL<br>(Primary + Read Replica)"]
    end

    subgraph "Background Workers"
        W1["Trigger Evaluator Worker"]
        W2["Notification Dispatcher Worker"]
        W3["Badge Recomputation Worker"]
    end

    subgraph "External"
        GEM["Gemini Flash API"]
        EMAIL["SendGrid"]
    end

    CDN --> APP1
    CDN --> APP2
    CDN --> APP3
    APP1 --> API1
    APP2 --> API1
    APP3 --> API2
    API1 --> REDIS
    API1 --> PG
    API2 --> REDIS
    API2 --> PG
    W1 --> PG
    W1 --> REDIS
    W2 --> REDIS
    W2 --> EMAIL
    W3 --> PG
    W3 --> REDIS
    W3 --> GEM
```

### 18.2 Scaling Strategy

| Component | MVP Scale | Production Scale | Strategy |
|:---|:---|:---|:---|
| **Web Servers** | 1 instance | Auto-scale 2–20 | Vercel serverless functions |
| **API Servers** | 1 instance | Auto-scale 2–10 | Horizontal pod autoscaler |
| **Redis** | Single instance | 3-node cluster | Redis Sentinel for HA |
| **PostgreSQL** | Single instance | Primary + 2 read replicas | Connection pooling (PgBouncer) |
| **Background Workers** | 1 worker | 3–5 workers | Job queue with backpressure |
| **AI Calls** | Rate-limited | Cached + batched | Cache-first, async recomputation |

---

## 19. Error Handling & Resilience

### 19.1 Error Handling Strategy

```mermaid
graph TD
    subgraph "Error Categories"
        E1["Network Errors<br>(timeout, DNS)"]
        E2["API Errors<br>(4xx, 5xx)"]
        E3["AI Service Errors<br>(rate limit, timeout)"]
        E4["Database Errors<br>(connection, query)"]
        E5["Validation Errors<br>(bad input)"]
    end

    subgraph "Handling Strategies"
        H1["Retry with exponential backoff<br>(max 3 retries)"]
        H2["Return cached/stale data<br>(serve from Redis)"]
        H3["Graceful degradation<br>(rules-only mode)"]
        H4["User-facing error message<br>(toast notification)"]
        H5["Circuit breaker<br>(prevent cascade)"]
    end

    E1 --> H1
    E2 --> H4
    E3 --> H3
    E4 --> H2
    E4 --> H5
    E5 --> H4
```

### 19.2 Circuit Breaker Configuration

| Service | Failure Threshold | Reset Timeout | Fallback |
|:---|:---:|:---:|:---|
| Gemini Flash API | 5 failures / 60s | 30 seconds | Template-based static copy |
| Groq Fallback API | 3 failures / 60s | 60 seconds | No AI copy, badges only |
| PostgreSQL | 3 failures / 10s | 10 seconds | Read from Redis cache |
| Redis | 2 failures / 5s | 5 seconds | Direct DB queries |

### 19.3 Offline Resilience (PWA)

```
Service Worker Strategy:
├── Static Assets: Cache-First (precache on install)
├── API Responses: Stale-While-Revalidate (show cached, fetch fresh)
├── Concern Capture: Queue in IndexedDB → sync on reconnect
├── Analytics Events: Queue in memory → batch flush when online
└── Notifications: Receive via Push API even when app is closed
```

---

## 20. Deployment Architecture

### 20.1 CI/CD Pipeline

```mermaid
graph LR
    subgraph "Development"
        A["Developer Push<br>to main branch"]
    end

    subgraph "CI Pipeline"
        B["Lint + Type Check"]
        C["Unit Tests"]
        D["Integration Tests"]
        E["Build (Next.js)"]
    end

    subgraph "CD Pipeline"
        F["Deploy to Staging"]
        G["Smoke Tests"]
        H["Deploy to Production"]
    end

    A --> B --> C --> D --> E --> F --> G --> H
```

### 20.2 Environment Configuration

| Environment | Purpose | Database | AI Service | URL |
|:---|:---|:---|:---|:---|
| **Development** | Local dev | SQLite (file) | Mock responses | `localhost:3000` |
| **Staging** | Pre-release testing | PostgreSQL (shared) | Gemini (rate-limited) | `staging.myntra-ai.app` |
| **Production** | Live MVP | PostgreSQL (dedicated) | Gemini (full quota) | `myntra-ai.app` |

---

## 21. Technology Stack Summary

### 21.1 Full Stack Overview

| Layer | Technology | Version | Rationale |
|:---|:---|:---:|:---|
| **Framework** | Next.js | 14.x | SSR, API routes, image optimization, mobile-first |
| **UI Library** | React | 18.x | Component model, hooks, concurrent features |
| **Language** | TypeScript | 5.x | Type safety, IDE support, refactoring confidence |
| **Styling** | CSS Modules + Vanilla CSS | — | Maximum control, Myntra brand tokens, no utility bloat |
| **State Management** | Zustand | 4.x | Lightweight, no boilerplate, devtools support |
| **Database** | PostgreSQL | 16.x | Relational integrity, JSONB, full-text search |
| **ORM** | Prisma | 5.x | Type-safe queries, migrations, schema management |
| **Cache** | Redis | 7.x | Sub-ms reads, pub/sub for notifications, TTL |
| **AI (Primary)** | Google Gemini Flash 2.0 | — | Low-latency, high-quality fashion domain text |
| **AI (Fallback)** | Groq (Mixtral) | — | Ultra-fast inference fallback |
| **Embeddings** | MiniLM-L6 | — | Local sentence embeddings for review clustering |
| **Email** | SendGrid | — | Transactional email delivery |
| **Push** | Firebase Cloud Messaging | — | Cross-platform push notifications |
| **Job Scheduling** | node-cron | 3.x | Trigger evaluation scheduling |
| **Validation** | Zod | 3.x | Runtime schema validation for API inputs |
| **Testing** | Vitest + Playwright | — | Unit + E2E testing |
| **Deployment** | Vercel | — | Zero-config Next.js deployment, edge functions |
| **Monitoring** | Vercel Analytics + custom | — | Performance monitoring, error tracking |

### 21.2 NPM Package Dependencies

```
Production:
├── next, react, react-dom
├── zustand (state management)
├── prisma, @prisma/client (ORM)
├── ioredis (Redis client)
├── @google/generative-ai (Gemini SDK)
├── groq-sdk (Groq fallback)
├── node-cron (job scheduling)
├── zod (validation)
├── jsonwebtoken (auth)
├── nodemailer / @sendgrid/mail (email)
├── firebase-admin (push notifications)
└── uuid (ID generation)

Development:
├── typescript
├── vitest (unit testing)
├── playwright (E2E testing)
├── eslint, prettier
└── prisma (CLI for migrations)
```

---

## 22. Component Dependency Map

### 22.1 Full System Dependency Graph

```mermaid
graph TD
    subgraph "User Interface"
        UI_SHELL["App Shell"]
        UI_WISH["Wishlist Page"]
        UI_PDP["Product Detail"]
        UI_BAG["Bag Page"]
        UI_EXPLORE["Explore Page"]
        UI_NOTIF["Notification Center"]
    end

    subgraph "UI Components"
        C_CARD["WishlistCard"]
        C_BADGE["ConfidenceBadge"]
        C_POPUP["ConcernPopup"]
        C_MODAL["AssuranceModal"]
        C_SEARCH["AISearchBar"]
    end

    subgraph "State Stores"
        S_WISH["WishlistStore"]
        S_CONCERN["ConcernStore"]
        S_CONF["ConfidenceStore"]
        S_NOTIF["NotificationStore"]
        S_BAG["BagStore"]
    end

    subgraph "API Services"
        API_WISH["Wishlist API"]
        API_CONCERN["Concern API"]
        API_CONF["Confidence API"]
        API_NOTIF["Notification API"]
        API_SEARCH["Search API"]
    end

    subgraph "Backend Services"
        SVC_WISH["Wishlist Service"]
        SVC_CONCERN["Concern Service"]
        SVC_CONF["Confidence Engine"]
        SVC_TRIGGER["Trigger Monitor"]
        SVC_NOTIF["Notification Orchestrator"]
        SVC_AI["AI Service"]
    end

    subgraph "Data Stores"
        POSTGRES["PostgreSQL"]
        REDIS["Redis"]
        GEMINI["Gemini AI"]
    end

    UI_WISH --> C_CARD
    C_CARD --> C_BADGE
    C_CARD --> C_POPUP
    C_CARD --> C_MODAL

    C_CARD --> S_WISH
    C_POPUP --> S_CONCERN
    C_BADGE --> S_CONF
    C_MODAL --> S_CONF
    UI_NOTIF --> S_NOTIF
    UI_BAG --> S_BAG
    UI_EXPLORE --> C_SEARCH

    S_WISH --> API_WISH
    S_CONCERN --> API_CONCERN
    S_CONF --> API_CONF
    S_NOTIF --> API_NOTIF
    C_SEARCH --> API_SEARCH

    API_WISH --> SVC_WISH
    API_CONCERN --> SVC_CONCERN
    API_CONF --> SVC_CONF
    API_NOTIF --> SVC_NOTIF
    API_SEARCH --> SVC_AI

    SVC_WISH --> POSTGRES
    SVC_WISH --> REDIS
    SVC_CONCERN --> POSTGRES
    SVC_CONCERN --> SVC_TRIGGER
    SVC_CONF --> REDIS
    SVC_CONF --> SVC_AI
    SVC_TRIGGER --> POSTGRES
    SVC_TRIGGER --> REDIS
    SVC_TRIGGER --> SVC_NOTIF
    SVC_NOTIF --> REDIS
    SVC_AI --> GEMINI
    SVC_AI --> REDIS
```

---

## Appendix A: Directory Structure (Proposed)

```
myntra-wishlist-ai/
├── public/
│   ├── icons/                      # App icons, favicon
│   ├── images/                     # Static product images (mock catalog)
│   └── manifest.json               # PWA manifest
│
├── src/
│   ├── app/                        # Next.js App Router
│   │   ├── layout.tsx              # Root layout (MyntraShell)
│   │   ├── page.tsx                # Home page
│   │   ├── explore/page.tsx        # AI Discovery page
│   │   ├── wishlist/page.tsx       # Smart Wishlist page
│   │   ├── product/[id]/page.tsx   # Product Detail page
│   │   ├── bag/page.tsx            # Zero-Risk Bag page
│   │   ├── profile/page.tsx        # User Profile page
│   │   ├── notifications/page.tsx  # Notification Center page
│   │   └── api/v1/                 # API Routes
│   │       ├── auth/login/route.ts
│   │       ├── products/route.ts
│   │       ├── products/[id]/route.ts
│   │       ├── wishlist/route.ts
│   │       ├── wishlist/add/route.ts
│   │       ├── wishlist/[itemId]/route.ts
│   │       ├── concerns/options/[productId]/route.ts
│   │       ├── concerns/capture/route.ts
│   │       ├── concerns/[id]/route.ts
│   │       ├── confidence/[productId]/route.ts
│   │       ├── assurance/[productId]/route.ts
│   │       ├── notifications/route.ts
│   │       ├── notifications/[id]/route.ts
│   │       ├── search/ai/route.ts
│   │       ├── bag/route.ts
│   │       └── analytics/event/route.ts
│   │
│   ├── components/                 # React Components
│   │   ├── shell/
│   │   │   ├── MyntraShell.tsx
│   │   │   ├── BottomNavBar.tsx
│   │   │   └── TopBar.tsx
│   │   ├── wishlist/
│   │   │   ├── WishlistCard.tsx
│   │   │   ├── WishlistGrid.tsx
│   │   │   └── FilterChipBar.tsx
│   │   ├── confidence/
│   │   │   ├── ConfidenceBadge.tsx
│   │   │   ├── TrueToSizeBadge.tsx
│   │   │   ├── FabricDNABadge.tsx
│   │   │   └── SwapGuaranteeBadge.tsx
│   │   ├── concern/
│   │   │   ├── ConcernCapturePopup.tsx
│   │   │   ├── ConcernChipSelector.tsx
│   │   │   ├── SizeFollowUp.tsx
│   │   │   ├── PriceFollowUp.tsx
│   │   │   ├── ColourFollowUp.tsx
│   │   │   ├── DeliveryFollowUp.tsx
│   │   │   ├── DateFollowUp.tsx
│   │   │   └── OtherFollowUp.tsx
│   │   ├── assurance/
│   │   │   ├── AssuranceModal.tsx
│   │   │   ├── FitHistogram.tsx
│   │   │   ├── FabricDNAGallery.tsx
│   │   │   ├── AIFitAdvice.tsx
│   │   │   └── SmartSizeSelector.tsx
│   │   ├── bag/
│   │   │   ├── BagItem.tsx
│   │   │   └── SwapWarrantyCertificate.tsx
│   │   ├── notifications/
│   │   │   ├── NotificationCard.tsx
│   │   │   └── DigestSummary.tsx
│   │   ├── search/
│   │   │   ├── AISearchBar.tsx
│   │   │   └── QueryChips.tsx
│   │   ├── product/
│   │   │   ├── ProductCard.tsx
│   │   │   └── ProductDetail.tsx
│   │   └── shared/
│   │       ├── SelectableChip.tsx
│   │       ├── RangeSlider.tsx
│   │       ├── ToastNotification.tsx
│   │       ├── BottomSheet.tsx
│   │       ├── Badge.tsx
│   │       ├── Skeleton.tsx
│   │       └── EmptyState.tsx
│   │
│   ├── stores/                     # Zustand State Stores
│   │   ├── authStore.ts
│   │   ├── wishlistStore.ts
│   │   ├── concernStore.ts
│   │   ├── confidenceStore.ts
│   │   ├── notificationStore.ts
│   │   ├── bagStore.ts
│   │   ├── searchStore.ts
│   │   └── uiStore.ts
│   │
│   ├── services/                   # Backend Service Layer
│   │   ├── wishlistService.ts
│   │   ├── concernService.ts
│   │   ├── confidenceEngine.ts
│   │   ├── triggerMonitor.ts
│   │   ├── notificationOrchestrator.ts
│   │   ├── aiService.ts
│   │   └── analyticsService.ts
│   │
│   ├── lib/                        # Shared Utilities
│   │   ├── db.ts                   # Prisma client
│   │   ├── redis.ts                # Redis client
│   │   ├── auth.ts                 # JWT utilities
│   │   ├── validation.ts           # Zod schemas
│   │   ├── constants.ts            # App constants
│   │   ├── types.ts                # TypeScript types
│   │   └── utils.ts                # Helper functions
│   │
│   ├── hooks/                      # Custom React Hooks
│   │   ├── useWishlist.ts
│   │   ├── useConcern.ts
│   │   ├── useConfidence.ts
│   │   ├── useNotifications.ts
│   │   └── useAnalytics.ts
│   │
│   ├── styles/                     # CSS Modules + Global Styles
│   │   ├── globals.css             # Design tokens, resets, typography
│   │   ├── variables.css           # CSS custom properties
│   │   ├── components/             # Component-specific CSS modules
│   │   └── animations.css          # Micro-animations
│   │
│   └── data/                       # Mock Data (MVP)
│       ├── products.json           # Product catalog
│       ├── reviews.json            # Review corpus
│       ├── users.json              # Demo users
│       └── categories.json         # Category definitions
│
├── prisma/
│   ├── schema.prisma               # Database schema
│   ├── migrations/                 # Migration files
│   └── seed.ts                     # Seed data script
│
├── workers/                        # Background Workers
│   ├── triggerEvaluator.ts         # Cron-based trigger evaluation
│   ├── notificationDispatcher.ts   # Notification dispatch worker
│   └── badgeRecomputer.ts          # Badge cache refresh worker
│
├── tests/
│   ├── unit/                       # Vitest unit tests
│   ├── integration/                # API integration tests
│   └── e2e/                        # Playwright E2E tests
│
├── .env.example                    # Environment variables template
├── next.config.js                  # Next.js configuration
├── tsconfig.json                   # TypeScript configuration
├── package.json
└── README.md
```

---

## Appendix B: Environment Variables

```env
# Database
DATABASE_URL=postgresql://user:pass@localhost:5432/myntra_wishlist_ai
REDIS_URL=redis://localhost:6379

# AI Services
GEMINI_API_KEY=your-gemini-api-key
GROQ_API_KEY=your-groq-api-key

# Authentication
JWT_SECRET=your-jwt-secret
JWT_EXPIRY=3600

# Notifications
SENDGRID_API_KEY=your-sendgrid-key
FCM_SERVER_KEY=your-fcm-key

# App Config
NEXT_PUBLIC_APP_URL=http://localhost:3000
TRIGGER_EVAL_INTERVAL_MS=900000    # 15 minutes
BADGE_CACHE_TTL_SEC=3600           # 1 hour
CONCERN_EXPIRY_DAYS=90
NOTIFICATION_DIGEST_THRESHOLD=7

# Feature Flags
ENABLE_AI_ASSURANCE=true
ENABLE_PUSH_NOTIFICATIONS=false    # Disabled in MVP dev
ENABLE_EMAIL_NOTIFICATIONS=false   # Disabled in MVP dev
```

---

*This architecture document provides the complete technical blueprint for implementing the Myntra Wishlist AI MVP. It should be read alongside the [problemStatement.md](file:///Users/shubhamthakur/Downloads/nextleap%20antigravity%20projects/MVP_Myntra_project/problemStatement.md) for full product context.*
