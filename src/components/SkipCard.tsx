
import { useState } from 'react';
import { Check, Truck, Weight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { SkipWithTotal } from '@/types/Skip';

interface SkipCardProps {
  skip: SkipWithTotal;
  isSelected?: boolean;
  onSelect: (skip: SkipWithTotal) => void;
}

export const SkipCard = ({ skip, isSelected = false, onSelect }: SkipCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const handleSelect = () => {
    onSelect(skip);
  };

  return (
    <Card 
      className={`relative transition-all duration-300 cursor-pointer hover:shadow-lg ${
        isSelected 
          ? 'ring-2 ring-blue-600 shadow-lg' 
          : 'hover:shadow-md'
      } ${!skip.allowed_on_road || !skip.allows_heavy_waste ? 'opacity-75' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleSelect}
    >
      <CardContent className="p-6">
        {/* Skip Size Badge */}
        <div className="flex justify-between items-start mb-4">
          <Badge 
            variant="secondary" 
            className={`text-white font-medium ${
              isSelected ? 'bg-blue-600' : 'bg-blue-500'
            }`}
          >
            {skip.size} Yards
          </Badge>
          {isSelected && (
            <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
              <Check className="w-4 h-4 text-white" />
            </div>
          )}
        </div>

        {/* Skip Image Placeholder */}
        <div className="w-full h-40 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-lg mb-4 flex items-center justify-center relative overflow-hidden">
          <div className="text-yellow-900 font-bold text-lg opacity-50">
            SKIP
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
        </div>

        {/* Skip Details */}
        <div className="space-y-3">
          <div>
            <h3 className="text-lg font-semibold text-foreground">
              {skip.size} Yard Skip
            </h3>
            <p className="text-sm text-muted-foreground">
              {skip.hire_period_days} day hire period
            </p>
          </div>

          {/* Price */}
          <div className="text-2xl font-bold text-blue-600">
            £{skip.total_price.toFixed(0)}
          </div>

          {/* Features */}
          <div className="flex flex-wrap gap-2">
            <Badge 
              variant={skip.allowed_on_road ? "default" : "secondary"}
              className={`text-xs ${
                skip.allowed_on_road 
                  ? 'bg-green-100 text-green-800 border-green-200' 
                  : 'bg-red-100 text-red-800 border-red-200'
              }`}
            >
              <Truck className="w-3 h-3 mr-1" />
              {skip.allowed_on_road ? 'Road Allowed' : 'No Road Access'}
            </Badge>
            <Badge 
              variant={skip.allows_heavy_waste ? "default" : "secondary"}
              className={`text-xs ${
                skip.allows_heavy_waste 
                  ? 'bg-green-100 text-green-800 border-green-200' 
                  : 'bg-red-100 text-red-800 border-red-200'
              }`}
            >
              <Weight className="w-3 h-3 mr-1" />
              {skip.allows_heavy_waste ? 'Heavy Waste OK' : 'Light Waste Only'}
            </Badge>
          </div>

          {/* Select Button */}
          <Button 
            className={`w-full transition-all duration-200 ${
              isSelected 
                ? 'bg-blue-600 hover:bg-blue-700' 
                : 'bg-primary hover:bg-primary/90'
            }`}
            onClick={handleSelect}
          >
            {isSelected ? 'Selected' : 'Select This Skip'}
            {isHovered && !isSelected && (
              <span className="ml-2">→</span>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
