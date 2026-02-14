'use client';

import * as React from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from '@/components/ui/sidebar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { Button } from '@/components/ui/button';

import {
  LayoutDashboard,
  Users,
  TrendingUp,
  PieChart,
  MessageSquare,
  Zap,
  AlertCircle,
  Upload,
  Settings,
  LogOut,
  ChevronDown,
  BarChart3,
} from 'lucide-react';

const navigationItems = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    title: 'Customers',
    href: '/customers',
    icon: Users,
  },
  {
    title: 'Risk Management',
    icon: TrendingUp,
    items: [
      {
        title: 'Score',
        href: '/risk/score',
      },
      {
        title: 'Analyze',
        href: '/risk/analyze',
      },
      {
        title: 'Batch Processing',
        href: '/risk/batch',
      },
      {
        title: 'Simulation',
        href: '/risk/simulation',
      },
      {
        title: 'Model Explainability',
        href: '/risk/explain',
      },
    ],
  },
  {
    title: 'Portfolio',
    icon: PieChart,
    items: [
      {
        title: 'Overview',
        href: '/portfolio/overview',
      },
      {
        title: 'Risk Distribution',
        href: '/portfolio/risk-distribution',
      },
      {
        title: 'Concentration',
        href: '/portfolio/concentration',
      },
      {
        title: 'Trends',
        href: '/portfolio/trends',
      },
      {
        title: 'Compare',
        href: '/portfolio/compare',
      },
    ],
  },
  {
    title: 'Chat',
    href: '/chat',
    icon: MessageSquare,
  },
  {
    title: 'AI Chat',
    href: '/ai-chat',
    icon: Zap,
  },
  {
    title: 'Power BI',
    href: '/powerbi/config',
    icon: BarChart3,
  },
  {
    title: 'Alerts',
    href: '/alerts',
    icon: AlertCircle,
  },
  {
    title: 'Data Upload',
    href: '/upload',
    icon: Upload,
  },
];

const adminItems = [
  {
    title: 'User Management',
    href: '/admin/users',
    icon: Users,
  },
  {
    title: 'Registrations',
    href: '/admin/registrations',
    icon: AlertCircle,
  },
];

export function AppSidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const [openItems, setOpenItems] = React.useState<string[]>([]);

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    router.push('/auth/login');
  };

  const toggleItem = (title: string) => {
    setOpenItems((prev) =>
      prev.includes(title) ? prev.filter((item) => item !== title) : [...prev, title]
    );
  };

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/');

  return (
    <Sidebar>
      <SidebarHeader className="border-b border-sidebar-border p-4">
        <Link href="/dashboard" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <Image
            src="/logo.png"
            alt="CRAI DB"
            width={32}
            height={32}
          />
          <span className="font-semibold text-sm text-sidebar-foreground">CRAI DB</span>
        </Link>
      </SidebarHeader>

      <SidebarContent>
        <SidebarMenu>
          {navigationItems.map((item) => {
            if (item.items) {
              return (
                <Collapsible
                  key={item.title}
                  open={openItems.includes(item.title)}
                  onOpenChange={() => toggleItem(item.title)}
                  className="group/collapsible"
                >
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton
                        className="data-[state=open]:bg-sidebar-accent"
                        tooltip={item.title}
                      >
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                        <ChevronDown className="ml-auto h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-180" />
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {item.items.map((subItem) => (
                          <SidebarMenuSubItem key={subItem.href}>
                            <SidebarMenuSubButton
                              asChild
                              isActive={isActive(subItem.href)}
                            >
                              <Link href={subItem.href}>
                                <span>{subItem.title}</span>
                              </Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>
              );
            }

            return (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton
                  asChild
                  isActive={isActive(item.href)}
                  tooltip={item.title}
                >
                  <Link href={item.href}>
                    <item.icon className="h-4 w-4" />
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>

        {/* Admin Section */}
        <div className="mt-8 pt-6 border-t border-sidebar-border">
          <div className="px-3 py-2">
            <h3 className="text-xs font-semibold text-sidebar-foreground/70 uppercase tracking-wider">
              Admin
            </h3>
          </div>
          <SidebarMenu>
            {adminItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton
                  asChild
                  isActive={isActive(item.href)}
                  tooltip={item.title}
                >
                  <Link href={item.href}>
                    <item.icon className="h-4 w-4" />
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </div>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border p-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton tooltip="Settings">
                  <Settings className="h-4 w-4" />
                  <span>Settings</span>
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent side="top" className="w-56">
                <DropdownMenuItem asChild>
                  <Link href="/profile">
                    <span>Profile Settings</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
