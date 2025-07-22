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
  DrawerTrigger,
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
import { Loader } from "lucide-react";

const formSchema = z.object({
  name: z.string().trim().min(1, "Nome é obrigatório"),
  cpf: z.string().refine((value) => isValidCpf(value), {
    message: "CPF inválido",
  }),
});

type FormData = z.infer<typeof formSchema>;

const FinishOrderButton = () => {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      cpf: "",
    },
  });
  const { handleSubmit, formState } = form;

  function onSubmit(data: FormData) {
    console.log("Form Data Submitted:", data);
  }

  return (
    <>
      <Drawer>
        <DrawerTrigger asChild>
          <Button className="w-full rounded-full">Finalizar Pedido</Button>
        </DrawerTrigger>
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
                        <Input placeholder="Digite seu nome" {...field} />
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
                        <Input placeholder="Digite seu CPF" {...field} />
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
                    <Button variant="destructive" className="w-full">
                      {formState.isLoading ? (
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

export default FinishOrderButton;
