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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { calculateSIP } from "@/lib/utils/financial";
import { SIPResults } from "./sip-results";

const formSchema = z.object({
  monthlyInvestment: z.number().min(500).max(1000000),
  expectedReturn: z.number().min(1).max(30),
  years: z.number().min(1).max(40),
  frequency: z.enum(["monthly", "quarterly", "yearly"]),
});

export function SIPCalculator() {
  const [result, setResult] = useState<ReturnType<typeof calculateSIP> | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      monthlyInvestment: 10000,
      expectedReturn: 12,
      years: 10,
      frequency: "monthly",
    },
  });

  useEffect(() => {
    const subscription = form.watch((value) => {
      if (value.monthlyInvestment && value.expectedReturn && value.years && value.frequency) {
        const result = calculateSIP(
          value.monthlyInvestment,
          value.expectedReturn,
          value.years,
          value.frequency
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
          <CardTitle>SIP Details</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form className="space-y-6">
              <FormField
                control={form.control}
                name="monthlyInvestment"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Monthly Investment (₹)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormDescription>
                      Enter amount between ₹500 and ₹10,00,000
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
              <FormField
                control={form.control}
                name="frequency"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Investment Frequency</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select frequency" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="monthly">Monthly</SelectItem>
                        <SelectItem value="quarterly">Quarterly</SelectItem>
                        <SelectItem value="yearly">Yearly</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </CardContent>
      </Card>
      {result && <SIPResults result={result} />}
    </div>
  );
}