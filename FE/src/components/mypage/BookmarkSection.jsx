import { useState, useEffect } from 'react';
import Pagination from './Pagination';

const BookmarkSection = ({ title, type, isExpanded, onToggle }) => {
  const [bookmarks, setBookmarks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isExpanded) {
      fetchBookmarks(currentPage);
    }
  }, [currentPage, isExpanded, type]);

  const fetchBookmarks = async (page) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `http://localhost:8080/bookmarks/${type}?page=${page}`,
        {
          credentials: 'include',
        }
      );
      const data = await response.json();
      if (data.isSuccess) {
        setBookmarks(data.result.bookmarks);
        setTotalPages(data.result.totalPages);
      }
    } catch (error) {
      console.error('북마크 로딩 실패:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='bg-white rounded-lg shadow-md overflow-hidden'>
      <button
        onClick={onToggle}
        className='w-full px-6 py-4 flex justify-between items-center bg-gray-50 hover:bg-gray-100 transition-colors'
      >
        <h2 className='text-xl font-semibold'>{title}</h2>
        <span className='text-xl font-bold text-gray-500'>
          {isExpanded ? '▼' : '▶'}
        </span>
      </button>

      {isExpanded && (
        <div className='p-6'>
          {isLoading ? (
            <div className='text-center py-10'>Loading...</div>
          ) : (
            <>
              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                {type === 'songs'
                  ? // 노래 북마크 카드
                    bookmarks.map((bookmark) => (
                      <div
                        key={bookmark.id}
                        className='bg-gray-50 rounded-lg p-4 hover:shadow-md transition-shadow'
                      >
                        <div className='text-lg font-semibold mb-2'>
                          🎵 {bookmark.song_title}
                        </div>
                        <div className='text-gray-600 mb-1'>
                          🎤 {bookmark.artist}
                        </div>
                        <div className='text-gray-500 text-sm'>
                          🎼 {bookmark.genre}
                        </div>
                        <div className='text-gray-400 text-xs mt-4'>
                          {new Date(bookmark.created_at).toLocaleDateString()}
                        </div>
                      </div>
                    ))
                  : // 작사 북마크 카드
                    bookmarks.map((bookmark) => (
                      <div
                        key={bookmark.id}
                        className='bg-gray-50 rounded-lg p-4 hover:shadow-md transition-shadow'
                      >
                        <div className='whitespace-pre-line text-gray-700'>
                          ✍️ {bookmark.lyrics}
                        </div>
                        <div className='text-gray-400 text-xs mt-4'>
                          {new Date(bookmark.created_at).toLocaleDateString()}
                        </div>
                      </div>
                    ))}
              </div>
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default BookmarkSection;
