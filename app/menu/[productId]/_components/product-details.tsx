"use client";

import { Button } from "@/app/_components/ui/button";
import { formatCurrency } from "@/app/helpers/format-currency";
import { Product } from "@prisma/client";
import { ChefHat, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface ProductDetailsProps {
  product: Product | null;
}

const ProductDetails = ({ product }: ProductDetailsProps) => {
  const [quantity, setQuantity] = useState(1);
  const prevQuantity = useRef(quantity);
  const [leftButtonVariant, setLeftButtonVariant] = useState<
    "secondary" | "destructive"
  >("secondary");
  const [rightButtonVariant, setRightButtonVariant] = useState<
    "secondary" | "destructive"
  >("secondary");

  useEffect(() => {
    if (quantity > prevQuantity.current) {
      console.log("Incrementou");
    } else if (quantity < prevQuantity.current) {
      console.log("Decrementou");
    }
    prevQuantity.current = quantity;
  }, [quantity]);

  const handleIncrement = () => {
    setQuantity((prev) => prev + 1);
    setRightButtonVariant("destructive");
    setLeftButtonVariant("secondary");
  };

  const handleDecrement = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : prev));
    setLeftButtonVariant("destructive");
    setRightButtonVariant("secondary");
  };

  return (
    <>
      <div className="flex flex-col h-full gap-6 p-5 rounded-t-3xl bg-white z-10">
        <div className="flex flex-col gap-3">
          <h1 className="text-xl font-semibold">{product?.name}</h1>
          <div className="flex items-center justify-between">
            <p className="pt-1 text-xl font-semibold">
              {formatCurrency(Number(product?.price))}
            </p>
            <div className="flex items-center gap-2">
              <Button
                size="icon"
                variant={leftButtonVariant}
                className="rounded-xl"
                onClick={handleDecrement}
              >
                <ChevronLeft />
              </Button>

              <span className="text-sm text-muted-foreground text-center font-semibold w-3">
                {quantity}
              </span>

              <Button
                size="icon"
                variant={rightButtonVariant}
                className="rounded-xl"
                onClick={handleIncrement}
              >
                <ChevronRight />
              </Button>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="font-semibold">Sobre</h3>
          <p className="text-sm text-muted-foreground">
            {product?.description}
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="font-semibold flex items-center gap-1">
            <ChefHat />
            Ingredientes
          </h3>

          <div className="flex flex-col px-5">
            <ul className="text-sm text-muted-foreground">
              {product?.ingredients.map((ingredient, index) => (
                <li key={index} className="list-disc">
                  {ingredient}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Button
          className="w-full rounded-full py-4 px-3 mt-auto"
          size="lg"
          variant="default"
        >
          Adicionar ao carrinho
        </Button>
      </div>
    </>
  );
};

export default ProductDetails;
