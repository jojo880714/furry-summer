import { useState, useEffect } from 'react';
import { getTimeRemaining } from '../utils/helpers';

function Countdown() {
  const endTime = import.meta.env.VITE_GAME_END_TIME;
  const [timeRemaining, setTimeRemaining] = useState(getTimeRemaining(endTime));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining(getTimeRemaining(endTime));
    }, 1000);

    return () => clearInterval(timer);
  }, [endTime]);

  if (timeRemaining.total <= 0) {
    return (
      <div className="bg-white rounded-2xl shadow-2xl p-8 mb-8 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">🎉 挑戰結束</h2>
        <p className="text-gray-600">感謝參加 Furry Summer！</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-2xl p-8 mb-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        ⏱️ 挑戰倒數
      </h2>
      <div className="grid grid-cols-4 gap-4">
        <div className="text-center">
          <div className="text-4xl font-bold text-orange-600 mb-2">
            {timeRemaining.days}
          </div>
          <p className="text-sm text-gray-600">天</p>
        </div>
        <div className="text-center">
          <div className="text-4xl font-bold text-orange-600 mb-2">
            {timeRemaining.hours}
          </div>
          <p className="text-sm text-gray-600">時</p>
        </div>
        <div className="text-center">
          <div className="text-4xl font-bold text-orange-600 mb-2">
            {timeRemaining.minutes}
          </div>
          <p className="text-sm text-gray-600">分</p>
        </div>
        <div className="text-center">
          <div className="text-4xl font-bold text-orange-600 mb-2">
            {timeRemaining.seconds}
          </div>
          <p className="text-sm text-gray-600">秒</p>
        </div>
      </div>
    </div>
  );
}

export default Countdown;
