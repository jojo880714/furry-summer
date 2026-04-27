import { useState, useEffect } from 'react';
import { getLeaderboard } from '../firebase/functions';
import Navigation from './Navigation';

function LeaderboardPage() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      const result = await getLeaderboard(20);
      if (result.success) {
        setLeaderboard(result.data);
      }
      setLoading(false);
    };

    fetchLeaderboard();
  }, []);

  const getMedalEmoji = (rank) => {
    switch (rank) {
      case 1:
        return '🥇';
      case 2:
        return '🥈';
      case 3:
        return '🥉';
      default:
        return `${rank}`;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-400 to-pink-500 pb-20">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">🏆 排行榜</h1>
          <p className="text-white">看看誰是最厲害的毛孩團隊！</p>
        </div>

        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden max-w-2xl mx-auto">
          {loading ? (
            <div className="p-8 text-center text-gray-600">載入中...</div>
          ) : leaderboard.length === 0 ? (
            <div className="p-8 text-center text-gray-600">還沒有人上榜喔！</div>
          ) : (
            <div className="divide-y divide-gray-200">
              {leaderboard.map((user, index) => {
                const rank = index + 1;
                const isTopThree = rank <= 3;

                return (
                  <div
                    key={user.id}
                    className={`p-6 flex items-center justify-between hover:bg-gray-50 transition ${
                      isTopThree ? 'bg-yellow-50' : ''
                    }`}
                  >
                    {/* 排名 */}
                    <div className="flex items-center flex-1">
                      <div
                        className={`w-12 h-12 flex items-center justify-center rounded-full font-bold mr-4 ${
                          isTopThree
                            ? 'text-2xl'
                            : 'bg-gray-200 text-gray-700'
                        }`}
                      >
                        {getMedalEmoji(rank)}
                      </div>

                      {/* 使用者資訊 */}
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-800 text-lg">
                          {user.petName}
                        </h3>
                        <p className="text-sm text-gray-600">
                          飼主: {user.ownerName}
                        </p>
                      </div>
                    </div>

                    {/* 分數和關卡 */}
                    <div className="text-right">
                      <div className="text-2xl font-bold text-orange-600">
                        {user.score || 0}
                      </div>
                      <p className="text-xs text-gray-600">
                        {user.unlockedChallenges?.length || 0} 關卡
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* 統計資訊 */}
        {!loading && leaderboard.length > 0 && (
          <div className="mt-8 bg-white rounded-2xl shadow-2xl p-6 max-w-2xl mx-auto">
            <h2 className="text-xl font-bold text-gray-800 mb-4">📊 統計</h2>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600">
                  {leaderboard.length}
                </div>
                <p className="text-sm text-gray-600">參賽隊伍</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600">
                  {Math.max(...leaderboard.map((u) => u.score || 0))}
                </div>
                <p className="text-sm text-gray-600">最高分</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600">
                  {Math.round(
                    leaderboard.reduce((sum, u) => sum + (u.score || 0), 0) /
                      leaderboard.length
                  )}
                </div>
                <p className="text-sm text-gray-600">平均分</p>
              </div>
            </div>
          </div>
        )}
      </div>

      <Navigation />
    </div>
  );
}

export default LeaderboardPage;
