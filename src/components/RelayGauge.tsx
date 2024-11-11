import React from 'react';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface RelayGaugeProps {
  value: number;
  max: number;
  title: string;
  unit: string;
}

const RelayGauge = ({ value, max, title, unit }: RelayGaugeProps) => {
  const percentage = (value / max) * 100;
  const getColor = (percent: number) => {
    if (percent > 80) return 'bg-gauge-danger';
    if (percent > 60) return 'bg-gauge-warning';
    return 'bg-gauge-good';
  };

  return (
    <Card className="p-4">
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <div className="relative pt-1">
        <Progress
          value={percentage}
          className={`h-4 rounded-full ${getColor(percentage)}`}
        />
        <div className="flex justify-between mt-2">
          <span className="text-sm font-medium">{value} {unit}</span>
          <span className="text-sm text-muted-foreground">{max} {unit}</span>
        </div>
      </div>
    </Card>
  );
};

export default RelayGauge;