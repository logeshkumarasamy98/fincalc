"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SIPCalculator } from "@/components/calculators/investment/sip-calculator";
import { LumpSumCalculator } from "@/components/calculators/investment/lumpsum-calculator";

export default function InvestmentCalculatorPage() {
  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Investment Calculator</h1>
        <p className="text-muted-foreground">
          Plan your investments with SIP and lump sum calculators
        </p>
      </div>

      <Tabs defaultValue="sip" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="sip">SIP Calculator</TabsTrigger>
          <TabsTrigger value="lumpsum">Lump Sum Calculator</TabsTrigger>
        </TabsList>
        <TabsContent value="sip">
          <SIPCalculator />
        </TabsContent>
        <TabsContent value="lumpsum">
          <LumpSumCalculator />
        </TabsContent>
      </Tabs>
    </div>
  );
}