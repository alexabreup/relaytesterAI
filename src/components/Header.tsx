import React from 'react';
import { Button } from '@/components/ui/button';
import { Send } from 'lucide-react';

interface HeaderProps {
  onSendReport: () => void;
}

const Header = ({ onSendReport }: HeaderProps) => {
  return (
    <header className="fixed top-0 left-0 right-0 bg-background border-b z-50">
      <div className="container mx-auto py-4 px-6 flex justify-between items-center">

          <img
            src="/relaytester-logo.svg"
            alt="Relay Test Station Logo"
            className="h-8 w-auto sm:h-12 md:h-16"
          />
        <Button 
          onClick={onSendReport}
          className="bg-electric hover:bg-electric-dark"
        >
          <Send className="mr-2 h-4 w-4" />
          Envie o Relatório
        </Button>
      </div>
    </header>
  );
};

export default Header;