import GotoTop from "layout/GotoTop";
import React, { useEffect, useState } from "react";
import GalleryCard from "./components/GalleryCard";
import { Link, useLocation, useParams } from "react-router-dom";
import { ButtonBase, Input, Pagination, Skeleton, TablePagination } from "@mui/material";
import { apiAuth } from "api";
import ImageSkeleton from "./components/ImageSkeleton";
import BreadCrumb from "layout/BreadCrumb";
import CommentBox from "./components/CommentBox";

function GalleryView() {
  const { id } = useParams();
  const [index, setIndex] = useState(false);
  const [loading, setLoading] = useState(true);
  const [imgList, setImgList] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [count, setCount] = useState(1);
  const [offset, setoffset] = useState(0);
  const [error, setError] = useState([]);
  const [limit, setlimit] = useState(20);
  const { state } = useLocation();
  function fetch() {
    apiAuth
      .get(`/public/gallery_event_image?id=${id}&offset=${offset}&limit=${limit}`)
      .then((res) => {
        // console.log(res.data?.result);
        updateImageList(res.data?.result);
        setTotalCount(res.data?.count);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        return 0;
      });
  }
  useEffect(() => {
    if (id) {
      fetch();
    }
  }, [id]);

  useEffect(() => {
    if (totalCount > limit) {
      setCount(Math.ceil(totalCount / limit));
    }
    return () => {
      setCount(1);
    };
  }, [totalCount]);

  function updateImageList(list) {
    const images = [];
    list.map((img) => {
      if (img?.permission) {
        let permission = JSON.parse(img?.permission);
        if (!permission?.hide) {
          images.push(img);
        }
      } else {
        images.push(img);
      }
    });
    setImgList(images);
  }

  useEffect(() => {
    fetch();
  }, [offset]);
  return (
    <>
      <GotoTop />
      <BreadCrumb heading={state?.institution_name + ' - ' + state?.state} />
      <div className="container h-100">
        {loading ? (
          <>
            <ImageSkeleton />
          </>
        ) : imgList?.length ? (
          //   imgList?.filter((i) => i?.display === "public")?.length ? (
          <div>
            <div className="row row-cols-1 row-cols-xxl-4  row-cols-md-2 row-cols-sm-1 row-cols-lg-3 my-3">
              {imgList?.map((album, index) => {
                return (
                  <div key={index} className="col my-1 my-3" hidden={error.includes(index)} onClick={() => setIndex(index)} data-bs-toggle="modal" data-bs-target="#singlePostModal">
                    <GalleryCard index={index} setError={setError} album={album} permission={album?.permission ? JSON.parse(album.permission) : {}} />
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          //   ) : ("")
          <div className="container position-relative d-flex justify-content-center">
            <h4 className=" font-monospace position-absolute top-0 mt-5 mx-auto">No Image Available!!</h4>
            <img className="mx-auto w-100" src="/images/gif/notfound1.gif" />
          </div>
        )}
        <SinglePostModel img={imgList[index]} />
        {/* <div
          className="modal fade"
          id="exampleModal"
          tabindex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div
            className="modal-dialog modal-fullscreen modal-dialog-centered"
            role="document"
          >
            <div
              className="modal-content"
              style={{ backgroundColor: "#1c1c1be3" }}
            >
              <div className="modal-header m-0 border-0">
                <button
                  type="button"
                  className=" btn-close fs-5 btn-close-white"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <div
                  id="carouselExampleControls"
                  className="carousel slide"
                  data-bs-ride="carousel"
                >
                  <div className="carousel-inner">
                    <div
                      className="carousel-item text-center d-flex justify-content-center active"
                      style={{ height: "80vh" }}
                    >
                      <div>
                        <img
                          src={imgList?.flatMap((l) => l.img)[index]}
                          className="d-block m-auto"
                          alt="..."
                        />{" "}
                        <button
                          className="btn btn-primary"
                          data-bs-target="#singlePostModal"
                          data-bs-toggle="modal"
                        >
                          Open second modal
                        </button>
                      </div>
                    </div>
                  </div>
                  <button
                    disabled={index === 0}
                    className="carousel-control-prev"
                    onClick={() => {
                      setIndex(index - 1);
                    }}
                    type="button"
                  >
                    <span
                      className="carousel-control-prev-icon"
                      aria-hidden="true"
                    ></span>
                    <span className="visually-hidden">Previous</span>
                  </button>
                  <button
                    disabled={
                      index === imgList?.flatMap((l) => l.link).length - 1
                    }
                    className="carousel-control-next"
                    type="button"
                    onClick={() => {
                      setIndex(index + 1);
                    }}
                  >
                    <span
                      className="carousel-control-next-icon"
                      aria-hidden="true"
                    ></span>
                    <span className="visually-hidden bg-grad-white">Next</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div> */}
        <div hidden={!imgList.length} className="container d-flex justify-content-center">
          <Pagination
            count={count}
            onChange={(e, page) => {
              setoffset(page * limit - limit);
            }}
            className="card bg-light p-2 shadow-sm"
            variant="outlined"
            color="secondary"
          />
        </div>
      </div>
    </>
  );
}

export default GalleryView;

function SinglePostModel({ img }) {
  return (
    <div className="modal fade" id="singlePostModal" tabIndex="-1" role="dialog" aria-labelledby="singlePostModalLabel" aria-hidden="false">
      <div className="modal-dialog modal-fullscreen" role="document">
        <div className="modal-content" style={{ backgroundColor: '#1c1c1be3' }}>
          <div className="modal-header m-0 border-0">
            <button type="button" className=" btn-close fs-5 btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body d-flex">
            <div className="container rounded-4  m-auto bg-white overflow-hidden">
              <div className="card border-0 h-100">
                <div className="row row-cols-1 row-cols-lg-2 row-cols-md-1 row-cols-xl-2">
                  <div className="col d-flex bg-light border-end-3 border-dark justify-content-center">
                    <div className="card shadow-none border-0 bg-fit m-auto p-2">
                      <img src={img?.img} style={{ maxHeight: "80vh" }} alt="..." />
                    </div>
                  </div>
                  <div className="col">
                    <CommentBox img={img} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
