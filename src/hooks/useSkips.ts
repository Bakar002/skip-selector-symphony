
import { useState, useEffect } from 'react';
import { Skip, SkipWithTotal } from '@/types/Skip';

// Mock API data - in production this would come from your actual API
const mockSkipData: Skip[] = [
  {
    id: 17933,
    size: 4,
    hire_period_days: 14,
    price_before_vat: 211,
    vat: 20,
    allowed_on_road: true,
    allows_heavy_waste: true
  },
  {
    id: 17934,
    size: 5,
    hire_period_days: 14,
    price_before_vat: 241,
    vat: 20,
    allowed_on_road: true,
    allows_heavy_waste: true
  },
  {
    id: 17935,
    size: 6,
    hire_period_days: 14,
    price_before_vat: 264,
    vat: 20,
    allowed_on_road: false,
    allows_heavy_waste: false
  },
  {
    id: 17936,
    size: 8,
    hire_period_days: 14,
    price_before_vat: 295,
    vat: 20,
    allowed_on_road: true,
    allows_heavy_waste: true
  }
];

export const useSkips = () => {
  const [skips, setSkips] = useState<SkipWithTotal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSkips = async () => {
      try {
        setLoading(true);
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Transform data to include total price
        const skipsWithTotal: SkipWithTotal[] = mockSkipData.map(skip => ({
          ...skip,
          total_price: skip.price_before_vat + (skip.price_before_vat * skip.vat / 100)
        }));
        
        setSkips(skipsWithTotal);
        setError(null);
      } catch (err) {
        setError('Failed to load skip options. Please try again.');
        console.error('Error fetching skips:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchSkips();
  }, []);

  return { skips, loading, error, refetch: () => window.location.reload() };
};
