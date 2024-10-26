// src/App.jsx
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
// import SignupPage from './pages/SignupPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<LoginPage />} />
        {/* <Route path='/memebr/singup' element={<SignupPage />} /> */}
      </Routes>
    </Router>
  );
};

export default App;
