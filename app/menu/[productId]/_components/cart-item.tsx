import Image from "next/image";
import { CartContext, CartProducts } from "../../context/cart";
import { formatCurrency } from "@/app/helpers/format-currency";
import { Button } from "@/app/_components/ui/button";
import { ChevronLeftIcon, ChevronRightIcon, Trash2Icon } from "lucide-react";
import { useContext } from "react";

interface CartItemProps {
  product: CartProducts;
}

const CartItem = ({ product }: CartItemProps) => {
  const { decreaseProductsQuantity, increaseProductsQuantity } =
    useContext(CartContext);
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="relative w-20 h-20 bg-gray-200 rounded-xl overflow-hidden">
          <Image src={product.imageUrl} alt="Product" fill />
        </div>

        <div className="space-y-1">
          <p className="text-xs w-[90%] truncate text-ellipsis">
            {product.name}
          </p>
          <p className="text-sm font-semibold">
            {formatCurrency(product.price)}
          </p>
          <div className="flex items-center gap-1 text-center">
            <Button
              className="rounded-lg"
              variant={"outline"}
              size={"iconXs"}
              onClick={() => decreaseProductsQuantity(product.id)}
            >
              <ChevronLeftIcon />
            </Button>
            <span className="w-8 text-sm">{product.quantity}</span>
            <Button
              className="rounded-lg"
              variant={"destructive"}
              size={"iconXs"}
              onClick={() => increaseProductsQuantity(product.id)}
            >
              <ChevronRightIcon />
            </Button>
          </div>
        </div>
      </div>
      <Button size="iconXs" variant="outline">
        <Trash2Icon />
      </Button>
    </div>
  );
};

export default CartItem;
