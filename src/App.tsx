
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PostcodePage from "./pages/PostcodePage";
import WasteTypePage from "./pages/WasteTypePage";
import SkipSelectionPage from "./pages/SkipSelectionPage";
import PermitCheckPage from "./pages/PermitCheckPage";
import DateSelectionPage from "./pages/DateSelectionPage";
import PaymentPage from "./pages/PaymentPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PostcodePage />} />
          <Route path="/waste-type" element={<WasteTypePage />} />
          <Route path="/skip-selection" element={<SkipSelectionPage />} />
          <Route path="/permit-check" element={<PermitCheckPage />} />
          <Route path="/date-selection" element={<DateSelectionPage />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
