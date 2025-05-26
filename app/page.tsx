import Image from "next/image";
import ConsumptionMethodOptions from "./_components/consumption-method";

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
          {/* CONSUMPTION METHOD - DELIVERY */}
          <ConsumptionMethodOptions
            imageUrl="/dine-in.png"
            text="Comer Aqui"
            method="DINE_IN"
            imageAlt="Ícone de Comer Aqui"
          />

          <ConsumptionMethodOptions
            imageUrl="/take-away.png"
            text="Para Levar"
            method="TAKEAWAY"
            imageAlt="Ícone de Para Levar"
          />
        </div>
      </div>
    </>
  );
}
