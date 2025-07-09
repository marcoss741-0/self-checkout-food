import { db } from "@/app/_lib/prisma";
import ProductHeader from "./_components/product-header";
import ProductDetails from "./_components/product-details";

interface ProductPageProps {
  params: Promise<{
    productId: string;
  }>;
}

const ProductPage = async ({ params }: ProductPageProps) => {
  const { productId } = await params;

  const product = await db.product.findUnique({
    where: {
      id: productId,
    },
  });

  return (
    <>
      <div className="flex flex-col h-screen">
        <ProductHeader product={product} />
        <div className="flex-1 min-h-0">
          <ProductDetails product={product} />
        </div>
      </div>
    </>
  );
};

export default ProductPage;
