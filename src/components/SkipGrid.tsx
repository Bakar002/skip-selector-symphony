
import { SkipWithTotal } from '@/types/Skip';
import { SkipCard } from './SkipCard';

interface SkipGridProps {
  skips: SkipWithTotal[];
  selectedSkip?: SkipWithTotal;
  onSelectSkip: (skip: SkipWithTotal) => void;
}

export const SkipGrid = ({ skips, selectedSkip, onSelectSkip }: SkipGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {skips.map((skip) => (
        <SkipCard
          key={skip.id}
          skip={skip}
          isSelected={selectedSkip?.id === skip.id}
          onSelect={onSelectSkip}
        />
      ))}
    </div>
  );
};
