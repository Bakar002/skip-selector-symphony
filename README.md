
# Skip Booking Application

A modern, responsive web application for booking skip hire services built with React, TypeScript, and Tailwind CSS.

## 🚀 Features

- **Multi-step booking process** with progress tracking
- **Responsive design** that works on all devices
- **Smooth animations** powered by Framer Motion
- **Type-safe** development with TypeScript
- **Modern UI components** using shadcn/ui
- **Clean architecture** with reusable components

## 📋 Booking Flow

The application guides users through a 6-step booking process:

1. **Postcode Entry** - Validate service availability in user's area
2. **Waste Type Selection** - Choose between domestic and commercial waste
3. **Skip Selection** - Browse and select from available skip sizes
4. **Permit Check** - Determine if a permit is required
5. **Date Selection** - Choose delivery date and time slot
6. **Payment** - Complete the booking with payment details

## 🏗️ Architecture

### Component Structure

```
src/
├── components/
│   ├── common/           # Reusable UI components
│   │   └── AnimatedCard.tsx
│   ├── layout/           # Layout components
│   │   └── PageLayout.tsx
│   ├── navigation/       # Navigation components
│   │   └── NavigationButtons.tsx
│   └── ui/              # shadcn/ui components
├── pages/               # Page components
│   ├── PostcodePage.tsx
│   ├── WasteTypePage.tsx
│   ├── SkipSelectionPage.tsx
│   ├── PermitCheckPage.tsx
│   ├── DateSelectionPage.tsx
│   └── PaymentPage.tsx
├── hooks/               # Custom React hooks
└── types/               # TypeScript type definitions
```

### Design Principles

1. **Component-Based Architecture**: Each piece of functionality is broken down into focused, reusable components
2. **Separation of Concerns**: Business logic, UI components, and routing are clearly separated
3. **Progressive Enhancement**: Features are built to work without JavaScript and enhanced with interactions
4. **Mobile-First Design**: All components are designed mobile-first with responsive breakpoints

## 🎨 Design System

The application uses a comprehensive design system with:

- **Semantic color tokens** for consistent theming
- **Typography scale** for readable content hierarchy
- **Spacing system** for consistent layout
- **Animation utilities** for smooth interactions

### Color Palette
- Primary: Blue gradient (#3B82F6 to #8B5CF6)
- Success: Green (#10B981)
- Warning: Yellow (#F59E0B)
- Error: Red (#EF4444)

## 🔧 Navigation System

The navigation system is built with the following features:

### NavigationButtons Component
- **Flexible routing**: Supports both programmatic navigation and path-based routing
- **State management**: Handles disabled states and conditional rendering
- **Progress indication**: Shows user progress through the booking flow
- **Summary display**: Displays selection summary when available

### Key Navigation Features
1. **Bidirectional navigation** - Users can go back and forward
2. **Progress tracking** - Visual progress stepper shows current position
3. **Conditional navigation** - Next button is disabled until required fields are completed
4. **State persistence** - User selections are preserved using localStorage

## 🎭 Animation Strategy

Animations are implemented using Framer Motion with the following approach:

### Animation Types
1. **Page transitions** - Smooth fade-in/fade-out between pages
2. **Component animations** - Staggered animations for lists and grids
3. **Micro-interactions** - Hover effects and button states
4. **Progress animations** - Animated progress stepper

### Performance Considerations
- **Reduced motion support** - Respects user preferences for reduced motion
- **Hardware acceleration** - Uses transform and opacity for smooth animations
- **Lazy loading** - Components animate in as they come into view

## 🔄 State Management

The application uses a combination of state management approaches:

1. **Local component state** - For component-specific data (useState)
2. **URL state** - For navigation and current page state (React Router)
3. **Persistent state** - For user selections across pages (localStorage)
4. **Server state** - For API data (React Query via useSkips hook)

### Data Flow
1. User makes selection on a page
2. Selection is stored in component state
3. On navigation, selection is persisted to localStorage
4. Next page can access previous selections if needed
5. Final booking data is compiled from all stored selections

## 🛡️ Error Handling

The application includes comprehensive error handling:

1. **Form validation** - Client-side validation with clear error messages
2. **Network errors** - Graceful handling of API failures with retry options
3. **Route protection** - Prevents access to invalid routes
4. **Fallback UI** - Loading states and error boundaries

## 🔧 Development Approach

### Code Quality
- **TypeScript** for type safety and better developer experience
- **ESLint** for code linting and consistency
- **Component composition** over inheritance
- **Custom hooks** for reusable business logic

### Testing Strategy
- **Component testing** with React Testing Library
- **Type checking** with TypeScript compiler
- **Manual testing** across different devices and browsers

### Performance Optimizations
- **Code splitting** with React.lazy for route-based chunks
- **Image optimization** with proper formats and lazy loading
- **Bundle analysis** to identify and remove unused code
- **Caching strategies** for API responses

## 🚦 Navigation Flow Fix

### Problem Identified
The navigation between pages wasn't working properly due to the conditional logic in the NavigationButtons component.

### Solution Implemented
1. **Fixed navigation logic**: Changed from `else if` to separate `if` statements so both `onNext` callback and navigation can execute
2. **Added state persistence**: User selections are now saved to localStorage for persistence across page reloads
3. **Improved error handling**: Better validation and user feedback for incomplete forms

### Navigation Logic
```typescript
const handleNext = () => {
  // Execute any page-specific logic first
  if (onNext) {
    onNext();
  }
  // Then navigate to next page
  if (nextPath) {
    navigate(nextPath);
  }
};
```

This ensures that:
- Page-specific logic (like saving data) executes first
- Navigation always happens when a next path is provided
- User data is preserved across navigation

## 🔮 Future Enhancements

1. **Authentication system** - User accounts and booking history
2. **Payment integration** - Real payment processing
3. **Admin dashboard** - Booking management for staff
4. **Email notifications** - Booking confirmations and reminders
5. **GPS tracking** - Real-time delivery tracking
6. **Multi-language support** - Internationalization
7. **Accessibility improvements** - Enhanced screen reader support

## 📱 Browser Support

- Chrome 80+
- Firefox 80+
- Safari 14+
- Edge 80+

## 🛠️ Development

### Prerequisites
- Node.js 18+
- npm or yarn

### Getting Started
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript compiler

---

This application demonstrates modern React development practices with a focus on user experience, code quality, and maintainability.
