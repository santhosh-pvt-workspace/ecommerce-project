import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  ShoppingCart,
  Sparkles,
  Menu,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import { observer } from "mobx-react-lite";
import { useStore } from "@/store";
import { useCartQuery } from "@/queries/cartQueries";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/shared/shadcn/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/shared/shadcn/ui/sheet";
import { cn } from "@/shared/shadcn/lib/utils";
import skincareImage1 from "@/assets/skincare-image-1.png";

// ─── Types ────────────────────────────────────────────────────────────────────
type NavLink = { label: string; href: string };
type MegaMenuColumn = { title: string; links: NavLink[] };
type PromoConfig = {
  title: string;
  subtitle: string;
  image: string;
  ctaLabel: string;
  href: string;
};
type MenuItem = {
  label: string;
  href?: string;
  badge?: string;
  megaMenu?: {
    columns: MegaMenuColumn[];
    promo?: PromoConfig;
  };
};

// ─── Menu Config ──────────────────────────────────────────────────────────────
const MENU_CONFIG: MenuItem[] = [
  { label: "Home", href: "/" },
  {
    label: "Shop",
    megaMenu: {
      columns: [
        {
          title: "Categories",
          links: [
            { label: "All Products", href: "/products" },
            { label: "Skincare", href: "/products?category=skincare" },
            { label: "Haircare", href: "/products?category=haircare" },
            { label: "Fragrances", href: "/products?category=fragrances" },
          ],
        },
        {
          title: "Collections",
          links: [
            { label: "New Arrivals", href: "/products?sort=newest" },
            { label: "Best Sellers", href: "/products?sort=popular" },
            { label: "Staff Picks", href: "/products?sort=curated" },
            { label: "Limited Edition", href: "/products?tag=limited" },
          ],
        },
        {
          title: "Deals",
          links: [
            { label: "Sale — Up to 40% Off", href: "/products?sale=true" },
            { label: "Bundle & Save", href: "/products?tag=bundle" },
            { label: "Gift Sets", href: "/products?tag=gifts" },
          ],
        },
      ],
      promo: {
        title: "Summer Edit",
        subtitle: "Fresh picks for the season",
        image: skincareImage1,
        ctaLabel: "Shop now",
        href: "/products?tag=summer",
      },
    },
  },
  {
    label: "Men",
    megaMenu: {
      columns: [
        {
          title: "Skincare",
          links: [
            { label: "Face Wash", href: "/products?gender=men&type=facewash" },
            { label: "Moisturiser", href: "/products?gender=men&type=moisturiser" },
            { label: "Serum", href: "/products?gender=men&type=serum" },
          ],
        },
        {
          title: "Hair",
          links: [
            { label: "Shampoo", href: "/products?gender=men&type=shampoo" },
            { label: "Conditioner", href: "/products?gender=men&type=conditioner" },
            { label: "Styling", href: "/products?gender=men&type=styling" },
          ],
        },
      ],
      promo: {
        title: "Men's Essentials",
        subtitle: "Built for confidence",
        image: skincareImage1,
        ctaLabel: "Explore",
        href: "/products?gender=men",
      },
    },
  },
  {
    label: "Women",
    badge: "New",
    megaMenu: {
      columns: [
        {
          title: "Skincare",
          links: [
            { label: "Cleansers", href: "/products?gender=women&type=cleanser" },
            { label: "Toners", href: "/products?gender=women&type=toner" },
            { label: "Serums", href: "/products?gender=women&type=serum" },
            { label: "Moisturisers", href: "/products?gender=women&type=moisturiser" },
          ],
        },
        {
          title: "Makeup",
          links: [
            { label: "Foundation", href: "/products?type=foundation" },
            { label: "Lipstick", href: "/products?type=lipstick" },
            { label: "Eye", href: "/products?type=eye" },
          ],
        },
      ],
      promo: {
        title: "Glow Up",
        subtitle: "Radiant skin starts here",
        image: skincareImage1,
        ctaLabel: "Shop Women",
        href: "/products?gender=women",
      },
    },
  },
  { label: "About", href: "/about" },
];

// ─── Promo Banner ─────────────────────────────────────────────────────────────
function PromoBanner({ promo }: { promo: PromoConfig }) {
  return (
    <Link
      to={promo.href}
      className="group relative flex h-full min-h-[220px] flex-col justify-end overflow-hidden rounded-xl"
    >
      <img
        src={promo.image}
        alt={promo.title}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
      <div className="relative z-10 p-4">
        <p className="text-xs font-semibold uppercase tracking-widest text-white/70">
          {promo.subtitle}
        </p>
        <p className="mt-1 text-lg font-bold text-white">{promo.title}</p>
        <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-white underline-offset-4 group-hover:underline">
          {promo.ctaLabel} <ChevronRight className="h-3.5 w-3.5" />
        </span>
      </div>
    </Link>
  );
}

// ─── Mega Menu Column ─────────────────────────────────────────────────────────
function MegaMenuColumn({ column }: { column: MegaMenuColumn }) {
  return (
    <div className="flex flex-col gap-2 p-4">
      <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
        {column.title}
      </p>
      <ul className="flex flex-col gap-1">
        {column.links.map((link) => (
          <li key={link.href}>
            <NavigationMenuLink asChild>
              <Link
                to={link.href}
                className="block rounded-md px-2 py-1.5 text-sm text-foreground/80 transition-colors hover:bg-muted hover:text-primary"
              >
                {link.label}
              </Link>
            </NavigationMenuLink>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ─── Mobile Accordion Item ────────────────────────────────────────────────────
function MobileMenuItem({
  item,
  onClose,
}: {
  item: MenuItem;
  onClose: () => void;
}) {
  const [open, setOpen] = useState(false);

  if (!item.megaMenu) {
    return (
      <Link
        to={item.href ?? "/"}
        onClick={onClose}
        className="flex items-center justify-between rounded-lg px-3 py-2.5 text-base font-medium text-foreground hover:bg-muted"
      >
        {item.label}
        {item.badge && (
          <span className="rounded-full bg-primary px-2 py-0.5 text-[10px] font-bold text-primary-foreground">
            {item.badge}
          </span>
        )}
      </Link>
    );
  }

  return (
    <div>
      <button
        onClick={() => setOpen((p) => !p)}
        className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-base font-medium text-foreground hover:bg-muted"
      >
        <span className="flex items-center gap-2">
          {item.label}
          {item.badge && (
            <span className="rounded-full bg-primary px-2 py-0.5 text-[10px] font-bold text-primary-foreground">
              {item.badge}
            </span>
          )}
        </span>
        <ChevronDown
          className={cn(
            "h-4 w-4 text-muted-foreground transition-transform duration-200",
            open && "rotate-180"
          )}
        />
      </button>
      {open && (
        <div className="ml-4 mt-1 flex flex-col gap-4 border-l border-border pl-4 py-2">
          {item.megaMenu.columns.map((col) => (
            <div key={col.title}>
              <p className="mb-1.5 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                {col.title}
              </p>
              <ul className="flex flex-col gap-0.5">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      to={link.href}
                      onClick={onClose}
                      className="block rounded-md px-2 py-1.5 text-sm text-foreground/80 hover:bg-muted hover:text-primary"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Header ───────────────────────────────────────────────────────────────────
export const HeaderNavBar: React.FC = observer(() => {
  const { cartStore } = useStore();
  const { data: cartData } = useCartQuery();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const cartItemsCount =
    cartData?.items?.reduce(
      (acc: number, item: any) => acc + item.quantity,
      0
    ) || 0;

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-30 w-full border-b border-border/40 bg-background/95 backdrop-blur-lg shadow-sm">
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex h-20 items-center justify-between gap-4">

        {/* ── Logo ── */}
        <Link
          to="/"
          className="flex items-center gap-2 shrink-0 select-none group"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm transition-shadow group-hover:shadow-md">
            <Sparkles className="h-4 w-4" />
          </span>
          <span className="text-base font-bold tracking-tight text-foreground">
            Storefront
          </span>
        </Link>

        {/* ── Desktop Navigation (centered) ── */}
        <NavigationMenu className="hidden md:flex flex-1 justify-center">
          <NavigationMenuList className="gap-0">
            {MENU_CONFIG.map((item) => {
              if (!item.megaMenu) {
                // Simple link
                return (
                  <NavigationMenuItem key={item.label}>
                    <NavigationMenuLink asChild>
                      <Link
                        to={item.href ?? "/"}
                        className={cn(
                          "relative flex h-9 items-center whitespace-nowrap rounded-md px-4 text-sm font-medium transition-colors",
                          "after:absolute after:bottom-0 after:left-3 after:right-3 after:h-[2px] after:rounded-full after:bg-primary after:transition-transform after:duration-200",
                          isActive(item.href ?? "/")
                            ? "text-primary after:scale-x-100"
                            : "text-muted-foreground after:scale-x-0 hover:text-foreground hover:after:scale-x-100"
                        )}
                      >
                        {item.label}
                        {item.badge && (
                          <span className="ml-1.5 rounded-full bg-primary px-1.5 py-0.5 text-[9px] font-bold text-primary-foreground">
                            {item.badge}
                          </span>
                        )}
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                );
              }

              // Mega menu trigger
              const cols = item.megaMenu.columns;
              const promo = item.megaMenu.promo;
              const totalCols = promo ? cols.length + 1 : cols.length;

              return (
                <NavigationMenuItem key={item.label}>
                  <NavigationMenuTrigger
                    className={cn(
                      "h-9 rounded-md px-4 text-sm font-medium transition-colors",
                      location.pathname.startsWith("/products")
                        ? "text-primary"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {item.label}
                    {item.badge && (
                      <span className="ml-1.5 rounded-full bg-primary px-1.5 py-0.5 text-[9px] font-bold text-primary-foreground">
                        {item.badge}
                      </span>
                    )}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    {/* Full-width mega menu panel */}
                    <div
                      className={cn(
                        "grid gap-6 p-6",
                        totalCols === 4
                          ? "grid-cols-4 w-[780px]"
                          : totalCols === 3
                            ? "grid-cols-3 w-[580px]"
                            : "grid-cols-2 w-[380px]"
                      )}
                    >
                      {cols.map((col) => (
                        <MegaMenuColumn key={col.title} column={col} />
                      ))}
                      {promo && (
                        <div className="row-span-1">
                          <PromoBanner promo={promo} />
                        </div>
                      )}
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              );
            })}
          </NavigationMenuList>
        </NavigationMenu>

        {/* ── Right Actions ── */}
        <div className="flex items-center gap-1.5 shrink-0">

          {/* Cart button */}
          <button
            onClick={() => cartStore.openCart()}
            aria-label="Open cart"
            className="group relative flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <div className="relative">
              <ShoppingCart className="h-5 w-5 transition-transform group-hover:scale-110" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[9px] font-bold text-primary-foreground ring-2 ring-background shadow-sm">
                  {cartItemsCount > 99 ? "99+" : cartItemsCount}
                </span>
              )}
            </div>
            {cartItemsCount > 0 && (
              <span className="hidden sm:inline-block text-xs font-semibold text-foreground">
                {cartItemsCount} {cartItemsCount === 1 ? "item" : "items"}
              </span>
            )}
          </button>

          {/* Mobile hamburger */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <button
                className="md:hidden flex items-center justify-center rounded-lg p-2 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                aria-label="Open menu"
              >
                <Menu className="h-5 w-5" />
              </button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[340px] p-0">
              <SheetHeader className="border-b px-4 py-4">
                <SheetTitle className="flex items-center gap-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                    <Sparkles className="h-3.5 w-3.5" />
                  </span>
                  Storefront
                </SheetTitle>
              </SheetHeader>

              {/* Mobile nav links */}
              <nav className="flex flex-col gap-1 px-3 py-4 overflow-y-auto max-h-[calc(100vh-80px)]">
                {MENU_CONFIG.map((item) => (
                  <MobileMenuItem
                    key={item.label}
                    item={item}
                    onClose={() => setMobileOpen(false)}
                  />
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
});
