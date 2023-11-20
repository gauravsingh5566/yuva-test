import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { apiAuth, apiJson } from "api";
import { toast } from "react-toastify";
import { Grid, Navigation } from "swiper";
// import required modules
import { Swiper, SwiperSlide } from "swiper/react";
import { ArrowBackIosNew, ArrowForwardIos } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import AlbumSliderCard from "./components/AlbumSliderCard";
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";

function GallerySlider() {
  const [totalCount, setTotalCount] = useState(0);
  const [count, setCount] = useState(1);
  const [offset, setoffset] = useState(0);
  const [limit, setlimit] = useState(25);
  const [eventDetails, setEventDetails] = useState([]);
  const [search, setSearch] = useState("");
  async function fetch() {
    try {
      const res = await apiJson.get(`/public/gallery_event?offset=${offset}&limit=${limit}&search=${search}`);
      setEventDetails(res?.data?.result);
      setTotalCount(res?.data?.count);
      // console.log(res?.data?.result);
    } catch (err) {
      toast.error("Something went wrong!");
    }
  }
  useEffect(() => {
    fetch();
  }, []);

  useEffect(() => {
    if (totalCount > limit) {
      setCount(Math.ceil(totalCount / limit));
    }
    return () => {
      setCount(1);
    };
  }, [totalCount]);
  useEffect(() => {
    fetch();
  }, [offset]);
  return (
    <>
      <div className="py-5 bg-gray-white position-relative">
        <div className="container insta-feeds ">
          <div className="col-12 col-lg-8">
            <h2 className="text-dark fs-1">
              Our <span className="text-warning">Events</span>
            </h2>
            <img src="https://demo.xpeedstudio.com/evenex/multi-event/wp-content/uploads/sites/13/2021/02/header-line.png" className="attachment-large size-large" alt="" loading="lazy" width="92" height="12"></img>
          </div>
          <div className="p-relative w-100 overflow-hidden">
            <div className="swiper-button image-swiper-button2-next p-absolute" style={{ top: "50%", right: "0px", zIndex: 300 }}>
              <IconButton className="bg-success text-white">
                <ArrowForwardIos />
              </IconButton>
            </div>
            <div className="swiper-button image-swiper-button2-prev p-absolute" style={{ top: "50%", left: "0px", zIndex: 300 }}>
              <IconButton className="bg-success text-white">
                <ArrowBackIosNew />
              </IconButton>
            </div>
            <Swiper
              spaceBetween={10}
              slidesPerView={1}
              loop={true}
              autoplay={true}
              style={{ overflow: "visible" }}
              breakpoints={{
                740: {
                  slidesPerView: 2,
                },
                1240: {
                  slidesPerView: 3,
                },
              }}
              navigation={{
                nextEl: ".image-swiper-button2-next",
                prevEl: ".image-swiper-button2-prev",
                disabledClass: "swiper-button-disabled",
              }}
              modules={[Navigation, Grid]}>
              {eventDetails?.map((album, index) => {
                return (
                  <>
                    <SwiperSlide key={index} className="">
                      <Link to={`/gallery/${album?.id}`} state={album}>
                        <AlbumSliderCard album={album} />
                      </Link>
                    </SwiperSlide>
                  </>
                );
              })}
            </Swiper>
          </div>
        </div>
        <img className="img-fluid blog-shape-left" src="images/backgrounds/blog-bg-left.png" alt="" />
        <img className="img-fluid blog-shape-right" src="images/backgrounds/blog-bg-right.png" alt="" />
      </div>
    </>
  );
}

export default GallerySlider;
