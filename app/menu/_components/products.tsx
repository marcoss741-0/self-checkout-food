"use client";

import { Product } from "@prisma/client";
import Link from "next/link";
import Image from "next/image";
import { formatCurrency } from "@/app/helpers/format-currency";

interface ProductsPageProps {
  products: Product[];
}

const ProductsPage = ({ products }: ProductsPageProps) => {
  return (
    <div className="space-y-3 px-5">
      {products.map((product) => (
        <Link
          key={product.id}
          href={`/menu/${product.id}`}
          className="flex justify-between items-center gap-10 border-b py-3"
        >
          <div>
            <h3 className="text-sm font-medium">{product.name}</h3>
            <p className="line-clamp-2 text-sm text-muted-foreground">
              {product.description}
            </p>
            <p className="pt-3 text-sm font-semibold">
              {formatCurrency(product.price)}
            </p>
          </div>

          <div className="relative min-h-[82px] min-w-[120px]">
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              className="rounded-lg object-contain"
            />
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ProductsPage;
