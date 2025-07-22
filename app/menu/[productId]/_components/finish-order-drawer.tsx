"use client";

import { Button } from "@/app/_components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/app/_components/ui/drawer";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/_components/ui/form";
import { Input } from "@/app/_components/ui/input";
import { isValidCpf } from "@/app/helpers/cpf";
import { HamburgerIcon, Loader } from "lucide-react";
import { PatternFormat } from "react-number-format";
import { useSearchParams } from "next/navigation";
import { createOrder } from "../../actions/create-orders";
import { ConsumptionMethod } from "@prisma/client";
import { useContext } from "react";
import { CartContext } from "../../context/cart";
import { toast } from "sonner";

interface FinishDrawerCartProps {
  extOpen: boolean;
  extOnOpenChange: (open: boolean) => void;
}

const formSchema = z.object({
  name: z.string().trim().min(1, "Nome é obrigatório"),
  cpf: z.string().refine((value) => isValidCpf(value), {
    message: "CPF inválido",
  }),
});

type FormData = z.infer<typeof formSchema>;

const FinishDrawerCart = ({
  extOpen,
  extOnOpenChange,
}: FinishDrawerCartProps) => {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      cpf: "",
    },
    shouldUnregister: true,
  });
  const { handleSubmit, formState } = form;
  const { products, removeProductFromCart, toggleCart } =
    useContext(CartContext);
  const params = useSearchParams();
  const consumptionMethod = params.get("consumptionMethod");

  async function onSubmit(data: FormData) {
    try {
      await createOrder({
        consumptionMethod: consumptionMethod as ConsumptionMethod,
        customerName: data.name,
        customerCpf: data.cpf,
        products,
        slug: "self-choice",
      });
      products.forEach((product) => removeProductFromCart(product.id));
      toggleCart();
      extOnOpenChange(false);
      toast("Pedido realizado com sucesso!", {
        icon: <HamburgerIcon className="h-5 w-5" strokeWidth={2} />,
        style: {
          backgroundColor: "#fff3cd",
          color: "#856404",
        },
      });
    } catch (error) {
      console.log(error);
      toast.error("Ooops, algo inesperado ocorreu!");
    }
  }

  return (
    <>
      <Drawer open={extOpen} onOpenChange={extOnOpenChange}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Quase lá</DrawerTitle>
            <DrawerDescription>
              Para finalizar o seu pedido, insira os seus dados abaixo.
            </DrawerDescription>
          </DrawerHeader>

          <div className="flex p-5">
            <Form {...form}>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-6 w-full"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Seu Nome</FormLabel>
                      <FormControl>
                        <Input placeholder="Digite seu nome..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="cpf"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Seu CPF</FormLabel>
                      <FormControl>
                        <PatternFormat
                          placeholder="Digite seu CPF..."
                          format="###.###.###-##"
                          customInput={Input}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <DrawerFooter>
                  <div className="flex justify-between gap-2 w-full">
                    <DrawerClose asChild>
                      <Button
                        variant="outline"
                        className="w-full border-gray-300"
                      >
                        Cancelar
                      </Button>
                    </DrawerClose>
                    <Button
                      variant="destructive"
                      className="w-full"
                      disabled={formState.isSubmitting}
                    >
                      {formState.isSubmitting ? (
                        <Loader className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        "Finalizar Pedido"
                      )}
                    </Button>
                  </div>
                </DrawerFooter>
              </form>
            </Form>
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default FinishDrawerCart;
