
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useSkips } from '@/hooks/useSkips';
import { SkipWithTotal } from '@/types/Skip';
import { PageLayout } from '@/components/layout/PageLayout';
import { SkipGrid } from '@/components/SkipGrid';
import { LoadingSkeleton } from '@/components/LoadingSkeleton';
import { ErrorMessage } from '@/components/ErrorMessage';
import { NavigationButtons } from '@/components/navigation/NavigationButtons';

type SortOption = 'price-asc' | 'price-desc' | 'size-asc' | 'size-desc';

const SkipSelectionPage = () => {
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

  const handleNext = () => {
    if (selectedSkip) {
      console.log('Selected skip:', selectedSkip);
    }
  };

  const summaryContent = selectedSkip && (
    <div className="text-right">
      <div className="text-sm text-muted-foreground">
        {selectedSkip.size} Yard Skip
      </div>
      <div className="text-lg font-bold text-blue-600">
        £{selectedSkip.total_price.toFixed(0)} - {selectedSkip.hire_period_days} day hire
      </div>
    </div>
  );

  return (
    <PageLayout
      title="Choose Your Skip Size"
      subtitle="Select the skip size that best suits your needs"
    >
      {/* Sort Controls */}
      {!loading && !error && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex justify-between items-center mb-6"
        >
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
        </motion.div>
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

      <NavigationButtons
        backPath="/waste-type"
        nextPath="/permit-check"
        nextDisabled={!selectedSkip}
        onNext={handleNext}
        showSummary={!!selectedSkip}
        summaryContent={summaryContent}
      />
    </PageLayout>
  );
};

export default SkipSelectionPage;
