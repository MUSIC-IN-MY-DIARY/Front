import { useLikeThrottle } from '../hooks/useLikeThrottle';

const LikeButton = ({ chatId }) => {
  const { handleLike, isThrottled, countdown } = useLikeThrottle();

  const onLikeClick = async () => {
    try {
      await handleLike(async () => {
        return await fetch(
          `${import.meta.env.VITE_BASE_URL}${
            import.meta.env.VITE_API_PATH
          }/chat/${chatId}/like`,
          {
            method: 'POST',
            credentials: 'include',
          }
        );
      });
      // 좋아요 성공 처리
    } catch (error) {
      console.error('좋아요 실패:', error);
    }
  };

  return (
    <button
      onClick={onLikeClick}
      disabled={isThrottled}
      className={`like-button ${isThrottled ? 'disabled' : ''}`}
    >
      {isThrottled ? `${countdown}초 후 가능` : '좋아요'}
    </button>
  );
};

export default LikeButton;
