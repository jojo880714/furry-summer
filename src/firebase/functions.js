import { 
  collection, 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc, 
  getDocs, 
  query, 
  orderBy,
  limit 
} from 'firebase/firestore';
import { db } from './config';

// 建立或更新使用者資料
export const createOrUpdateUser = async (userId, userData) => {
  try {
    const userRef = doc(db, 'users', userId);
    await setDoc(userRef, userData, { merge: true });
    return { success: true };
  } catch (error) {
    console.error('建立/更新使用者失敗:', error);
    return { success: false, error };
  }
};

// 取得使用者資料
export const getUserData = async (userId) => {
  try {
    const userRef = doc(db, 'users', userId);
    const userSnap = await getDoc(userRef);
    
    if (userSnap.exists()) {
      return { success: true, data: userSnap.data() };
    } else {
      return { success: false, error: '使用者不存在' };
    }
  } catch (error) {
    console.error('取得使用者資料失敗:', error);
    return { success: false, error };
  }
};

// 解鎖關卡
export const unlockChallenge = async (userId, challengeId, code) => {
  try {
    const userRef = doc(db, 'users', userId);
    const userSnap = await getDoc(userRef);
    
    if (!userSnap.exists()) {
      return { success: false, error: '使用者不存在' };
    }
    
    const userData = userSnap.data();
    const unlockedChallenges = userData.unlockedChallenges || [];
    
    if (unlockedChallenges.includes(challengeId)) {
      return { success: false, error: '已經解鎖過此關卡' };
    }
    
    // 驗證密碼（這裡簡化處理，實際應該要有密碼驗證邏輯）
    unlockedChallenges.push(challengeId);
    const newScore = (userData.score || 0) + 100;
    
    await updateDoc(userRef, {
      unlockedChallenges,
      score: newScore,
      lastUnlockTime: new Date().toISOString()
    });
    
    return { success: true, newScore };
  } catch (error) {
    console.error('解鎖關卡失敗:', error);
    return { success: false, error };
  }
};

// 取得排行榜
export const getLeaderboard = async (limitCount = 10) => {
  try {
    const usersRef = collection(db, 'users');
    const q = query(usersRef, orderBy('score', 'desc'), limit(limitCount));
    const querySnapshot = await getDocs(q);
    
    const leaderboard = [];
    querySnapshot.forEach((doc) => {
      leaderboard.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    return { success: true, data: leaderboard };
  } catch (error) {
    console.error('取得排行榜失敗:', error);
    return { success: false, error };
  }
};
