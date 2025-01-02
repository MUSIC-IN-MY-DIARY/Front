import { useState, useEffect } from 'react';
import Pagination from './Pagination';
import BookmarkDetailModal from './BookmarkDetailModal';

const BookmarkSection = ({ title, type, isExpanded, onToggle }) => {
  const [bookmarks, setBookmarks] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedBookmark, setSelectedBookmark] = useState(null);

  useEffect(() => {
    if (isExpanded) {
      fetchBookmarks(currentPage);
    }
  }, [currentPage, isExpanded, type]);

  const fetchBookmarks = async (page) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_BASE_URL
        }/api/bookmark/all/${type}?page=${page}`,
        {
          credentials: 'include',
        }
      );

      const data = await response.json();

      if (data.isSuccess) {
        setBookmarks(data.result.bookmarks || []);
        const { pageInfo } = data.result;
        if (pageInfo) {
          const totalPages = Math.ceil(pageInfo.totalCount / pageInfo.pageSize);
          setTotalPages(totalPages);

          if (page >= totalPages) {
            const lastPage = Math.max(0, totalPages - 1);
            setCurrentPage(lastPage);
          }
        }
      }
    } catch (error) {
      console.error('북마크 로딩 실패:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const refreshBookmarks = () => {
    fetchBookmarks(currentPage);
  };

  const handleBookmarkClick = async (id) => {
    try {
      const idParam = type === 'recommend-songs' ? 'songId' : 'chatId';
      const response = await fetch(
        `${
          import.meta.env.VITE_BASE_URL
        }/api/bookmark/detail/${type}?${idParam}=${id}`,
        {
          credentials: 'include',
        }
      );

      const data = await response.json();
      if (data.isSuccess) {
        setSelectedBookmark(data.result);
        setModalOpen(true);
      }
    } catch (error) {
      console.error('상세 조회 실패:', error);
    }
  };

  const handleDeleteBookmark = async (id) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/api/bookmark/${id}`,
        {
          method: 'PUT',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const data = await response.json();
      if (data.isSuccess) {
        refreshBookmarks();
      }
    } catch (error) {
      console.error('북마크 삭제 실패:', error);
    }
  };

  const renderBookmarkCard = (bookmark) => {
    if (type === 'recommend-songs') {
      return (
        <div
          key={bookmark.diaryId}
          onClick={() => handleBookmarkClick(bookmark.songIds[0])}
          className='bg-gray-50 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer h-40 overflow-hidden'
        >
          <div className='text-gray-700 mb-3 line-clamp-2'>
            {bookmark.diaryContent}
          </div>
          <div className='text-sm text-gray-500 line-clamp-2'>
            {bookmark.songTitles ? (
              <>추천된 노래: {bookmark.songTitles.join(', ')}</>
            ) : (
              <>추천된 노래 정보를 불러올 수 없습니다.</>
            )}
          </div>
        </div>
      );
    } else {
      return (
        <div
          key={bookmark.chatId}
          onClick={() => handleBookmarkClick(bookmark.chatId)}
          className='bg-gray-50 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer h-40 overflow-hidden'
        >
          <div className='text-gray-700 mb-3 line-clamp-2'>
            {bookmark.diaryContent}
          </div>
          <div className='text-sm text-gray-500 line-clamp-2'>
            {bookmark.generatedLyrics}
          </div>
        </div>
      );
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
              <div className='grid grid-cols-1 gap-6'>
                {bookmarks.map(renderBookmarkCard)}
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

      <BookmarkDetailModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        data={selectedBookmark}
        type={type}
      />
    </div>
  );
};

export default BookmarkSection;
