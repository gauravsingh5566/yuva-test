import React from "react";
const gallery = [
  {
    id: 1,
    img: "/ui2.0dashboard/instagram.svg",
    name: "Photos",
    total: "26 Photos",
  },
  {
    id: 2,
    img: "/ui2.0dashboard/Play Button Circled.svg",
    name: "Videos",
    total: "26 Videos",
  },
  {
    id: 3,
    img: "/ui2.0dashboard/Reporter.svg",
    name: "Media Coverage",
    total: "",
  },
];

export const UI2DashboardGallery = () => {
  return (
    <>
      <div className="">
        <div className="row">
          {gallery?.map((item, index) => {
            return (
              <>
                <div
                  className="col-12 col-sm-12 col-md-6 col-lg-4 mb-sm-3 mb-3 "
                  key={item?.id}
                >
                  {/* Gallery Card */}
                  <div
                    className="card border-0 shadow"
                    style={{
                      // height: "105px",
                      // width: "270px",
                      marginRight: "16px",
                    }}
                  >
                    <div className="d-flex justify-content-lg-evenly p-3 ">
                      <div className="me-2 me-sm-2">
                        <img
                          src={item?.img}
                          alt={item?.name}
                          
                        />
                      </div>
                      <div className="">
                        <div className="card-texet fw-bold">{item?.name}</div>
                        <span class="fw-normal">{item?.total}</span>
                      </div>
                    </div>
                  </div>
                  {/* Gallery Card */}
                </div>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
};
