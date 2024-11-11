import React from 'react';
import { Card } from '@/components/ui/card';
import { CheckCircle, XCircle } from 'lucide-react';

interface TestResult {
  name: string;
  value: number;
  unit: string;
  status: 'pass' | 'fail';
}

interface TestSummaryProps {
  results: TestResult[];
}

const TestSummary = ({ results }: TestSummaryProps) => {
  return (
    <Card className="p-4">
      <h3 className="text-lg font-semibold mb-4">Test Results</h3>
      <div className="space-y-3">
        {results.map((result, index) => (
          <div key={index} className="flex items-center justify-between p-2 bg-muted/50 rounded-md">
            <div className="flex items-center gap-2">
              {result.status === 'pass' ? (
                <CheckCircle className="h-5 w-5 text-gauge-good" />
              ) : (
                <XCircle className="h-5 w-5 text-gauge-danger" />
              )}
              <span className="font-medium">{result.name}</span>
            </div>
            <span className="text-sm">
              {result.value} {result.unit}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default TestSummary;