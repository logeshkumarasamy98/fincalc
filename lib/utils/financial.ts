export interface EMIResult {
  monthlyEMI: number;
  totalInterest: number;
  totalAmount: number;
  amortizationSchedule: Array<{
    month: number;
    emi: number;
    principal: number;
    interest: number;
    balance: number;
  }>;
}

export const calculateEMI = (
  principal: number,
  interestRate: number,
  tenureYears: number
): EMIResult => {
  const monthlyRate = interestRate / 12 / 100;
  const totalMonths = tenureYears * 12;
  
  const monthlyEMI =
    (principal *
      monthlyRate *
      Math.pow(1 + monthlyRate, totalMonths)) /
    (Math.pow(1 + monthlyRate, totalMonths) - 1);

  const totalAmount = monthlyEMI * totalMonths;
  const totalInterest = totalAmount - principal;

  const amortizationSchedule = [];
  let remainingBalance = principal;

  for (let month = 1; month <= totalMonths; month++) {
    const interestPayment = remainingBalance * monthlyRate;
    const principalPayment = monthlyEMI - interestPayment;
    remainingBalance -= principalPayment;

    amortizationSchedule.push({
      month,
      emi: monthlyEMI,
      principal: principalPayment,
      interest: interestPayment,
      balance: Math.max(0, remainingBalance),
    });
  }

  return {
    monthlyEMI,
    totalInterest,
    totalAmount,
    amortizationSchedule,
  };
};

export const calculateSIP = (
  monthlyInvestment: number,
  expectedReturn: number,
  years: number,
  frequency: 'monthly' | 'quarterly' | 'yearly' = 'monthly'
): {
  totalInvestment: number;
  totalReturns: number;
  maturityValue: number;
  growthData: Array<{ year: number; value: number }>;
} => {
  const ratePerPeriod = expectedReturn / 100 / 12;
  const totalMonths = years * 12;
  
  let periods: number;
  let investmentPerPeriod: number;

  switch (frequency) {
    case 'yearly':
      periods = years;
      investmentPerPeriod = monthlyInvestment * 12;
      break;
    case 'quarterly':
      periods = years * 4;
      investmentPerPeriod = monthlyInvestment * 3;
      break;
    default:
      periods = totalMonths;
      investmentPerPeriod = monthlyInvestment;
  }

  const maturityValue =
    investmentPerPeriod *
    ((Math.pow(1 + ratePerPeriod, periods) - 1) / ratePerPeriod) *
    (1 + ratePerPeriod);

  const totalInvestment = investmentPerPeriod * periods;
  const totalReturns = maturityValue - totalInvestment;

  const growthData = Array.from({ length: years + 1 }, (_, index) => {
    const year = index;
    const monthsCompleted = year * 12;
    const value =
      investmentPerPeriod *
      ((Math.pow(1 + ratePerPeriod, monthsCompleted) - 1) / ratePerPeriod) *
      (1 + ratePerPeriod);
    return { year, value };
  });

  return {
    totalInvestment,
    totalReturns,
    maturityValue,
    growthData,
  };
};

export const calculateCompoundInterest = (
  principal: number,
  rate: number,
  time: number,
  frequency: number = 12
): {
  amount: number;
  interest: number;
  yearlyGrowth: Array<{ year: number; value: number }>;
} => {
  const amount =
    principal * Math.pow(1 + rate / (frequency * 100), frequency * time);
  const interest = amount - principal;

  const yearlyGrowth = Array.from({ length: time + 1 }, (_, index) => ({
    year: index,
    value:
      principal * Math.pow(1 + rate / (frequency * 100), frequency * index),
  }));

  return { amount, interest, yearlyGrowth };
};