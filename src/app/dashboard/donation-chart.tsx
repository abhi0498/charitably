"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";

const donationUsage = [
  { name: "Food", value: 30 },
  { name: "Clothing", value: 40 },
  { name: "Medical Aid", value: 20 },
  { name: "Unused", value: 10 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

export function DonationChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={donationUsage}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {donationUsage.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}
