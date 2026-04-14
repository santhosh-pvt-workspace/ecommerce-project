import React from "react";
import { ArrowRight, Heart, Star, ShoppingBag, ChevronRight } from "lucide-react";

const products = [
    {
        name: "Glow Serum",
        category: "Skincare",
        price: "$68.00",
        rating: "4.9",
        image:
            "https://assets.shadcnstore.com/shadcnstore.com/stock/e-commerce/face-cleanser.600w.3b38a4.avif",
    },
    {
        name: "Face Cleanser",
        category: "Skincare",
        price: "$45.00",
        rating: "4.8",
        image:
            "https://assets.shadcnstore.com/shadcnstore.com/stock/e-commerce/rouge-lipstick.600w.6c3f1f.avif",
    },
];

const HeroSection: React.FC = () => {
    return (
        <section className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-8">

                {/* LEFT CONTENT */}
                <div className="flex flex-col gap-8 text-center lg:text-start">
                    <div className="bg-primary/5 self-center lg:self-start inline-flex py-1.5 border border-primary/20 text-sm rounded-md px-4">
                        Luxury Beauty
                    </div>

                    <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                        Discover Your <span className="text-primary">Natural</span> Glow
                    </h1>

                    <p className="text-muted-foreground mx-auto max-w-2xl text-lg lg:mx-0">
                        Premium beauty products formulated with natural ingredients to
                        enhance your natural beauty and boost your confidence.
                    </p>

                    {/* Buttons */}
                    <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center lg:justify-start">
                        <button className="flex items-center gap-2 rounded-lg bg-primary px-6 py-2 text-base text-white hover:bg-primary/80 transition">
                            Shop Now <ArrowRight size={18} />
                        </button>

                        <button className="rounded-lg border px-6 py-2 text-base hover:bg-muted transition">
                            Learn More
                        </button>
                    </div>

                    {/* Rating */}
                    <div className="flex flex-wrap items-center justify-center gap-4 pt-4 lg:justify-start">
                        <div className="flex items-center gap-2">
                            <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className="size-5 fill-foreground" />
                                ))}
                            </div>
                            <span className="text-muted-foreground text-sm">4.9/5.0</span>
                        </div>

                        <div className="h-5 w-px bg-border" />

                        <div className="text-muted-foreground text-sm">
                            Free shipping on orders over $50
                        </div>
                    </div>
                </div>

                {/* RIGHT CONTENT */}
                <div className="flex flex-col gap-6">

                    {/* Toggle */}
                    <div className="flex rounded-lg bg-muted/50 p-1">
                        {["New Arrivals", "Bestsellers", "All Products"].map((item, i) => (
                            <button
                                key={i}
                                className={`flex-1 rounded-md px-4 py-2 text-sm ${i === 0
                                    ? "bg-background shadow-sm"
                                    : "text-muted-foreground hover:bg-muted"
                                    }`}
                            >
                                {item}
                            </button>
                        ))}
                    </div>

                    {/* Product Cards */}
                    <div className="grid gap-6 sm:grid-cols-2">
                        {products.map((product, index) => (
                            <div
                                key={index}
                                className="rounded-xl border overflow-hidden group"
                            >
                                <div className="relative aspect-square overflow-hidden">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />

                                    <button className="absolute top-2 right-2 bg-white/80 p-2 rounded-full">
                                        <Heart size={16} />
                                    </button>

                                    <span className="absolute top-2 left-2 bg-primary text-white text-xs px-2 py-0.5 rounded-full">
                                        New
                                    </span>
                                </div>

                                <div className="p-4 flex flex-col gap-3">
                                    <div className="flex justify-between">
                                        <div>
                                            <p className="text-sm text-muted-foreground">
                                                {product.category}
                                            </p>
                                            <h3 className="font-medium mt-1">{product.name}</h3>
                                        </div>

                                        <div className="text-right">
                                            <div className="flex items-center gap-1 justify-end">
                                                <Star className="size-4 fill-foreground" />
                                                <span className="text-sm text-muted-foreground">
                                                    {product.rating}
                                                </span>
                                            </div>
                                            <div className="font-bold mt-1">
                                                {product.price}
                                            </div>
                                        </div>
                                    </div>

                                    <button className="flex items-center justify-center gap-2 border rounded-md py-2 text-sm hover:bg-muted transition">
                                        <ShoppingBag size={16} />
                                        Add to Bag
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* View All */}
                    <div className="flex justify-center lg:justify-start">
                        <button className="flex items-center gap-2 border px-6 py-2 rounded-lg hover:bg-muted transition">
                            View All Products <ChevronRight size={18} />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;