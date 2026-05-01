import { Heading1, Heading2 } from "@/components/TextStyles";
import { productQueries } from "@/queries/product.query";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom"



export const ProductDetailPage = () => {

    const { id } = useParams();

    const { data: product, isLoading, isError } = useQuery(productQueries.detail(id!));

    if (isLoading) return <Heading1 children={"Loading..."} />

    if (isError) return <Heading2 children={"something went wrong"} />

    return (
        <div className="p-6">
            <img src={String(product?.imageUrl)} alt={product?.productName} />

            <h1 className="text-2xl font-bold mt-4">{product?.productName}</h1>

            <p className="text-gray-600 mt-2">{product?.description}</p>

            <p className="text-lg font-semibold mt-4">₹{product?.price}</p>

        </div>
    )
}