import { useState, useEffect } from 'react';
import { auth } from '../firebase/config';
import { getUserData, unlockChallenge } from '../firebase/functions';
import { getFixedCodeForChallenge } from '../utils/codeGenerator';
import Navigation from './Navigation';

function UnlockPage() {
  const [code, setCode] = useState('');
  const [selectedChallenge, setSelectedChallenge] = useState('challenge-1');
  const [userData, setUserData] = useState(null);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      if (auth.currentUser) {
        const result = await getUserData(auth.currentUser.uid);
        if (result.success) {
          setUserData(result.data);
        }
      }
    };

    fetchUserData();
  }, []);

  const handleUnlock = async (e) => {
    e.preventDefault();
    setMessage({ type: '', text: '' });
    setLoading(true);

    try {
      // 驗證密碼
      const correctCode = getFixedCodeForChallenge(selectedChallenge);
      
      if (code !== correctCode) {
        setMessage({ type: 'error', text: '密碼錯誤，請重試！' });
        setLoading(false);
        return;
      }

      // 解鎖關卡
      const result = await unlockChallenge(
        auth.currentUser.uid,
        selectedChallenge,
        code
      );

      if (result.success) {
        setMessage({ 
          type: 'success', 
          text: `恭喜解鎖成功！獲得 100 分，目前總分：${result.newScore}` 
        });
        setCode('');
        
        // 重新載入使用者資料
        const updatedData = await getUserData(auth.currentUser.uid);
        if (updatedData.success) {
          setUserData(updatedData.data);
        }
      } else {
        setMessage({ type: 'error', text: result.error || '解鎖失敗' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: '發生錯誤，請稍後再試' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-400 to-pink-500 pb-20">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">🔓 解鎖關卡</h1>
          <p className="text-white">輸入正確密碼解鎖新關卡</p>
        </div>

        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md mx-auto">
          <form onSubmit={handleUnlock} className="space-y-6">
            {/* 選擇關卡 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                選擇關卡
              </label>
              <select
                value={selectedChallenge}
                onChange={(e) => setSelectedChallenge(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                disabled={loading}
              >
                {[1, 2, 3, 4, 5].map((num) => {
                  const challengeId = `challenge-${num}`;
                  const isUnlocked = userData?.unlockedChallenges?.includes(challengeId);
                  
                  return (
                    <option 
                      key={challengeId} 
                      value={challengeId}
                      disabled={isUnlocked}
                    >
                      關卡 {num} {isUnlocked ? '(已解鎖)' : ''}
                    </option>
                  );
                })}
              </select>
            </div>

            {/* 輸入密碼 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                6 位數密碼
              </label>
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-center text-2xl font-mono"
                placeholder="000000"
                maxLength={6}
                disabled={loading}
              />
              <p className="mt-2 text-sm text-gray-600 text-center">
                提示：測試密碼請參考關卡說明
              </p>
            </div>

            {/* 訊息顯示 */}
            {message.text && (
              <div
                className={`px-4 py-3 rounded-lg ${
                  message.type === 'success'
                    ? 'bg-green-100 border border-green-400 text-green-700'
                    : 'bg-red-100 border border-red-400 text-red-700'
                }`}
              >
                {message.text}
              </div>
            )}

            {/* 送出按鈕 */}
            <button
              type="submit"
              disabled={loading || code.length !== 6}
              className="w-full bg-gradient-to-r from-orange-500 to-pink-500 text-white font-bold py-3 px-4 rounded-lg hover:from-orange-600 hover:to-pink-600 transition duration-300 disabled:opacity-50"
            >
              {loading ? '驗證中...' : '解鎖 🚀'}
            </button>
          </form>

          {/* 測試密碼提示 */}
          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h3 className="font-bold text-blue-800 mb-2">📝 測試密碼</h3>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>關卡 1: 123456</li>
              <li>關卡 2: 234567</li>
              <li>關卡 3: 345678</li>
              <li>關卡 4: 456789</li>
              <li>關卡 5: 567890</li>
            </ul>
          </div>
        </div>

        {/* 已解鎖關卡 */}
        <div className="mt-8 bg-white rounded-2xl shadow-2xl p-8 max-w-md mx-auto">
          <h2 className="text-xl font-bold text-gray-800 mb-4">你的進度</h2>
          <p className="text-gray-600 mb-4">
            已解鎖：{userData?.unlockedChallenges?.length || 0} / 5 個關卡
          </p>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((num) => {
              const challengeId = `challenge-${num}`;
              const isUnlocked = userData?.unlockedChallenges?.includes(challengeId);
              
              return (
                <div
                  key={challengeId}
                  className={`flex-1 h-3 rounded-full ${
                    isUnlocked ? 'bg-green-500' : 'bg-gray-300'
                  }`}
                />
              );
            })}
          </div>
        </div>
      </div>

      <Navigation />
    </div>
  );
}

export default UnlockPage;
