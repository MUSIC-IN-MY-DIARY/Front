import { useState } from 'react';
import '../../neumorphism.css';

const LoginForm = () => {
  const [userEmail, setUserEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userEmail, password }),
      });

      if (response.ok) {
        const data = await response.json();
        // 로그인 성공 처리
        console.log('로그인 성공:', data);
        // 여기에 로그인 성공 후 처리 로직 추가 (예: 리다이렉트, 상태 업데이트 등)
      } else {
        const errorData = await response.json();
        setError(errorData.message || '로그인에 실패했습니다.');
      }
    } catch (error) {
      setError('서버와의 통신 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className='flex flex-col items-center justify-center h-screen bg-gray-100'>
      <h2 className='text-3xl font-bold text-gray-700 mb-8'>Log In</h2>
      <form
        onSubmit={handleSubmit}
        className='bg-white p-8 rounded-lg shadow-md w-80'
      >
        <div className='mb-4'>
          <label
            htmlFor='userEmail'
            className='block text-sm font-medium text-gray-600 mb-2'
          >
            email
          </label>
          <input
            type='text'
            id='userEmail'
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            required
            className='w-full p-3 rounded-lg border bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-300'
          />
        </div>
        <div className='mb-4'>
          <label
            htmlFor='password'
            className='block text-sm font-medium text-gray-600 mb-2'
          >
            password
          </label>
          <input
            type='password'
            id='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className='w-full p-3 rounded-lg border bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-300'
          />
        </div>
        {error && <p className='text-red-500 text-sm mb-4'>{error}</p>}
        <button
          type='submit'
          className='neumorphism-button w-full py-3 font-semibold text-gray-700'
        >
          submit
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
