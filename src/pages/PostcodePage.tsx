
import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { PageLayout } from '@/components/layout/PageLayout';
import { AnimatedCard } from '@/components/common/AnimatedCard';
import { NavigationButtons } from '@/components/navigation/NavigationButtons';
import { CardContent } from '@/components/ui/card';

const PostcodePage = () => {
  const [postcode, setPostcode] = useState('');
  const [isValid, setIsValid] = useState(false);

  const validatePostcode = (value: string) => {
    const postcodeRegex = /^[A-Z]{1,2}[0-9][A-Z0-9]? ?[0-9][A-Z]{2}$/i;
    const valid = postcodeRegex.test(value.replace(/\s/g, ''));
    setIsValid(valid);
    return valid;
  };

  const handlePostcodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toUpperCase();
    setPostcode(value);
    validatePostcode(value);
  };

  const handleNext = () => {
    if (isValid) {
      console.log('Postcode:', postcode);
    }
  };

  return (
    <PageLayout
      title="Where do you need the skip?"
      subtitle="Enter your postcode to check availability and pricing in your area"
    >
      <div className="max-w-md mx-auto">
        <AnimatedCard>
          <CardContent className="p-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <MapPin className="w-8 h-8 text-white" />
            </motion.div>

            <div className="space-y-4">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="e.g. SW1A 1AA"
                  value={postcode}
                  onChange={handlePostcodeChange}
                  className={`text-lg py-6 pl-12 text-center font-medium transition-all duration-300 ${
                    postcode && !isValid 
                      ? 'border-red-300 focus:border-red-500' 
                      : isValid 
                        ? 'border-green-300 focus:border-green-500'
                        : ''
                  }`}
                />
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              </div>

              {postcode && !isValid && (
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-sm text-red-600 text-center"
                >
                  Please enter a valid UK postcode
                </motion.p>
              )}

              {isValid && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center"
                >
                  <p className="text-sm text-green-600 font-medium">✓ Valid postcode</p>
                </motion.div>
              )}
            </div>
          </CardContent>
        </AnimatedCard>
      </div>

      <NavigationButtons
        nextPath="/waste-type"
        nextDisabled={!isValid}
        onNext={handleNext}
        backPath="/"
      />
    </PageLayout>
  );
};

export default PostcodePage;
