import { useEffect } from 'react';

const BookmarkDetailModal = ({ isOpen, onClose, data, type }) => {
  const handleDelete = async () => {
    try {
      let id;
      if (type === 'recommend-songs') {
        id = data.diary?.diary_id;
      } else {
        id = data.chat?.chat_id;
      }

      if (!id) {
        console.error('삭제할 북마크의 ID를 찾을 수 없습니다.', data);
        return;
      }

      console.log('삭제 요청 ID:', id);

      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/api/bookmark/${id}`,
        {
          method: 'PUT',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({}),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log('삭제 응답:', result);

      if (result.isSuccess) {
        onClose();
        window.location.reload();
      } else {
        throw new Error(result.message || '북마크 삭제 실패');
      }
    } catch (error) {
      console.error('북마크 삭제 중 오류 발생:', error);
    }
  };

  if (!isOpen || !data) return null;

  // 모달 외부 클릭 핸들러
  const handleBackgroundClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('ko-KR');
  };

  return (
    <div
      className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'
      onClick={handleBackgroundClick} // 외부 클릭 이벤트 추가
    >
      <div className='bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto'>
        <div className='flex justify-between items-center mb-4'>
          <h2 className='text-xl font-bold'>북마크 상세</h2>
          <div className='flex items-center gap-4'>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleDelete();
              }}
              className='text-red-500 hover:text-red-700'
            >
              삭제
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
              className='text-gray-500 hover:text-gray-700'
            >
              ✕
            </button>
          </div>
        </div>

        <div className='space-y-4'>
          {/* 일기 정보 */}
          <div className='border-b pb-4'>
            <p className='text-sm text-gray-500'>
              작성자: {data.diary?.nickname}
            </p>
            <p className='text-sm text-gray-500'>
              작성일: {formatDate(data.diary?.created_at)}
            </p>
            <p className='mt-2 text-gray-800'>{data.diary?.diary_content}</p>
          </div>

          {/* 노래 추천 또는 작사 내용 */}
          {type === 'recommend-songs' ? (
            <div className='space-y-4'>
              <h3 className='font-semibold'>추천된 노래 목록</h3>
              <div className='grid gap-2'>
                {data.songs?.map((song) => (
                  <div key={song.song_id} className='bg-gray-50 p-3 rounded-lg'>
                    <p className='text-sm'>
                      <span className='inline-block w-16'>🎵 곡명</span>
                      {song.song_title}
                    </p>
                    <p className='text-sm'>
                      <span className='inline-block w-16'>🎤 가수</span>
                      {song.artist}
                    </p>
                    <p className='text-sm'>
                      <span className='inline-block w-16'>🎹 장르</span>
                      {song.genre}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className='space-y-2'>
              <h3 className='font-semibold'>생성된 가사</h3>
              <div className='bg-gray-50 p-4 rounded-lg whitespace-pre-line'>
                {data.chat?.answer}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookmarkDetailModal;
