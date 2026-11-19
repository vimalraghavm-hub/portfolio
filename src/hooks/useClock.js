import { useState, useEffect } from 'react';

export function useClock() {
  const [timeState, setTimeState] = useState({
    timeString: '',
    dateString: '',
    dayOfWeek: ''
  });

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      
      // Format time: 11:32 PM
      const timeFormatted = now.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      });

      // Format date: Thu 24 Sep 2026
      const dateFormatted = now.toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      });

      const dayFormatted = now.toLocaleDateString('en-US', {
        weekday: 'short'
      });

      setTimeState({
        timeString: timeFormatted,
        dateString: dateFormatted,
        dayOfWeek: dayFormatted
      });
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  return timeState;
}
