"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const formSchema = z.object({
  principal: z.number().min(1000).max(10000000),
  interest: z.number().min(1).max(30),
  tenure: z.number().min(1).max(360),
  tenureType: z.enum(["months", "years"]),
});

interface EMICalculatorFormProps {
  onCalculate: (principal: number, interest: number, tenure: number) => void;
}

export function EMICalculatorForm({ onCalculate }: EMICalculatorFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      principal: 1000000,
      interest: 10,
      tenure: 20,
      tenureType: "years",
    },
  });

  const values = form.watch();

  useEffect(() => {
    const subscription = form.watch((value, { name, type }) => {
      if (value.principal && value.interest && value.tenure) {
        const tenureInYears = value.tenureType === "months" ? value.tenure / 12 : value.tenure;
        onCalculate(value.principal, value.interest, tenureInYears);
      }
    });
    return () => subscription.unsubscribe();
  }, [form, onCalculate]);

  const maxTenure = values.tenureType === "months" ? 360 : 30;
  const tenureStep = values.tenureType === "months" ? 1 : 0.5;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Loan Details</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form className="space-y-6">
            <FormField
              control={form.control}
              name="principal"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Principal Amount (₹)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormDescription>
                    Enter amount between ₹1,000 and ₹1,00,00,000
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="interest"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Interest Rate (%)</FormLabel>
                  <FormControl>
                    <div className="space-y-4">
                      <Slider
                        min={1}
                        max={30}
                        step={0.1}
                        value={[field.value]}
                        onValueChange={([value]) => field.onChange(value)}
                      />
                      <Input
                        type="number"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tenureType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tenure Type</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select tenure type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="months">Months</SelectItem>
                      <SelectItem value="years">Years</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tenure"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Loan Tenure ({values.tenureType})</FormLabel>
                  <FormControl>
                    <div className="space-y-4">
                      <Slider
                        min={1}
                        max={maxTenure}
                        step={tenureStep}
                        value={[field.value]}
                        onValueChange={([value]) => field.onChange(value)}
                      />
                      <Input
                        type="number"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}