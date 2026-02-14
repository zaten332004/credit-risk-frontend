'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ScatterChart, Scatter } from 'recharts';

const riskFactorData = [
  { factor: 'Income', impact: 25 },
  { factor: 'Debt Ratio', impact: 20 },
  { factor: 'Credit History', impact: 18 },
  { factor: 'Employment', impact: 15 },
  { factor: 'Loan Amount', impact: 12 },
  { factor: 'Other', impact: 10 },
];

const portfolioDistribution = [
  { riskLevel: 'Low', count: 145, percentage: 45 },
  { riskLevel: 'Medium', count: 120, percentage: 35 },
  { riskLevel: 'High', count: 70, percentage: 20 },
];

const customerScatter = [
  { income: 50000, loanAmount: 25000, score: 85 },
  { income: 60000, loanAmount: 20000, score: 88 },
  { income: 40000, loanAmount: 35000, score: 42 },
  { income: 75000, loanAmount: 30000, score: 75 },
  { income: 45000, loanAmount: 40000, score: 35 },
  { income: 80000, loanAmount: 25000, score: 92 },
  { income: 35000, loanAmount: 50000, score: 28 },
  { income: 90000, loanAmount: 20000, score: 95 },
];

export default function RiskAnalyzePage() {
  return (
    <div className="flex flex-col gap-8 p-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Risk Analysis</h1>
        <p className="text-muted-foreground mt-2">
          Deep dive into portfolio risk metrics and patterns
        </p>
      </div>

      <Tabs defaultValue="factors" className="w-full">
        <TabsList>
          <TabsTrigger value="factors">Risk Factors</TabsTrigger>
          <TabsTrigger value="distribution">Distribution</TabsTrigger>
          <TabsTrigger value="correlation">Correlation</TabsTrigger>
        </TabsList>

        {/* Risk Factors */}
        <TabsContent value="factors" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Risk Factor Impact Analysis</CardTitle>
              <CardDescription>
                Relative importance of each factor in determining risk scores
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={riskFactorData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="factor" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="impact" fill="#06b6d4" name="Impact (%)" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Insights</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                'Income is the most significant factor, accounting for 25% of the score',
                'Debt-to-income ratio is critical for high-risk classifications',
                'Credit history demonstrates long-term financial stability',
                'Recent employment history impacts approval rates',
              ].map((insight, idx) => (
                <div key={idx} className="flex gap-3">
                  <div className="h-2 w-2 rounded-full bg-accent mt-2 flex-shrink-0" />
                  <p className="text-sm text-muted-foreground">{insight}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Distribution */}
        <TabsContent value="distribution" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Portfolio Risk Distribution</CardTitle>
              <CardDescription>
                Breakdown of customers by risk level
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {portfolioDistribution.map((item, idx) => (
                  <div key={idx}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">{item.riskLevel} Risk</span>
                      <span className="text-sm text-muted-foreground">
                        {item.count} customers ({item.percentage}%)
                      </span>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-2">
                      <div
                        className="bg-accent rounded-full h-2 transition-all"
                        style={{ width: `${item.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Key Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Total Customers</p>
                  <p className="text-2xl font-bold mt-2">335</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Average Score</p>
                  <p className="text-2xl font-bold mt-2">68.5</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Portfolio Risk</p>
                  <p className="text-2xl font-bold mt-2">Medium</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Correlation */}
        <TabsContent value="correlation" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Income vs Loan Amount Correlation</CardTitle>
              <CardDescription>
                Relationship between customer income and loan amount
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <ScatterChart>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="income" name="Annual Income" unit="$" />
                  <YAxis dataKey="loanAmount" name="Loan Amount" unit="$" />
                  <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                  <Scatter
                    name="Customers"
                    data={customerScatter}
                    fill="#06b6d4"
                  />
                </ScatterChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Correlation Findings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">
                Analysis shows a moderate positive correlation between income and risk scores. Customers with higher incomes tend to have better risk profiles.
              </p>
              <div className="bg-secondary p-4 rounded-lg space-y-2">
                <p className="text-sm font-medium">Strong Indicators:</p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Income-to-loan ratio {">"} 2.5 = Low risk</li>
                  <li>• Income-to-loan ratio 1.5-2.5 = Medium risk</li>
                  <li>• Income-to-loan ratio {"<"} 1.5 = High risk</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
