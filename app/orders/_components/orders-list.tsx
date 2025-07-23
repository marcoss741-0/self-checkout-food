"use client";

import { Button } from "@/app/_components/ui/button";
import { Card, CardContent } from "@/app/_components/ui/card";
import { Prisma } from "@prisma/client";
import { ChevronLeft, ScrollTextIcon } from "lucide-react";
import { Badge } from "@/app/_components/ui/badge";
import Image from "next/image";
import { Separator } from "@/app/_components/ui/separator";
import { formatCurrency } from "@/app/helpers/format-currency";
import { useRouter } from "next/navigation";

interface OrdersListProps {
  orders: Prisma.OrderGetPayload<{
    include: {
      restaurant: {
        select: {
          name: true;
          avatarImageUrl: true;
        };
      };
      orderProducts: {
        include: {
          product: true;
        };
      };
    };
  }>[];
}

const OrdersList = ({ orders }: OrdersListProps) => {
  const router = useRouter();

  function handleBackPage() {
    router.back();
  }
  return (
    <div className="p-6 space-y-6">
      <Button
        className="rounded-full"
        size="icon"
        variant="ghost"
        onClick={handleBackPage}
      >
        <ChevronLeft />
      </Button>

      <div className="flex items-center gap-3">
        <ScrollTextIcon />
        <h2 className="text-lg font-semibold">Meus pedidos</h2>
      </div>
      {orders.map((order) => (
        <Card key={order.id} className="mb-4">
          <CardContent className="space-y-4 p-5">
            <Badge className="mb-4 rounded-full" variant="secondary">
              Pedido #12345
            </Badge>
            <div className="flex items-center gap-2">
              <div className="relative w-5 h-5">
                <Image
                  fill
                  src={order.restaurant.avatarImageUrl}
                  alt="Logo do restaurante"
                />
              </div>
              <h1 className="text-sm font-semibold">{order.restaurant.name}</h1>
            </div>
            <Separator />
            {order.orderProducts.map((product) => (
              <div key={product.id} className="flex items-center gap-2">
                <div className="flex items-center bg-gray-500 text-white justify-center w-5 h-5 rounded-full text-xs">
                  {product.quantity}
                </div>
                <p className="text-xs">{product.product.name}</p>
              </div>
            ))}

            <Separator />
            <div className="flex items-center justify-between">
              <p className="text-xs font-medium">
                {formatCurrency(order.total)}
              </p>
              <Button variant="ghost" className="text-[crimson] text-xs">
                Adicionar a Sacola
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default OrdersList;
