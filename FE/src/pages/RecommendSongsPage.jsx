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
            `🎵 ${song.song_title}
        🎤 ${song.artist}
        🎼 ${song.genre}
        ${index < songs.length - 1 ? '\n-------------------\n' : ''}`
        )
        .join('\n');
    } catch (error) {
      return answer;
    }
  };

  return (
    <div className='flex flex-col h-screen'>
      <Header />
      <ChatComponent
        apiEndpoint='http://localhost:8080/diary/recommend-songs'
        placeholder='오늘의 감정을 자유롭게 적어주세요! 💌'
        formatResponse={formatSongsResponse}
      />
    </div>
  );
};

export default RecommendSongsPage;
