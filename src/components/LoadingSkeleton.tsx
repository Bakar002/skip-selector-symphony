
export const LoadingSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(6)].map((_, index) => (
        <div 
          key={index} 
          className="bg-card rounded-lg border border-border p-6 animate-pulse"
        >
          <div className="space-y-4">
            {/* Skip image placeholder */}
            <div className="w-full h-40 bg-muted rounded-lg"></div>
            
            {/* Badge placeholder */}
            <div className="w-20 h-6 bg-muted rounded-full"></div>
            
            {/* Title placeholder */}
            <div className="w-32 h-6 bg-muted rounded"></div>
            
            {/* Subtitle placeholder */}
            <div className="w-24 h-4 bg-muted rounded"></div>
            
            {/* Price placeholder */}
            <div className="w-16 h-8 bg-muted rounded"></div>
            
            {/* Features placeholder */}
            <div className="flex space-x-2">
              <div className="w-20 h-6 bg-muted rounded-full"></div>
              <div className="w-24 h-6 bg-muted rounded-full"></div>
            </div>
            
            {/* Button placeholder */}
            <div className="w-full h-10 bg-muted rounded-lg"></div>
          </div>
        </div>
      ))}
    </div>
  );
};
