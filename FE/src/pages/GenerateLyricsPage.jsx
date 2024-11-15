import ChatComponent from '../components/common/ChatComponent';
import Header from '../components/common/Header';

const GenerateLyricsPage = () => {
  return (
    <div className='flex flex-col h-screen'>
      <Header className='sticky top-0' />
      <ChatComponent className='flex-1 overflow-hidden' />
    </div>
  );
};

export default GenerateLyricsPage;
