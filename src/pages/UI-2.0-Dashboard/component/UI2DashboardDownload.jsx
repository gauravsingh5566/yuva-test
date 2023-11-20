import React from "react";

const downloads = [
  {
    id: 1,
    logo: "/ui2.0dashboard/Downloads Folder.svg",
    name: "Event Collaterals",
  },
  {
    id: 2,
    logo: "/ui2.0dashboard/Cleanup Noise.svg",
    name: "Background Guides",
  },

  {
    id: 3,
    logo: "/ui2.0dashboard/Versions.svg",
    name: "Formats",
  },
];
export const UI2DashboardDownload = () => {
  return (
    <>
      
      <div className="rounded-4 shadow px-3 py-3">
        <h3 className="fs-3 fw-bold py-3 px-3">Downloads</h3>
        <div className="w-100 px-3 py-3">
        
        <div className="row">
          {downloads?.map((download, index) => {
            return (
              <div
              className={`col-12 col-sm-6 col-md-4 col-lg-2 text-center`}
              key={download?.id}
            >
              <div className="d-flex flex-column justify-content-center align-items-center mb-4">
                <div
                  className='border border-1 rounded-circle p-4 download_card downloadCardcolor'
                 
                >
                  <img
                    src={download?.logo ? download?.logo : "/ui2.0dashboard/Ellipse 80.png"}
                    alt={download?.name}
                    className="p-1 h-100 w-100"
                  />
                </div>
                <span className="fw-400 text-center">{download?.name}</span>
              </div>
            </div>
            )})}
            </div>
            </div>
      </div>
    </>
  );
};
