import React, { useEffect, useState } from 'react'
import "../style/MunApplicants.css"
import Select from "react-select"
import ViewListIcon from '@mui/icons-material/ViewList';
import GridOnIcon from '@mui/icons-material/GridOn';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { ButtonGroup } from "pages/ModelUnParliament";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useGlobalContext } from 'global/context';
import { apiJsonAuth } from 'api';
import { Modal } from "react-bootstrap";
import { AIPPM_Role, COP28_countries, G20_Countries, G20_roles, UNDP_Countries, UNEP_Countries } from 'global/AllCountryData';
import { toast } from 'react-toastify';

export const MunParticipants = () => {
  const columns = [
    // ... (your existing columns)
    {
      field: 'avatarAndName',
      headerName: 'Name',
      headerClassName: 'blue-header',
      width: 125,
      renderCell: (params) => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ height: "35px", width: "45px" }}><img className='h-100 w-100' src={"img"} size="40" round={true} /></div>
          <div className='ms-2'><span className='text-wrap' style={{ fontFamily: "Lexend" }}>{params.row.name} </span></div>
        </div>
      ),
      //   headerClassName: 'blue-header',
    },
    {
      field: 'Class',
      headerName: 'Class',
      width: 84,
      headerClassName: 'blue-header',
      renderCell: (params) => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <span className='fw-400 fs-13-5px' style={{ color: "#000000", fontFamily: "Lexend" }}>{params.row.class}</span>
        </div>
      ),

    },
    {
      field: 'Age',
      headerName: 'Age',
      width: 74,
      renderCell: (params) => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <span className='fw-400 fs-13-5px' style={{ color: "#000000", fontFamily: "Lexend" }}>{params.row.age}</span>
        </div>
      ),
      headerClassName: 'blue-header',

    },
    {
      field: 'Gender',
      headerName: 'Gender',
      width: 96,
      renderCell: (params) => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <span className='fw-400 fs-13-5px' style={{ color: "#000000", fontFamily: "Lexend" }}>{params.row.gender}</span>
        </div>
      ),
      headerClassName: 'blue-header',

    },
    {
      field: 'Committee',
      headerName: 'Committee',
      width: 120,
      renderCell: (params) => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <span className='fw-400 fs-13-5px' style={{ color: "#000000", fontFamily: "Lexend" }}>{params.row.preferredComm}</span>
        </div>
      ),
      headerClassName: 'blue-header',

    },
    {
      field: ' Country',
      headerName: ' Country',
      width: 115,
      renderCell: (params) => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <span className='fw-400 fs-13-5px' style={{ color: "#000000", fontFamily: "Lexend" }}>{params.row.preferredCountry}</span>
        </div>
      ),
      headerClassName: 'blue-header',

    },
    {
      field: 'Role',
      headerName: 'Role',
      width: 145,
      renderCell: (params) => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <span className='text-wrap fw-400 fs-13-5px' style={{ color: "#000000", fontFamily: "Lexend" }}>{params.row.preferredRole}</span>
        </div>
      ),
      headerClassName: 'blue-header',

    },
    {
      field: 'Nominated By',
      headerName: 'Nominated By',
      width: 120,
      renderCell: (params) => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <span className='fw-400 fs-13-5px' style={{ color: "#000000", fontFamily: "Lexend" }}>{params.row.dateofApplication}</span>
        </div>
      ),
      headerClassName: 'blue-header',

    },
    {
      field: 'Actions',
      headerName: 'Actions',
      width: 92,
      renderCell: (params) => (
        <>
          <div style={{ display: 'flex', alignItems: 'center', height: "25px", cursor: "pointer", width: "25px" }}
            data-bs-toggle="dropdown">
            <MoreVertIcon sx={{ color: "#23538f", cursor: "pointer" }} className='h-100 w-100' />
          </div>

          {/*============ Action button is Define Here ==============*/}
          <div className="dropdown-menu border-0 rounded-3" style={{boxShadow: "rgba(136, 165, 191, 0.48) 6px 2px 16px 0px, rgba(255, 255, 255, 0.8) -6px -2px 16px 0px"}}>
            <div className="d-flex flex-column">
             
              <span className="actionType" onClick={() => {
                CommiteeUserDetails(params?.row?.id,params?.row?.registerId);
              }}> Assign New Role</span>
              <span className="actionType border-bottom-0" onClick={()=>{
                handleOpenReject(params?.row?.id,params?.row?.registerId)
              }}> Remove Participant</span>
            </div>

          </div>
          {/*============ Action button is End Here ==============*/}

        </>

      ),
      headerClassName: 'blue-header',

    },
  ];

  const {userData} = useGlobalContext();
  const [isloading,setIsLoading] = useState(false);
  const [newRoleModal, setNewRoleModal] = useState(false)
  const [selectedCommitteeType, setSelectedCommitteeType] = useState("UNDP");
  const [allApplicants,setAllApplicants] = useState([])
  const [getAllCommiteeList,setAllCommiteeList] = useState([])
  const [commiteeStudentDetails,setCommiteeStudentDetails] = useState({})
  const [selectCommitee,setSelectedCommitee] = useState({})
  const [getStudentId,setStudentId]=useState('');
  const [getRegisterId,setRegisterId] = useState('')
  const[commiteeId,setCommiteeId] =useState('')
  const [ commiteeName,setCommiteeName]=useState('')
  const [country,setCountry] = useState('')
  const [roleType,setRoleType] = useState('')
  const [rejectModal,setRejectModal] = useState(false);
  const [activeFilter, setActiveFilter] = useState("all");
  const filteredRows = activeFilter === "all" ?  allApplicants.filter(row => row?.is_participant===true) :  allApplicants.filter(row => row.status === activeFilter && row?.is_participant===true);

  
  // handle open reject modal open handle = \\
const handleOpenReject =(studentId,registerId)=>{
  setRejectModal(true);
  setStudentId(studentId);
setRegisterId(registerId);

}
// ======= Handle Hide reject Modal handle ======= \\
const hideRejectmodal =()=>{
  setRejectModal(false);
}


  const getAllCommitee = async()=>{
    try {
      const getCommiteeList = await apiJsonAuth.get(`/api/v2/modelUn-student/getAllCommittee/${userData?.id}`)
      setAllCommiteeList(getCommiteeList?.data?.allSelectedCommittee)
     
    } catch (error) {
      console.log(error)
    }
  }
  
  useEffect(() => {
  if(userData?.id){
    getAllCommitee();
  }
  }, [])

  const handleCommitteeTypeChange = (selectedOption) => {
    setSelectedCommitteeType(selectedOption.type);
    setCommiteeId(selectedOption.committeeId);
    setCommiteeName(selectedOption.title)
  };

  /// ============= Handle change role =================== \\
const handleChangeRole =(selectedOption) =>{
  console.log(selectedOption)
  setRoleType(selectedOption.value)
}

// ============== country change handler  =======
const HandleCountryChange= (selectedOption)=>{
  setCountry(selectedOption.name)
}


 // ===== Manualy commitee assign  show modal function ========\\ 
 const handleOpenAssign = () => {
  setNewRoleModal(true)
}
// =========== get commitee details list by student Id and register Id==========\\
const CommiteeUserDetails = async(studentId,registerId)=>{
  setStudentId(studentId);
  setRegisterId(registerId);
  setCountry("")
  setRoleType('')
  try {
    const res = await apiJsonAuth.get(`api/v2/modelUn-institute/getParticipateDetail/student/${studentId}/register/${registerId}`)
    setCommiteeStudentDetails(res?.data)
    if(res){
      handleOpenAssign();

    }
  } catch (error) {
    console.log(error,"detals error")
  }

}

// ===== Manualy commitee assign  Hide modal function ========\\ 
const handleShowModal = () => {
  setNewRoleModal(false)
}
// ====== Menual Update the user commmitte ================= \\
const UpdateStudentDetails= async()=>{
  try {
    const res = await apiJsonAuth.put(`/api/v2/modelUn-institute/nominateStudent/student/${getStudentId}/register/${getRegisterId}`,{
      pref_country:country,
      pref_committee:commiteeName,
      committeeId:commiteeId,
      pref_role:roleType,
      status:"approved",
      is_participant:false
       
    })
    setNewRoleModal(false)
    getAllApplicants();
  
  } catch (error) {
    console.log(error)
  }
}

// ============= Get all Applicants details  api ===============\\
const getAllApplicants=async()=>{
  try {
    setIsLoading(true)
    let applicants = await apiJsonAuth.get(`api/v2/modelUn-student/getAllStudentsDetail/${userData?.id}`)
     setAllApplicants(applicants?.data?.result);
     setIsLoading(false)
  } catch (error) {
    console.log("Error on Applicants Api",error)
    setIsLoading(false)
  }
}
useEffect(()=>{
getAllApplicants();
// CommiteeUserDetails();
},[])
  //======== custom style for select Input Feild  =============\\
  const customSelectStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: "#F9F9F9",
      border: "none",
      outline: "none"
    }),
  }
  //=============== Student Reject  api handler ================= \\
  const HandleRejectStudent=async()=>{
    try {
      const assignRes= await apiJsonAuth.put(`/api/v2/modelUn-institute/nominateStudent/student/${getStudentId}/register/${getRegisterId}`,{status:"rejected"})
      if(assignRes?.status===200){
       toast.success("User Rejected successfully..")
        getAllApplicants();
        setRejectModal(false)
      }
   } catch (error) {
     console.log(error,"Error in Secure nominate")
   }
  }

  return (
    <div>
      <div className="col-10 mx-auto mt-4">
        <div className="row">

          <div className="d-flex justify-content-between">
            <div className="">
              <div>
                <span className="fs-32px-fw-600">Participants</span>
              </div>
            </div>


            <div className="d-flex justify-content-between col-7">
              <d iv className="col-4 d-flex justify-content-between align-items-center">
                <div style={{ fontFamily: 'Lexend', wordWrap: 'break-word' }}>
                  <span className="fs-17-50px fw-400">Event</span>
                </div>
                <div>
                  <Select
                    styles={customStyles}
                  />
                </div>
              </d>


              <div className="col-4 d-flex justify-content-between align-items-center">
                <div style={{ fontFamily: 'Lexend', wordWrap: 'break-word' }}>
                  <span className="fs-17-50px fw-400">Comm</span>
                </div>
                <div>
                  <Select
                    styles={customStyles}
                  />
                </div>
              </div>

              <div className="d-flex align-items-center">
                <div className="d-flex justify-content-evenly align-items-center" style={{ background: "#F9ECFF", borderRadius: "7px", width: "81px", height: "40px" }}>
                  <div className='' style={{ width: "40px" }}><ViewListIcon sx={{ color: "#DBCFFF", width: "28px", height: "28px" }} /></div>
                  <div className='' style={{ width: "40px" }}><GridOnIcon sx={{ color: "#3D00FF", width: "28px", height: "28px" }} /></div>
                </div>
              </div>
            </div>

          </div>

          <div className='d-flex justify-content-between mt-3'>
            <div className='d-flex justify-content-between ms-3 col-5'>

              {['All', 'Resigned', 'Selected', 'Rejected', 'Hold'].map(filter => (
                <div key={filter}>
                  <span
                    className={`fw-400 fs-17-50px cursor-pointer ${activeFilter === filter.toLowerCase() ? 'active-filter' : ''}`}
                    style={{ fontFamily: "Lexend" }}
                    onClick={() => setActiveFilter(filter.toLowerCase())}
                  >
                    {filter}
                  </span>
                </div>
              ))}

            </div>

          </div>
        </div>
        {/* <hr className='mt-4'/> */}
        {isloading ? (<>
          <div className="d-flex justify-content-center my-4">
            <div className="spinner-border  text-secondary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        </>):(
        <Box sx={{ height: 461, width: '100%', marginTop: "15px" }}>
          <DataGrid
            rowHeight={70}
            disableColumnMenu
            rows={filteredRows}
            columns={columns}
            paginationMode="client"
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            pageSizeOptions={[5, 10]}
            checkboxSelection
            disableSelectionOnClick
            disableRowSelectionOnClick

          // MuiDataGrid-cellCheckbox="cellCheckbox"
          />
        </Box>)}

      </div>
       {/* //  Assign New role Modal Start here */}
       <Modal
        size="lg"
        show={newRoleModal}
        onHide={handleShowModal}
      >

        <div className="px-3 py-4">
          <h2 className="fs-2 fw-semibold " style={{ color: "#000000" }}>Nominate</h2>

          <p className="fs-19px" style={{ color: "#989898" }}>Please provide the details of nominating a applicant.</p>
          
          <div className="fs-19px fw-500 mt-4" style={{ color: "#000000", marginBottom: "10px" }}>Select a committee to be  assigned</div>
          <Select
            options={getAllCommiteeList}
            isSearchable={false}
            styles={{ ...customStyles, ...customSelectStyles }}
            defaultValue = {getAllCommiteeList?.find((i)=>{
            return i.committeeId===commiteeStudentDetails?.studentDetail?.committeeId
            })}
            onChange={(handleCommitteeTypeChange)}
            getOptionLabel={
              (option) => {
                return (
                  <>
                    <div className="d-flex justify-content-between
                          align-items-center">
                      <div className='fw-500 fs-19px' style={{ color: "#3A3A3A" }}>{option.title}</div>
                      <div className="d-flex justify-content-between">
                        <div className='fw-500 fs-19px me-4' style={{ color: "#BD00FF", fontFamily: "Poppins" }}>{option.slots}  Available</div>
                        <div style={{ fontWeight: "500", fontSize: "15px", color: "#ACACAC" }}>{option?.applicants} Applicants</div>
                      </div>

                    </div>
                  </>
                )
              }
            }
          />

          {selectedCommitteeType === "UNEP" || selectedCommitteeType === "COP28" || selectedCommitteeType === "UNDP" ? (
            <>
              <div className='mt-4'><span className='fs-19px fw-500 mt-1' style={{ fontFamily: "Poppins", color: "#000000" }}>Select a country</span></div>
              <Select
                options={selectedCommitteeType === "UNEP" ? UNEP_Countries : selectedCommitteeType === "COP28" ? COP28_countries : UNDP_Countries}
                isSearchable={true}
                styles={{ ...customStyles, ...customSelectStyles }}
                defaultValue={selectedCommitteeType === "UNEP" ?  UNEP_Countries.find((i)=>i?.value===commiteeStudentDetails?.studentDetail?.pref_country) : selectedCommitteeType === "COP28" ?   COP28_countries.find((i)=>i?.value===commiteeStudentDetails?.studentDetail?.pref_country) : UNDP_Countries.find((i)=>i?.value===commiteeStudentDetails?.studentDetail?.pref_country)}
                onChange={HandleCountryChange}
                getOptionLabel={
                  (option) => {
                    return (
                      <>
                        <div className='fw-500 fs-19px' style={{ color: "#3A3A3A" }}>{option.name}</div>
                      </>)
                  }}
              />
            </>

          ) : null}
          {selectedCommitteeType === "AIPPM" && (
            <>
              <div className='mt-3'><span className='fs-19px fw-500 mt-1' style={{ fontFamily: "Poppins", color: "#000000" }}>Select a role</span></div>
              <Select
                options={AIPPM_Role}
                isSearchable={true}
                styles={{ ...customStyles, ...customSelectStyles }}
                defaultValue={AIPPM_Role.find((i)=>i?.role === commiteeStudentDetails?.studentDetail?.pref_role)}
                onChange={handleChangeRole}
                getOptionLabel={
                  (option) => {
                    return (
                      <>
                        <div className='fw-500 fs-19px' style={{ color: "#3A3A3A" }}>{option.value}</div>
                      </>)
                  }}
              />
            </>
          )}

          {selectedCommitteeType === "G20" && (
            <>
              <div className='mt-4'><span className='fs-19px fw-500 mt-1' style={{ fontFamily: "Poppins", color: "#000000" }}>Select a country</span></div>
              <Select
                options={G20_Countries}
                isSearchable={true}
                styles={{ ...customStyles, ...customSelectStyles }}
                defaultValue={G20_Countries[0]}
                onChange={HandleCountryChange}
                getOptionLabel={
                  (option) => {
                    return (
                      <>
                        <div className='fw-500 fs-19px' style={{ color: "#3A3A3A" }}>{option.name}</div>
                      </>)
                  }}
              />
              <div className='mt-4'><span className='fs-19px fw-500 mt-1' style={{ fontFamily: "Poppins" }}>Select a role</span></div>
              <Select
                options={G20_roles}
                isSearchable={true}
                styles={{ ...customStyles, ...customSelectStyles }}
                defaultValue={G20_roles[0]}
                onChange={handleChangeRole}
                getOptionLabel={
                  (option) => {
                    return (
                      <>
                        <div className='fw-500 fs-19px' style={{ color: "#3A3A3A" }}>{option.role}</div>
                      </>)
                  }}
              />
            </>
          )}

          <ButtonGroup btnName="Submit" btnPrev="Cancel" handlePrev={handleShowModal} handleNext={UpdateStudentDetails} />
        </div>
      </Modal>
       {/* // Applicants Rejection  reason  Modal Start here */}

      <Modal
        size="lg"
        show={rejectModal}
        onHide={hideRejectmodal}
      >

        <div className="px-3 py-4">
          <label className="my-3 fw-bold" style={{ color: "#000000" }}>Reason of reject Applicant</label>
          <textarea className="form-control rounded-3 shadow-none resize-none" placeholder="Write the reason." id="floatingTextarea" required></textarea>
    
          <ButtonGroup btnName="Submit" btnPrev="Cancel" handlePrev={hideRejectmodal} handleNext={HandleRejectStudent} />
        </div>
      </Modal>
    </div>
  )
}


const customStyles = {
  control: (provided) => ({
    ...provided,
    width: "143px",
    height: "40px",
    padding: "3px",
    border: "none",
    background: "#F9ECFF",
    color: 'black'
    // boxShadow:'none'
  }),
};