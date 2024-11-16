import { useState } from 'react';
import Header from '../components/common/Header';
import BookmarkSection from '../components/mypage/BookmarkSection';

const MyPage = () => {
  const [expandedSection, setExpandedSection] = useState('songs'); // 'songs' 또는 'lyrics'
  const nickname = 'Tester';

  return (
    <div className='min-h-screen bg-gray-50'>
      <Header />
      <div className='container mx-auto p-6'>
        <h1 className='text-4xl font-bold text-center mb-2 my-10'>
          Hello, {nickname}
        </h1>
        <div className='mt-8 space-y-4'>
          <BookmarkSection
            title='🎵 Recommend Songs'
            type='songs'
            isExpanded={expandedSection === 'songs'}
            onToggle={() =>
              setExpandedSection(expandedSection === 'songs' ? null : 'songs')
            }
          />
          <BookmarkSection
            title='✒️ Generate Lyrics'
            type='lyrics'
            isExpanded={expandedSection === 'lyrics'}
            onToggle={() =>
              setExpandedSection(expandedSection === 'lyrics' ? null : 'lyrics')
            }
          />
        </div>
      </div>
    </div>
  );
};

export default MyPage;
