"use client";

import { EMICalculatorForm } from "@/components/calculators/emi/emi-form";
import { EMIResults } from "@/components/calculators/emi/emi-results";
import { useState } from "react";
import type { EMIResult } from "@/lib/utils/financial";
import { calculateEMI } from "@/lib/utils/financial";

export default function EMICalculatorPage() {
  const [result, setResult] = useState<EMIResult | null>(null);

  const handleCalculate = (principal: number, interest: number, tenure: number) => {
    const emiResult = calculateEMI(principal, interest, tenure);
    setResult(emiResult);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">EMI Calculator</h1>
        <p className="text-muted-foreground">
          Calculate your Equated Monthly Installment (EMI) and view detailed amortization schedule
        </p>
      </div>
      
      <div className="grid gap-8 md:grid-cols-2">
        <EMICalculatorForm onCalculate={handleCalculate} />
        {result && <EMIResults result={result} />}
      </div>
    </div>
  );
}