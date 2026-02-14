'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, Loader2 } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import Image from 'next/image';
import { setSession } from '@/lib/auth/token';
import { ThemeToggle } from '@/components/theme-toggle';
import { LanguageToggle } from '@/components/language-toggle';
import { useI18n } from '@/components/i18n-provider';

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { t } = useI18n();
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const requestLogin = async (body: Record<string, unknown>) => {
        const response = await fetch('/api/v1/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            accept: 'application/json',
          },
          body: JSON.stringify(body),
        });

        if (!response.ok) {
          let message = 'Login failed';
          try {
            const contentType = response.headers.get('content-type') ?? '';
            if (contentType.includes('application/json')) {
              const data = await response.json();
              message =
                data?.message ||
                data?.detail ||
                data?.error ||
                data?.errors?.[0]?.message ||
                message;
            } else {
              const text = await response.text();
              if (text) message = text;
            }
          } catch {
            // ignore parse errors
          }
          const error = new Error(message) as Error & { status?: number };
          error.status = response.status;
          throw error;
        }

        return (await response.json()) as { access_token: string; role?: string };
      };

      const data = await requestLogin({ username_or_email: login, password });

      setSession({ accessToken: data.access_token, role: data.role });
      const next = searchParams.get('next');
      const safeNext = next && next.startsWith('/') && !next.startsWith('//') ? next : null;
      router.push(safeNext ?? '/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-12">
      <div className="absolute right-4 top-4">
        <div className="flex items-center gap-2">
          <LanguageToggle variant="outline" />
          <ThemeToggle variant="outline" />
        </div>
      </div>
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Link href="/" aria-label="Go to homepage" className="hover:opacity-90 transition-opacity">
            <Image
              src="/logo.svg"
              alt="CRAI DB"
              width={120}
              height={120}
              priority
            />
          </Link>
        </div>

        <Card className="border border-border">
          <CardHeader className="space-y-2 text-center">
            <CardTitle className="text-2xl">{t("auth.welcome_back")}</CardTitle>
            <CardDescription>
              {t("auth.sign_in_desc")}
            </CardDescription>
          </CardHeader>

          <CardContent>
            {error && (
              <Alert variant="destructive" className="mb-6">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="login">{t("auth.username_or_email")}</Label>
                <Input
                  id="login"
                  type="text"
                  placeholder={t("auth.username_or_email_ph")}
                  value={login}
                  onChange={(e) => setLogin(e.target.value)}
                  disabled={isLoading}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">{t("auth.password")}</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                  required
                />
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {t("auth.signing_in")}
                  </>
                ) : (
                  t("auth.sign_in")
                )}
              </Button>
            </form>

            <div className="mt-6 text-center text-sm text-muted-foreground">
              {t("auth.no_account") + " "}
              <Link href="/auth/register" className="text-accent hover:underline font-medium">
                {t("auth.sign_up")}
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
