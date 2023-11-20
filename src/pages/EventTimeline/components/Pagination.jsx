import React, { useEffect } from 'react';

// import "./Pagination.css";

const Pagination = ({ totalPosts, postsPerPage, setCurrentPage, currentPage }) => {
  let pages = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pages.push(i);
  }

  return (
    <div
      className="pagination d-flex justify-content-center"
      style={{
        marginTop: '32px',
      }}>
      {pages.map((page, index) => {
        return (
          <button
            key={index}
            onClick={() => {
              window.scrollTo(0, 0);
              setCurrentPage(page);
            }}
            className={page == currentPage ? 'active' : ''}
            style={{
              margin: '0.2rem',
              padding: '0.3rem',
              borderRadius: '5px',
              backgroundColor: page === currentPage ? 'rgb(254 156 21)' : '#fff',
              color: page === currentPage ? '#fff' : 'black',
              border: '3px solid rgb(254 156 21)',
              cursor: 'pointer',
              width: '50px',
              height: '35px',
              borderRadius: '17px',
              fontSize: '18px',
              fontWeight: '600',
            }}>
            {page}
          </button>
        );
      })}
    </div>
  );
};

export default Pagination;
