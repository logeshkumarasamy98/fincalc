import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Calculator, PiggyBank, Percent, CreditCard } from "lucide-react";

export default function Home() {
  const features = [
    {
      title: "EMI Calculator",
      description: "Calculate your monthly EMI payments for loans",
      icon: Calculator,
      href: "/emi",
    },
    // {
    //   title: "Loan Calculator",
    //   description: "Compare different types of loans and their repayment schedules",
    //   icon: CreditCard,
    //   href: "/loan",
    // },
    {
      title: "Investment Calculator",
      description: "Plan your investments with SIP and lump sum calculators",
      icon: PiggyBank,
      href: "/investment",
    },
    // {
    //   title: "Interest Calculator",
    //   description: "Calculate simple and compound interest with various frequencies",
    //   icon: Percent,
    //   href: "/interest",
    // },
  ];

  return (
    <div className="flex flex-col items-center space-y-8 pt-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
        Financial Calculator
        </h1>
        <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
          Make informed financial decisions with our comprehensive suite of calculators
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 w-full max-w-7xl">
        {features.map((feature) => (
          <Card key={feature.title} className="transition-all hover:shadow-lg">
            <CardHeader>
              <feature.icon className="h-8 w-8 mb-2" />
              <CardTitle>{feature.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                {feature.description}
              </p>
              <Button asChild>
                <Link href={feature.href}>Get Started</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}