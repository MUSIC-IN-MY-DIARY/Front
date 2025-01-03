import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const useAuth = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BASE_URL}/api/v1/member/verify`,
          {
            method: 'GET',
            credentials: 'include', // 쿠키 포함
          }
        );

        if (!response.ok) {
          navigate('/');
        }
      } catch (error) {
        console.error('인증 확인 실패:', error);
        navigate('/');
      }
    };

    verifyAuth();
  }, [navigate]);
};

export default useAuth;
