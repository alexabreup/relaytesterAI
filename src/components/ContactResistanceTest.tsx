import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

interface ContactResistanceProps {
  type: 'NC' | 'NO';
  resistance: number;
  status: 'idle' | 'testing' | 'pass' | 'fail';
  onTest: () => void;
}

const ContactResistanceTest = ({ type, resistance, status, onTest }: ContactResistanceProps) => {
  const { toast } = useToast();

  const getStatusColor = () => {
    switch (status) {
      case 'pass':
        return 'bg-gauge-good';
      case 'fail':
        return 'bg-gauge-danger';
      case 'testing':
        return 'bg-gauge-warning';
      default:
        return 'bg-muted';
    }
  };

  const handleTest = () => {
    onTest();
    toast({
      title: `${type} Contact Test Started`,
      description: `Testing ${type} contact resistance...`,
    });
  };

  return (
    <Card className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">{type} Contact Test</h3>
        <Badge className={getStatusColor()}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </Badge>
      </div>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span>Resistance:</span>
          <span className="font-mono">{resistance.toFixed(2)} Ω</span>
        </div>
        <Button 
          onClick={handleTest}
          disabled={status === 'testing'}
          className="w-full"
        >
          Test {type} Contact
        </Button>
      </div>
    </Card>
  );
};

export default ContactResistanceTest;