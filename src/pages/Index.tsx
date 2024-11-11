import React, { useState, useEffect } from 'react';
import { sendReport } from '@/utils/reportGenerator';
import { useToast } from '@/components/ui/use-toast';
import RelayGauge from '@/components/RelayGauge';
import MeasurementGraph from '@/components/MeasurementGraph';
import RelayStatus from '@/components/RelayStatus';
import TestControls from '@/components/TestControls';
import TestSummary from '@/components/TestSummary';
import ContactResistanceTest from '@/components/ContactResistanceTest';
import CoilControl from '@/components/CoilControl';
import Header from '@/components/Header';

const Index = () => {
  const { toast } = useToast();
  const [isRunning, setIsRunning] = useState(false);
  const [isCoilEnergized, setIsCoilEnergized] = useState(false);
  const [currentData, setCurrentData] = useState({
    voltage: 0,
    current: 0,
    resistance: 0,
    power: 0
  });

  const [contactTests, setContactTests] = useState({
    NC: { status: 'idle' as const, resistance: 0 },
    NO: { status: 'idle' as const, resistance: 0 }
  });

  // Simulated data for the graphs
  const [graphData, setGraphData] = useState({
    voltage: [] as { time: string; value: number }[],
    current: [] as { time: string; value: number }[],
    power: [] as { time: string; value: number }[]
  });

  // Simulated test results
  const testResults = [
    { name: "Continuity", value: 0.1, unit: "Ω", status: "pass" as const },
    { name: "Insulation", value: 2000, unit: "MΩ", status: "pass" as const },
    { name: "Contact Resistance", value: 0.5, unit: "Ω", status: "fail" as const }
  ];

  const handleSendReport = async () => {
    try {
      toast({
        title: "Enviando Relatório",
        description: "Aguarde enquanto o relatório está sendo gerado e enviado...",
      });
      
      await sendReport(testResults);
      
      toast({
        title: "Relatório Enviado",
        description: "O relatório foi enviado com sucesso para seu email.",
      });
    } catch (error) {
      toast({
        title: "Erro ao Enviar",
        description: "Não foi possível enviar o relatório. Tente novamente.",
        variant: "destructive",
      });
    }
  };

  const handleCoilToggle = () => {
    setIsCoilEnergized(!isCoilEnergized);
    toast({
      title: !isCoilEnergized ? 'Coil Energized' : 'Coil De-energized',
      description: !isCoilEnergized ? 'Relay coil is now energized' : 'Relay coil is now de-energized'
    });
  };

  const handleContactTest = (type: 'NC' | 'NO') => {
    setContactTests(prev => ({
      ...prev,
      [type]: { ...prev[type], status: 'testing' }
    }));

    // Simulate contact resistance test
    setTimeout(() => {
      const resistance = Math.random() * 0.5 + 0.1;
      const status = resistance < 0.3 ? 'pass' : 'fail';
      
      setContactTests(prev => ({
        ...prev,
        [type]: { resistance, status }
      }));

      toast({
        title: `${type} Contact Test ${status === 'pass' ? 'Passed' : 'Failed'}`,
        description: `Contact resistance: ${resistance.toFixed(2)} Ω`,
        variant: status === 'pass' ? 'default' : 'destructive'
      });
    }, 2000);
  };

  const handleStart = () => {
    setIsRunning(true);
    toast({
      title: "Test Started",
      description: "Monitoring relay parameters..."
    });
  };

  const handleStop = () => {
    setIsRunning(false);
    toast({
      title: "Test Stopped",
      description: "Test sequence has been stopped.",
      variant: "destructive"
    });
  };

  const handleReset = () => {
    setIsRunning(false);
    setCurrentData({ voltage: 0, current: 0, resistance: 0, power: 0 });
    setGraphData({
      voltage: [],
      current: [],
      power: []
    });
    toast({
      title: "Reset Complete",
      description: "All measurements have been reset."
    });
  };

  // Simulate real-time data updates
  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      const now = new Date().toLocaleTimeString();
      
      setCurrentData(prev => ({
        voltage: Math.random() * 240,
        current: Math.random() * 10,
        resistance: Math.random() * 100,
        power: Math.random() * 2400
      }));

      setGraphData(prev => ({
        voltage: [...prev.voltage.slice(-20), { time: now, value: currentData.voltage }],
        current: [...prev.current.slice(-20), { time: now, value: currentData.current }],
        power: [...prev.power.slice(-20), { time: now, value: currentData.power }]
      }));
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, currentData]);

  return (
    <div className="min-h-screen">
      <Header onSendReport={handleSendReport} />
      <main className="container mx-auto py-6 space-y-6 mt-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <RelayGauge value={currentData.voltage} max={240} title="Voltage" unit="V" />
          <RelayGauge value={currentData.current} max={10} title="Current" unit="A" />
          <RelayGauge value={currentData.resistance} max={100} title="Resistance" unit="Ω" />
          <RelayGauge value={currentData.power} max={2400} title="Power" unit="W" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <ContactResistanceTest
            type="NC"
            resistance={contactTests.NC.resistance}
            status={contactTests.NC.status}
            onTest={() => handleContactTest('NC')}
          />
          <CoilControl
            isEnergized={isCoilEnergized}
            onToggle={handleCoilToggle}
            voltage={currentData.voltage}
            current={currentData.current}
          />
          <ContactResistanceTest
            type="NO"
            resistance={contactTests.NO.resistance}
            status={contactTests.NO.status}
            onTest={() => handleContactTest('NO')}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <MeasurementGraph
            data={graphData.voltage}
            title="Voltage Over Time"
            unit="V"
            color="#0066CC"
          />
          <MeasurementGraph
            data={graphData.current}
            title="Current Over Time"
            unit="A"
            color="#22C55E"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <RelayStatus name="Main Relay" status="ok" lastChecked="Just now" />
          <RelayStatus name="Secondary Relay" status="warning" lastChecked="5m ago" />
          <RelayStatus name="Auxiliary Relay" status="error" lastChecked="2m ago" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <TestControls
            onStart={handleStart}
            onStop={handleStop}
            onReset={handleReset}
            isRunning={isRunning}
          />
          <TestSummary results={testResults} />
        </div>
      </main>
    </div>
  );
};

export default Index;
