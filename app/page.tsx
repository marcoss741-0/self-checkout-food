"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "./_components/ui/button";
import { Card, CardContent } from "./_components/ui/card";

export default function Home() {
  return (
    <>
      <div className="flex h-screen flex-col items-center justify-center px-6 pt-10">
        {/* LOGO E TITULO */}
        <div className="flex flex-col items-center gap-2">
          <Image
            src={"/logo.png"}
            alt={"Logo do aplicativo Self-Choice"}
            width={82}
            height={82}
          />
          <h2 className="font-semibold">{"Self Choice"}</h2>
        </div>
        {/* BEM VINDO */}
        <div className="space-y-2 pt-24 text-center">
          <h3 className="text-2xl font-semibold">Seja bem-vindo!</h3>
          <p className="opacity-55">
            Escolha como prefere aproveitar sua refeição. Estamos aqui para
            oferecer praticidade e sabor em cada detalhe!
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4 pt-14">
          <Card>
            <CardContent className="flex flex-col items-center gap-8 py-8">
              <div className="relative h-[80px] w-[80px]">
                <Image
                  src="/dine-in.png"
                  fill
                  alt="Dine In"
                  className="object-contain"
                />
              </div>
              <Button variant="secondary" className="rounded-full" asChild>
                <Link href={`#`}>Comer aqui</Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex flex-col items-center gap-8 py-8">
              <div className="relative h-[80px] w-[80px]">
                <Image
                  src="/take-away.png"
                  fill
                  alt="Take Away"
                  className="object-contain"
                />
              </div>
              <Button variant="secondary" className="rounded-full" asChild>
                <Link href={`#`}>Para viagem</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
