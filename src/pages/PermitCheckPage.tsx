
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, AlertTriangle, CheckCircle } from 'lucide-react';
import { PageLayout } from '@/components/layout/PageLayout';
import { AnimatedCard } from '@/components/common/AnimatedCard';
import { NavigationButtons } from '@/components/navigation/NavigationButtons';
import { CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const PermitCheckPage = () => {
  const [permitOption, setPermitOption] = useState<'private' | 'public' | ''>('');

  const handleNext = () => {
    console.log('Permit option:', permitOption);
  };

  return (
    <PageLayout
      title="Do you need a permit?"
      subtitle="Let us know where the skip will be placed to check permit requirements"
    >
      <div className="max-w-2xl mx-auto space-y-6">
        <AnimatedCard>
          <CardContent 
            className={`p-6 cursor-pointer transition-all duration-300 ${
              permitOption === 'private' 
                ? 'ring-2 ring-green-500 bg-green-50/50' 
                : 'hover:bg-muted/30'
            }`}
            onClick={() => setPermitOption('private')}
          >
            <div className="flex items-center space-x-4">
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center"
              >
                <CheckCircle className="w-6 h-6 text-white" />
              </motion.div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-foreground">Private Property</h3>
                <p className="text-muted-foreground">Skip will be placed on your driveway or private land</p>
                <p className="text-sm text-green-600 font-medium mt-1">No permit required</p>
              </div>
            </div>
          </CardContent>
        </AnimatedCard>

        <AnimatedCard delay={0.1}>
          <CardContent 
            className={`p-6 cursor-pointer transition-all duration-300 ${
              permitOption === 'public' 
                ? 'ring-2 ring-orange-500 bg-orange-50/50' 
                : 'hover:bg-muted/30'
            }`}
            onClick={() => setPermitOption('public')}
          >
            <div className="flex items-center space-x-4">
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center"
              >
                <AlertTriangle className="w-6 h-6 text-white" />
              </motion.div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-foreground">Public Road/Pavement</h3>
                <p className="text-muted-foreground">Skip will be placed on a public road or pavement</p>
                <p className="text-sm text-orange-600 font-medium mt-1">Council permit required (+£30)</p>
              </div>
            </div>
          </CardContent>
        </AnimatedCard>

        {permitOption === 'public' && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            transition={{ duration: 0.3 }}
            className="bg-orange-50 border border-orange-200 rounded-lg p-4"
          >
            <div className="flex items-start space-x-3">
              <Shield className="w-5 h-5 text-orange-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-orange-800">Permit Information</h4>
                <p className="text-sm text-orange-700 mt-1">
                  We'll handle the permit application with your local council. This typically takes 3-5 working days 
                  and costs £30 which will be added to your total.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      <NavigationButtons
        backPath="/skip-selection"
        nextPath="/date-selection"
        nextDisabled={!permitOption}
        onNext={handleNext}
      />
    </PageLayout>
  );
};

export default PermitCheckPage;
