import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { Heart, Clock } from "lucide-react";

const Timer = () => {
  const INITIAL_TIME = 20 * 60; // 1 hour 20 minutes in seconds
  const [timeRemaining, setTimeRemaining] = useState(INITIAL_TIME);
  
  // Check if timer was properly started
  const startTime = sessionStorage.getItem("timerStartTime");
  
  if (!startTime) {
    return <Navigate to="/404" replace />;
  }

  useEffect(() => {
    // Get the start time (we know it exists from the check above)
    const timerStart = sessionStorage.getItem("timerStartTime")!;

    const calculateTimeRemaining = () => {
      const start = parseInt(timerStart);
      const now = Date.now();
      const elapsedSeconds = Math.floor((now - start) / 1000);
      const remaining = Math.max(0, INITIAL_TIME - elapsedSeconds);
      return remaining;
    };

    // Initial calculation
    setTimeRemaining(calculateTimeRemaining());

    // Update every second
    const interval = setInterval(() => {
      const remaining = calculateTimeRemaining();
      setTimeRemaining(remaining);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    const pad = (num: number) => num.toString().padStart(2, "0");

    return `${hours}:${pad(minutes)}:${pad(secs)}`;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-soft p-4">
      <div className="text-center space-y-12 max-w-3xl w-full animate-in fade-in duration-700">
        <div className="space-y-6">
          <div className="relative">
            <Heart 
              className="w-24 h-24 mx-auto text-primary animate-pulse" 
              fill="currentColor" 
            />
            <div className="absolute -top-2 -right-2 animate-bounce">
            😭💓
            </div>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-foreground tracking-tight">
          My heart will burst if I don’t get to see you in 
          </h1> 
        </div>

        <div className="relative">
          <div className="bg-card/50 backdrop-blur-sm rounded-3xl p-12 shadow-2xl border-2 border-primary/20">
            <div className="flex items-center justify-center gap-4 mb-6">
              <Clock className="w-8 h-8 text-primary" />
              <p className="text-xl text-muted-foreground">Estimated Time</p>
            </div>
            
            <div className="text-7xl md:text-8xl font-bold bg-gradient-romantic bg-clip-text text-transparent tabular-nums">
              {formatTime(timeRemaining)}
            </div>

            {timeRemaining === 0 && (
              <div className="mt-8 text-2xl font-semibold text-primary animate-pulse">
                🎉 Your baby has arrived! 🎉
              </div>
            )}
          </div>
        </div>

        <p className="text-muted-foreground text-lg">
          Counting down every moment until my heart explodes 💕
        </p>
      </div>
    </div>
  );
};

export default Timer;
