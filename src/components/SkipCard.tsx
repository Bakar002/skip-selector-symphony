
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Truck, Weight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { SkipWithTotal } from '@/types/Skip';
import { AnimatedCard } from './common/AnimatedCard';
import { CardContent } from '@/components/ui/card';

interface SkipCardProps {
  skip: SkipWithTotal;
  isSelected?: boolean;
  onSelect: (skip: SkipWithTotal) => void;
  index?: number;
}

export const SkipCard = ({ skip, isSelected = false, onSelect, index = 0 }: SkipCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const handleSelect = () => {
    onSelect(skip);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      className={`relative transition-all duration-300 cursor-pointer ${
        isSelected 
          ? 'ring-2 ring-blue-500 shadow-xl' 
          : 'hover:shadow-lg'
      } ${!skip.allowed_on_road || !skip.allows_heavy_waste ? 'opacity-75' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleSelect}
    >
      <AnimatedCard hover={false} className="h-full">
        <CardContent className="p-6 h-full flex flex-col">
          {/* Skip Size Badge */}
          <div className="flex justify-between items-start mb-4">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className={`px-3 py-1 rounded-full text-white font-medium ${
                isSelected ? 'bg-gradient-to-r from-blue-600 to-purple-600' : 'bg-gradient-to-r from-blue-500 to-purple-500'
              }`}
            >
              {skip.size} Yards
            </motion.div>
            {isSelected && (
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center"
              >
                <Check className="w-4 h-4 text-white" />
              </motion.div>
            )}
          </div>

          {/* Skip Image Placeholder */}
          <motion.div 
            className="w-full h-40 bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600 rounded-lg mb-4 flex items-center justify-center relative overflow-hidden shadow-inner"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <div className="text-yellow-900 font-bold text-xl opacity-60">
              SKIP
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            <motion.div 
              className="absolute top-2 right-2 w-2 h-2 bg-white/30 rounded-full"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>

          {/* Skip Details */}
          <div className="space-y-3 flex-1">
            <div>
              <h3 className="text-lg font-semibold text-foreground">
                {skip.size} Yard Skip
              </h3>
              <p className="text-sm text-muted-foreground">
                {skip.hire_period_days} day hire period
              </p>
            </div>

            {/* Price */}
            <motion.div 
              className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
              whileHover={{ scale: 1.05 }}
            >
              £{skip.total_price.toFixed(0)}
            </motion.div>

            {/* Features */}
            <div className="flex flex-wrap gap-2">
              <Badge 
                variant={skip.allowed_on_road ? "default" : "secondary"}
                className={`text-xs transition-all duration-300 ${
                  skip.allowed_on_road 
                    ? 'bg-green-100 text-green-800 border-green-200 hover:bg-green-200' 
                    : 'bg-red-100 text-red-800 border-red-200'
                }`}
              >
                <Truck className="w-3 h-3 mr-1" />
                {skip.allowed_on_road ? 'Road Allowed' : 'No Road Access'}
              </Badge>
              <Badge 
                variant={skip.allows_heavy_waste ? "default" : "secondary"}
                className={`text-xs transition-all duration-300 ${
                  skip.allows_heavy_waste 
                    ? 'bg-green-100 text-green-800 border-green-200 hover:bg-green-200' 
                    : 'bg-red-100 text-red-800 border-red-200'
                }`}
              >
                <Weight className="w-3 h-3 mr-1" />
                {skip.allows_heavy_waste ? 'Heavy Waste OK' : 'Light Waste Only'}
              </Badge>
            </div>

            {/* Select Button */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="pt-2"
            >
              <Button 
                className={`w-full transition-all duration-300 ${
                  isSelected 
                    ? 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700' 
                    : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700'
                }`}
                onClick={handleSelect}
              >
                {isSelected ? 'Selected' : 'Select This Skip'}
                {isHovered && !isSelected && (
                  <motion.span 
                    initial={{ x: -10, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    className="ml-2"
                  >
                    →
                  </motion.span>
                )}
              </Button>
            </motion.div>
          </div>
        </CardContent>
      </AnimatedCard>
    </motion.div>
  );
};
