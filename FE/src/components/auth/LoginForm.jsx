import { useState } from 'react';
import '../../neumorphism.css';
import { useNavigate } from 'react-router-dom';
import ToastMessage from '../common/ToastMessage';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [toast, setToast] = useState({
    show: false,
    message: '',
    type: 'success',
  });

  const handleSignup = () => {
    navigate('/member/signup');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const formData = new FormData();
      formData.append('username', username);
      formData.append('password', password);

      const response = await fetch('http://localhost:8080/login', {
        method: 'POST',
        body: formData,
        credentials: 'include',
      });

      if (response.ok) {
        setToast({
          show: true,
          message: '로그인 성공!',
          type: 'success',
        });
        setTimeout(() => navigate('/diary/recommend-songs'), 500);
      } else {
        const errorData = await response.json();
        setToast({
          show: true,
          message: errorData.message || '로그인에 실패했습니다.',
          type: 'error',
        });
      }
    } catch (error) {
      setToast({
        show: true,
        message: '서버와의 통신 중 오류가 발생했습니다.',
        type: 'error',
      });
    }
  };

  return (
    <div className='flex flex-col items-center justify-center h-screen bg-gray-100'>
      <h2 className='text-3xl font-bold text-gray-800 mb-8'>Log In</h2>
      <form
        onSubmit={handleSubmit}
        className='bg-white p-8 rounded-lg shadow-md w-80'
      >
        <div className='mb-4'>
          <label
            htmlFor='username'
            className='block text-sm font-medium text-gray-600 mb-2'
          >
            Email
          </label>
          <input
            type='text'
            id='username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className='w-full p-3 rounded-lg border bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-300'
          />
        </div>
        <div className='mb-4'>
          <label
            htmlFor='password'
            className='block text-sm font-medium text-gray-600 mb-2'
          >
            Password
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
        <button
          type='submit'
          className='neumorphism-button w-full py-3 font-semibold text-gray-700 my-4'
          onClick={handleSignup}
        >
          sign up
        </button>
      </form>
      {toast.show && (
        <ToastMessage
          message={toast.message}
          type={toast.type}
          onClose={() => setToast({ ...toast, show: false })}
        />
      )}
    </div>
  );
};

export default LoginForm;
