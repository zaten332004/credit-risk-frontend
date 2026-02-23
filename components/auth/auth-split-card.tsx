'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ThemeToggle } from '@/components/theme-toggle';
import { LanguageToggle } from '@/components/language-toggle';
import { AlertCircle, Loader2 } from 'lucide-react';
import { setSession } from '@/lib/auth/token';
import { cn } from '@/lib/utils';
import { useI18n } from '@/components/i18n-provider';

type Mode = 'login' | 'register';

function toMode(value: string | null | undefined): Mode | null {
  if (!value) return null;
  const v = String(value).trim().toLowerCase();
  if (v === 'login' || v === 'register') return v;
  return null;
}

export function AuthSplitCard() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { t } = useI18n();

  const nextParam = searchParams.get('next');
  const safeNext = nextParam && nextParam.startsWith('/') && !nextParam.startsWith('//') ? nextParam : null;

  const initialMode = useMemo(() => toMode(searchParams.get('mode')) ?? 'login', [searchParams]);
  const [mode, setMode] = useState<Mode>(initialMode);

  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);

  const [regData, setRegData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    registrationType: 'analyst',
  });
  const [regError, setRegError] = useState('');
  const [regLoading, setRegLoading] = useState(false);

  useEffect(() => {
    const qpMode = toMode(searchParams.get('mode')) ?? 'login';
    setMode(qpMode);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const replaceMode = (nextMode: Mode) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('mode', nextMode);
    if (safeNext) params.set('next', safeNext);
    router.replace(`/auth?${params.toString()}`);
  };

  const isLogin = mode === 'login';
  const overlayCta = isLogin ? t('auth.sign_up') : t('auth.sign_in');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setLoginLoading(true);
    try {
      const response = await fetch('/api/v1/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          accept: 'application/json',
        },
        body: JSON.stringify({ username_or_email: login, password }),
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
        throw new Error(message);
      }

      const data = (await response.json()) as { access_token: string; role?: string };
      setSession({ accessToken: data.access_token, role: data.role });
      router.push(safeNext ?? '/dashboard');
    } catch (err) {
      setLoginError(err instanceof Error ? err.message : t('common.error'));
    } finally {
      setLoginLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setRegError('');

    if (regData.password !== regData.confirmPassword) {
      setRegError(t('auth.passwords_no_match'));
      return;
    }

    setRegLoading(true);
    try {
      const response = await fetch('/api/v1/auth/register/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: regData.email,
          password: regData.password,
          name: regData.name,
          reg_type: regData.registrationType,
        }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data?.message || t('auth.register_failed'));
      }

      router.push('/auth/verify-email');
    } catch (err) {
      setRegError(err instanceof Error ? err.message : t('common.error'));
    } finally {
      setRegLoading(false);
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

      <div className="w-full max-w-5xl">
        <div className="flex justify-center mb-8">
          <Link href="/" aria-label="Go to homepage" className="hover:opacity-90 transition-opacity">
            <Image src="/logo.svg" alt="CRAI DB" width={120} height={120} priority />
          </Link>
        </div>

        <Card className="relative overflow-hidden rounded-3xl border border-border/60 bg-card/60 backdrop-blur">
          <div className="relative h-[580px]">
            {/* Forms */}
            <div className="absolute inset-0 grid grid-cols-1 md:grid-cols-2">
              {/* Register */}
              <div className={cn('p-8 md:p-10 flex flex-col justify-center', isLogin && 'pointer-events-none')}>
                <div
                  className={cn(
                    'transition-[transform,opacity,filter] duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none',
                    isLogin
                      ? 'opacity-0 -translate-x-16 scale-[0.98] blur-md'
                      : 'opacity-100 translate-x-0 scale-100 blur-0',
                  )}
                >
                  <h2 className="text-3xl font-semibold tracking-tight">{t('auth.create_account')}</h2>
                  <p className="text-muted-foreground mt-2">{t('auth.register_desc')}</p>

                  {regError && (
                    <Alert variant="destructive" className="mt-6">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>{regError}</AlertDescription>
                    </Alert>
                  )}

                  <form onSubmit={handleRegister} className="mt-6 space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="reg-name">{t('auth.full_name')}</Label>
                      <Input
                        id="reg-name"
                        value={regData.name}
                        onChange={(e) => setRegData((p) => ({ ...p, name: e.target.value }))}
                        disabled={regLoading}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="reg-email">Email</Label>
                      <Input
                        id="reg-email"
                        type="email"
                        placeholder={t('common.email_ph')}
                        value={regData.email}
                        onChange={(e) => setRegData((p) => ({ ...p, email: e.target.value }))}
                        disabled={regLoading}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="reg-type">{t('auth.registration_type')}</Label>
                      <Select
                        value={regData.registrationType}
                        onValueChange={(v) => setRegData((p) => ({ ...p, registrationType: v }))}
                      >
                        <SelectTrigger id="reg-type">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="analyst">{t('auth.analyst')}</SelectItem>
                          <SelectItem value="manager">{t('auth.manager')}</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="reg-password">{t('auth.password')}</Label>
                      <Input
                        id="reg-password"
                        type="password"
                        value={regData.password}
                        onChange={(e) => setRegData((p) => ({ ...p, password: e.target.value }))}
                        disabled={regLoading}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="reg-confirm">{t('auth.confirm_password')}</Label>
                      <Input
                        id="reg-confirm"
                        type="password"
                        value={regData.confirmPassword}
                        onChange={(e) => setRegData((p) => ({ ...p, confirmPassword: e.target.value }))}
                        disabled={regLoading}
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full" disabled={regLoading}>
                      {regLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          {t('auth.creating_account')}
                        </>
                      ) : (
                        t('auth.sign_up')
                      )}
                    </Button>
                  </form>
                </div>
              </div>

              {/* Login */}
              <div className={cn('p-8 md:p-10 flex flex-col justify-center', !isLogin && 'pointer-events-none')}>
                <div
                  className={cn(
                    'transition-[transform,opacity,filter] duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none',
                    isLogin
                      ? 'opacity-100 translate-x-0 scale-100 blur-0'
                      : 'opacity-0 translate-x-16 scale-[0.98] blur-md',
                  )}
                >
                  <h2 className="text-3xl font-semibold tracking-tight">{t('auth.welcome_back')}</h2>
                  <p className="text-muted-foreground mt-2">{t('auth.sign_in_desc')}</p>

                  {loginError && (
                    <Alert variant="destructive" className="mt-6">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>{loginError}</AlertDescription>
                    </Alert>
                  )}

                  <form onSubmit={handleLogin} className="mt-6 space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="login-id">{t('auth.username_or_email')}</Label>
                      <Input
                        id="login-id"
                        type="text"
                        placeholder={t('auth.username_or_email_ph')}
                        value={login}
                        onChange={(e) => setLogin(e.target.value)}
                        disabled={loginLoading}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="login-password">{t('auth.password')}</Label>
                      <Input
                        id="login-password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        disabled={loginLoading}
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full" disabled={loginLoading}>
                      {loginLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          {t('auth.signing_in')}
                        </>
                      ) : (
                        t('auth.sign_in')
                      )}
                    </Button>
                  </form>
                </div>
              </div>
            </div>

            {/* Sliding overlay */}
            <div
              className={cn(
                'absolute inset-y-0 left-0 w-full md:w-1/2 p-8 md:p-10',
                'transition-[transform] duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform motion-reduce:transition-none',
                isLogin ? 'translate-x-0' : 'md:translate-x-full',
              )}
            >
              <div
                className={cn(
                  'relative h-full w-full overflow-hidden',
                  'rounded-3xl md:rounded-3xl',
                  'bg-gradient-to-br from-violet-600/90 via-indigo-600/80 to-sky-600/80',
                  'shadow-[0_50px_140px_rgba(79,70,229,0.45)]',
                  'transition-[border-radius,filter,box-shadow] duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none',
                  isLogin ? 'md:rounded-r-[6rem]' : 'md:rounded-l-[6rem]',
                )}
              >
                <div
                  className={cn(
                    'pointer-events-none absolute -inset-24 opacity-70 blur-3xl',
                    'bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.35),rgba(255,255,255,0)_55%)]',
                    'transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none',
                    isLogin ? '-translate-x-10' : 'translate-x-10',
                  )}
                  aria-hidden="true"
                />

                <div className="relative h-full w-full flex flex-col items-center justify-center text-center px-8">
                  <div className="relative min-h-[120px] w-full max-w-sm">
                    <div
                      className={cn(
                        'absolute inset-0 transition-[transform,opacity,filter] duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none',
                        isLogin ? 'opacity-100 translate-x-0 blur-0' : 'opacity-0 -translate-x-10 blur-md',
                      )}
                    >
                      <h3 className="text-3xl font-semibold tracking-tight text-white">{t('auth.overlay.hello')}</h3>
                      <p className="text-white/80 mt-3">{t('auth.overlay.no_account')}</p>
                    </div>

                    <div
                      className={cn(
                        'absolute inset-0 transition-[transform,opacity,filter] duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none',
                        isLogin ? 'opacity-0 translate-x-10 blur-md' : 'opacity-100 translate-x-0 blur-0',
                      )}
                    >
                      <h3 className="text-3xl font-semibold tracking-tight text-white">{t('auth.overlay.welcome_back')}</h3>
                      <p className="text-white/80 mt-3">{t('auth.overlay.have_account')}</p>
                    </div>
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    className={cn(
                      'mt-6 border-white/30 bg-white/10 text-white hover:bg-white/20 rounded-full px-8',
                      'transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_40px_rgba(0,0,0,0.25)]',
                      'focus-visible:ring-2 focus-visible:ring-white/50',
                    )}
                    onClick={() => replaceMode(isLogin ? 'register' : 'login')}
                  >
                    {overlayCta}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
