'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { authHeaders, authJsonHeaders } from '@/lib/auth/token';
import { useI18n } from '@/components/i18n-provider';

export default function PowerBIConfigPage() {
  const { t } = useI18n();
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [config, setConfig] = useState({
    workspaceId: '',
    clientId: '',
    clientSecret: '',
    tenantId: '',
  });

  const handleConnect = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/v1/powerbi/configure', {
        method: 'POST',
        headers: authJsonHeaders(),
        body: JSON.stringify(config),
      });

      if (response.ok) {
        setIsConnected(true);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTestConnection = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/v1/powerbi/test-connection', {
        method: 'GET',
        headers: authHeaders(),
      });

      if (response.ok) {
        setIsConnected(true);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-8 p-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">{t('powerbi.title')}</h1>
        <p className="text-muted-foreground mt-2">
          {t('powerbi.desc')}
        </p>
      </div>

      {isConnected && (
        <Alert>
          <CheckCircle className="h-4 w-4 text-green-500" />
          <AlertDescription className="text-green-700">
            {t('powerbi.connected')}
          </AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>{t('powerbi.config_title')}</CardTitle>
              <CardDescription>
                {t('powerbi.config_desc')}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="tenantId">{t('powerbi.tenant_id')}</Label>
                <Input
                  id="tenantId"
                  placeholder={t('powerbi.tenant_id_ph')}
                  value={config.tenantId}
                  onChange={(e) => setConfig({ ...config, tenantId: e.target.value })}
                  disabled={isConnected}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="clientId">{t('powerbi.client_id')}</Label>
                <Input
                  id="clientId"
                  placeholder={t('powerbi.client_id_ph')}
                  value={config.clientId}
                  onChange={(e) => setConfig({ ...config, clientId: e.target.value })}
                  disabled={isConnected}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="clientSecret">{t('powerbi.client_secret')}</Label>
                <Input
                  id="clientSecret"
                  type="password"
                  placeholder={t('powerbi.client_secret_ph')}
                  value={config.clientSecret}
                  onChange={(e) => setConfig({ ...config, clientSecret: e.target.value })}
                  disabled={isConnected}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="workspaceId">{t('powerbi.workspace_id')}</Label>
                <Input
                  id="workspaceId"
                  placeholder={t('powerbi.workspace_id_ph')}
                  value={config.workspaceId}
                  onChange={(e) => setConfig({ ...config, workspaceId: e.target.value })}
                  disabled={isConnected}
                />
              </div>

              <div className="flex gap-2 pt-4">
                {!isConnected ? (
                  <>
                    <Button onClick={handleConnect} disabled={isLoading} className="flex-1">
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          {t('common.connecting')}
                        </>
                      ) : (
                        t('powerbi.connect')
                      )}
                    </Button>
                  </>
                ) : (
                  <>
                    <Button variant="outline" onClick={() => setIsConnected(false)} className="flex-1">
                      {t('common.disconnect')}
                    </Button>
                    <Button onClick={handleTestConnection} disabled={isLoading} className="flex-1">
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          {t('common.testing')}
                        </>
                      ) : (
                        t('powerbi.test_connection')
                      )}
                    </Button>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">{t('powerbi.status_title')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">{t('common.status')}</p>
                <Badge className="mt-2" variant={isConnected ? 'secondary' : 'outline'}>
                  {isConnected ? t('common.connected') : t('common.not_connected')}
                </Badge>
              </div>

              {isConnected && (
                <>
                  <div>
                    <p className="text-sm text-muted-foreground">{t('powerbi.workspace')}</p>
                    <p className="font-medium mt-2">{config.workspaceId || t('common.na')}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{t('powerbi.last_synced')}</p>
                    <p className="font-medium mt-2">{t('powerbi.last_synced_value')}</p>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">{t('common.quick_links')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start" disabled={!isConnected}>
                {t('powerbi.view_workspaces')}
              </Button>
              <Button variant="outline" className="w-full justify-start" disabled={!isConnected}>
                {t('powerbi.view_datasets')}
              </Button>
              <Button variant="outline" className="w-full justify-start" disabled={!isConnected}>
                {t('powerbi.view_reports')}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
