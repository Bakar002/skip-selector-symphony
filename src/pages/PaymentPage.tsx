
import { motion } from 'framer-motion';
import { CreditCard, Shield, CheckCircle } from 'lucide-react';
import { PageLayout } from '@/components/layout/PageLayout';
import { AnimatedCard } from '@/components/common/AnimatedCard';
import { CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const PaymentPage = () => {
  const orderSummary = {
    skipSize: 4,
    price: 278,
    vat: 55.60,
    permit: 30,
    total: 363.60
  };

  return (
    <PageLayout
      title="Complete Your Order"
      subtitle="Review your order and enter payment details"
    >
      <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Order Summary */}
        <AnimatedCard>
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span>4 Yard Skip (14 days)</span>
                <span>£{orderSummary.price}</span>
              </div>
              <div className="flex justify-between">
                <span>VAT (20%)</span>
                <span>£{orderSummary.vat}</span>
              </div>
              <div className="flex justify-between">
                <span>Council Permit</span>
                <span>£{orderSummary.permit}</span>
              </div>
              <div className="border-t pt-3">
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>£{orderSummary.total}</span>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-center gap-2 text-green-700">
                <Shield className="w-4 h-4" />
                <span className="text-sm font-medium">Secure Payment</span>
              </div>
              <p className="text-xs text-green-600 mt-1">
                Your payment information is encrypted and secure
              </p>
            </div>
          </CardContent>
        </AnimatedCard>

        {/* Payment Form */}
        <AnimatedCard delay={0.2}>
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <CreditCard className="w-5 h-5" />
              Payment Details
            </h3>
            
            <form className="space-y-4">
              <div>
                <Label htmlFor="cardNumber">Card Number</Label>
                <Input
                  id="cardNumber"
                  placeholder="1234 5678 9012 3456"
                  className="mt-1"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="expiry">Expiry</Label>
                  <Input
                    id="expiry"
                    placeholder="MM/YY"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="cvv">CVV</Label>
                  <Input
                    id="cvv"
                    placeholder="123"
                    className="mt-1"
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="name">Cardholder Name</Label>
                <Input
                  id="name"
                  placeholder="John Smith"
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  className="mt-1"
                />
              </div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="pt-4"
              >
                <Button 
                  type="submit" 
                  className="w-full h-12 text-lg bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                >
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Complete Order - £{orderSummary.total}
                </Button>
              </motion.div>
            </form>
          </CardContent>
        </AnimatedCard>
      </div>
    </PageLayout>
  );
};

export default PaymentPage;
