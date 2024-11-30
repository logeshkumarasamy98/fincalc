"use client";

import { useState, useEffect } from "react";
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
import { calculateCompoundInterest } from "@/lib/utils/financial";
import { LumpSumResults } from "./lumpsum-results";

const formSchema = z.object({
  principal: z.number().min(1000).max(10000000),
  expectedReturn: z.number().min(1).max(30),
  years: z.number().min(1).max(40),
  inflationRate: z.number().min(0).max(15),
});

export function LumpSumCalculator() {
  const [result, setResult] = useState<ReturnType<typeof calculateCompoundInterest> | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      principal: 100000,
      expectedReturn: 12,
      years: 10,
      inflationRate: 6,
    },
  });

  useEffect(() => {
    const subscription = form.watch((value) => {
      if (value.principal && value.expectedReturn && value.years && value.inflationRate !== undefined) {
        const realReturn = ((1 + value.expectedReturn / 100) / (1 + value.inflationRate / 100) - 1) * 100;
        const result = calculateCompoundInterest(
          value.principal,
          realReturn,
          value.years,
          1
        );
        setResult(result);
      }
    });
    return () => subscription.unsubscribe();
  }, [form]);

  return (
    <div className="grid gap-8 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Lump Sum Investment Details</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form className="space-y-6">
              <FormField
                control={form.control}
                name="principal"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Investment Amount (₹)</FormLabel>
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
                name="expectedReturn"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Expected Return (%)</FormLabel>
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
                name="inflationRate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Expected Inflation Rate (%)</FormLabel>
                    <FormControl>
                      <div className="space-y-4">
                        <Slider
                          min={0}
                          max={15}
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
                name="years"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Investment Period (Years)</FormLabel>
                    <FormControl>
                      <div className="space-y-4">
                        <Slider
                          min={1}
                          max={40}
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
      {result && <LumpSumResults result={result} />}
    </div>
  );
}