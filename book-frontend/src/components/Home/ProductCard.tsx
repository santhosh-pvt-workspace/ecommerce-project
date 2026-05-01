import { useAddToCart } from '@/queries/cartQueries';
import { motion } from 'framer-motion';
import { Star, ShoppingCart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

type Product = {
  id: string;
  productName: string;
  description?: string;
  imageUrl: string;
  price: string;
  rating: number;
  specialFor: string | null;
  promotionLabel: string | null;
  offerPercentage: string;
};

export const ProductCard = ({ product, index = 0 }: { product: Product; index?: number }) => {

  const { mutate : addToCart } = useAddToCart();

  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: index * 0.1,
        ease: 'easeOut',
      },
    },
  };

  const imageVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.08, transition: { duration: 0.3 } },
  };

  const badgeVariants = {
    initial: { opacity: 0, x: -10 },
    animate: { opacity: 1, x: 0 },
  };

  return (
    <motion.div
    //   variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="h-full"
      onClick={() => navigate(`/products/${product.id}`)}
      
    >
      <motion.div
        whileHover={{ y: -8 }}
        transition={{ duration: 0.3 }}
        className="h-full bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 flex flex-col"
      >
        {/* Image Container */}
        <motion.div
          className="relative w-full h-[240px] bg-gray-100 overflow-hidden"
          initial="initial"
          whileHover="hover"
        >
          <motion.img
            src={product.imageUrl}
            alt={product.productName}
            className="w-full h-full object-cover"
            variants={imageVariants}
          />

          {/* Badges */}
          <div className="absolute top-3 right-3 flex flex-col gap-2">
            {product.promotionLabel && (
              <motion.span
                variants={badgeVariants}
                initial="initial"
                animate="animate"
                className="bg-rose-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md"
              >
                {product.promotionLabel}
              </motion.span>
            )}
            {product.offerPercentage && (
              <motion.span
                variants={badgeVariants}
                initial="initial"
                animate="animate"
                transition={{ delay: 0.1 }}
                className="bg-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md"
              >
                {product.offerPercentage}% OFF
              </motion.span>
            )}
          </div>

          {/* Category Badge */}
          {product.specialFor && (
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 }}
              className="absolute top-3 left-3 bg-amber-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md"
            >
              {product.specialFor}
            </motion.span>
          )}
        </motion.div>

        {/* Content */}
        <div className="flex-1 p-4 flex flex-col justify-between">
          <div>
            <motion.h3
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-sm font-semibold text-gray-900 line-clamp-2 mb-2 leading-snug"
            >
              {product.productName}
            </motion.h3>

            {product.description && (
              <p className="text-xs text-gray-500 line-clamp-1 mb-3">
                {product.description}
              </p>
            )}

            {/* Rating */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.25 }}
              className="flex items-center gap-1 mb-3"
            >
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    className={i < Math.floor(product.rating) ? 'fill-amber-400 text-amber-400' : 'text-gray-300'}
                  />
                ))}
              </div>
              <span className="text-xs text-gray-600 font-medium ml-1">
                {product.rating}
              </span>
            </motion.div>
          </div>

          {/* Price and Action */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex items-center justify-between gap-2 pt-3 border-t border-gray-100"
          >
            <div>
              <p className="text-lg font-bold text-gray-900">₹{product.price}</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 rounded-lg bg-rose-500 text-white hover:bg-rose-600 transition-colors duration-200 shadow-sm hover:shadow-md"
              onClick={
                () => addToCart({
                  productId : product.id,
                  quantity : 1
                })
              }
            >
              <ShoppingCart size={18} />
            </motion.button>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};


interface ProductGridProps {
  products: Product[];
  title?: string;
  subtitle?: string;
}

export const ProductGrid = ({
  products,
  title,
  subtitle,
}: ProductGridProps) => {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  };

  return (
    <section className="w-full py-14 px-4 sm:px-6 lg:px-10 bg-background">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        {(title || subtitle) && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-10 text-center"
          >
            {title && (
              <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-foreground">
                {title}
              </h2>
            )}

            {subtitle && (
              <p className="mt-2 text-sm sm:text-base text-muted-foreground max-w-xl mx-auto">
                {subtitle}
              </p>
            )}
          </motion.div>
        )}

        {/* Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="
            grid 
            grid-cols-1 
            sm:grid-cols-2 
            md:grid-cols-3 
            lg:grid-cols-4 
            gap-5 sm:gap-6
          "
        >
          {products.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              index={index}
            />
          ))}
        </motion.div>

        {/* Empty State */}
        {products.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <p className="text-muted-foreground text-sm">
              No products available
            </p>
          </div>
        )}
      </div>
    </section>
  );
};