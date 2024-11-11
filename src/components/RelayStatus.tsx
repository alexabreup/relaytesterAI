import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, AlertCircle } from 'lucide-react';

interface RelayStatusProps {
  name: string;
  status: 'ok' | 'error' | 'warning';
  lastChecked: string;
}

const RelayStatus = ({ name, status, lastChecked }: RelayStatusProps) => {
  const getStatusIcon = () => {
    switch (status) {
      case 'ok':
        return <CheckCircle className="h-5 w-5 text-gauge-good" />;
      case 'error':
        return <XCircle className="h-5 w-5 text-gauge-danger" />;
      case 'warning':
        return <AlertCircle className="h-5 w-5 text-gauge-warning" />;
    }
  };

  const getStatusBadge = () => {
    switch (status) {
      case 'ok':
        return <Badge className="bg-gauge-good">Operational</Badge>;
      case 'error':
        return <Badge className="bg-gauge-danger">Failed</Badge>;
      case 'warning':
        return <Badge className="bg-gauge-warning">Warning</Badge>;
    }
  };

  return (
    <Card className="p-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        {getStatusIcon()}
        <div>
          <h4 className="font-medium">{name}</h4>
          <p className="text-sm text-muted-foreground">Last checked: {lastChecked}</p>
        </div>
      </div>
      {getStatusBadge()}
    </Card>
  );
};

export default RelayStatus;