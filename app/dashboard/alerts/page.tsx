'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { AlertCircle, CheckCircle, Clock } from 'lucide-react';

const alerts = [
  {
    id: '1',
    type: 'High Risk Score',
    customer: 'CUST-001',
    severity: 'critical',
    status: 'open',
    createdAt: '2024-02-05 10:30 AM',
    description: 'Risk score increased to 35',
  },
  {
    id: '2',
    type: 'Default Risk',
    customer: 'CUST-045',
    severity: 'high',
    status: 'open',
    createdAt: '2024-02-04 02:15 PM',
    description: 'Customer has missed 2 payments',
  },
  {
    id: '3',
    type: 'Policy Change',
    customer: 'CUST-089',
    severity: 'medium',
    status: 'resolved',
    createdAt: '2024-02-03 08:45 AM',
    description: 'Regulation update requires review',
  },
  {
    id: '4',
    type: 'Score Improvement',
    customer: 'CUST-102',
    severity: 'low',
    status: 'resolved',
    createdAt: '2024-02-02 06:20 PM',
    description: 'Risk score improved to 82',
  },
];

const getSeverityVariant = (severity: string): 'default' | 'destructive' | 'outline' | 'secondary' => {
  switch (severity) {
    case 'critical':
      return 'destructive';
    case 'high':
      return 'default';
    case 'medium':
      return 'default';
    case 'low':
      return 'secondary';
    default:
      return 'outline';
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'open':
      return <AlertCircle className="h-4 w-4 text-red-500" />;
    case 'resolved':
      return <CheckCircle className="h-4 w-4 text-green-500" />;
    case 'pending':
      return <Clock className="h-4 w-4 text-yellow-500" />;
    default:
      return null;
  }
};

export default function AlertsPage() {
  const [filter, setFilter] = useState<string>('all');

  const filteredAlerts = alerts.filter((alert) => {
    if (filter === 'all') return true;
    return alert.status === filter;
  });

  return (
    <div className="flex flex-col gap-8 p-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Alerts</h1>
          <p className="text-muted-foreground mt-2">
            Monitor and manage portfolio alerts and notifications
          </p>
        </div>
        <Badge variant="destructive" className="text-lg px-4 py-2">
          {alerts.filter((a) => a.status === 'open').length} Open
        </Badge>
      </div>

      {/* Alerts Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { title: 'Total Alerts', count: alerts.length, variant: 'outline' as const },
          { title: 'Open', count: alerts.filter((a) => a.status === 'open').length, variant: 'destructive' as const },
          { title: 'Resolved', count: alerts.filter((a) => a.status === 'resolved').length, variant: 'secondary' as const },
          { title: 'Critical', count: alerts.filter((a) => a.severity === 'critical').length, variant: 'destructive' as const },
        ].map((item, idx) => (
          <Card key={idx}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">{item.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{item.count}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Alerts Table */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <div>
            <CardTitle>Active Alerts</CardTitle>
            <CardDescription>
              Showing {filteredAlerts.length} alerts
            </CardDescription>
          </div>
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Alerts</SelectItem>
              <SelectItem value="open">Open</SelectItem>
              <SelectItem value="resolved">Resolved</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
            </SelectContent>
          </Select>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead></TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Severity</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAlerts.map((alert) => (
                  <TableRow key={alert.id}>
                    <TableCell>{getStatusIcon(alert.status)}</TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{alert.type}</p>
                        <p className="text-sm text-muted-foreground">{alert.description}</p>
                      </div>
                    </TableCell>
                    <TableCell>{alert.customer}</TableCell>
                    <TableCell>
                      <Badge variant={getSeverityVariant(alert.severity)}>
                        {alert.severity.charAt(0).toUpperCase() + alert.severity.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={alert.status === 'open' ? 'destructive' : 'secondary'}>
                        {alert.status.charAt(0).toUpperCase() + alert.status.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">{alert.createdAt}</TableCell>
                    <TableCell className="text-right">
                      {alert.status === 'open' && (
                        <Button variant="ghost" size="sm" className="text-accent hover:text-accent">
                          Resolve
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
