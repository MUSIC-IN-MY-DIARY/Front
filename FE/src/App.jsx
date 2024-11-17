import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import RecommendSongsPage from './pages/RecommendSongsPage';
import GenerateLyricsPage from './pages/GenerateLyricsPage';
import MyPage from './pages/MyPage';
import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const isLoggedOut = localStorage.getItem('isLoggedOut');

    if (isLoggedOut === 'true' && location.pathname !== '/') {
      navigate('/', {
        replace: true,
        state: { message: '로그인이 필요합니다.' },
      });
    }
  }, [navigate, location]);

  return children;
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<LoginPage />} />
        <Route path='/member/signup' element={<SignupPage />} />
        <Route path='/member/mypage' element={<MyPage />} />
        <Route path='/diary/recommend-songs' element={<RecommendSongsPage />} />
        <Route path='/diary/generate-lyrics' element={<GenerateLyricsPage />} />
      </Routes>
    </Router>
  );
};

export default App;
