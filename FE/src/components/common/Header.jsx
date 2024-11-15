import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  const goToMyPage = () => {
    navigate('/member/mypage');
  };

  return (
    <header className='w-full p-4 px-10 bg-gray-100 shadow-md'>
      <div className='flex justify-between items-center'>
        <h1 className='text-2xl font-bold'>MIMD</h1>
        <div className='flex items-center gap-4'>
          <button
            onClick={() => navigate('/diary/recommend-songs')}
            className='neumorphism-button'
          >
            노래 추천
          </button>
          <button
            onClick={() => navigate('/diary/generate-lyrics')}
            className='neumorphism-button'
          >
            가사 생성
          </button>
          <button onClick={goToMyPage} className='neumorphism-button'>
            <span role='img' aria-label='My Page'>
              💌
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
