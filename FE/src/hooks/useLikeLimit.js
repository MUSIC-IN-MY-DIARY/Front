import { useState } from 'react';
import { toast } from 'react-toastify';

export const useLikeLimit = () => {
  const [isLimited, setIsLimited] = useState(false);
  const [countdown, setCountdown] = useState(0);

  const handleLike = async (likeFunction) => {
    try {
      const response = await likeFunction();

      if (!response.ok) {
        const data = await response.json();

        if (response.status === 429) {
          setIsLimited(true);
          setCountdown(10);

          // 카운트다운 시작
          const countInterval = setInterval(() => {
            setCountdown((prev) => {
              if (prev <= 1) {
                clearInterval(countInterval);
                setIsLimited(false);
                return 0;
              }
              return prev - 1;
            });
          }, 1000);
        }
        throw new Error(data.message);
      }

      return response;
    } catch (error) {
      toast.error(error.message);
      throw error;
    }
  };

  return {
    handleLike,
    isLimited,
    countdown,
  };
};
