import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, Pause, RotateCcw } from 'lucide-react';

interface TestControlsProps {
  onStart: () => void;
  onStop: () => void;
  onReset: () => void;
  isRunning: boolean;
}

const TestControls = ({ onStart, onStop, onReset, isRunning }: TestControlsProps) => {
  return (
    <Card className="p-4">
      <h3 className="text-lg font-semibold mb-4">Test Controls</h3>
      <div className="flex gap-4">
        {!isRunning ? (
          <Button onClick={onStart} className="flex-1 bg-electric hover:bg-electric-dark">
            <Play className="mr-2 h-4 w-4" />
            Start Test
          </Button>
        ) : (
          <Button onClick={onStop} variant="destructive" className="flex-1">
            <Pause className="mr-2 h-4 w-4" />
            Stop Test
          </Button>
        )}
        <Button onClick={onReset} variant="outline" className="flex-1">
          <RotateCcw className="mr-2 h-4 w-4" />
          Reset
        </Button>
      </div>
    </Card>
  );
};

export default TestControls;