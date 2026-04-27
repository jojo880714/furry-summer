// 格式化時間
export const formatTime = (isoString) => {
  const date = new Date(isoString);
  return date.toLocaleString('zh-TW', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
};

// 計算倒數時間
export const getTimeRemaining = (endTime) => {
  const total = Date.parse(endTime) - Date.parse(new Date());
  const seconds = Math.floor((total / 1000) % 60);
  const minutes = Math.floor((total / 1000 / 60) % 60);
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
  const days = Math.floor(total / (1000 * 60 * 60 * 24));

  return {
    total,
    days,
    hours,
    minutes,
    seconds,
  };
};

// 檢查遊戲是否結束
export const isGameEnded = () => {
  const endTime = import.meta.env.VITE_GAME_END_TIME;
  return Date.parse(new Date()) > Date.parse(endTime);
};
