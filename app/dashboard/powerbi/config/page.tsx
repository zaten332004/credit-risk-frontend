'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

export default function PowerBIConfigPage() {
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
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
        },
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
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
        },
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
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Power BI Integration</h1>
        <p className="text-muted-foreground mt-2">
          Configure and manage Power BI workspace connection
        </p>
      </div>

      {isConnected && (
        <Alert>
          <CheckCircle className="h-4 w-4 text-green-500" />
          <AlertDescription className="text-green-700">
            Successfully connected to Power BI workspace
          </AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Configuration</CardTitle>
              <CardDescription>
                Enter your Power BI credentials to establish connection
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="tenantId">Tenant ID</Label>
                <Input
                  id="tenantId"
                  placeholder="Your Azure Tenant ID"
                  value={config.tenantId}
                  onChange={(e) => setConfig({ ...config, tenantId: e.target.value })}
                  disabled={isConnected}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="clientId">Client ID</Label>
                <Input
                  id="clientId"
                  placeholder="Application (client) ID"
                  value={config.clientId}
                  onChange={(e) => setConfig({ ...config, clientId: e.target.value })}
                  disabled={isConnected}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="clientSecret">Client Secret</Label>
                <Input
                  id="clientSecret"
                  type="password"
                  placeholder="Client secret value"
                  value={config.clientSecret}
                  onChange={(e) => setConfig({ ...config, clientSecret: e.target.value })}
                  disabled={isConnected}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="workspaceId">Workspace ID</Label>
                <Input
                  id="workspaceId"
                  placeholder="Power BI Workspace ID"
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
                          Connecting...
                        </>
                      ) : (
                        'Connect Power BI'
                      )}
                    </Button>
                  </>
                ) : (
                  <>
                    <Button variant="outline" onClick={() => setIsConnected(false)} className="flex-1">
                      Disconnect
                    </Button>
                    <Button onClick={handleTestConnection} disabled={isLoading} className="flex-1">
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Testing...
                        </>
                      ) : (
                        'Test Connection'
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
              <CardTitle className="text-base">Connection Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Status</p>
                <Badge className="mt-2" variant={isConnected ? 'secondary' : 'outline'}>
                  {isConnected ? 'Connected' : 'Not Connected'}
                </Badge>
              </div>

              {isConnected && (
                <>
                  <div>
                    <p className="text-sm text-muted-foreground">Workspace</p>
                    <p className="font-medium mt-2">{config.workspaceId || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Last Synced</p>
                    <p className="font-medium mt-2">Today, 10:30 AM</p>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Quick Links</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start" disabled={!isConnected}>
                View Workspaces
              </Button>
              <Button variant="outline" className="w-full justify-start" disabled={!isConnected}>
                View Datasets
              </Button>
              <Button variant="outline" className="w-full justify-start" disabled={!isConnected}>
                View Reports
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
