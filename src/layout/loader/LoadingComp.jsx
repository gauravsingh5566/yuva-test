import React from 'react';

const LoadingComp = () => {
  return (
    <div>
      <div className="w-100 d-flex vh-100 align-items-center justify-content-between">
        <img src="images/loading.gif" alt="" className="d-block mx-auto" style={{ maxWidth: '100%' }} />
      </div>
    </div>
  );
};

export default LoadingComp;
