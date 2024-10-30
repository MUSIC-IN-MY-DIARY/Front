import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  const goToMyPage = () => {
    navigate('/mypage');
  };

  return (
    <header className='w-full p-4 px-10 bg-gray-100 shadow-md flex justify-between items-center'>
      <h1 className='text-2xl font-bold'>Dashboard</h1>
      <button onClick={goToMyPage} className='neumorphism-button'>
        <span role='img' aria-label='My Page'>
          💌
        </span>
      </button>
    </header>
  );
};

export default Header;
