import { useEffect, useState } from 'react';

const BookmarkComponent = () => {
  const [bookmarks, setBookmarks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    const fetchBookmarks = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/member/mypage?page=${currentPage}&size=${itemsPerPage}`
        );
        const data = await response.json();
        if (data.isSuccess) {
          setBookmarks(data.result.bookmarks);
          setTotalPages(Math.ceil(data.result.totalCount / itemsPerPage));
        } else {
          console.log(data.message);
        }
      } catch (error) {
        console.error('API 요청 에러', error);
      }
    };

    fetchBookmarks();
  }, [currentPage]);

  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  return (
    <div className='container mx-auto p-6'>
      <h2 className='text-2xl font-bold text-center mb-6'>Bookmarks</h2>
      <div className='grid grid-cols-3 gap-6'>
        {/* 받아온 데이터를 2x3 형태로 보여줌 */}
        {bookmarks.map((bookmarks) => (
          <div key={bookmarks.diaryId} className='neumorphism-card'>
            <h3 className='text-xl font-semibold mb-2'>
              Diary ID: {bookmarks.diaryId}
            </h3>
            <p className='text-gray-600'>{bookmarks.diary_content}</p>
          </div>
        ))}
      </div>

      <div className='flex justify-between mt-6'>
        <button
          onClick={goToPrevPage}
          disabled={currentPage === 1}
          className='neumorphism-button'
        >
          Prev
        </button>
        <button
          onClick={goToNextPage}
          disabled={currentPage === totalPages}
          className='neumorphism-button'
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default BookmarkComponent;
