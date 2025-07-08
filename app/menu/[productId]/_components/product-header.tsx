"use client";

import { Button } from "@/app/_components/ui/button";
import { Product } from "@prisma/client";
import { ArrowLeftIcon, ScrollTextIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface ProductHeaderProps {
  product: Product | null;
}

const ProductHeader = ({ product }: ProductHeaderProps) => {
  const router = useRouter();

  function handleBackClick() {
    router.back();
  }

  function handleCartClick() {
    console.log("Cart button clicked");
  }
  return (
    <div className="relative h-[332px] w-full bg-slate-100">
      <Button
        size="icon"
        variant="secondary"
        className="absolute left-4 top-4 rounded-full z-10"
        onClick={handleBackClick}
      >
        <ArrowLeftIcon size={50} />
      </Button>
      <Image
        src={product?.imageUrl || ""}
        alt={product?.name || "Product Image"}
        fill
        className="object-contain"
      />
      <Button
        size="icon"
        variant="secondary"
        className="absolute right-4 top-4 rounded-full z-10"
        onClick={handleCartClick}
      >
        <ScrollTextIcon size={50} />
      </Button>
    </div>
  );
};

export default ProductHeader;
