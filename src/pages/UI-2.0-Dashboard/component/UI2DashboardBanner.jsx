import React from "react";

export const UI2DashboardBanner = () => {
  return (
    <>
     
      <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel">
        <div className="carousel-inner">
          <div className="carousel-item  active">
            <img className="w-100 bannerImage" src="/ui2.0dashboard/Rectangle 3335.png" alt="Dashboard Banner" />
          </div>
          <div class="carousel-item">
            <img className="w-100 bannerImage" src="https://png.pngtree.com/thumb_back/fh260/background/20200714/pngtree-modern-double-color-futuristic-neon-background-image_351866.jpg" alt="Dashboard Banner" />
          </div>
          <div class="carousel-item">
            <img className="w-100 bannerImage" src="https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg?w=2000" alt="Dashboard Banner" />
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </>
  );
};
