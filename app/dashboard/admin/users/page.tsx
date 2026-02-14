'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Search, MoreHorizontal } from 'lucide-react';
import { useI18n } from '@/components/i18n-provider';

const users = [
  {
    id: '1',
    name: 'Alice Johnson',
    email: 'alice@example.com',
    role: 'Manager',
    status: 'active',
    joinedAt: '2024-01-10',
  },
  {
    id: '2',
    name: 'Bob Smith',
    email: 'bob@example.com',
    role: 'Analyst',
    status: 'active',
    joinedAt: '2024-01-15',
  },
  {
    id: '3',
    name: 'Carol Davis',
    email: 'carol@example.com',
    role: 'Manager',
    status: 'active',
    joinedAt: '2024-01-20',
  },
  {
    id: '4',
    name: 'David Wilson',
    email: 'david@example.com',
    role: 'Analyst',
    status: 'inactive',
    joinedAt: '2024-02-01',
  },
];

export default function AdminUsersPage() {
  const { t } = useI18n();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');

  const roleLabel = (role: string) => {
    switch (role.toLowerCase()) {
      case 'manager':
        return t('role.manager');
      case 'analyst':
        return t('role.analyst');
      case 'admin':
        return t('role.admin');
      case 'viewer':
        return t('role.viewer');
      default:
        return role;
    }
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearch = user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === 'all' || user.status === filter || user.role.toLowerCase() === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="flex flex-col gap-8 p-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">{t('admin.users.title')}</h1>
          <p className="text-muted-foreground mt-2">
            {t('admin.users.desc')}
          </p>
        </div>
        <Button>{t('admin.users.add')}</Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { titleKey: 'admin.users.total', count: users.length },
          { titleKey: 'common.active', count: users.filter((u) => u.status === 'active').length },
          { titleKey: 'admin.users.managers', count: users.filter((u) => u.role === 'Manager').length },
          { titleKey: 'admin.users.analysts', count: users.filter((u) => u.role === 'Analyst').length },
        ].map((stat, idx) => (
          <Card key={idx}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">{t(stat.titleKey)}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stat.count}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Users Table */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <div>
            <CardTitle>{t('admin.users.list_title')}</CardTitle>
            <CardDescription>
              {t('common.showing')} {filteredUsers.length} {t('admin.users.items')}
            </CardDescription>
          </div>
          <div className="w-full md:w-64">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={t('admin.users.search_ph')}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t('common.name')}</TableHead>
                  <TableHead>{t('common.email')}</TableHead>
                  <TableHead>{t('common.role')}</TableHead>
                  <TableHead>{t('common.status')}</TableHead>
                  <TableHead>{t('admin.users.joined')}</TableHead>
                  <TableHead className="text-right">{t('common.actions')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{roleLabel(user.role)}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={user.status === 'active' ? 'secondary' : 'outline'}
                      >
                        {t(`status.${user.status}`)}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {user.joinedAt}
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>{t('common.edit')}</DropdownMenuItem>
                          <DropdownMenuItem>{t('admin.users.view_activity')}</DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">
                            {t('admin.users.deactivate')}
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
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
