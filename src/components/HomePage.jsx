import { useState, useEffect } from 'react';
import { auth } from '../firebase/config';
import { getUserData } from '../firebase/functions';
import Navigation from './Navigation';
import Countdown from './Countdown';

function HomePage() {
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-400 to-pink-500 flex items-center justify-center">
        <div className="text-white text-2xl">載入中...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-400 to-pink-500">
      <div className="container mx-auto px-4 py-8">
        {/* 標題區 */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            🐾 Furry Summer
          </h1>
          <p className="text-white text-lg">
            歡迎回來，{userData?.ownerName} 和 {userData?.petName}！
          </p>
        </div>

        {/* 倒數計時區 */}
        <Countdown />

        {/* 分數卡片 */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 mb-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">你的分數</h2>
            <div className="text-6xl font-bold text-orange-600 mb-2">
              {userData?.score || 0}
            </div>
            <p className="text-gray-600">
              已解鎖 {userData?.unlockedChallenges?.length || 0} 個關卡
            </p>
          </div>
        </div>

        {/* 快速操作區 */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <a
            href="/unlock"
            className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition duration-300 text-center"
          >
            <div className="text-5xl mb-4">🔓</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">解鎖關卡</h3>
            <p className="text-gray-600">輸入密碼解鎖新關卡</p>
          </a>

          <a
            href="/leaderboard"
            className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition duration-300 text-center"
          >
            <div className="text-5xl mb-4">🏆</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">排行榜</h3>
            <p className="text-gray-600">查看所有參賽者排名</p>
          </a>
        </div>

        {/* 關卡進度 */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">關卡進度</h2>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((num) => {
              const challengeId = `challenge-${num}`;
              const isUnlocked = userData?.unlockedChallenges?.includes(challengeId);
              
              return (
                <div
                  key={challengeId}
                  className={`flex items-center justify-between p-4 rounded-lg ${
                    isUnlocked
                      ? 'bg-green-100 border border-green-300'
                      : 'bg-gray-100 border border-gray-300'
                  }`}
                >
                  <div className="flex items-center">
                    <div className="text-3xl mr-4">
                      {isUnlocked ? '✅' : '🔒'}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-800">
                        關卡 {num}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {isUnlocked ? '已完成' : '尚未解鎖'}
                      </p>
                    </div>
                  </div>
                  {isUnlocked && (
                    <div className="text-orange-600 font-bold">+100 分</div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <Navigation />
    </div>
  );
}

export default HomePage;
