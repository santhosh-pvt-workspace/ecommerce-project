import React, { useState } from "react";
import {
  Star,
  Heart,
  Share2,
  ShoppingCart,
  Camera,
  Loader2,
} from "lucide-react";
import { useAddToCart } from "../queries/cartQueries";
import { useStore } from "../store";

const images = [
  "https://assets.shadcnstore.com/shadcnstore.com/stock/e-commerce/wireless-charger.800w.a01e7a.avif",
  "https://assets.shadcnstore.com/shadcnstore.com/stock/e-commerce/smart-home-security-camera.800w.455c35.avif",
  "https://assets.shadcnstore.com/shadcnstore.com/stock/e-commerce/product-overview-image-2.800w.ba74da.avif",
];

const features = [
  "4K Ultra HD Resolution",
  "AI Motion Detection",
  "Night Vision Technology",
  "Two-Way Audio",
  "Weather Resistant (IP65)",
  "Smart Home Integration",
  "Cloud & Local Storage",
  "Mobile App Control",
];

const ProductSection: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState(images[0]);
  const [activeTab, setActiveTab] = useState("overview");
  
  const addToCart = useAddToCart();
  const { cartStore } = useStore();

  const handleAddToCart = () => {
    addToCart.mutate(
      { productId: "e123-hardcoded-for-now", quantity: 1 }, 
      {
        onSuccess: () => {
          cartStore.openCart();
        }
      }
    );
  };

  return (
    <section className="py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* TOP GRID */}
        <div className="grid gap-12 lg:grid-cols-2">
          
          {/* LEFT - IMAGES */}
          <div>
            <div className="relative aspect-square overflow-hidden rounded-xl bg-muted">
              <img
                src={selectedImage}
                className="w-full h-full object-cover"
                alt="product"
              />

              <span className="absolute top-4 left-4 bg-orange-500 text-white text-xs px-3 py-1 rounded-full">
                Best Seller
              </span>

              <div className="absolute bottom-4 right-4 bg-black/60 text-white text-sm px-3 py-1.5 rounded-full flex items-center gap-1">
                <Camera size={16} /> 3 photos
              </div>
            </div>

            {/* THUMBNAILS */}
            <div className="mt-4 flex gap-3 overflow-x-auto pb-2">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(img)}
                  className={`size-20 rounded-lg overflow-hidden border-2 ${
                    selectedImage === img
                      ? "border-primary ring-2 ring-primary/20"
                      : "border-muted hover:border-muted-foreground"
                  }`}
                >
                  <img
                    src={img}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT - DETAILS */}
          <div className="flex flex-col gap-6">
            
            <div>
              <h1 className="text-3xl font-bold">
                Smart Home Security Camera
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-4 mt-4 flex-wrap">
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[...Array(4)].map((_, i) => (
                      <Star key={i} className="size-4 fill-foreground" />
                    ))}
                    <Star className="size-4" />
                  </div>
                  <span className="text-sm font-medium">4.6</span>
                </div>

                <span className="text-muted-foreground text-sm">
                  3 reviews
                </span>

                <span className="text-muted-foreground text-sm">
                  SKU: SHC-001
                </span>
              </div>
            </div>

            {/* Price */}
            <div className="text-4xl font-bold">$149.99</div>

            {/* Stock */}
            <div className="inline-flex items-center gap-2 bg-green-50 px-3 py-1.5 rounded-full">
              <div className="size-2 bg-green-500 rounded-full" />
              <span className="text-green-700 text-sm font-medium">
                In Stock
              </span>
            </div>

            {/* Description */}
            <p className="text-muted-foreground">
              Advanced smart security camera with AI-powered motion detection,
              crystal-clear 4K video, and seamless smart home integration.
            </p>

            {/* ACTIONS */}
            <div className="flex flex-col gap-3">
              <button 
                onClick={handleAddToCart}
                disabled={addToCart.isPending}
                className="flex items-center justify-center gap-2 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
              >
                {addToCart.isPending ? <Loader2 className="w-5 h-5 animate-spin" /> : <ShoppingCart size={18} />} 
                {addToCart.isPending ? "Adding..." : "Add to Cart"}
              </button>

              <div className="flex gap-3">
                <button className="flex-1 border py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-muted">
                  <Heart size={18} /> Save
                </button>

                <button className="flex-1 border py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-muted">
                  <Share2 size={18} /> Share
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* TABS */}
        <div className="mt-16">
          <div className="flex bg-muted/50 rounded-xl p-1">
            {["overview", "specs", "reviews", "gallery"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-2 rounded-md text-sm capitalize ${
                  activeTab === tab
                    ? "bg-background shadow-sm"
                    : "text-muted-foreground"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* TAB CONTENT */}
          <div className="mt-8">
            {activeTab === "overview" && (
              <div className="border rounded-xl p-6">
                <h3 className="text-xl font-semibold mb-6">
                  Key Features
                </h3>

                <div className="grid gap-4 sm:grid-cols-2">
                  {features.map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="size-2 bg-primary rounded-full" />
                      <span className="text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab !== "overview" && (
              <div className="text-muted-foreground text-sm">
                Content coming soon...
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductSection;