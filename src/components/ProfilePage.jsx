import { useState, useEffect } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase/config';
import { getUserData } from '../firebase/functions';
import { formatTime } from '../utils/helpers';
import Navigation from './Navigation';

function ProfilePage() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      if (auth.currentUser) {
        const result = await getUserData(auth.currentUser.uid);
        if (result.success) {
          setUserData(result.data);
        }
      }
      setLoading(false);
    };

    fetchUserData();
  }, []);

  const handleLogout = async () => {
    if (window.confirm('確定要登出嗎？')) {
      try {
        await signOut(auth);
      } catch (error) {
        console.error('登出失敗:', error);
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-400 to-pink-500 flex items-center justify-center">
        <div className="text-white text-2xl">載入中...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-400 to-pink-500 pb-20">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">👤 個人資料</h1>
          <p className="text-white">你的挑戰資訊</p>
        </div>

        {/* 個人卡片 */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md mx-auto mb-6">
          <div className="text-center mb-6">
            <div className="text-6xl mb-4">🐾</div>
            <h2 className="text-2xl font-bold text-gray-800">
              {userData?.petName}
            </h2>
            <p className="text-gray-600">飼主: {userData?.ownerName}</p>
          </div>

          <div className="space-y-4">
            {/* 分數 */}
            <div className="flex justify-between items-center p-4 bg-orange-50 rounded-lg">
              <span className="text-gray-700 font-medium">總分</span>
              <span className="text-2xl font-bold text-orange-600">
                {userData?.score || 0}
              </span>
            </div>

            {/* 已解鎖關卡 */}
            <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg">
              <span className="text-gray-700 font-medium">已解鎖關卡</span>
              <span className="text-2xl font-bold text-green-600">
                {userData?.unlockedChallenges?.length || 0} / 5
              </span>
            </div>

            {/* 註冊時間 */}
            <div className="p-4 bg-gray-50 rounded-lg">
              <span className="text-gray-700 font-medium block mb-1">
                註冊時間
              </span>
              <span className="text-sm text-gray-600">
                {userData?.createdAt ? formatTime(userData.createdAt) : '---'}
              </span>
            </div>

            {/* 最後解鎖時間 */}
            {userData?.lastUnlockTime && (
              <div className="p-4 bg-gray-50 rounded-lg">
                <span className="text-gray-700 font-medium block mb-1">
                  最後解鎖時間
                </span>
                <span className="text-sm text-gray-600">
                  {formatTime(userData.lastUnlockTime)}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* 成就徽章 */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md mx-auto mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">🏅 成就徽章</h2>
          <div className="grid grid-cols-3 gap-4">
            <div
              className={`text-center p-4 rounded-lg ${
                userData?.unlockedChallenges?.length >= 1
                  ? 'bg-yellow-100'
                  : 'bg-gray-100 opacity-50'
              }`}
            >
              <div className="text-3xl mb-2">🌟</div>
              <p className="text-xs text-gray-700">新手</p>
            </div>
            <div
              className={`text-center p-4 rounded-lg ${
                userData?.unlockedChallenges?.length >= 3
                  ? 'bg-yellow-100'
                  : 'bg-gray-100 opacity-50'
              }`}
            >
              <div className="text-3xl mb-2">⭐</div>
              <p className="text-xs text-gray-700">挑戰者</p>
            </div>
            <div
              className={`text-center p-4 rounded-lg ${
                userData?.unlockedChallenges?.length >= 5
                  ? 'bg-yellow-100'
                  : 'bg-gray-100 opacity-50'
              }`}
            >
              <div className="text-3xl mb-2">🏆</div>
              <p className="text-xs text-gray-700">大師</p>
            </div>
          </div>
        </div>

        {/* 登出按鈕 */}
        <div className="max-w-md mx-auto">
          <button
            onClick={handleLogout}
            className="w-full bg-red-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-red-600 transition duration-300"
          >
            登出 🚪
          </button>
        </div>
      </div>

      <Navigation />
    </div>
  );
}

export default ProfilePage;
