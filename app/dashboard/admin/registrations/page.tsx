'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { CheckCircle, XCircle, AlertCircle } from 'lucide-react';

const pendingRegistrations = [
  {
    id: '1',
    name: 'John Manager',
    email: 'john.manager@company.com',
    type: 'manager',
    requestedAt: '2024-02-05 10:30 AM',
    company: 'Tech Corp',
  },
  {
    id: '2',
    name: 'Sarah Analyst',
    email: 'sarah.analyst@company.com',
    type: 'analyst',
    requestedAt: '2024-02-04 02:15 PM',
    company: 'Finance Inc',
  },
  {
    id: '3',
    name: 'Mike Manager',
    email: 'mike.manager@company.com',
    type: 'manager',
    requestedAt: '2024-02-03 08:45 AM',
    company: 'Banking Solutions',
  },
];

export default function AdminRegistrationsPage() {
  const [registrations, setRegistrations] = useState(pendingRegistrations);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [action, setAction] = useState<'approve' | 'reject' | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleAction = async (regId: string, actionType: 'approve' | 'reject') => {
    setSelectedId(regId);
    setAction(actionType);
    setIsDialogOpen(true);
  };

  const confirmAction = async () => {
    if (!selectedId || !action) return;

    try {
      const response = await fetch('/api/v1/admin/manager-registrations/decision', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
        },
        body: JSON.stringify({
          registration_id: selectedId,
          approved: action === 'approve',
        }),
      });

      if (response.ok) {
        setRegistrations((prev) =>
          prev.filter((reg) => reg.id !== selectedId)
        );
      }
    } catch (error) {
      console.error('Error:', error);
    }

    setIsDialogOpen(false);
    setSelectedId(null);
    setAction(null);
  };

  const registration = registrations.find((r) => r.id === selectedId);

  return (
    <div className="flex flex-col gap-8 p-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Pending Registrations</h1>
        <p className="text-muted-foreground mt-2">
          Review and approve new user registrations
        </p>
      </div>

      {/* Alert */}
      {registrations.length > 0 && (
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            You have {registrations.length} pending registration{registrations.length !== 1 ? 's' : ''} to review
          </AlertDescription>
        </Alert>
      )}

      {/* Registrations Table */}
      <Card>
        <CardHeader>
          <CardTitle>Pending Applications</CardTitle>
          <CardDescription>
            {registrations.length} waiting for approval
          </CardDescription>
        </CardHeader>
        <CardContent>
          {registrations.length === 0 ? (
            <div className="text-center py-12">
              <CheckCircle className="h-12 w-12 mx-auto mb-4 text-green-500" />
              <p className="text-foreground font-medium">No pending registrations</p>
              <p className="text-muted-foreground mt-1">All applications have been processed</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Company</TableHead>
                    <TableHead>Requested</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {registrations.map((reg) => (
                    <TableRow key={reg.id}>
                      <TableCell className="font-medium">{reg.name}</TableCell>
                      <TableCell>{reg.email}</TableCell>
                      <TableCell>
                        <Badge variant="outline">
                          {reg.type.charAt(0).toUpperCase() + reg.type.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell>{reg.company}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {reg.requestedAt}
                      </TableCell>
                      <TableCell className="text-right space-x-2">
                        <Button
                          size="sm"
                          variant="default"
                          onClick={() => handleAction(reg.id, 'approve')}
                        >
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Approve
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-red-600 hover:text-red-700"
                          onClick={() => handleAction(reg.id, 'reject')}
                        >
                          <XCircle className="h-4 w-4 mr-1" />
                          Reject
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Confirmation Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {action === 'approve' ? 'Approve Registration' : 'Reject Registration'}
            </DialogTitle>
            <DialogDescription>
              {registration && (
                <>
                  {action === 'approve'
                    ? `Are you sure you want to approve ${registration.name}'s registration as a ${registration.type}?`
                    : `Are you sure you want to reject ${registration.name}'s registration?`}
                </>
              )}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              variant={action === 'approve' ? 'default' : 'destructive'}
              onClick={confirmAction}
            >
              {action === 'approve' ? 'Approve' : 'Reject'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
