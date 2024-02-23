import { useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import { open } from "@tauri-apps/api/dialog";
// import "./App.css";

import { useForm } from "react-hook-form"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"


function App() {
   // 1. Define your form.
  const form = useForm({
    // resolver: zodResolver(formSchema),
    defaultValues: {
      apkFilePath: "",
    },
  })
 
  // 2. Define a submit handler.
  const onSubmit = async (values: any) => {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
    const { apkFilePath } = values;
      const url = convertFileSrc(apkFilePath);
         console.log(url);
    await invoke("decompileApk", { path:apkFilePath })
  }

  return (
    <div className="container mx-auto">
       <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="apkFilePath"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Choose APK</FormLabel>
              <FormControl>
                <Input type="file"  onChange={(e) => { field.onChange(e.target.files) }} />
              </FormControl>
              <FormDescription>
                Choose your apk file path to decompile.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
    </div>
  );
}

export default App;
