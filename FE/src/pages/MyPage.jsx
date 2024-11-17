import { useState } from 'react';
import Header from '../components/common/Header';
import BookmarkSection from '../components/mypage/BookmarkSection';

const MyPage = () => {
  const [expandedSections, setExpandedSections] = useState({
    songs: false,
    lyrics: false,
  });

  const nickname = 'Tester';

  const toggleSection = (sectionType) => {
    setExpandedSections((prev) => ({
      ...prev,
      [sectionType]: !prev[sectionType],
    }));
  };

  return (
    <div className='min-h-screen bg-gray-100'>
      <Header />
      <div className='container mx-auto p-6'>
        <h1 className='text-3xl font-bold text-center mb-8 text-gray-700'>
          Hello, {nickname}
        </h1>
        <div className='space-y-6 max-w-4xl mx-auto'>
          <BookmarkSection
            title='🎵 노래 추천'
            type='songs'
            isExpanded={expandedSections.songs}
            onToggle={() => toggleSection('songs')}
          />
          <BookmarkSection
            title='✍️ 작사 추천'
            type='lyrics'
            isExpanded={expandedSections.lyrics}
            onToggle={() => toggleSection('lyrics')}
          />
        </div>
      </div>
    </div>
  );
};

export default MyPage;
