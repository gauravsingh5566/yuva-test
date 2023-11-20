import React from 'react';
import YouthGallery from "./WebsiteContentComps";
import SimpleBreadCrumb2 from "layout/SimpleBreadCrumb2";

const WebsiteContent = () => {
  return (
    <div>
      <SimpleBreadCrumb2 page={`WebSite Content`} navdata={[{ link: "/admin", text: "Home" }]} />
      <div className="container py-3">
        <h4>Edit or Add Website Content</h4>
        <YouthGallery />
      </div>
    </div>
  );
};

export default WebsiteContent;
