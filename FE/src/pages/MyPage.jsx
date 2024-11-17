import { useState, useEffect } from 'react';
import Header from '../components/common/Header';
import BookmarkSection from '../components/mypage/BookmarkSection';

const MyPage = () => {
  const [expandedSections, setExpandedSections] = useState({
    songs: false,
    lyrics: false,
  });
  const [nickname, setNickname] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // 초기 데이터 로딩
  useEffect(() => {
    const fetchMemberInfo = async () => {
      try {
        const response = await fetch('http://localhost:8080/member/info', {
          credentials: 'include',
        });
        const data = await response.json();
        if (data.isSuccess) {
          setNickname(data.result.nickname);
        }
      } catch (error) {
        console.error('사용자 정보 로딩 실패:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMemberInfo();
  }, []);

  const toggleSection = (sectionType) => {
    setExpandedSections((prev) => ({
      ...prev,
      [sectionType]: !prev[sectionType],
    }));
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

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
            type='recommend-songs'
            isExpanded={expandedSections.songs}
            onToggle={() => toggleSection('songs')}
          />
          <BookmarkSection
            title='✍️ 작사 추천'
            type='generate-lyrics'
            isExpanded={expandedSections.lyrics}
            onToggle={() => toggleSection('lyrics')}
          />
        </div>
      </div>
    </div>
  );
};

export default MyPage;
