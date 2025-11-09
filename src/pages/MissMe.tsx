import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

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
    <div className="min-h-screen flex items-center justify-center bg-gradient-pink-bg p-4 relative overflow-hidden">
      {/* Floating Hearts */}
      <div className="floating-heart">💕</div>
      <div className="floating-heart">💖</div>
      <div className="floating-heart">💗</div>
      <div className="floating-heart">💝</div>
      <div className="floating-heart">💘</div>
      <div className="floating-heart">💕</div>
      <div className="floating-heart">💖</div>
      <div className="floating-heart">💗</div>
      <div className="floating-heart">💝</div>
      <div className="floating-heart">💘</div>

      {/* Main Card */}
      <div className="bg-white/95 backdrop-blur-sm rounded-[3rem] p-12 shadow-2xl max-w-2xl w-full animate-in fade-in duration-700 relative z-10">
        <div className="text-center space-y-8">
          {/* Pleading Emoji */}
          <div className="text-8xl animate-pulse">
            🥺
          </div>

          {/* Title */}
          <h1 className="text-6xl md:text-7xl font-bold bg-gradient-romantic bg-clip-text text-transparent tracking-tight">
            Do You Miss Me?
          </h1>

          {/* Buttons */}
          <div className="flex gap-6 justify-center items-center flex-wrap pt-4">
            {!isSwapped ? (
              <>
                <Button
                  size="lg"
                  onClick={handleYesClick}
                  className="text-2xl px-16 py-10 rounded-[2rem] bg-gradient-to-br from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white shadow-xl transition-all duration-300 transform hover:scale-105 font-semibold"
                >
                  Yes! 💕
                </Button>
                <Button
                  size="lg"
                  onMouseEnter={handleNoHover}
                  className="text-2xl px-16 py-10 rounded-[2rem] bg-gray-300 hover:bg-gray-400 text-gray-700 shadow-lg transition-all duration-300 font-semibold"
                >
                  No
                </Button>
              </>
            ) : (
              <>
                <Button
                  size="lg"
                  onMouseLeave={handleMouseLeave}
                  className="text-2xl px-16 py-10 rounded-[2rem] bg-gray-300 hover:bg-gray-400 text-gray-700 shadow-lg transition-all duration-300 font-semibold"
                >
                  No
                </Button>
                <Button
                  size="lg"
                  onClick={handleYesClick}
                  className="text-2xl px-16 py-10 rounded-[2rem] bg-gradient-to-br from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white shadow-xl transition-all duration-300 transform hover:scale-105 font-semibold"
                >
                  Yes! 💕
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MissMe;
