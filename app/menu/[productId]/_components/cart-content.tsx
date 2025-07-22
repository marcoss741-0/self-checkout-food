"use client";

import {
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  Sheet,
} from "@/app/_components/ui/sheet";
import { useContext, useState } from "react";
import { CartContext } from "../../context/cart";
import CartItem from "./cart-item";
import { Card, CardContent } from "@/app/_components/ui/card";
import { formatCurrency } from "@/app/helpers/format-currency";
import { Button } from "@/app/_components/ui/button";
import FinishDrawerCart from "./finish-order-drawer";

const CartContent = () => {
  const { toggleCart, isOpen, products, total } = useContext(CartContext);
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <>
      <Sheet open={isOpen} onOpenChange={toggleCart}>
        <SheetContent className="w-[85%]">
          <SheetHeader>
            <SheetTitle className="text-start">Sacola</SheetTitle>
            <SheetDescription></SheetDescription>
          </SheetHeader>

          <div className="flex h-full flex-col py-5">
            <div className="flex-auto">
              {products.map((product) => (
                <CartItem key={product.id} product={product} />
              ))}
            </div>
            <Card className="mb-6">
              <CardContent className="p-5">
                <div className="flex justify-between">
                  <p className="text-sm text-muted-foreground">Total</p>
                  <p className="text-sm font-semibold">
                    {formatCurrency(total)}
                  </p>
                </div>
              </CardContent>
            </Card>
            <Button
              className="w-full rounded-full"
              onClick={() => setIsCartOpen(true)}
            >
              Finalizar Pedido
            </Button>

            <FinishDrawerCart
              extOpen={isCartOpen}
              extOnOpenChange={setIsCartOpen}
            />
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default CartContent;
