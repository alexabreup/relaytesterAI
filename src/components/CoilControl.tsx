import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Zap, ZapOff } from 'lucide-react';

interface CoilControlProps {
  isEnergized: boolean;
  onToggle: () => void;
  voltage: number;
  current: number;
}

const CoilControl = ({ isEnergized, onToggle, voltage, current }: CoilControlProps) => {
  return (
    <Card className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Coil Control</h3>
        <Badge className={isEnergized ? 'bg-gauge-good' : 'bg-muted'}>
          {isEnergized ? 'Energized' : 'De-energized'}
        </Badge>
      </div>
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <span className="text-sm text-muted-foreground">Voltage</span>
            <p className="font-mono">{voltage.toFixed(1)} V</p>
          </div>
          <div>
            <span className="text-sm text-muted-foreground">Current</span>
            <p className="font-mono">{current.toFixed(2)} A</p>
          </div>
        </div>
        <Button 
          onClick={onToggle}
          className="w-full"
          variant={isEnergized ? "destructive" : "default"}
        >
          {isEnergized ? (
            <>
              <ZapOff className="mr-2 h-4 w-4" />
              De-energize Coil
            </>
          ) : (
            <>
              <Zap className="mr-2 h-4 w-4" />
              Energize Coil
            </>
          )}
        </Button>
      </div>
    </Card>
  );
};

export default CoilControl;