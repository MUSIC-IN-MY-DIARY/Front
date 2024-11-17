const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className='flex justify-center items-center mt-6 gap-4'>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 0}
        className='px-4 py-2 rounded-lg bg-blue-500 text-white disabled:bg-gray-300'
      >
        이전
      </button>
      <span>
        {currentPage + 1} / {totalPages}
      </span>
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages - 1}
        className='px-4 py-2 rounded-lg bg-blue-500 text-white disabled:bg-gray-300'
      >
        다음
      </button>
    </div>
  );
};

export default Pagination;
