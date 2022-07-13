import React, { useEffect, useState } from 'react';
import './Pagination.css';
import { USER_PER_PAGE } from '../utils/constants';

const Pagination = ({ totalPages, page, handleClick }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageNumberLimit, setPageNumberLimit] = useState(USER_PER_PAGE);
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);

  const pages = [];
  for (let i = 1; i <= Math.ceil(totalPages / pageNumberLimit); i++) {
    pages.push(i);
  }
  const handleNextbtn = () => {
    setCurrentPage(currentPage + 1);
    handleClick(currentPage + 1);

    if (currentPage + 1 > maxPageNumberLimit) {
      setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  };

  const handlePrevbtn = () => {
    setCurrentPage(currentPage - 1);
    handleClick(currentPage - 1);

    if ((currentPage - 1) % pageNumberLimit === 0) {
      setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }
  };

  useEffect(() => {
    setCurrentPage(page);
  }, [page]);

  return (
    <>
      <ul className="pageNumbers">
        <li>
          <button
            onClick={handlePrevbtn}
            disabled={currentPage === pages[0] ? true : false}
          >
            <i class="fa fa-angle-left" aria-hidden="true"></i>
          </button>
        </li>
        {pages.map((number) => {
          if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
            return (
              <li
                key={number}
                id={number}
                onClick={() => {
                  setCurrentPage(number);
                  handleClick(number);
                }}
                className={currentPage === number ? 'active' : null}
              >
                {number}
              </li>
            );
          } else {
            return null;
          }
        })}
        <li>
          <button
            onClick={handleNextbtn}
            disabled={currentPage === pages[pages.length - 1] ? true : false}
          >
            <i class="fa fa-angle-right" aria-hidden="true"></i>
          </button>
        </li>
      </ul>
      {/* <span style={{ color: '#ffffff' }}>Total Page: {totalPages}</span> */}
    </>
  );
};

export default Pagination;
