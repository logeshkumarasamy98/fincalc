"use client";

import { EMIResult } from "@/lib/utils/financial";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartData,
} from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

interface EMIChartProps {
  result: EMIResult;
}

export function EMIChart({ result }: EMIChartProps) {
  const data: ChartData<"pie"> = {
    labels: ["Principal", "Interest"],
    datasets: [
      {
        data: [
          result.totalAmount - result.totalInterest,
          result.totalInterest,
        ],
        backgroundColor: [
          "rgb(100, 149, 237)", 
          "rgb(255, 105, 180)" 
        ],
        borderColor: [
          "rgba(94, 162, 235, 0.8)",
          "rgba(255, 99, 132, 0.8)",
        ],
        borderWidth: 2,
      },
    ],
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <Pie
        data={data}
        options={{
          responsive: true,
          plugins: {
            legend: {
              position: "bottom",
              labels: {
                padding: 20,
                font: {
                  size: 14,
                },
              },
            },
            tooltip: {
              callbacks: {
                label: (context) => {
                  const value = context.raw as number;
                  const total = result.totalAmount;
                  const percentage = ((value / total) * 100).toFixed(1);
                  return `${context.label}: ${percentage}%`;
                },
              },
            },
          },
        }}
      />
    </div>
  );
}