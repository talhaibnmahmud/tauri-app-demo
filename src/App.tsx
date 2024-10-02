import { zodResolver } from "@hookform/resolvers/zod";
import { invoke } from "@tauri-apps/api/tauri";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { errorMap } from "zod-validation-error";

import "@/App.css";
import reactLogo from "@/assets/react.svg";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Toaster } from "@/components/ui/sonner";

const formSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters long" })
    .max(50, { message: "Name must be less than 50 characters long" })
    // Name can only contain letters, spaces and periods
    .regex(/^[a-zA-Z\s.]*$/, {
      message: "Name can only contain letters, spaces and periods",
    }),
});

function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    setCount((count) => count + 1);
    console.log("Count:", count);
    const multiplied = count * 2;
    console.log("Multiplied:", multiplied);
  }, [count]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema, { errorMap }),
    defaultValues: {
      name: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
    const msg = String(await invoke("greet", { name: values.name }));
    toast("Geetings from Tauri", {
      description: msg,
      action: {
        label: "Undo",
        onClick: () => console.log("Undo"),
      },
    });
  }

  return (
    <div className="min-h-screen grid place-content-center gap-6">
      <h1 className="text-3xl text-center font-bold">Welcome to Tauri!</h1>

      <div className="flex items-center justify-center gap-10">
        <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
          <img src="/vite.svg" className="w-20" alt="Vite logo" />
        </a>
        <a href="https://tauri.app" target="_blank" rel="noreferrer">
          <img src="/tauri.svg" className="w-20" alt="Tauri logo" />
        </a>
        <a href="https://reactjs.org" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="w-20" alt="React logo" />
        </a>
      </div>

      <p>Click on the Tauri, Vite, and React logos to learn more.</p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your name" {...field} />
                </FormControl>
                <FormDescription>
                  Enter your name to get a personalized greeting
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full">
            Greet
          </Button>
        </form>
      </Form>

      <Toaster position="bottom-right" />
    </div>
  );
}

export default App;
