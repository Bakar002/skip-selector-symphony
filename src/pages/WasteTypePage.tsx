
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Home, Building, Hammer, Recycle } from 'lucide-react';
import { PageLayout } from '@/components/layout/PageLayout';
import { AnimatedCard } from '@/components/common/AnimatedCard';
import { NavigationButtons } from '@/components/navigation/NavigationButtons';
import { CardContent } from '@/components/ui/card';

interface WasteType {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

const wasteTypes: WasteType[] = [
  {
    id: 'household',
    name: 'Household Waste',
    description: 'General household items, furniture, garden waste',
    icon: <Home className="w-8 h-8" />,
    color: 'from-green-500 to-emerald-600'
  },
  {
    id: 'commercial',
    name: 'Commercial Waste',
    description: 'Office clearance, retail waste, business materials',
    icon: <Building className="w-8 h-8" />,
    color: 'from-blue-500 to-cyan-600'
  },
  {
    id: 'construction',
    name: 'Construction Waste',
    description: 'Building materials, rubble, renovation waste',
    icon: <Hammer className="w-8 h-8" />,
    color: 'from-orange-500 to-red-600'
  },
  {
    id: 'mixed',
    name: 'Mixed Waste',
    description: 'Combination of different waste types',
    icon: <Recycle className="w-8 h-8" />,
    color: 'from-purple-500 to-pink-600'
  }
];

const WasteTypePage = () => {
  const [selectedType, setSelectedType] = useState<string>('');

  const handleNext = () => {
    console.log('Selected waste type:', selectedType);
  };

  return (
    <PageLayout
      title="What type of waste do you have?"
      subtitle="Select the category that best describes your waste to ensure proper disposal"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {wasteTypes.map((type, index) => (
          <AnimatedCard key={type.id} delay={index * 0.1}>
            <CardContent 
              className={`p-6 cursor-pointer transition-all duration-300 ${
                selectedType === type.id 
                  ? 'ring-2 ring-blue-500 bg-blue-50/50' 
                  : 'hover:bg-muted/30'
              }`}
              onClick={() => setSelectedType(type.id)}
            >
              <div className="text-center space-y-4">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-16 h-16 bg-gradient-to-br ${type.color} rounded-full flex items-center justify-center mx-auto text-white`}
                >
                  {type.icon}
                </motion.div>
                
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    {type.name}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {type.description}
                  </p>
                </div>

                {selectedType === type.id && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center mx-auto"
                  >
                    <span className="text-white text-sm">✓</span>
                  </motion.div>
                )}
              </div>
            </CardContent>
          </AnimatedCard>
        ))}
      </div>

      <NavigationButtons
        backPath="/"
        nextPath="/skip-selection"
        nextDisabled={!selectedType}
        onNext={handleNext}
      />
    </PageLayout>
  );
};

export default WasteTypePage;
