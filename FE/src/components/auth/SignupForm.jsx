import { useState } from 'react';
import '../../neumorphism.css';
import { useNavigate } from 'react-router-dom';

const SignupForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    nickname: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert('패스워드가 일치하지 않습니다.');
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/member/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password,
          nickname: formData.nickname,
        }),
      });

      const data = await response.json();
      if (response.ok && data.isSuccess) {
        alert('회원가입 성공!');
        navigate('/');
      } else {
        alert(data.message || '회원가입 실패. 다시 시도해주세요!');
      }
    } catch (error) {
      alert('오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
      // console.log('오류 발생 ', error);
    }
  };

  const toggleShowPassword = () => setShowPassword(!showPassword);
  const toggleShowConfirmPassword = () =>
    setShowConfirmPassword(!showConfirmPassword);

  return (
    <div className='flex flex-col items-center justify-center h-screen bg-gray-100'>
      <h2 className='text-3xl font-bold text-gray-800 mb-6'>Sign Up</h2>
      <form className='flex flex-col w-80' onSubmit={handleSubmit}>
        <input
          type='text'
          name='username'
          placeholder='Username'
          className='neumorphism-button mb-4 p-3 focus:outline-none'
          value={formData.username}
          onChange={handleChange}
        />

        <div className='relative mb-4'>
          <input
            type={showPassword ? 'text' : 'password'}
            name='password'
            placeholder='Password'
            className='neumorphism-button p-3 pr-10 focus:outline-none w-full'
            value={formData.password}
            onChange={handleChange}
          />
          <span
            onClick={toggleShowPassword}
            className='absolute right-5 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500'
          >
            {showPassword ? '🕶️' : '👀'}
          </span>
        </div>

        <div className='relative mb-4'>
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            name='confirmPassword'
            placeholder='Confirm Password'
            className='neumorphism-button p-3 pr-10 focus:outline-none w-full'
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          <span
            onClick={toggleShowConfirmPassword}
            className='absolute right-5 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500'
          >
            {showConfirmPassword ? '🕶️' : '👀'}
          </span>
        </div>

        <input
          type='text'
          name='nickname'
          placeholder='Nickname'
          className='neumorphism-button mb-6 p-3 focus:outline-none'
          value={formData.nickname}
          onChange={handleChange}
        />
        <button
          type='submit'
          className='neumorphism-button p-3 font-semibold text-gray-700'
        >
          Sign up
        </button>
      </form>
    </div>
  );
};

export default SignupForm;
