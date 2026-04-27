import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { auth } from './firebase/config';
import { onAuthStateChanged } from 'firebase/auth';

import LoginPage from './components/LoginPage';
import HomePage from './components/HomePage';
import UnlockPage from './components/UnlockPage';
import LeaderboardPage from './components/LeaderboardPage';
import ProfilePage from './components/ProfilePage';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-400 to-pink-500 flex items-center justify-center">
        <div className="text-white text-2xl">載入中...</div>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        <Route 
          path="/login" 
          element={user ? <Navigate to="/" /> : <LoginPage />} 
        />
        <Route 
          path="/" 
          element={user ? <HomePage /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/unlock" 
          element={user ? <UnlockPage /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/leaderboard" 
          element={user ? <LeaderboardPage /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/profile" 
          element={user ? <ProfilePage /> : <Navigate to="/login" />} 
        />
      </Routes>
    </Router>
  );
}

export default App;
