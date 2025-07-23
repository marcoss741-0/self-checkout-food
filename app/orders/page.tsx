import { db } from "../_lib/prisma";
import { isValidCpf, removeCpfPunctuation } from "../helpers/cpf";
import CpfForm from "./_components/cpf-form";
import OrdersList from "./_components/orders-list";
import Image from "next/image";

interface OrdersPageProps {
  searchParams: Promise<{
    cpf: string;
  }>;
}

const OrdersPage = async ({ searchParams }: OrdersPageProps) => {
  const { cpf } = await searchParams;

  if (!cpf) {
    return <CpfForm />;
  }

  if (!isValidCpf(cpf)) {
    return <CpfForm />;
  }

  const orders = await db.order.findMany({
    where: {
      customerCpf: removeCpfPunctuation(cpf),
    },
    include: {
      restaurant: {
        select: {
          name: true,
          avatarImageUrl: true,
        },
      },
      orderProducts: {
        include: {
          product: true,
        },
      },
    },
  });

  return (
    <>
      {orders.length === 0 ? (
        <>
          <div className="flex items-center justify-center h-full p-6 space-y-6">
            <div className="flex flex-col items-center justify-center gap-4 text-center">
              <Image
                src="/empty1.png"
                alt="Sacola Vazia"
                width={150}
                height={150}
              />
              <p className="text-lg font-semibold text-muted-foreground">
                Faça seu pedido já!
              </p>
              <p className="text-sm text-muted-foreground">
                Depois de solicitados vocêpode acompanhar seus pedidos por aqui.
              </p>
            </div>
          </div>
        </>
      ) : (
        <OrdersList orders={orders} />
      )}
    </>
  );
};

export default OrdersPage;
