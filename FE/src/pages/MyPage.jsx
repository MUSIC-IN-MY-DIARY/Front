import Header from '../components/common/Header';
import BookmarkComponent from '../components/mypage/BookmarkComponent';

const MyPage = () => {
  const nickname = 'Tester';

  return (
    <div className='min-h-screen bg-gray-100'>
      <Header />
      <div className='container mx-auto p-6'>
        <h1 className='text-3xl font-bold text-center my-6'>
          Hello, {nickname} 🫧
        </h1>
        <BookmarkComponent />
      </div>
    </div>
  );
};

export default MyPage;
