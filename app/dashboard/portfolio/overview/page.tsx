'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const portfolioMetrics = [
  { title: 'Total Portfolio Value', value: '$2.4M', change: '+5.2%' },
  { title: 'Average Risk Score', value: '68.5', change: '+2.1%' },
  { title: 'Number of Customers', value: '335', change: '+8.3%' },
  { title: 'Portfolio Health', value: 'Good', change: 'Stable' },
];

const trendData = [
  { month: 'Jan', value: 2100000, score: 65 },
  { month: 'Feb', value: 2200000, score: 67 },
  { month: 'Mar', value: 2150000, score: 66 },
  { month: 'Apr', value: 2300000, score: 68 },
  { month: 'May', value: 2350000, score: 69 },
  { month: 'Jun', value: 2400000, score: 68.5 },
];

const riskDistribution = [
  { name: 'Low Risk', value: 145, fill: '#10b981' },
  { name: 'Medium Risk', value: 120, fill: '#f59e0b' },
  { name: 'High Risk', value: 70, fill: '#ef4444' },
];

const sectorBreakdown = [
  { sector: 'Technology', percentage: 28 },
  { sector: 'Finance', percentage: 22 },
  { sector: 'Healthcare', percentage: 18 },
  { sector: 'Manufacturing', percentage: 16 },
  { sector: 'Retail', percentage: 10 },
  { sector: 'Other', percentage: 6 },
];

export default function PortfolioOverviewPage() {
  return (
    <div className="flex flex-col gap-8 p-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Portfolio Overview</h1>
        <p className="text-muted-foreground mt-2">
          High-level view of your entire credit portfolio
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {portfolioMetrics.map((metric, idx) => (
          <Card key={idx}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{metric.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
              <p className="text-xs text-accent mt-1">{metric.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Portfolio Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Portfolio Trend</CardTitle>
            <CardDescription>
              Historical portfolio value and average score
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="value"
                  stroke="#06b6d4"
                  strokeWidth={2}
                  name="Portfolio Value"
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="score"
                  stroke="#f59e0b"
                  strokeWidth={2}
                  name="Avg Risk Score"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Risk Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Risk Distribution</CardTitle>
            <CardDescription>
              Customers by risk level
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={riskDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {riskDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Sector Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Sector Breakdown</CardTitle>
          <CardDescription>
            Portfolio distribution across industries
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={sectorBreakdown}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="sector" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="percentage" fill="#06b6d4" name="% of Portfolio" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Performance Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Performance Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { label: 'Portfolio ROI', value: '8.5%', status: 'positive' },
              { label: 'Default Rate', value: '0.8%', status: 'positive' },
              { label: 'Average Term', value: '36 months', status: 'neutral' },
              { label: 'Liquidity Score', value: '7.2/10', status: 'neutral' },
            ].map((item, idx) => (
              <div key={idx} className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">{item.label}</span>
                <span className="font-medium">{item.value}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Risks</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { customer: 'CUST-001', score: 35, status: 'Critical' },
              { customer: 'CUST-045', score: 42, status: 'High' },
              { customer: 'CUST-089', score: 48, status: 'High' },
              { customer: 'CUST-102', score: 54, status: 'Medium' },
            ].map((item, idx) => (
              <div key={idx} className="flex items-center justify-between pb-3 border-b last:border-0 last:pb-0">
                <span className="text-sm font-medium">{item.customer}</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm">{item.score}</span>
                  <Badge
                    variant={item.status === 'Critical' ? 'destructive' : item.status === 'High' ? 'default' : 'secondary'}
                  >
                    {item.status}
                  </Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
