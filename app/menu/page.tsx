import { notFound } from "next/navigation";
import { db } from "../_lib/prisma";
import RestaurantHeader from "./_components/header";

interface RestaurantMenuPageProps {
  searchParams: Promise<{
    consumptionMethod: string;
  }>;
}

const isConsumptionMethodValid = (consumptionMethod: string) => {
  return ["DINE_IN", "TAKEAWAY"].includes(consumptionMethod.toUpperCase());
};

const RestaurantMenuPage = async ({
  searchParams,
}: RestaurantMenuPageProps) => {
  const { consumptionMethod } = await searchParams;
  if (!isConsumptionMethodValid(consumptionMethod)) {
    return notFound();
  }
  const restaurant = await db.restaurant.findFirst({
    where: {
      slug: "self-choice",
    },
    include: {
      menuCategories: {
        include: {
          products: true,
        },
      },
    },
  });
  if (!restaurant) {
    return notFound();
  }

  return (
    <div>
      <RestaurantHeader restaurant={restaurant} />
    </div>
  );
};

export default RestaurantMenuPage;
