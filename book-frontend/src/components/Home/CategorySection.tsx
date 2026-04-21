import React from "react";

const categories = [
    {
        name: "Luxury",
        image:
            "https://assets.shadcnstore.com/shadcnstore.com/stock/e-commerce/luxury-leather-handbag.800w.022237.avif",
    },
    {
        name: "Sneakers",
        image:
            "https://assets.shadcnstore.com/shadcnstore.com/stock/e-commerce/sneakers.800w.07269b.avif",
    },
    {
        name: "P&A",
        image:
            "https://assets.shadcnstore.com/shadcnstore.com/stock/e-commerce/designer-handbag-collection.800w.4ea860.avif",
    },
    {
        name: "Refurbished",
        image:
            "https://assets.shadcnstore.com/shadcnstore.com/stock/e-commerce/refurbished.500w.77e256.avif",
    },
    {
        name: "Trading Cards",
        image:
            "https://assets.shadcnstore.com/shadcnstore.com/stock/e-commerce/trading-cards.800w.5bb73e.avif",
    },
    {
        name: "Pre-loved Luxury",
        image:
            "https://assets.shadcnstore.com/shadcnstore.com/stock/e-commerce/pre-loved-luxury.800w.4ba23b.avif",
    },
    {
        name: "Toys",
        image:
            "https://assets.shadcnstore.com/shadcnstore.com/stock/e-commerce/colorful-toys-collection.800w.9fc50e.avif",
    },
];

const CategorySection: React.FC = () => {
    return (
        <section className="py-12">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

                {/* HEADER */}
                <header className="mb-8 text-center">
                    <h2 className="text-3xl font-bold tracking-tight">
                        Explore Popular Categories
                    </h2>
                </header>

                {/* GRID */}
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7">
                    {categories.map((category, index) => (
                        <a
                            key={index}
                            href="#"
                            className="group flex flex-col items-center text-center"
                        >
                            {/* IMAGE */}
                            <div className="relative w-full aspect-square overflow-hidden rounded-full">

                                {/* Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/20 to-black/60 group-hover:to-black/70 transition" />

                                <img
                                    src={category.image}
                                    alt={category.name}
                                    className="w-full h-full object-cover grayscale transition-all duration-300 group-hover:scale-110 group-hover:grayscale-0"
                                />
                            </div>

                            {/* TITLE */}
                            <h3 className="mt-3 text-sm md:text-base font-medium text-foreground group-hover:text-primary transition-colors">
                                {category.name}
                            </h3>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CategorySection;