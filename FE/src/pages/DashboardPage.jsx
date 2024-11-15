import { useState } from 'react';
import ChatComponent from '../components/common/ChatComponent';
import Header from '../components/common/Header';
import useAuth from '../hooks/useAuth';

// apiUrl을 props로 받아서 재사용 가능한 대시보드 컴포넌트
const DashboardPage = ({ apiUrl }) => {
  useAuth();
  const [userInput, setUserInput] = useState('');
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // 쿠키 포함
        body: JSON.stringify({ content: userInput }),
      });

      if (!response.ok) throw new Error('API 요청 실패');
      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error('요청 실패:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='flex flex-col h-screen'>
      <Header className='sticky top-0' />
      <ChatComponent
        className='flex-1 overflow-hidden'
        userInput={userInput}
        setUserInput={setUserInput}
        handleSubmit={handleSubmit}
        result={result}
        isLoading={isLoading}
      />
    </div>
  );
};

export default DashboardPage;
