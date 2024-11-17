import { useNavigate, useLocation } from 'react-router-dom';
import ToastMessage from './ToastMessage';
import ConfirmToast from './ConfirmToast';
import { useState } from 'react';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showConfirm, setShowConfirm] = useState(false);
  const [toast, setToast] = useState({
    show: false,
    message: '',
    type: 'success',
  });

  const isActive = (path) => {
    return location.pathname === path;
  };

  const handleLogoutClick = () => {
    setShowConfirm(true);
  };

  const handleLogoutConfirm = async () => {
    try {
      // 로그아웃 API 호출
      const response = await fetch('http://localhost:8080/member/logout', {
        method: 'POST',
        credentials: 'include', // 쿠키 포함
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        // 브라우저의 모든 쿠키 삭제
        document.cookie.split(';').forEach((cookie) => {
          document.cookie = cookie
            .replace(/^ +/, '')
            .replace(/=.*/, `=;expires=${new Date(0).toUTCString()};path=/`);
        });

        // 로컬 스토리지와 세션 스토리지 초기화
        localStorage.clear();
        sessionStorage.clear();

        // 브라우저 히스토리 초기화 (뒤로가기 방지)
        window.history.pushState(null, '', '/');

        // 로그아웃 상태를 localStorage에 저장
        localStorage.setItem('isLoggedOut', 'true');

        // 홈으로 리다이렉션
        navigate('/', { replace: true });

        // 토스트 메시지 표시
        setToast({
          show: true,
          message: '로그아웃 되었습니다.',
          type: 'success',
        });
      } else {
        throw new Error('로그아웃 실패');
      }
    } catch (error) {
      console.error('로그아웃 중 오류:', error);
      setToast({
        show: true,
        message: '로그아웃 중 오류가 발생했습니다.',
        type: 'error',
      });
    }
    setShowConfirm(false);
  };

  return (
    <header className='w-full p-4 px-10 bg-gray-100 shadow-md'>
      <div className='flex justify-between items-center'>
        <h1
          className='text-2xl font-bold cursor-pointer hover:text-gray-700'
          onClick={() => navigate('/diary/recommend-songs')}
        >
          MIMD
        </h1>
        <div className='flex items-center gap-4'>
          <button
            onClick={() => navigate('/diary/recommend-songs')}
            className={`neumorphism-button ${
              isActive('/diary/recommend-songs')
                ? 'shadow-neumorph-pressed'
                : 'shadow-neumorph'
            }`}
          >
            🎶 Recommend Songs
          </button>
          <button
            onClick={() => navigate('/diary/generate-lyrics')}
            className={`neumorphism-button ${
              isActive('/diary/generate-lyrics')
                ? 'shadow-neumorph-pressed'
                : 'shadow-neumorph'
            }`}
          >
            📝 Generate Lyrics
          </button>
          <button
            onClick={() => navigate('/member/mypage')}
            className={`neumorphism-button ${
              isActive('/member/mypage')
                ? 'shadow-neumorph-pressed'
                : 'shadow-neumorph'
            }`}
          >
            <span role='img' aria-label='My Page'>
              💌 My Page
            </span>
          </button>
          <button
            onClick={handleLogoutClick}
            className={`neumorphism-button ${
              isActive('/') ? 'shadow-neumorph-pressed' : 'shadow-neumorph'
            }`}
            aria-label='Logout'
          >
            <span role='img' aria-label='Logout'>
              👋🏻 Logout
            </span>
          </button>
        </div>
      </div>

      {showConfirm && (
        <ConfirmToast
          message='정말 로그아웃 하시겠습니까?'
          onConfirm={handleLogoutConfirm}
          onCancel={() => setShowConfirm(false)}
        />
      )}

      {toast.show && (
        <ToastMessage
          message={toast.message}
          type={toast.type}
          onClose={() => setToast({ ...toast, show: false })}
        />
      )}
    </header>
  );
};

export default Header;
