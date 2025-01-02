import Header from '../components/common/Header';
import ChatComponent from '../components/common/ChatComponent';
import useAuth from '../hooks/useAuth';

const GenerateLyricsPage = () => {
  useAuth();

  return (
    <div className='flex flex-col h-screen'>
      <Header />
      <ChatComponent
        apiEndpoint={`${
          import.meta.env.VITE_BASE_URL
        }/api/diary/generate-lyrics`}
        placeholder='가사로 만들고 싶은 이야기를 적어주세요! ✍️'
      />
    </div>
  );
};

export default GenerateLyricsPage;
