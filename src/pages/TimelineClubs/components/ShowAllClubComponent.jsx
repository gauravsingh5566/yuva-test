import { MyContext } from "pages/EventTimeline/EventTimeline";
import React, { useContext, useRef, useState } from "react";
import { Button, Card, FloatingLabel, Form, Modal } from "react-bootstrap";
import AddIcon from "@mui/icons-material/Add";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import axios from "axios";
import { UserContext } from "global/context";
import { toast } from "react-toastify";
import { apiAuth } from "api";
import { useNavigate } from "react-router";
import { ClubContext } from "../TimelineClub";
import "../style/clubStyle.css"

const ShowAllClubComponent = ({
   allClub,getAllStudentClub,
   getAllClubs, privateClub, 
   publicClub , allClubInstitute,
   allClubStudent,getAllInstituteClub}) => {

  const navigate = useNavigate()

  const {userData} = useContext(UserContext)
  const fileInputRef = useRef(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [image, setImage] = useState("");
  const [value, setValue] = React.useState("1");
  const [showClubModal, setShowClubModal] = useState(false);
  const [clubID,setClubID] = useState(null);
  const [join , setJoin] = useState(false);
  const [showAllPublic, setShowAllPublic] = useState(false)
  const [showAllPrivate, setShowAllPrivate] = useState(false)

  const handleClickEnterClub = ()=>{
    navigate('/clubs/'+clubID)
    handleHideclubModal()
  }

  const joinClubFunction = (clubId)=>{
    console.log("this is inside the join club function")
    if(userData.id && userData.role ==='institute'){
      const checkInt = allClubInstitute.find((club)=>club.id===userData.id)
      if(checkInt){
        removeOrJoinClub(clubId);
      }else{
        createClubUser(clubId);
      }
    }
    else if(userData.id && userData.role==='student'){
        const checkInt = allClubStudent.find((club)=>club.id===userData.id)
      if(checkInt){
        removeOrJoinClub(clubId);
      }else{
        createClubUser(clubId);
      } 
    }
    
  }

  const createClubUser = (clubId)=>{
    // console.log("here we call create")
    if(userData.role==='institute'){
        axios.post(process.env.REACT_APP_API_BASE_URL+"club/club-institute",{
            id:userData.id,
            clubId
          }).then((res)=>{
            handleClickEnterClub()
            getAllInstituteClub();
          }).catch((error)=>{
            console.log(error.message);
          })
    }
    else if(userData.role==='student'){
        axios.post(process.env.REACT_APP_API_BASE_URL+"club/club-student",{
            id:userData.id,
            clubId
          }).then((res)=>{
            handleClickEnterClub()
            getAllStudentClub();
          }).catch((error)=>{
            console.log(error.message);
          })
    }
  }
  const removeOrJoinClub = (clubId)=>{
    if(userData.role==='institute'){
        axios.put(process.env.REACT_APP_API_BASE_URL+"club/club-institute/institute/"+userData.id,{
            id:userData.id,
            clubId
          }).then((res)=>{
            getAllInstituteClub()
            handleHideclubModal()
          }).catch((error)=>{
            console.log(error.message)
          })
    }
    else if(userData.role==='student'){
        axios.put(process.env.REACT_APP_API_BASE_URL+"club/club-student/student/"+userData.id,{
            id:userData.id,
            clubId
          }).then((res)=>{
            getAllStudentClub()
            handleHideclubModal()
          }).catch((error)=>{
            console.log(error.message)
          })
    }
  }

  const checkInstituteIdForClub = (clubId)=>{
      
      if(userData.role==='institute'){
        const allClubIn = allClubInstitute;
        console.log("allClubIn ", allClubIn)
      const clubInstitute = allClubIn.find((club)=>club.id===userData.id);
      console.log('clubinstitute', clubInstitute);
      if(clubInstitute && clubInstitute.all_clubs.includes(clubId)){
        setJoin(true);
      }else{
        setJoin(false);
      }
    }else if(userData.role==='student'){
        const allClubIn = allClubStudent;
        console.log("allClubIn ", allClubStudent[2])

        const clubStudent = allClubIn.find((club)=>club.id===userData.id);
        if(clubStudent && clubStudent.all_clubs.includes(clubId)){
          setJoin(true);
        }else{
          setJoin(false);
  
        }
    }
  }

  const handleHide = () => {
    setShowModal(false);
  };
  const handleHideclubModal = () => {
    setShowClubModal(false);
  };
  const handleShowClubModal = (id) => {
    checkInstituteIdForClub(id)
    setClubID(id)
    setShowClubModal(true);
  };
  const handleShow = () => {
    setShowModal(true);
  };
  const handleButtonClick = () => {
    setValue("1");
    fileInputRef.current.click();
  };

  const handleSubmit = () => {
    if(!name){
        toast.dismiss()
        toast.error("Write Name")
    }
    let type ;
    let instituteId;
    if(userData.role==='institute'){
        instituteId = userData.id
        type = 'private'
    }else if(userData.role==='admin'){
        type="public"
    }
    let data = {
        name, description, type, instituteId
    }
    if(userData.role==='institute' || userData.role==='admin'){
        
    apiAuth.post(process.env.REACT_APP_API_BASE_URL+"club",{...data, img:image})
    .then((res)=>{
        toast.success("succesfully created")
        getAllClubs();
        handleHide();
    }).catch((err)=>{
        console.log(err.message)
    })
    }

  };
  const colors = ["#9095ff", "#ffcece",
  "#ff5e5e", "#b4ffcd", "#ffefa1",
  "#ff9090","#b4b4ff","#ffbb33",
  "#20ff31","#20b0ff","#bb20ffb0"];
  
  return (
    <>
        <Card  style={{borderRadius:'12px',
            background:'', border:'none'
          }}
          className="mt-1"
          >
            
          <Card.Body>
          <div className="all-club-cards" stye={{}}>
           {/* Public clubs  */}
           <div style={{
            // background:'var(--club-component-background)',
           }} className="border-1 rounded-3 p-3 mb-4 shadow">
           <div className="d-flex justify-content-between align-items-center pt-2">
              { <h5 className="mb-4">Public Clubs</h5>}
              {publicClub.length>4 &&
              <span className="fw-bold text-secondary" style={{cursor:'pointer', userSelect:'none'}} onClick={()=>setShowAllPublic(!showAllPublic)}>{showAllPublic? "Show Less":"Show all"}</span>
              } 
            </div>
        {publicClub.length===0 && <span>There is no Club right now</span>}
        <div className="row">
          {
              (showAllPublic ? publicClub:publicClub.slice(0,4))?.map((club, index)=>{
                return (
                      <div key={club.id}  className="col-12 col-sm-6 col-md-4 col-lg-3   px-4 py-2">
                        <Card className="border-0" 
                         onClick={()=>{
                    handleShowClubModal(club.id)
                  }}
                      style={{
                        cursor:'pointer'
                      }}
                    >     
                          <Card.Body className="mt-3 p-3 shadow rounded mx-auto" style={{ width: "130px", height: "150px", background: "rgb(229 239 255)"}}>

                      <div className="d-flex flex-column justify-content-center align-items-center mb-4">
                      <div className="left" style={{ height: "80px", width: "100px", }}
                      >
                        <img  style={{
                                        objectFit: "cover",
                                      }}
                          src="https://w7.pngwing.com/pngs/313/964/png-transparent-cartoon-animated-series-randomness-girl-cartoon-hand-illustrator-fictional-character.png"
                          // alt={club?.name}
                          className="p-1 h-100 w-100 rounded-2"
                        />
                      </div>
                      <span className="text-center fw-normal" style={{color: "#9b5ffd", fontWeight: "bold"}}>{club.name}</span>
                      <span  style={{ color:'#65676B', fontSize:'13px' }} className="fw-400 text-center" >1.2k Members</span>
                      </div>
                    </Card.Body>
                          {/* <Card.Body>
                            <div className="">
                              <div className="d-flex justify-content-between align-items-center">
                                  <div className="left"
                                    style={{ height: "80px", width: "80px" }}
                                  >
                                  <img
                                  className="h-100 w-100 rounded-2"
                                    style={{
                                      objectFit: "cover",
                                    }}
                                    src="https://w7.pngwing.com/pngs/313/964/png-transparent-cartoon-animated-series-randomness-girl-cartoon-hand-illustrator-fictional-character.png"
                                    alt="img"
                                  />
                                  </div>
                                  <div className="right">
                                      <h5 
                                      style={{
                                        overflow: 'hidden',
                                        whiteSpace: 'nowrap',
                                        textOverflow: 'ellipsis',
                                        maxWidth: '100px'
                                      }}
                                       className="text-capitalize">{club.name}</h5>
                                      <lable className="text-capitalize d-block" style={{
                                        color:'#65676B',
                                        fontSize:'12px'
                                      }}>
                                      Public club 
                                      
                                      </lable> 
                                      <lable
                                        style={{
                                        color:'#65676B',
                                        fontSize:'12px'
                                      }}
                                      >1.2k Members</lable>
                                  </div>
                              </div>
                            </div>
                          </Card.Body> */}
                        </Card>
                      </div>
                )
              })
            }
          </div>
           </div>


          {/* Private club card */}
            <div style={{
            // background:'var(--club-component-background)',
           }} className="border-1 rounded-3 p-3 shadow">
            <div className="d-flex justify-content-between align-items-center pt-2">
   {   <h5 className="mb-4">Private Clubs</h5>}
      {privateClub.length> 4 && 
      <span style={{cursor:'pointer', userSelect:'none'}} className="fw-bold text-secondary"
       onClick={()=>setShowAllPrivate(!showAllPrivate)}>{showAllPrivate? "Show Less":"Show all"}</span>
        } 

   </div>
      {privateClub.length ===0 && <span>There is no Club right now</span>}

       
        
        
          <div className="row ">
            {
              (showAllPrivate ? privateClub:privateClub.slice(0,4))?.map((club, index)=>{
                return (
                      <div key={club.id} className="col-12 col-sm-6 col-md-4 col-lg-3   px-4 py-2">
                        <Card className="border-0  "  onClick={()=>{
                    handleShowClubModal(club.id)

                  }}
                      style={{
                        cursor:'pointer'
                      }}
                    >     
                    <Card.Body className="mt-3 p-3 shadow rounded mx-auto" style={{ width: "130px", height: "150px", background: "rgb(229 239 255)"}}>

                    <div className="d-flex flex-column justify-content-center align-items-center mb-4">
                    <div className="left" style={{ height: "80px", width: "100px", }}
                      // className={` ${
                      //   // color ? "border border-1 rounded-circle p-4" : ""
                      // }`}
                      // style={styles}
                    >
                      <img  style={{
                                      objectFit: "cover",
                                    }}
                        src="https://w7.pngwing.com/pngs/313/964/png-transparent-cartoon-animated-series-randomness-girl-cartoon-hand-illustrator-fictional-character.png"
                        // alt={club?.name}
                        className="p-1 h-100 w-100 rounded-2"
                      />
                    </div>
                    <span className="text-center fw-normal" style={{color: "#9b5ffd", fontWeight: "bold"}}>{club.name}</span>
                    <span  style={{ color:'#65676B', fontSize:'13px' }} className="fw-400 text-center" >1.2k Members</span>
                  </div>


                    </Card.Body>
                          {/* <Card.Body className="mt-3 p-4 shadow">
                            <div className="">
                              <div className="d-flex justify-content-around align-items-center">
                                  <div className="left"
                                    style={{ height: "80px", width: "80px" }}

                                  >
                                  <img
                                  className="h-100 w-100 rounded-2"
                                    style={{
                                      objectFit: "cover",
                                    }}
                                    src="https://w7.pngwing.com/pngs/313/964/png-transparent-cartoon-animated-series-randomness-girl-cartoon-hand-illustrator-fictional-character.png"
                                    alt="img"
                                  />
                                  </div>
                                  <div className="right">
                                      <h5 className="text-capitalize">{club.name}</h5>
                                      <lable className="text-capitalize d-block" style={{
                                        color:'#65676B',
                                        fontSize:'12px'
                                      }}>
                                      Private club 
                                      
                                      </lable> 
                                      <lable
                                        style={{
                                          color:'#65676B',
                                        fontSize:'12px'
                                      }}
                                      >1.2k Members</lable>
                                  </div>
                              </div>
                            </div>
                          </Card.Body> */}
                        </Card>
                      </div>
                )
              })
            }
            { userData.role=='institute' && <div className="col-3 " style={{transform:'scale(0.88)'}}>
              <Card
                className="hover-shadow-for-component"
                onClick={handleShow}
                style={{ margin: "12px 0", height: "130px", cursor: "pointer" }}
              >
                <Card.Body
                  className="d-flex flex-column align-items-center justify-content-center"
                  style={{ padding: "12px 0 0 0 " }}
                >
                  <div>
                    <AddIcon style={{ fontSize: "63px" }} />
                  </div>
                </Card.Body>
              </Card>
            </div>}
          </div>
            </div>
   
        </div>
          </Card.Body>
      </Card>

      <Modal centered show={showModal} onHide={handleHide}>
        <Modal.Title style={{ padding: "12px" }}>Add New Club</Modal.Title>
        <Modal.Body>
          <div>
            <div className="row">
              <FloatingLabel label="Name" className="mb-3 col-6">
                <Form.Control value={name} type="text" placeholder="Write Club Name" onChange={(e)=>setName(e.target.value)} />
              </FloatingLabel>

              <FloatingLabel className="col-6" label="Description">
                <Form.Control value={description} type="text" placeholder="Password" onChange={(e)=>setDescription(e.target.value)} />
              </FloatingLabel>

              <div className="col-4 mb-4">
                <div className="d-flex align-items-center justify-content-start m-2 ms-2">
                  <input
                    type="file"
                    id="img"
                    style={{ display: "none" }}
                    accept=".png, .jpg, .jpeg"
                    name="files[]"
                    ref={fileInputRef}
                    onChange={(e) => {
                      if (e.target.files.length) {
                        setImage(e.target.files[0]);
                        setSelectedImage(
                          URL.createObjectURL(e.target.files[0])
                        );
                      }
                    }}
                  />
                  <label htmlFor="img">
                    <button
                        style={{
                            
                        }}
                      className="text-capitalize font-weight-bold btn btn-sm btn-outline-success"
                      onClick={handleButtonClick}
                    >
                      <CameraAltIcon /> &nbsp;Media
                    </button>
                  </label>
                </div>
              </div>
              <div className="col-8 mb-4">
                {selectedImage && (
                  <div>
                    <img
                      src={selectedImage}
                      alt="Selected"
                      style={{ width: "80%", objectFit: "contain" }}
                    />
                  </div>
                )}
              </div>
              <div className="col-12">
                <button onClick={handleSubmit} className="btn btn-outline-primary btn-sm">Submit</button>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      <Modal centered className="fade"  show={showClubModal} onHide={handleHideclubModal}>
        <Modal.Body style={{
          
        }}>
          <div>
              <div className="mb-4 mt-3 ms-3">
                { !join?<h5>You Haven't Join this Club Yet</h5>:<h5>You Want to Enter Club</h5>}
              </div>
              <div className="d-flex justify-content-around mb-3">

                  {!join
                  ?
                  <button onClick={()=>joinClubFunction(clubID)}
                   type="button" className="custom-btn-1 btn-1 text-center" 
                    data-toggle="button"
                     aria-pressed="false"
                      autocomplete="off"><span className="join-club">Join Club</span></button>
                  
                  :<button onClick={()=>handleClickEnterClub()} type="button" className="custom-btn-6 btn-6 text-center"><span className="enter-Club">Enter Club</span></button>
                  }
                  {join && <button onClick={()=>{
                    removeOrJoinClub(clubID)
                    navigate('/timeline')
                    }} type="button" className="custom-btn-3 btn-3 text-center" data-toggle="button" aria-pressed="false" autocomplete="off"><span className="unfollow-club">Unfollow Club</span></button>}
                  <button onClick={handleHideclubModal} type="button"className="text-center custom-btn-4 btn-4" style={{background: "", color: ""}} data-toggle="button" aria-pressed="false" autocomplete="off"><span className="ignore">Ignore</span></button>
              </div>
          </div>
             
        </Modal.Body>
      </Modal>

     

    </>
  )
}

export default ShowAllClubComponent
