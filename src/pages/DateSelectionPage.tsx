
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock } from 'lucide-react';
import { PageLayout } from '@/components/layout/PageLayout';
import { AnimatedCard } from '@/components/common/AnimatedCard';
import { NavigationButtons } from '@/components/navigation/NavigationButtons';
import { CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const DateSelectionPage = () => {
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');

  // Generate next 7 days
  const availableDates = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i + 1); // Start from tomorrow
    return {
      value: date.toISOString().split('T')[0],
      label: date.toLocaleDateString('en-GB', { 
        weekday: 'long', 
        day: 'numeric', 
        month: 'long' 
      })
    };
  });

  const timeSlots = [
    { value: '8-12', label: '8:00 AM - 12:00 PM' },
    { value: '12-4', label: '12:00 PM - 4:00 PM' },
    { value: '4-6', label: '4:00 PM - 6:00 PM' }
  ];

  const handleNext = () => {
    console.log('Selected date:', selectedDate, 'time:', selectedTime);
  };

  return (
    <PageLayout
      title="When would you like delivery?"
      subtitle="Choose your preferred delivery date and time slot"
    >
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Date Selection */}
        <div>
          <motion.h3 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-xl font-semibold mb-4 flex items-center gap-2"
          >
            <Calendar className="w-5 h-5 text-blue-600" />
            Select Date
          </motion.h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {availableDates.map((date, index) => (
              <AnimatedCard key={date.value} delay={index * 0.05}>
                <CardContent 
                  className={`p-4 cursor-pointer text-center transition-all duration-300 ${
                    selectedDate === date.value 
                      ? 'ring-2 ring-blue-500 bg-blue-50/50' 
                      : 'hover:bg-muted/30'
                  }`}
                  onClick={() => setSelectedDate(date.value)}
                >
                  <p className="font-medium text-foreground">{date.label}</p>
                </CardContent>
              </AnimatedCard>
            ))}
          </div>
        </div>

        {/* Time Selection */}
        {selectedDate && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5 text-blue-600" />
              Select Time Slot
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {timeSlots.map((slot, index) => (
                <AnimatedCard key={slot.value} delay={index * 0.1}>
                  <CardContent 
                    className={`p-4 cursor-pointer text-center transition-all duration-300 ${
                      selectedTime === slot.value 
                        ? 'ring-2 ring-blue-500 bg-blue-50/50' 
                        : 'hover:bg-muted/30'
                    }`}
                    onClick={() => setSelectedTime(slot.value)}
                  >
                    <p className="font-medium text-foreground">{slot.label}</p>
                  </CardContent>
                </AnimatedCard>
              ))}
            </div>
          </motion.div>
        )}
      </div>

      <NavigationButtons
        backPath="/permit-check"
        nextPath="/payment"
        nextDisabled={!selectedDate || !selectedTime}
        onNext={handleNext}
        showSummary={selectedDate && selectedTime}
        summaryContent={
          selectedDate && selectedTime && (
            <div className="text-right">
              <div className="text-sm text-muted-foreground">Delivery</div>
              <div className="text-lg font-bold text-blue-600">
                {availableDates.find(d => d.value === selectedDate)?.label}
              </div>
              <div className="text-sm text-muted-foreground">
                {timeSlots.find(t => t.value === selectedTime)?.label}
              </div>
            </div>
          )
        }
      />
    </PageLayout>
  );
};

export default DateSelectionPage;
