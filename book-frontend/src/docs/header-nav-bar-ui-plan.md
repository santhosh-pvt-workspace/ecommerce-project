You are a senior frontend engineer.

Build a **modern E-commerce Header with Mega Menu (like the attached design)** using:

* React (TypeScript)
* Tailwind CSS
* shadcn/ui (optional for primitives)
* Fully reusable + data-driven architecture (NO hardcoding)

---

## 🎯 Design Reference (IMPORTANT)

Match this structure visually and behavior-wise:

* Top horizontal navbar
* Centered navigation links
* Hover-based mega dropdown
* Multi-column category layout
* Right-side promotional banner image inside dropdown
* Clean spacing, minimal UI, modern fashion/e-commerce style

---

## 🔥 Core Requirements

### 1. Data-Driven Architecture

* NO hardcoded menu, labels, or links
* Everything must come from props/config

```ts
type MenuItem = {
  label: string;
  href?: string;
  badge?: string;
  megaMenu?: {
    columns: {
      title: string;
      links: { label: string; href: string }[];
    }[];
    promo?: {
      title?: string;
      subtitle?: string;
      image: string;
      ctaLabel?: string;
      href?: string;
    };
  };
};
```

---

## 🧩 Components to Build

### 1. `<Header />`

* Wrapper for entire navbar
* Accepts logo, menu, user, cart

### 2. `<NavMenu />`

* Renders top-level links
* Detects mega menu vs normal link

### 3. `<MegaMenu />`

* Dropdown container
* Positioned below nav item
* Handles hover state

### 4. `<MegaMenuColumn />`

* Renders one column (title + links)

### 5. `<PromoBanner />`

* Right-side image card
* Overlay text + CTA

---

## ⚙️ Features to Match UI

### Navigation

* Horizontal center-aligned menu
* Items like: New arrivals, Men, Women, Kids
* Dropdown arrow indicator

### Mega Menu (KEY PART)

* Opens on hover (desktop)
* Full-width dropdown
* Layout:

  * Left → multiple columns (3–4)
  * Right → promo image

Example layout:

[ Column 1 | Column 2 | Column 3 | Promo Banner ]

---

### Promo Banner

* Large image on right
* Overlay text:

  * Title (e.g., "Running")
  * Subtitle
  * CTA ("Shop now →")

---

### Mobile Behavior

* Hamburger menu
* Drawer with accordion
* Nested expandable categories

---

### User / Cart / Search

* Right side icons
* Props-driven:

  * cartCount
  * user state
* No auth logic inside

---

## 🧠 Props Design

```ts
type HeaderProps = {
  logo: string;
  menu: MenuItem[];
  cartCount: number;
  onSearchClick?: () => void;
  user?: {
    name: string;
    isLoggedIn: boolean;
  };
};
```

---

## 🎨 Styling Rules

* Tailwind only
* No inline styles
* Use spacing like real e-commerce UI:

  * px-6 / px-8
  * gap-6 / gap-10
* Subtle hover effects
* Smooth dropdown animation

---

## 🚫 Strict Rules

* ❌ No hardcoded menu items
* ❌ No static images inside components
* ❌ No business logic (auth/cart)
* ✅ Everything via props/config
* ✅ Reusable across projects

---

## 🎁 Expected Output

* Clean folder structure
* Fully typed components
* Example menu config (mock data)
* Pixel-close UI to reference image
* Easy to plug into any React project

---

Build this like a **UI library component**, not a one-off implementation.
