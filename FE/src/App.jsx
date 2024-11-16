import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import RecommendSongsPage from './pages/RecommendSongsPage';
import GenerateLyricsPage from './pages/GenerateLyricsPage';
import MyPage from './pages/MyPage';

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
