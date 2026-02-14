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
import { authJsonHeaders } from '@/lib/auth/token';
import { useI18n } from '@/components/i18n-provider';

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
  const { t } = useI18n();
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
        headers: authJsonHeaders(),
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
        <h1 className="text-3xl font-bold tracking-tight text-foreground">{t('admin.reg.title')}</h1>
        <p className="text-muted-foreground mt-2">
          {t('admin.reg.desc')}
        </p>
      </div>

      {/* Alert */}
      {registrations.length > 0 && (
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            {t('admin.reg.pending_prefix')} {registrations.length} {t('admin.reg.pending_suffix')}
          </AlertDescription>
        </Alert>
      )}

      {/* Registrations Table */}
      <Card>
        <CardHeader>
          <CardTitle>{t('admin.reg.list_title')}</CardTitle>
          <CardDescription>
            {registrations.length} {t('admin.reg.waiting')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {registrations.length === 0 ? (
            <div className="text-center py-12">
              <CheckCircle className="h-12 w-12 mx-auto mb-4 text-green-500" />
              <p className="text-foreground font-medium">{t('admin.reg.none_title')}</p>
              <p className="text-muted-foreground mt-1">{t('admin.reg.none_desc')}</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t('common.name')}</TableHead>
                    <TableHead>{t('common.email')}</TableHead>
                    <TableHead>{t('admin.reg.type')}</TableHead>
                    <TableHead>{t('common.company')}</TableHead>
                    <TableHead>{t('admin.reg.requested')}</TableHead>
                    <TableHead className="text-right">{t('common.actions')}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {registrations.map((reg) => (
                    <TableRow key={reg.id}>
                      <TableCell className="font-medium">{reg.name}</TableCell>
                      <TableCell>{reg.email}</TableCell>
                      <TableCell>
                        <Badge variant="outline">
                          {t(`role.${reg.type}`)}
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
                          {t('common.approve')}
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-red-600 hover:text-red-700"
                          onClick={() => handleAction(reg.id, 'reject')}
                        >
                          <XCircle className="h-4 w-4 mr-1" />
                          {t('common.reject')}
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
              {action === 'approve' ? t('admin.reg.dialog_approve_title') : t('admin.reg.dialog_reject_title')}
            </DialogTitle>
            <DialogDescription>
              {registration && (
                <>
                  {action === 'approve' ? (
                    <>
                      {t('admin.reg.dialog_approve_prefix')} {registration.name}{' '}
                      {t('admin.reg.dialog_approve_mid')} {t(`role.${registration.type}`)}?
                    </>
                  ) : (
                    <>
                      {t('admin.reg.dialog_reject_prefix')} {registration.name}?
                    </>
                  )}
                </>
              )}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              {t('common.cancel')}
            </Button>
            <Button
              variant={action === 'approve' ? 'default' : 'destructive'}
              onClick={confirmAction}
            >
              {action === 'approve' ? t('common.approve') : t('common.reject')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
