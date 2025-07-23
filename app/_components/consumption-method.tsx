"use server";

import { Button } from "@/app/_components/ui/button";
import { Card, CardContent } from "@/app/_components/ui/card";
import Link from "next/link";
import Image from "next/image";
import { ConsumptionMethod } from "@prisma/client";

interface ConsumptionMethodProps {
  method: ConsumptionMethod;
  text: string;
  imageUrl: string;
  imageAlt: string;
}

const ConsumptionMethodOptions = ({
  imageUrl,
  method,
  text,
  imageAlt,
}: ConsumptionMethodProps) => {
  return (
    <>
      <Card>
        <CardContent className="flex flex-col items-center gap-8 py-8">
          <div className="relative h-[80px] w-[80px]">
            <Image
              src={imageUrl}
              fill
              alt={imageAlt}
              className="object-contain"
            />
          </div>
          <Button
            variant="outline"
            className="border border-slate-300 rounded-full"
            asChild
          >
            <Link href={`/menu?consumptionMethod=${method}`}>{text}</Link>
          </Button>
        </CardContent>
      </Card>
    </>
  );
};

export default ConsumptionMethodOptions;
