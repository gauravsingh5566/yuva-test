import { ButtonGroup } from 'pages/ModelUnParliament'
import React, { useState } from 'react'
import Select from "react-select"
import { AIPPM_Role, COP28_countries, G20_Countries, G20_roles, UNDP_Countries, UNEP_Countries } from "global/AllCountryData";
import { useNavigate } from 'react-router-dom';


export const ModelUnManuallyAssign = () => {
  const [selectedCommitteeType, setSelectedCommitteeType] = useState(selectCommittee[0].type);
  const navigate= useNavigate()
  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      // backgroundColor: state.isSelected ? 'lightblue' : 'white',
      color: state.isSelected ? 'black' : 'inherit',

    }),
  };
  //======== custom style for select Input Feild  =============\\
  const customSelectStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: "#F9F9F9",
      border: "none",
      outline: "none"
    }),
  }
  // Define the onChange event handler to update the selected committee type
  const handleCommitteeTypeChange = (selectedOption) => {
    setSelectedCommitteeType(selectedOption.type);
    console.log(selectedOption.type, "type")
  };

  const handleBack=()=>{
    navigate(-1)
  }
  return (
    <>
     <div className="col-7 mx-5 py-4">
          <h2 className="fs-2 fw-semibold " style={{ color: "#000000" }}>Nominate</h2>

          <p className="fs-19px" style={{ color: "#989898" }}>Please provide the details of nominating a applicant.</p>
     {/*====================== Select for the committee selectionion =============== */}
          <div className="fs-19px fw-500 mt-4" style={{ color: "#000000", marginBottom: "10px" }}>Select a committee to be  assigned</div>
          <Select
            options={selectCommittee}
            isSearchable={false}
            styles={{ ...customStyles, ...customSelectStyles }}
            defaultValue={selectCommittee[0]}
            onChange={handleCommitteeTypeChange}
            getOptionLabel={
              (option) => {
                return (
                  <>
                    <div className="d-flex justify-content-between
                          align-items-center">
                      <div className='fw-500 fs-19px' style={{ color: "#3A3A3A" }}>{option.title}</div>
                    
                        <div className='fw-500 fs-19px me-4' style={{ color: "#BD00FF", fontFamily: "Poppins" }}>{option.available}</div>

                    </div>
                  </>
                )
              }
            }
          />
     {/*====================== Select for the country selectionion if select type is UNDP,UNEP,COP28 =============== */}

          {selectedCommitteeType === "UNEP" || selectedCommitteeType === "COP28" || selectedCommitteeType === "UNDP" ? (
            <>
              <div className='mt-4'><span className='fs-19px fw-500' style={{ fontFamily: "Poppins", color: "#000000" }}>Select a country</span></div>
              <Select
                options={selectedCommitteeType === "UNEP" ? UNEP_Countries : selectedCommitteeType === "COP28" ? COP28_countries : UNDP_Countries}
                isSearchable={true}
                styles={{ ...customStyles, ...customSelectStyles }}
                defaultValue={selectedCommitteeType === "UNEP" ? UNEP_Countries[0] : selectedCommitteeType === "COP28" ? COP28_countries[0] : UNDP_Countries[0]}
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
     {/*====================== Select for the ROLE selectionion if select type is AIPPM =============== */}

          {selectedCommitteeType === "AIPPM" && (
            <>
              <div className='mt-3'><span className='fs-19px fw-500' style={{ fontFamily: "Poppins", color: "#000000" }}>Select a role</span></div>
              <Select
                options={AIPPM_Role}
                isSearchable={true}
                styles={{ ...customStyles, ...customSelectStyles }}
                defaultValue={AIPPM_Role[0]}
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
     {/*====================== Select for ROLE,COUNTRY selectionion if select type is G20 =============== */}

          {selectedCommitteeType === "G20" && (
            <>
              <div className='mt-4'><span className='fs-19px fw-500' style={{ fontFamily: "Poppins", color: "#000000" }}>Select a country</span></div>
              <Select
                options={G20_Countries}
                isSearchable={true}
                styles={{ ...customStyles, ...customSelectStyles }}
                defaultValue={G20_Countries[0]}
                getOptionLabel={
                  (option) => {
                    return (
                      <>
                        <div className='fw-500 fs-19px' style={{ color: "#3A3A3A" }}>{option.name}</div>
                      </>)
                  }}
              />
              <div className='mt-4'><span className='fs-19px fw-500' style={{ fontFamily: "Poppins" }}>Select a role</span></div>
              <Select
                options={G20_roles}
                isSearchable={true}
                styles={{ ...customStyles, ...customSelectStyles }}
                defaultValue={G20_roles[0]}
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
             <div className="buttonManual mt-5">
                  <ButtonGroup btnName="Submit" btnPrev="Cancel" handlePrev={handleBack} />
              </div>
        </div>
    </>
  )
}
const selectCommittee = [
    {
      value: 1,
      title: "United Nations Development Programme ",
      available: "10 Available",
      Applicants: "5 Applicants",
      type: "UNDP"
    },
    {
      value: 2,
      title: " United Nations Security Council",
      available: "15 Available",
      Applicants: "8 Applicants",
      type: "UNDP"
  
    },
    {
      value: 3,
      title: " United Nations General Assembly",
      available: "20 Available",
      Applicants: "12 Applicants",
      type: "UNDP"
  
    },
    {
      value: 4,
      title: "Committee 4",
      available: "25 Available",
      Applicants: "15 Applicants",
      type: "COP28"
  
    },
    {
      value: 5,
      title: "United Nations Framework Convention On Climate Change",
      available: "30 Available",
      Applicants: "18 Applicants",
      type: "UNDP"
    },
    {
      value: 6,
      title: "All India Political Parties Meet",
      available: "35 Available",
      Applicants: "20 Applicants",
      type: "AIPPM"
    },
    {
      value: 7,
      title: "United Nations Women",
      available: "40 Available",
      Applicants: "22 Applicants",
      type: "UNDP"
  
    },
    {
      value: 8,
      title: "Committee 8",
      available: "45 Available",
      Applicants: "25 Applicants",
      type: "AIPPM"
    },
    {
      value: 9,
      title: "United Nations Educational",
      available: "50 Available",
      Applicants: "28 Applicants",
      type: "UNDP"
    },
    {
      value: 10,
      title: "Committee 10",
      available: "55 Available",
      Applicants: "30 Applicants",
      type: "G20"
    }
  ];