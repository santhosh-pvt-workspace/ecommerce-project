import { Card, CardContent } from "@/shared/shadcn/ui/card";


type Product = {
    id: string;
    productName: string;
    description?: string | undefined;
    imageUrl: string;
    price: string;
    rating: number;
    specialFor: string | null;
    promotionLabel: string | null;
    offerPercentage: string;
}

export const ProductCard = ({ product }: { product: Product }) => {


    return (
        <Card className="group overflow-hidden rounded-2xl border hover:shadow-xl transition duration-300">
            <div className="relative">
                <img
                    src={product.imageUrl}
                    alt={product.productName}
                    className="w-full h-[220px] object-cover group-hover:scale-105 transition duration-300 "

                />

                {product.promotionLabel && (
                    <span className="absolute top-2 right-2 bg-black text-white text-xs px-3 py-1 rounded-full">
                        {product.promotionLabel}
                    </span>
                )}

                {product.specialFor && (
                    <span className="absolute top-2 left-2 bg-purple-600 text-white text-xs px-3 py-1 rounded-full shadow-md">
                        {product.specialFor}
                    </span>
                )}

                <CardContent className="p-4 space-y-2">
                    <h3 className="text-sm font-semibold line-clamp-2">
                        {product.productName}
                    </h3>

                    {/* Rating */}
                    <div className="flex items-center gap-1 text-sm">
                        ⭐ <span className="font-medium">{product.rating}</span>
                    </div>

                    {/* Price + Offer */}
                    <div className="flex items-center gap-2">
                        <span className="text-lg font-bold text-black">
                            ₹{product.price}
                        </span>

                        {product.offerPercentage && (
                            <span className="text-sm text-green-600 font-medium">
                                {product.offerPercentage}% OFF
                            </span>
                        )}
                    </div>
                </CardContent>
            </div>
        </Card>
    )
}