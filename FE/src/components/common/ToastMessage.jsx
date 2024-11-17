import { useEffect } from 'react';

const ToastMessage = ({ message, type = 'success', onClose }) => {
  useEffect(() => {
    // 3초 후 자동으로 닫히는 타이머
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    // ESC 키 이벤트 핸들러
    const handleEsc = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    // 이벤트 리스너 등록
    document.addEventListener('keydown', handleEsc);

    // 클린업
    return () => {
      clearTimeout(timer);
      document.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  return (
    <div
      className='fixed inset-0 flex items-center justify-center z-50'
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        className={`px-6 py-3 rounded-lg shadow-lg ${
          type === 'success'
            ? 'bg-[#BE3E3E] text-white'
            : type === 'error'
            ? 'bg-red-500 text-white'
            : 'bg-blue-500 text-white'
        }`}
      >
        {message}
      </div>
    </div>
  );
};

export default ToastMessage;
