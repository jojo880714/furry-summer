import { useState } from 'react';
import { signInAnonymously } from 'firebase/auth';
import { auth } from '../firebase/config';
import { createOrUpdateUser } from '../firebase/functions';

function LoginPage() {
  const [petName, setPetName] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!petName.trim() || !ownerName.trim()) {
      setError('請輸入寵物名稱和飼主名稱');
      return;
    }

    setLoading(true);

    try {
      // 匿名登入
      const userCredential = await signInAnonymously(auth);
      const userId = userCredential.user.uid;

      // 建立使用者資料
      await createOrUpdateUser(userId, {
        petName: petName.trim(),
        ownerName: ownerName.trim(),
        score: 0,
        unlockedChallenges: [],
        createdAt: new Date().toISOString(),
      });

      // 登入成功後會自動導向首頁（由 App.jsx 處理）
    } catch (err) {
      console.error('登入失敗:', err);
      setError('登入失敗，請稍後再試');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-400 to-pink-500 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-orange-600 mb-2">🐾 Furry Summer</h1>
          <p className="text-gray-600">毛孩夏日挑戰賽</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              寵物名稱 🐕
            </label>
            <input
              type="text"
              value={petName}
              onChange={(e) => setPetName(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              placeholder="輸入你的毛孩名字"
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              飼主名稱 👤
            </label>
            <input
              type="text"
              value={ownerName}
              onChange={(e) => setOwnerName(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              placeholder="輸入你的名字"
              disabled={loading}
            />
          </div>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-orange-500 to-pink-500 text-white font-bold py-3 px-4 rounded-lg hover:from-orange-600 hover:to-pink-600 transition duration-300 disabled:opacity-50"
          >
            {loading ? '登入中...' : '開始挑戰 🚀'}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          <p>Joyner Travel 兩天一夜活動</p>
          <p>60 位參賽者 + 8 隻毛孩</p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
