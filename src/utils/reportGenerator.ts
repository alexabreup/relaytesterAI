import jsPDF from 'jspdf';
import { unparse } from 'papaparse';

interface TestResult {
  name: string;
  value: number;
  unit: string;
  status: 'pass' | 'fail';
}

export const generatePDF = (results: TestResult[]) => {
  const doc = new jsPDF();
  
  doc.setFontSize(16);
  doc.text('Relay Test Report', 20, 20);
  
  doc.setFontSize(12);
  doc.text(`Date: ${new Date().toLocaleString()}`, 20, 30);
  
  let yPosition = 40;
  results.forEach((result, index) => {
    doc.text(`${result.name}: ${result.value} ${result.unit} - ${result.status.toUpperCase()}`, 20, yPosition);
    yPosition += 10;
  });
  
  return doc.output('blob');
};

export const generateCSV = (results: TestResult[]) => {
  const csv = unparse(results);
  return new Blob([csv], { type: 'text/csv;charset=utf-8;' });
};

export const sendReport = async (results: TestResult[]) => {
  const pdfBlob = generatePDF(results);
  const csvBlob = generateCSV(results);
  
  const formData = new FormData();
  formData.append('pdf', pdfBlob, 'relay-test-report.pdf');
  formData.append('csv', csvBlob, 'relay-test-report.csv');
  formData.append('email', 'alxabreuper@gmail.com');
  
  try {
    const response = await fetch('/api/send-report', {
      method: 'POST',
      body: formData,
    });
    
    if (!response.ok) {
      throw new Error('Failed to send report');
    }
    
    return true;
  } catch (error) {
    console.error('Error sending report:', error);
    throw error;
  }
};