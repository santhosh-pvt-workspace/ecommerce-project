import { useQuery } from "@tanstack/react-query";
import { productQueries } from "@/queries/product/product.query";
import CategorySection from "@/components/Home/CategorySection";
import HeroSection from "@/components/HeroSection";
import { ProductCard } from "@/components/Home/ProductCard";

export const HomePage = () => {
  const { data, isLoading, isError, error } = useQuery(productQueries.all());

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-pulse">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-64 bg-gray-200 rounded-lg"></div>
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-4 bg-red-50 text-red-600 rounded border border-red-200">
        <h3 className="font-bold">Failed to load products</h3>
        <p>{error instanceof Error ? error.message : "Unknown error occurred"}</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">


      <HeroSection />

      {/* Product Section */}
      <section className="w-full py-14 px-4 sm:px-6 lg:px-10">
        <div className="max-w-7xl mx-auto">

          {/* Header */}
          <div className="mb-10 text-center">
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">
              Best Sellers
            </h2>
            <p className="mt-2 text-sm sm:text-base text-muted-foreground">
              Handpicked items just for you
            </p>
          </div>

          {/* Empty State */}
          {data?.data?.length === 0 ? (
            <p className="text-center text-muted-foreground py-10">
              No products available
            </p>
          ) : (
            <div
              className="
          grid 
          grid-cols-1 
          sm:grid-cols-2 
          md:grid-cols-3 
          lg:grid-cols-4 
          gap-5 sm:gap-6
        "
            >
              {data?.data?.map((product, index) => (
                <ProductCard
                  key={product.id}
                  product={product as any} // (keep for now if skipping mapping)
                  index={index}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      <CategorySection />
    </div>
  );
};
