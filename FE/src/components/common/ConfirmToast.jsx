import { useEffect } from 'react';

const ConfirmToast = ({ message, onConfirm, onCancel }) => {
  useEffect(() => {
    // ESC 키 이벤트 핸들러
    const handleEsc = (event) => {
      if (event.key === 'Escape') {
        onCancel();
      }
    };

    // 이벤트 리스너 등록
    document.addEventListener('keydown', handleEsc);

    // 클린업
    return () => {
      document.removeEventListener('keydown', handleEsc);
    };
  }, [onCancel]);

  return (
    <div
      className='fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50'
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onCancel();
        }
      }}
    >
      <div className='bg-white rounded-lg p-6 shadow-xl max-w-sm w-full mx-4'>
        <p className='text-center text-gray-800 mb-6'>{message}</p>
        <div className='flex justify-center gap-4'>
          <button
            onClick={onConfirm}
            className='px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-[#BE3E3E] transition-colors shadow-md'
          >
            Yes
          </button>
          <button
            onClick={onCancel}
            className='px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-[#BE3E3E] transition-colors shadow-md'
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmToast;
