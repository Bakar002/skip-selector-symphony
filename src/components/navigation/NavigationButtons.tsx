
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface NavigationButtonsProps {
  backPath?: string;
  nextPath?: string;
  onNext?: () => void;
  nextDisabled?: boolean;
  nextLabel?: string;
  backLabel?: string;
  showSummary?: boolean;
  summaryContent?: React.ReactNode;
}

export const NavigationButtons = ({
  backPath,
  nextPath,
  onNext,
  nextDisabled = false,
  nextLabel = "Continue",
  backLabel = "Back",
  showSummary = false,
  summaryContent
}: NavigationButtonsProps) => {
  const navigate = useNavigate();

  const handleNext = () => {
    if (onNext) {
      onNext();
    }
    if (nextPath) {
      navigate(nextPath);
    }
  };

  const handleBack = () => {
    if (backPath) {
      navigate(backPath);
    } else {
      navigate(-1);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="flex justify-between items-center mt-12 pt-8 border-t border-border"
    >
      <Button 
        variant="outline" 
        onClick={handleBack}
        className="gap-2 hover:bg-muted/50 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        {backLabel}
      </Button>
      
      {showSummary && summaryContent && (
        <div className="flex items-center gap-4">
          {summaryContent}
        </div>
      )}
      
      <Button 
        onClick={handleNext}
        disabled={nextDisabled}
        className="gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
      >
        {nextLabel}
        <ArrowRight className="w-4 h-4" />
      </Button>
    </motion.div>
  );
};
