import moment from "moment";
import { useContext, useEffect } from "react";
import { Card } from "react-bootstrap";
import { ClubContext } from "../TimelineClub";
import { useNavigate } from "react-router-dom";

const AllLikedPost = ({ showAllLikes }) => {
  const navigate = useNavigate();
  const { allLikedPost, fetchAllLikedPostUser, userAllPost } = useContext(ClubContext);

  useEffect(() => {
    fetchAllLikedPostUser();
  }, []);

  useEffect(() => {
    fetchAllLikedPostUser();
  }, [userAllPost]);
  return (
    <>
      {(showAllLikes ? allLikedPost : allLikedPost?.slice(0, 4))?.map((post) => {
        return (
          <div key={post.id} className="m-2">
            <Card
              style={{ cursor: "pointer", border: "none", height: "90px" }}
              onClick={() => {
                navigate("/clubs/" + post.clubId + "/" + "post" + "/" + post.id);
              }}
              className="">
              <Card.Body className="m-0 h-100" style={{ overflow: "hidden" }}>
                <div className="row h-100">
                  <div className=" d-flex flex-column col-8 h-100">
                    <div className=" top  d-flex h-100">
                      <div className="right">
                        <div>
                          <span style={{color: "dimgrey"}}>You Liked</span>{" "}
                          <span style={{ fontSize: "14px", fontWeight: "bold", color: "dimgrey" }} className="text-capitalize">
                            {" "}
                            {post.postBy}{" "}
                          </span>
                          <span style={{color: "dimgrey"}}>posts</span> <div><span style={{ fontSize: "12px", fontWeight: "" }}>{moment(post.createdAt).fromNow()}</span></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-4 text-end h-100 px-2" style={{ maxHeight: "130px" }}>
                    <div style={{width: "100%",height: "100%"}}>
                    <img src={post.image ?? "https://picsum.photos/id/237/200/300"} class="h-100 h-100 w-100  rounded-1" style={{objectFit: "cover"}} alt="..." />
                    </div>
                  </div>
                </div>
                <hr className="p-0 m-0" />
              </Card.Body>
            </Card>
          </div>
        );
      })}
    </>
  );
};

export default AllLikedPost;
