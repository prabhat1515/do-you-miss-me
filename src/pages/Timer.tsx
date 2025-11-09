import { useEffect, useState } from "react";
import { Heart, Clock } from "lucide-react";

const Timer = () => {
  const INITIAL_TIME = 80 * 60; // 1 hour 20 minutes in seconds
  const [timeRemaining, setTimeRemaining] = useState(INITIAL_TIME);

  useEffect(() => {
    // Get or set the start time
    let startTime = sessionStorage.getItem("timerStartTime");
    
    if (!startTime) {
      // If no start time exists, set it now
      startTime = Date.now().toString();
      sessionStorage.setItem("timerStartTime", startTime);
    }

    const calculateTimeRemaining = () => {
      const start = parseInt(startTime!);
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
              🚗💨
            </div>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-foreground tracking-tight">
            Your baby is on the way!
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
          Counting down every moment until we're together 💕
        </p>
      </div>
    </div>
  );
};

export default Timer;
