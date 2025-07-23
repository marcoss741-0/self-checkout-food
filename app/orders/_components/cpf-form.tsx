"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/app/_components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/_components/ui/form";

import { isValidCpf, removeCpfPunctuation } from "@/app/helpers/cpf";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/app/_components/ui/input";
import { useForm } from "react-hook-form";
import { PatternFormat } from "react-number-format";
import z from "zod";
import { Loader } from "lucide-react";
import { Button } from "@/app/_components/ui/button";
import { usePathname, useRouter } from "next/navigation";

const formSchema = z.object({
  cpf: z.string().refine((value) => isValidCpf(value), {
    message: "CPF inválido",
  }),
});

type FormData = z.infer<typeof formSchema>;

const CpfForm = () => {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cpf: "",
    },
    shouldUnregister: true,
  });

  const { formState, handleSubmit } = form;

  const router = useRouter();
  const pathName = usePathname();

  const onSubmit = (data: FormData) => {
    router.push(`${pathName}?cpf=${removeCpfPunctuation(data.cpf)}`);
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <>
      <Dialog open={true}>
        <DialogContent className="w-[90%] rounded-lg">
          <DialogHeader>
            <DialogTitle>Visualizar pedidos</DialogTitle>
            <DialogDescription>
              Insira seu CPF abaixo para visualizar seus pedidos!
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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

              <div className="flex justify-between gap-2 w-full">
                <Button
                  variant="outline"
                  className="w-full border-gray-300"
                  onClick={handleCancel}
                >
                  Cancelar
                </Button>

                <Button
                  variant="destructive"
                  className="w-full"
                  disabled={formState.isSubmitting}
                >
                  {formState.isSubmitting ? (
                    <Loader className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    "Ver Pedido"
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CpfForm;
