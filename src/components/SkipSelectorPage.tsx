
import { useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useSkips } from '@/hooks/useSkips';
import { SkipWithTotal } from '@/types/Skip';
import { ProgressStepper } from './ProgressStepper';
import { SkipGrid } from './SkipGrid';
import { LoadingSkeleton } from './LoadingSkeleton';
import { ErrorMessage } from './ErrorMessage';

type SortOption = 'price-asc' | 'price-desc' | 'size-asc' | 'size-desc';

export const SkipSelectorPage = () => {
  const { skips, loading, error, refetch } = useSkips();
  const [selectedSkip, setSelectedSkip] = useState<SkipWithTotal | undefined>();
  const [sortBy, setSortBy] = useState<SortOption>('size-asc');

  const sortedSkips = [...skips].sort((a, b) => {
    switch (sortBy) {
      case 'price-asc':
        return a.total_price - b.total_price;
      case 'price-desc':
        return b.total_price - a.total_price;
      case 'size-asc':
        return a.size - b.size;
      case 'size-desc':
        return b.size - a.size;
      default:
        return 0;
    }
  });

  const handleSelectSkip = (skip: SkipWithTotal) => {
    setSelectedSkip(skip);
  };

  const handleContinue = () => {
    if (selectedSkip) {
      console.log('Selected skip:', selectedSkip);
      // Navigate to next step
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <ProgressStepper />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Choose Your Skip Size
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Select the skip size that best suits your needs
          </p>
        </div>

        {/* Sort Controls */}
        {!loading && !error && (
          <div className="flex justify-between items-center mb-6">
            <div className="text-sm text-muted-foreground">
              {skips.length} skip{skips.length !== 1 ? 's' : ''} available
            </div>
            <Select value={sortBy} onValueChange={(value) => setSortBy(value as SortOption)}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Sort by..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="size-asc">Size: Small to Large</SelectItem>
                <SelectItem value="size-desc">Size: Large to Small</SelectItem>
                <SelectItem value="price-asc">Price: Low to High</SelectItem>
                <SelectItem value="price-desc">Price: High to Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}

        {/* Content */}
        {loading && <LoadingSkeleton />}
        {error && <ErrorMessage message={error} onRetry={refetch} />}
        {!loading && !error && (
          <SkipGrid 
            skips={sortedSkips}
            selectedSkip={selectedSkip}
            onSelectSkip={handleSelectSkip}
          />
        )}

        {/* Bottom Navigation */}
        {!loading && !error && (
          <div className="flex justify-between items-center mt-12 pt-8 border-t border-border">
            <Button variant="outline" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
            
            {selectedSkip && (
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <div className="text-sm text-muted-foreground">
                    {selectedSkip.size} Yard Skip
                  </div>
                  <div className="text-lg font-bold text-blue-600">
                    £{selectedSkip.total_price.toFixed(0)} - {selectedSkip.hire_period_days} day hire
                  </div>
                </div>
                <Button onClick={handleContinue} className="gap-2">
                  Continue
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
