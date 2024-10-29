// src/App.jsx
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import DashboardPage from './pages/DashboardPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<LoginPage />} />
        <Route path='/member/signup' element={<SignupPage />} />
        <Route path='/dashboard' element={<DashboardPage />} />
      </Routes>
    </Router>
  );
};

export default App;
