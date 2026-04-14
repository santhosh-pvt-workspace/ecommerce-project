import { useQuery } from "@tanstack/react-query";
import { productQueries } from "@/queries/product/product.query";

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
      <h1 className="text-3xl font-bold">Featured Products</h1>

      {data?.data?.length === 0 ? (
        <p className="text-gray-500">No products available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {data?.data?.map((product) => (
            <div key={product.id} className="border rounded-lg p-4 shadow-sm hover:shadow-md transition">
              <h3 className="font-bold text-lg mb-2">{product.productName}</h3>
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">{String(product.description) || "No description"}</p>
              <div className="text-blue-600 font-bold">${product.price}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
