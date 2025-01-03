import Header from '../components/common/Header';
import ChatComponent from '../components/common/ChatComponent';
import useAuth from '../hooks/useAuth';

const RecommendSongsPage = () => {
  useAuth();

  const formatSongsResponse = (answer) => {
    try {
      const songs = JSON.parse(answer);
      return songs
        .map(
          (song, index) =>
            `🎵 ${song.song_title}\n` +
            `🎤 ${song.artist}\n` +
            `🎹 ${song.genre}` +
            (index < songs.length - 1 ? '\n\n' : '')
        )
        .join('\n');
    } catch (error) {
      console.error('노래 정보 파싱 실패:', error, answer);
      return '노래 정보를 불러올 수 없습니다.';
    }
  };

  return (
    <div className='flex flex-col h-screen overflow-hidden'>
      <Header />
      <ChatComponent
        apiEndpoint={`${
          import.meta.env.VITE_BASE_URL
        }/api/v1/diary/recommend-songs`}
        placeholder='오늘의 감정을 자유롭게 적어주세요! 💌'
        formatResponse={formatSongsResponse}
      />
    </div>
  );
};

export default RecommendSongsPage;
