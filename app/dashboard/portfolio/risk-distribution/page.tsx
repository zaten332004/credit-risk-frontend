'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const riskData = [
  { name: 'Low Risk', value: 145, fill: '#10b981' },
  { name: 'Medium Risk', value: 120, fill: '#f59e0b' },
  { name: 'High Risk', value: 70, fill: '#ef4444' },
];

const scoreDistribution = [
  { range: '0-20', count: 15 },
  { range: '20-40', count: 35 },
  { range: '40-60', count: 65 },
  { range: '60-80', count: 120 },
  { range: '80-100', count: 100 },
];

export default function RiskDistributionPage() {
  return (
    <div className="flex flex-col gap-8 p-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Risk Distribution</h1>
        <p className="text-muted-foreground mt-2">
          Analyze how customers are distributed across risk levels
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Risk Level Distribution</CardTitle>
            <CardDescription>Customers by risk category</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={riskData} cx="50%" cy="50%" label outerRadius={80} fill="#8884d8" dataKey="value">
                  {riskData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Score Distribution</CardTitle>
            <CardDescription>Customers by score range</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={scoreDistribution}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="range" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#06b6d4" name="Number of Customers" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Distribution Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              { label: 'Total Customers', value: '335' },
              { label: 'Average Score', value: '68.5' },
              { label: 'Median Score', value: '72' },
              { label: 'Std Deviation', value: '18.3' },
              { label: 'Risk Index', value: 'Medium' },
            ].map((stat, idx) => (
              <div key={idx} className="text-center p-4 border border-border rounded-lg">
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <p className="text-2xl font-bold mt-2">{stat.value}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
