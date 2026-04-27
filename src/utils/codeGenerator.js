// 生成 6 位數密碼
export const generateCode = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// 驗證密碼格式
export const validateCode = (code) => {
  return /^\d{6}$/.test(code);
};

// 根據關卡 ID 生成固定密碼（用於測試）
export const getFixedCodeForChallenge = (challengeId) => {
  const codes = {
    'challenge-1': '123456',
    'challenge-2': '234567',
    'challenge-3': '345678',
    'challenge-4': '456789',
    'challenge-5': '567890',
  };
  return codes[challengeId] || generateCode();
};
