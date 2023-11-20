import React, { useState } from 'react'
import MoreVertIcon from '@mui/icons-material/MoreVert';

export const ModelUnTeamRegist = () => {
    const [filteredData, setFilteredData] = useState(modelUnTeam);
    const [activeFilter, setActiveFilter] = useState('All');

    // Filter Manage United Nations Team
    const handleFilter = (value) =>{
        if(value === "All"){
            setActiveFilter('All');
            setFilteredData(modelUnTeam)
        }
        else{
            setActiveFilter(value);
            let filter = modelUnTeam?.filter((ele) => ele?.pressCorps === value);
            setFilteredData(filter);
        }
    }

  return (
    <>
    <div className="pt-4 px-5 col-11">
        <div>
      <span className="fw-500 fs-20px" style={{color: "#979797"}}>Events {">"} United Nations {">"} Registration</span>
    </div>
    
    <div className='d-flex justify-content-between col-10'>
      <div className="mt-3 mb-2">
        <span className="fw-600 fs-32px" >Manage United Nations Team</span>
      </div>

      <div className='mt-3'>
        <button className='fw-400 text-center' style={{ height: "40px", width: "115px",background: "#DA9EFF", color: "#39005B", fontSize: "17.5px", borderRadius:"5px"}}>Add New</button>
      </div>
    </div>

      <div>
        <span className='fw-500 fs-20px' style={{color: "#979797"}}>Add or Remove members for united nation team members</span>
      </div>

    
    <div className='mt-4'>
      {/* Buttons for filter */}
    <div className=''>
      <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist" className='col-7 d-flex justify-content-between' >
  <li class="nav-item" role="presentation">
    <button onClick={()=>handleFilter("All")} class="" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true" className={`fw-400" ${activeFilter === 'All' ? 'active-filter-button' : ''}`} style={{fontSize: "17.5px"}}>All</button>
  </li>
  <li class="nav-item" role="presentation">
    <button onClick={()=>handleFilter("Secretariat")} class="" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false" className={`fw-400", ${activeFilter === 'Secretariat' ? 'active-filter-button' : ''}`} style={{fontSize: "17.5px"}}>Secretariat</button>
  </li>
  <li class="nav-item" role="presentation">
    <button onClick={()=>handleFilter("coordinators")} class="" id="pills-contact-tab" data-bs-toggle="pill" data-bs-target="#pills-contact" type="button" role="tab" aria-controls="pills-contact" aria-selected="false" className={`fw-400", ${activeFilter === 'coordinators' ? 'active-filter-button' : ''}`} style={{fontSize: "17.5px"}}>Coordinators</button>
  </li>
  <li class="nav-item" role="presentation">
    <button onClick={()=>handleFilter("Press Corp")} class="" id="pills-disabled-tab" data-bs-toggle="pill" data-bs-target="#pills-disabled" type="button" role="tab" aria-controls="pills-disabled" aria-selected="false" className={`fw-400", ${activeFilter === 'Press Corp' ? 'active-filter-button' : ''}`} style={{fontSize: "17.5px"}}>Press Corps</button>
  </li>
  </ul>
    </div>

  <div class="tab-content" id="pills-tabContent" className='mt-3 col-10'>
      <div class="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab" tabindex="0">
      <div className=''>
      <table class="table">
        {/* map model United Nations Team */}
      <tbody>
        {
        filteredData?.map((ele, i)=>{
            return (
                    <tr>
                        <td className='col-1'><div className='' style={{height: "30px", width: "30px"}}><img className='h-100 w-100' src={ele.img} alt="" /></div></td>
                        <td className='col-3'><div> <span className='fw-400' style={{fontSize: "17.5px"}}>{ele.secretariat}</span></div></td>
                        <td><span className='fw-400' style={{fontSize: "17.5px"}}>{ele.coordinators}</span>                                                    </td>
                        <td><span className='fw-400' style={{fontSize: "17.5px"}}>{ele.pressCorps}</span></td>
                        <td><span className='fw-400' style={{fontSize: "17.5px"}}><MoreVertIcon sx={{color: "#23538f", fontSize: "25px"}}/></span></td>
                    </tr>
                  )       
                  })
                }
              </tbody>
            </table>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

const modelUnTeam = [
  {   
    value : 1,
    img : "/modelUn/dummyprofile.png",
    secretariat : "Ashutosh Kumar",
    coordinators : "Student",
    pressCorps : "Press Corp"
},
{   
    value : 2,
    img : "/modelUn/dummyprofile.png",
    secretariat : "Rahul",
    coordinators : "Teacher",
    pressCorps : "coordinators"
},
{   
    value : 3,
    img : "/modelUn/dummyprofile.png",
    secretariat : "Yash",
    coordinators : "Teacher",
    pressCorps : "Secretariat"
},
{   
    value : 4,
    img : "/modelUn/dummyprofile.png",
    secretariat : "Shaliash",
    coordinators : "Student",
    pressCorps : "Press Corp"
},
{   
    value : 5,
    img : "/modelUn/dummyprofile.png",
    secretariat : "Nitesh",
    coordinators : "Teacher",
    pressCorps : "Secretariat"
},
{   
    value : 6,
    img : "/modelUn/dummyprofile.png",
    secretariat : "Shahil Gagan",
    coordinators : "Student",
    pressCorps : "Press Corp"
},
] 
