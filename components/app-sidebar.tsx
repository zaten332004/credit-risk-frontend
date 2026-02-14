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
import { clearAccessToken } from '@/lib/auth/token';
import { ThemeToggle } from '@/components/theme-toggle';
import { getUserRole, type UserRole } from '@/lib/auth/token';
import { LanguageToggle } from '@/components/language-toggle';
import { useI18n } from '@/components/i18n-provider';

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
    titleKey: 'sidebar.dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    titleKey: 'sidebar.customers',
    href: '/dashboard/customers',
    icon: Users,
  },
  {
    titleKey: 'sidebar.risk',
    icon: TrendingUp,
    items: [
      {
        titleKey: 'sidebar.risk.score',
        href: '/dashboard/risk/score',
      },
      {
        titleKey: 'sidebar.risk.analyze',
        href: '/dashboard/risk/analyze',
      },
      {
        titleKey: 'sidebar.risk.batch',
        href: '/dashboard/risk/batch',
      },
      {
        titleKey: 'sidebar.risk.simulation',
        href: '/dashboard/risk/simulation',
      },
      {
        titleKey: 'sidebar.risk.explain',
        href: '/dashboard/risk/explain',
      },
    ],
  },
  {
    titleKey: 'sidebar.portfolio',
    icon: PieChart,
    items: [
      {
        titleKey: 'sidebar.portfolio.overview',
        href: '/dashboard/portfolio/overview',
      },
      {
        titleKey: 'sidebar.portfolio.risk_distribution',
        href: '/dashboard/portfolio/risk-distribution',
      },
      {
        titleKey: 'sidebar.portfolio.concentration',
        href: '/dashboard/portfolio/concentration',
      },
      {
        titleKey: 'sidebar.portfolio.trends',
        href: '/dashboard/portfolio/trends',
      },
      {
        titleKey: 'sidebar.portfolio.compare',
        href: '/dashboard/portfolio/compare',
      },
    ],
  },
  {
    titleKey: 'sidebar.chat',
    href: '/dashboard/chat',
    icon: MessageSquare,
  },
  {
    titleKey: 'sidebar.ai_chat',
    href: '/dashboard/ai-chat',
    icon: Zap,
  },
  {
    titleKey: 'sidebar.powerbi',
    href: '/dashboard/powerbi/config',
    icon: BarChart3,
  },
  {
    titleKey: 'sidebar.alerts',
    href: '/dashboard/alerts',
    icon: AlertCircle,
  },
  {
    titleKey: 'sidebar.upload',
    href: '/dashboard/upload',
    icon: Upload,
  },
];

const adminItems = [
  {
    titleKey: 'sidebar.admin.users',
    href: '/dashboard/admin/users',
    icon: Users,
  },
  {
    titleKey: 'sidebar.admin.registrations',
    href: '/dashboard/admin/registrations',
    icon: AlertCircle,
  },
];

export function AppSidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const { t } = useI18n();
  const [openItems, setOpenItems] = React.useState<string[]>([]);
  const [role, setRole] = React.useState<UserRole | null>(null);

  React.useEffect(() => {
    setRole(getUserRole());
  }, []);

  const handleLogout = () => {
    clearAccessToken();
    router.push('/auth/login');
  };

  const toggleItem = (title: string) => {
    setOpenItems((prev) =>
      prev.includes(title) ? prev.filter((item) => item !== title) : [...prev, title]
    );
  };

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/');
  const isAdmin = role === 'admin';
  const isViewer = role === 'viewer';

  return (
    <Sidebar>
      <SidebarHeader className="border-b border-sidebar-border p-4">
        <Link href="/dashboard" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <Image
            src="/logo.svg"
            alt="CRAI DB"
            width={32}
            height={32}
          />
          <span className="font-semibold text-sm text-sidebar-foreground">CRAI DB</span>
        </Link>
      </SidebarHeader>

      <SidebarContent>
        <SidebarMenu>
          {navigationItems
            .filter((item) => {
              if (isViewer) {
                if (item.href === '/dashboard/upload') return false;
                if (item.href === '/dashboard/customers') return true;
                if (item.titleKey === 'sidebar.risk') return true;
              }
              return true;
            })
            .map((item) => {
            if (item.items) {
              const filteredSubItems = isViewer
                ? item.items.filter((subItem) => !subItem.href.includes('/batch'))
                : item.items;
              return (
                <Collapsible
                  key={item.titleKey}
                  open={openItems.includes(item.titleKey)}
                  onOpenChange={() => toggleItem(item.titleKey)}
                  className="group/collapsible"
                >
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton
                        className="data-[state=open]:bg-sidebar-accent"
                        tooltip={t(item.titleKey)}
                      >
                        <item.icon className="h-4 w-4" />
                        <span>{t(item.titleKey)}</span>
                        <ChevronDown className="ml-auto h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-180" />
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {filteredSubItems.map((subItem) => (
                          <SidebarMenuSubItem key={subItem.href}>
                            <SidebarMenuSubButton
                              asChild
                              isActive={isActive(subItem.href)}
                            >
                              <Link href={subItem.href}>
                                <span>{t(subItem.titleKey)}</span>
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
                  tooltip={t(item.titleKey)}
                >
                  <Link href={item.href}>
                    <item.icon className="h-4 w-4" />
                    <span>{t(item.titleKey)}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>

        {/* Admin Section */}
        {isAdmin && (
          <div className="mt-8 pt-6 border-t border-sidebar-border">
            <div className="px-3 py-2">
              <h3 className="text-xs font-semibold text-sidebar-foreground/70 uppercase tracking-wider">
                {t("sidebar.admin")}
              </h3>
            </div>
            <SidebarMenu>
              {adminItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive(item.href)}
                    tooltip={t(item.titleKey)}
                  >
                    <Link href={item.href}>
                      <item.icon className="h-4 w-4" />
                      <span>{t(item.titleKey)}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </div>
        )}
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border p-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton tooltip={t("sidebar.settings")}>
                  <Settings className="h-4 w-4" />
                  <span>{t("sidebar.settings")}</span>
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent side="top" className="w-56">
                <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="flex items-center justify-between">
                  <span>{t("nav.theme")}</span>
                  <ThemeToggle variant="outline" />
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="flex items-center justify-between">
                  <span>{t("nav.language")}</span>
                  <LanguageToggle variant="outline" />
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/profile">
                    <span>{t("sidebar.profile")}</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>{t("sidebar.logout")}</span>
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
