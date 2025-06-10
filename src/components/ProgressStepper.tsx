
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import { useLocation } from 'react-router-dom';

interface Step {
  id: number;
  name: string;
  path: string;
  completed: boolean;
  current: boolean;
}

const stepPaths = {
  '/': 1,
  '/waste-type': 2,
  '/skip-selection': 3,
  '/permit-check': 4,
  '/date-selection': 5,
  '/payment': 6
};

export const ProgressStepper = () => {
  const location = useLocation();
  const currentStepId = stepPaths[location.pathname as keyof typeof stepPaths] || 1;

  const steps: Step[] = [
    { id: 1, name: 'Postcode', path: '/', completed: currentStepId > 1, current: currentStepId === 1 },
    { id: 2, name: 'Waste Type', path: '/waste-type', completed: currentStepId > 2, current: currentStepId === 2 },
    { id: 3, name: 'Select Skip', path: '/skip-selection', completed: currentStepId > 3, current: currentStepId === 3 },
    { id: 4, name: 'Permit Check', path: '/permit-check', completed: currentStepId > 4, current: currentStepId === 4 },
    { id: 5, name: 'Choose Date', path: '/date-selection', completed: currentStepId > 5, current: currentStepId === 5 },
    { id: 6, name: 'Payment', path: '/payment', completed: false, current: currentStepId === 6 },
  ];

  return (
    <div className="w-full bg-card border-b border-border/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <nav aria-label="Progress">
          <ol className="flex items-center justify-between">
            {steps.map((step, stepIdx) => (
              <motion.li 
                key={step.id} 
                className="relative flex-1"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: stepIdx * 0.1 }}
              >
                <div className="flex items-center">
                  <div className="flex items-center">
                    {step.completed ? (
                      <motion.div 
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.3 }}
                        className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center shadow-md"
                      >
                        <CheckCircle className="w-5 h-5 text-white" />
                      </motion.div>
                    ) : step.current ? (
                      <motion.div 
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.3 }}
                        className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-md"
                      >
                        <span className="text-white text-sm font-medium">{step.id}</span>
                      </motion.div>
                    ) : (
                      <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center border border-border shadow-sm">
                        <span className="text-muted-foreground text-sm font-medium">{step.id}</span>
                      </div>
                    )}
                    <span 
                      className={`ml-3 text-sm font-medium hidden sm:block transition-colors duration-300 ${
                        step.current 
                          ? 'text-blue-600' 
                          : step.completed 
                            ? 'text-green-600' 
                            : 'text-muted-foreground'
                      }`}
                    >
                      {step.name}
                    </span>
                  </div>
                  {stepIdx < steps.length - 1 && (
                    <div className="flex-1 ml-4 mr-4">
                      <motion.div 
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 0.5, delay: stepIdx * 0.1 }}
                        className={`h-0.5 transition-colors duration-500 ${
                          step.completed ? 'bg-gradient-to-r from-green-500 to-emerald-600' : 'bg-border'
                        }`} 
                      />
                    </div>
                  )}
                </div>
              </motion.li>
            ))}
          </ol>
        </nav>
      </div>
    </div>
  );
};
