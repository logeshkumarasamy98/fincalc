"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { formatCurrency } from "@/lib/utils/format";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface SIPChartProps {
  data: Array<{ year: number; value: number }>;
}

export function SIPChart({ data }: SIPChartProps) {
  const chartData: ChartData<"line"> = {
    labels: data.map((d) => `Year ${d.year}`),
    datasets: [
      {
        label: "Investment Value",
        data: data.map((d) => d.value),
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.1)",
        borderWidth: 2,
        pointRadius: 4,
        pointBackgroundColor: "rgb(75, 192, 192)",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  return (
    <Line
      data={chartData}
      options={{
        responsive: true,
        plugins: {
          legend: {
            position: "top",
            labels: {
              font: {
                size: 14,
              },
              padding: 20,
            },
          },
          tooltip: {
            callbacks: {
              label: (context) => {
                return formatCurrency(context.parsed.y);
              },
            },
            padding: 12,
            titleFont: {
              size: 14,
            },
            bodyFont: {
              size: 14,
            },
          },
        },
        scales: {
          y: {
            ticks: {
              callback: (value) => formatCurrency(value as number),
              font: {
                size: 12,
              },
            },
            grid: {
              color: "rgba(0, 0, 0, 0.1)",
            },
          },
          x: {
            grid: {
              display: false,
            },
            ticks: {
              font: {
                size: 12,
              },
            },
          },
        },
      }}
    />
  );
}