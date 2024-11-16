import { useNavigate, useLocation } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <header className='w-full p-4 px-10 bg-gray-100 shadow-md'>
      <div className='flex justify-between items-center'>
        <h1 className='text-2xl font-bold'>MIMD</h1>
        <div className='flex items-center gap-4'>
          <button
            onClick={() => navigate('/diary/recommend-songs')}
            className={`neumorphism-button ${
              isActive('/diary/recommend-songs')
                ? 'shadow-neumorph-pressed'
                : 'shadow-neumorph'
            }`}
          >
            Recommend Songs
          </button>
          <button
            onClick={() => navigate('/diary/generate-lyrics')}
            className={`neumorphism-button ${
              isActive('/diary/generate-lyrics')
                ? 'shadow-neumorph-pressed'
                : 'shadow-neumorph'
            }`}
          >
            Generate Lyrics
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
              💌
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
