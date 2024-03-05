import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  handlePageChange: (page: number) => void;
  handlePrevPage: () => void;
  handleNextPage: () => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  handlePageChange,
  handlePrevPage,
  handleNextPage,
}) => {
  const pagesToShow = 3;
  const startPage = Math.max(1, currentPage - Math.floor(pagesToShow / 2));
  const endPage = Math.min(totalPages, startPage + pagesToShow - 1);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  const handlePrevPageWithScroll = () => {
    handlePrevPage();
    setTimeout(scrollToTop);
  };

  const handleNextPageWithScroll = () => {
    handleNextPage();
    setTimeout(scrollToTop);
  };

  return (
    <div className="col-12 d-flex justify-content-between">
      <button
        className="svg-button"
        onClick={handlePrevPageWithScroll}
        disabled={currentPage === 1}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 15 16"
          fill="none"
        >
          <path
            d="M5.61445 2.77356L5.61429 2.77372L0.530399 7.84253C0.530365 7.84256 0.530332 7.8426 0.530298 7.84263C0.483749 7.8892 0.454657 7.93571 0.438308 7.98186L0.438047 7.98258C0.419088 8.03525 0.409026 8.09311 0.409026 8.15733C0.409026 8.22154 0.419088 8.27941 0.438048 8.33207L0.438306 8.3328C0.454669 8.37898 0.483792 8.42552 0.530399 8.47213L5.61445 13.5562C5.72485 13.6666 5.86129 13.7228 6.03485 13.7228C6.20524 13.7228 6.3477 13.6637 6.47034 13.5411C6.59458 13.4169 6.65206 13.2788 6.65206 13.1207C6.65206 12.9625 6.59458 12.8245 6.47034 12.7003L2.035 8.26494L1.92738 8.15733L2.035 8.04971L6.47034 3.61437C6.58153 3.50318 6.63697 3.36897 6.63697 3.20181C6.63697 3.03729 6.57865 2.89696 6.45526 2.77356C6.33101 2.64932 6.193 2.59184 6.03485 2.59184C5.87671 2.59184 5.73869 2.64932 5.61445 2.77356Z"
            fill="#232221"
            stroke="white"
            strokeWidth="0.30438"
          />
        </svg>
      </button>
      {startPage > 1 && (
        <>
          <button
            className="button-number"
            onClick={() => {
              handlePageChange(1);
              scrollToTop();
            }}
          >
            1
          </button>
          {startPage > 2 && <span>...</span>}
        </>
      )}
      {Array.from({ length: endPage - startPage + 1 }, (_, i) => (
        <button
          key={startPage + i}
          onClick={() => {
            handlePageChange(startPage + i);
            scrollToTop();
          }}
          className={`button-number ${
            currentPage === startPage + i ? "button-number-active" : ""
          }`}
        >
          {startPage + i}
        </button>
      ))}
      {endPage < totalPages && (
        <>
          {endPage < totalPages - 1 && <span>...</span>}
          <button
            className="button-number"
            onClick={() => {
              handlePageChange(totalPages);
              scrollToTop();
            }}
          >
            {totalPages}
          </button>
        </>
      )}
      <button
        className="svg-button"
        onClick={handleNextPageWithScroll}
        disabled={currentPage === totalPages}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 15 16"
          fill="none"
        >
          <path
            d="M9.38555 13.4139L9.38571 13.4138L14.4696 8.34497C14.4696 8.34494 14.4697 8.3449 14.4697 8.34487C14.5163 8.2983 14.5453 8.25179 14.5617 8.20564L14.562 8.20492C14.5809 8.15225 14.591 8.09439 14.591 8.03017C14.591 7.96596 14.5809 7.90809 14.562 7.85543L14.5617 7.8547C14.5453 7.80852 14.5162 7.76198 14.4696 7.71537L9.38555 2.63132C9.27515 2.52092 9.13871 2.46469 8.96515 2.46469C8.79476 2.46469 8.6523 2.52376 8.52966 2.64641C8.40542 2.77065 8.34794 2.90866 8.34794 3.06681C8.34794 3.22496 8.40542 3.36297 8.52966 3.48721L12.965 7.92256L13.0726 8.03017L12.965 8.13779L8.52966 12.5731C8.41847 12.6843 8.36303 12.8185 8.36303 12.9857C8.36303 13.1502 8.42135 13.2905 8.54474 13.4139C8.66899 13.5382 8.807 13.5957 8.96515 13.5957C9.12329 13.5957 9.26131 13.5382 9.38555 13.4139Z"
            fill="#232221"
            stroke="white"
            strokeWidth="0.30438"
          />
        </svg>
      </button>
    </div>
  );
};

export default Pagination;
