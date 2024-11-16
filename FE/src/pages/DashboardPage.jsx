import { useState } from 'react';
import ChatComponent from '../components/common/ChatComponent';
import Header from '../components/common/Header';
import useAuth from '../hooks/useAuth';
import PropTypes from 'prop-types';

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

      const data = await response.json();
      if (!response.ok || !data.isSuccess) throw new Error(data.message);
      console.log('서버에서 보냈어!!! ', data);

      setResult(data.result?.answer);
    } catch (error) {
      console.error('요청 실패:', error);
      setResult({
        answer: `서버와의 통신중 오류가 발생했다시바러마 프론트 잘못임 ㅅㅂ: ${error.message}`,
      });
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

// PropTypes를 사용해 apiUrl의 타입을 정의
DashboardPage.propTypes = {
  apiUrl: PropTypes.string.isRequired,
};

export default DashboardPage;
