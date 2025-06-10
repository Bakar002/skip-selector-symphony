
import { CheckCircle } from 'lucide-react';

interface Step {
  id: number;
  name: string;
  completed: boolean;
  current: boolean;
}

const steps: Step[] = [
  { id: 1, name: 'Postcode', completed: true, current: false },
  { id: 2, name: 'Waste Type', completed: true, current: false },
  { id: 3, name: 'Select Skip', completed: false, current: true },
  { id: 4, name: 'Permit Check', completed: false, current: false },
  { id: 5, name: 'Choose Date', completed: false, current: false },
  { id: 6, name: 'Payment', completed: false, current: false },
];

export const ProgressStepper = () => {
  return (
    <div className="w-full bg-card border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <nav aria-label="Progress">
          <ol className="flex items-center justify-between">
            {steps.map((step, stepIdx) => (
              <li key={step.id} className="relative flex-1">
                <div className="flex items-center">
                  <div className="flex items-center">
                    {step.completed ? (
                      <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                        <CheckCircle className="w-5 h-5 text-white" />
                      </div>
                    ) : step.current ? (
                      <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-medium">{step.id}</span>
                      </div>
                    ) : (
                      <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center border border-border">
                        <span className="text-muted-foreground text-sm font-medium">{step.id}</span>
                      </div>
                    )}
                    <span 
                      className={`ml-3 text-sm font-medium hidden sm:block ${
                        step.current 
                          ? 'text-blue-600' 
                          : step.completed 
                            ? 'text-foreground' 
                            : 'text-muted-foreground'
                      }`}
                    >
                      {step.name}
                    </span>
                  </div>
                  {stepIdx < steps.length - 1 && (
                    <div className="flex-1 ml-4 mr-4">
                      <div 
                        className={`h-0.5 ${
                          step.completed ? 'bg-blue-600' : 'bg-border'
                        }`} 
                      />
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </nav>
      </div>
    </div>
  );
};
