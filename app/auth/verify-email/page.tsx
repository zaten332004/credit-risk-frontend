'use client';

import { Suspense, useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, CheckCircle, Loader2 } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import Image from 'next/image';

function VerifyEmailContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = searchParams.get('token');
    if (token && !isVerified) {
      verifyEmail(token);
    }
  }, [searchParams, isVerified]);

  const verifyEmail = async (token: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/v1/auth/register/verify-email?token=${token}`);

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Email verification failed');
      }

      setIsVerified(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Image
            src="/logo.png"
            alt="CRAI DB"
            width={120}
            height={120}
            priority
          />
        </div>

        <Card className="border border-border">
          <CardHeader className="space-y-2 text-center">
            {isVerified ? (
              <>
                <div className="flex justify-center mb-4">
                  <CheckCircle className="h-12 w-12 text-green-500" />
                </div>
                <CardTitle className="text-2xl">Email Verified</CardTitle>
                <CardDescription>
                  Your email has been successfully verified
                </CardDescription>
              </>
            ) : isLoading ? (
              <>
                <div className="flex justify-center mb-4">
                  <Loader2 className="h-12 w-12 text-accent animate-spin" />
                </div>
                <CardTitle className="text-2xl">Verifying Email</CardTitle>
                <CardDescription>
                  Please wait while we verify your email address
                </CardDescription>
              </>
            ) : (
              <>
                <CardTitle className="text-2xl">Verify Your Email</CardTitle>
                <CardDescription>
                  Check your email for a verification link
                </CardDescription>
              </>
            )}
          </CardHeader>

          <CardContent>
            {error && (
              <Alert variant="destructive" className="mb-6">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {isVerified && (
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground text-center">
                  Your account is now active. You can proceed to sign in.
                </p>
                <Link href="/auth/login" className="block">
                  <Button type="button" className="w-full">
                    Go to Sign In
                  </Button>
                </Link>
              </div>
            )}

            {!isVerified && !isLoading && !error && (
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  We've sent a verification link to your email address. Click the link in the email to verify your account.
                </p>
                <p className="text-sm text-muted-foreground">
                  If you don't see the email, check your spam folder.
                </p>
              </div>
            )}

            {!isVerified && (
              <div className="mt-6 text-center text-sm text-muted-foreground">
                <Link href="/auth/login" className="text-accent hover:underline font-medium">
                  Back to sign in
                </Link>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="h-8 w-8 text-accent animate-spin mx-auto mb-4" />
            <p className="text-muted-foreground">Loading...</p>
          </div>
        </div>
      }
    >
      <VerifyEmailContent />
    </Suspense>
  );
}
