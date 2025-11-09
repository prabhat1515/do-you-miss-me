import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";

const MissMe = () => {
  const [isSwapped, setIsSwapped] = useState(false);
  const navigate = useNavigate();

  const handleYesClick = () => {
    // Initialize timer in sessionStorage when Yes is clicked
    const startTime = sessionStorage.getItem("timerStartTime");
    if (!startTime) {
      sessionStorage.setItem("timerStartTime", Date.now().toString());
    }
    navigate("/timer");
  };

  const handleNoHover = () => {
    setIsSwapped(true);
  };

  const handleMouseLeave = () => {
    setIsSwapped(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-soft p-4">
      <div className="text-center space-y-12 max-w-2xl w-full animate-in fade-in duration-700">
        <div className="space-y-6">
          <Heart className="w-20 h-20 mx-auto text-primary animate-pulse" fill="currentColor" />
          <h1 className="text-5xl md:text-7xl font-bold text-foreground tracking-tight">
            Do you miss me?
          </h1>
        </div>

        <div className="flex gap-6 justify-center items-center flex-wrap">
          {!isSwapped ? (
            <>
              <Button
                size="lg"
                onClick={handleYesClick}
                className="text-xl px-12 py-8 bg-gradient-romantic hover:opacity-90 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Yes! 💕
              </Button>
              <Button
                size="lg"
                variant="outline"
                onMouseEnter={handleNoHover}
                className="text-xl px-12 py-8 border-2 border-primary text-foreground hover:bg-secondary transition-all duration-300"
              >
                No
              </Button>
            </>
          ) : (
            <>
              <Button
                size="lg"
                variant="outline"
                onMouseLeave={handleMouseLeave}
                className="text-xl px-12 py-8 border-2 border-primary text-foreground hover:bg-secondary transition-all duration-300"
              >
                No
              </Button>
              <Button
                size="lg"
                onClick={handleYesClick}
                className="text-xl px-12 py-8 bg-gradient-romantic hover:opacity-90 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Yes! 💕
              </Button>
            </>
          )}
        </div>

        <p className="text-muted-foreground text-sm mt-8">
          (Try hovering over "No" 😏)
        </p>
      </div>
    </div>
  );
};

export default MissMe;
