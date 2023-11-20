import React, { useContext, useEffect, useState } from "react";
import EventNoteIcon from "@mui/icons-material/EventNote";
import VerifiedIcon from "@mui/icons-material/Verified";
import OnBoardContext from "pages/OnBoarding/context/onBoardContext";
import BackupIcon from "@mui/icons-material/Backup";
import Select from 'react-select';
import { ErrorMessage, useFormik } from 'formik';
import * as Yup from 'yup';
const classes = [
  {
    value:'1',
    name:'Post Graduate',
  },
  {
    value:'2',
    name:'Under Graduate',
  },
  {
    value:'3',
    name:'High School',
  },
  {
    value:'4',
    name:'Middle School',
  },
]


export const StudentStepQualification = () => {
   
  const {
    activeStep,
    setActiveStep,
    activeChildStep,
    setActiveChildStep,
    count,
    setCount,
    stepperArray,
  } = useContext(OnBoardContext);

  const [selectedOption, setSelectedOption] = useState({});
  const [selectStream , setSelectStream] = useState([])
  const [selectProgram , setselectProgram] = useState([])
const handleSelectChange = (option) => {
  setSelectedOption(option);
};

  const handleBack = () => {
    setActiveChildStep(activeChildStep - 1);
    if (activeChildStep <= 0) {
      setCount(count - 1);
      setActiveStep(activeStep - 1);
      setActiveChildStep(0);
    }
    if (activeStep < 0) {
      setActiveStep(0);
    }
    if (activeChildStep < 0) {
      setActiveChildStep(0);
    }
    console.log("active", activeStep, " activechild", activeChildStep, " ");
  };

  const handleNextChild = () => {
    setActiveChildStep(activeChildStep + 1);

    if (activeChildStep >= stepperArray[count]?.childStep?.length - 1) {
      setActiveStep(activeStep + 1);
      setCount(count + 1);
      setActiveChildStep(0);
      console.log(
        "active step",
        activeStep,
        "stepperlength",
        stepperArray.length
      );
      if (activeStep > stepperArray.length - 2) {
        console.log("inside the if condition");
        setCount(0);
        setActiveStep(0);
        setActiveChildStep(0);
      }
    }
    // if(activeStep>=stepperArray?.length-1){
    //   console.log("active step ", activeStep,"stepperArraydddddddddddddd", stepperArray.length)
    //   setActiveStep(0)
    //   setCount(0)
    // }
    console.log("this is length", stepperArray?.length);
    console.log(
      "active step ",
      activeStep,
      "stepperArray",
      stepperArray.length
    );
  }

    const validation = Yup.object({
        course: Yup.string().required('Required'),
        program: Yup.string(),
        stream: Yup.string(),
        year: Yup.string(),
    })
    const initialValues = {
      course: '',
      program: '',
      stream: '',
      year: '',

    }
    const onSubmit = () => {
        // handleShowDuplicateWarning()
        handleNextChild()
    }
    const formik = useFormik({
        initialValues,
        validationSchema: validation,
        onSubmit
    })

    useEffect(()=>{
      if(formik.values.course ==='Undergraduate (Bachelors)'){
        setselectProgram(bachelorDegrees)
      }
      else if(formik.values.course ==='Postgraduate (Masters)'){
        setselectProgram(masterDegrees)
      }
      else if(formik.values.course ==='Diploma/Certificate Course'){
        setselectProgram(diplomaCourses)
      }
      else if(formik.values.course ==='Professional Course (e.g., CA, CS, ICWA)'){
        setselectProgram(professionalCourses)
      }else{
        setselectProgram([])
      }
     
    },[formik.values.course])

    useEffect(()=>{
      if(formik.values.program ==='Bachelor of Arts (BA)'){
        setSelectStream(bachelorDegrees[0].subject)
      }
      else if(formik.values.program ==='Bachelor of Science (BSc)'){
        setSelectStream(bachelorDegrees[1].subject)
      }
      else if(formik.values.program ==='Bachelor of Engineering (BE/BTech)'){
        setSelectStream(bachelorDegrees[3].subject)
      }
      else if(formik.values.program ==='Bachelor of Arts (BA)'){
        setSelectStream(bachelorDegrees[0].subject)
      }
      else if(formik.values.program ==='Bachelor of Arts (BA)'){
        setSelectStream(bachelorDegrees[0].subject)
      }
      else setSelectStream([])
    },[formik.values.program])


  return (
   <>
      <form onSubmit={formik.handleSubmit}>
      <div >
        <div className="mb-2">
          <span className=" fs-2 fw-600">Qualification</span>
        </div>
        <div >
          <div className="mb-4">
            <span
              className=""
              style={{
                color: "#989898",
                fontSize: "19px",
                fontWeight: "500",
              }}
            >
           Details of your latest qualification
            </span>
          </div>
        </div>

       <div className="outer-div-for-select">
        <div className="mb-4 col-8">
            <div>
                <div className="mb-2">
                  <span className="fs-19 fw-500">
                  Select your highest qualification
                  </span>
                </div>
            </div>
            <div className="">
                  <Select
                    styles={customStyles}
                      options={educationLevels}
                      defaultValue={formik.values.course}
                      onChange={(e)=>formik.setFieldValue('course', e.name)}
                      getOptionLabel={
                        (option)=>{
                          return (
                            <>
                              <div className="mb-2 d-flex z-index-1">
                                <span>
                                  {option.name}
                                </span>
                              </div>
                            </>
                          )
                        }
                      }
                  />
                  {
                    formik.touched.course && formik.errors.course &&
                    <span className="text-danger">{formik.errors.course}</span>
                  }
                    
            </div>
        </div>

        {/* only execute if not class */}
      {

[
  'Class 6',
  'Class 7',
  'Class 8',
  'Class 9',
  'Class 10',
  'Class 11 (Science)',
  'Class 11 (Commerce)',
  'Class 11 (Arts)',
  'Class 12 (Science)',
  'Class 12 (Commerce)',
  'Class 12 (Arts)',
  'Other (Please specify)',
  ''
].includes(formik.values.course)  ?null: 
        <div>
        <div className="mb-4 col-8">
             <div>
                 <div className="mb-2">
                 <span className="fs-19 fw-500">
                 Degree
                   </span>
                 </div>
             </div>
             <div className="">
                   <Select
                   styles={customStyles}
                       options={selectProgram}
                       defaultValue={formik.values.program}
                       onChange={(e)=>formik.setFieldValue('program',e.name)}
                       getOptionLabel={
                         (option)=>{
                           return (
                             <>
                               <div className="mb-2 d-flex z-index-1">
                                 <span>
                                   {option.name}
                                 </span>
                               </div>
                             </>
                           )
                         }
                       }
                   />
                   {
                     formik.touched.program && formik.errors.program &&
                     <span className="text-danger">{formik.errors.program}</span>
                   }
                     
             </div>
         </div>
       { [
  'Bachelor of Arts (BA)',
  'Bachelor of Science (BSc)',
  'Bachelor of Engineering (BE/BTech)',
  
].includes(formik.values.program)  && <div className="mb-4 col-8">
             <div>
                 <div className="mb-2">
                 <span className="fs-19 fw-500">
                     Select Stream
                   </span>
                 </div>
             </div>
             <div className="">
                   <Select
                   styles={customStyles}
                       options={selectStream}
                       defaultValue={formik.values.stream}
                       onChange={(e)=>formik.setFieldValue('stream',e.name)}
                       getOptionLabel={
                         (option)=>{
                           return (
                             <>
                               <div className="mb-2 d-flex z-index-1">
                                 <span>
                                   {option.name}
                                 </span>
                               </div>
                             </>
                           )
                         }
                       }
                   />
                    {
                     formik.touched.stream && formik.errors.stream &&
                     <span className="text-danger">{formik.errors.stream}</span>
                   }
                     
                     
             </div>
         </div>}
         <div className="mb-4 col-8">
             <div>
                 <div className="mb-2">
                 <span className="fs-19 fw-500">
                     Year of Education
                   </span>
                 </div>
             </div>
             <div className="">
                   <Select
                   styles={customStyles}
                       options={academicYears}
                       defaultValue={formik.values.year}
                       onChange={(e)=>formik.setFieldValue('year',e.name)}
                       getOptionLabel={
                         (option)=>{
                           return (
                             <>
                               <div className="mb-2 d-flex z-index-1">
                                 <span>
                                   {option.name}
                                 </span>
                               </div>
                             </>
                           )
                         }
                       }
                   />
                   {
                     formik.touched.year && formik.errors.year &&
                     <span className="text-danger">{formik.errors.year}</span>
                   }
                     
             </div>
         </div>
        </div>

      }

       </div>

        <div className="d-flex justify-content-between mt-4 z-index-1">
          <button onClick={handleBack} className="btn-onboard">
            Previous
          </button>

          <button type="submit" className="btn-onboard-fill">
            Next Step <span className='ms-4'><img src='./images/onBoarding/right-icon.png'/></span>
          </button>
        </div>
      </div>
      </form>

   </>
  )
}

const customStyles = {
  control: (provided) => ({
      ...provided,
      padding: '3px',
      border: 'none',
      background: '#eeeeee4d',
      // boxShadow:'none'
  }),

};


const educationLevels = [
  { name: 'Undergraduate (Bachelors)', value: 12 },
  { name: 'Postgraduate (Masters)', value: 13 },
  { name: 'Diploma/Certificate Course', value: 14 },
  { name: 'Professional Course (e.g., CA, CS, ICWA)', value: 15 },
  { name: 'Other (Please specify)', value: 16 }
];


const bachelorDegrees = [
  { name: 'Bachelor of Arts (BA)', value: 1 ,
   subject:[
    { name: 'History', value: 1 },
    { name: 'Political Science', value: 2 },
    { name: 'Sociology', value: 3 },
    { name: 'Economics', value: 4 },
    { name: 'Psychology', value: 5 },
    { name: 'Literature', value: 6 },
    { name: 'Geography', value: 7 },
    { name: 'Philosophy', value: 8 },
    { name: 'Anthropology', value: 9 },
    { name: 'Linguistics', value: 10 },
    { name: 'Other (Please specify)', value: 11 }
  ] },
  { name: 'Bachelor of Science (BSc)', value: 2, 
  subject:[
    { name: 'Select Subject', value: 0 },
  { name: 'Physics', value: 1 },
  { name: 'Chemistry', value: 2 },
  { name: 'Biology', value: 3 },
  { name: 'Mathematics', value: 4 },
  { name: 'Computer Science', value: 5 },
  { name: 'Environmental Science', value: 6 },
  { name: 'Biotechnology', value: 7 },
  { name: 'Electronics', value: 8 },
  { name: 'Zoology', value: 9 },
  { name: 'Botany', value: 10 },
  { name: 'Geology', value: 11 },
  { name: 'Other (Please specify)', value: 12 }
  ] },
  { name: 'Bachelor of Commerce (BCom)', value: 3 },
  { name: 'Bachelor of Engineering (BE/BTech)', value: 4 ,subject:[
    { name: 'Select Stream', value: 0 },
    { name: 'Civil Engineering', value: 1 },
    { name: 'Mechanical Engineering', value: 2 },
    { name: 'Electrical Engineering', value: 3 },
    { name: 'Electronics and Communication Engineering', value: 4 },
    { name: 'Computer Science and Engineering', value: 5 },
    { name: 'Aerospace Engineering', value: 6 },
    { name: 'Chemical Engineering', value: 7 },
    { name: 'Biomedical Engineering', value: 8 },
    { name: 'Other (Please specify)', value: 9 }
  ]},
  { name: 'Bachelor of Business Administration (BBA)', value: 5 },
  { name: 'Bachelor of Computer Applications (BCA)', value: 6 },
  { name: 'Bachelor of Laws (LLB)', value: 7 },
  { name: 'Bachelor of Pharmacy (BPharm)', value: 8 },
  { name: 'Bachelor of Design (BDes)', value: 9 },
  { name: 'Bachelor of Fine Arts (BFA)', value: 10 },
  { name: 'Bachelor of Education (B.Ed)', value: 11 },
  { name: 'Bachelor of Architecture (BArch)', value: 12 },
  { name: 'Bachelor of Hotel Management (BHM)', value: 13 },
  { name: 'MBBS (Bachelor of Medicine and Bachelor of Surgery)', value: 14 },
  { name: 'BDS (Bachelor of Dental Surgery)', value: 15 },
  { name: 'BAMS (Bachelor of Ayurvedic Medicine and Surgery)', value: 16 },
  { name: 'BHMS (Bachelor of Homeopathic Medicine and Surgery)', value: 17 },
  { name: 'BUMS (Bachelor of Unani Medicine and Surgery)', value: 18 },
  { name: 'BPT (Bachelor of Physiotherapy)', value: 19 },
  { name: 'B.Sc. Nursing (Bachelor of Science in Nursing)', value: 20 },
  { name: 'B.O.T (Bachelor of Occupational Therapy)', value: 21 },
  { name: 'B.Pharm (Bachelor of Pharmacy)', value: 22 },
  { name: 'B.V.Sc (Bachelor of Veterinary Science)', value: 23 },
  { name: 'Other (Please specify)', value: 24 }
];
const masterDegrees = [
  { name: 'Master of Arts (MA)', value: 1, subject:[
    { name: 'History', value: 1 },
  { name: 'Political Science', value: 2 },
  { name: 'Sociology', value: 3 },
  { name: 'Economics', value: 4 },
  { name: 'Psychology', value: 5 },
  { name: 'Literature', value: 6 },
  { name: 'Geography', value: 7 },
  { name: 'Philosophy', value: 8 },
  { name: 'Anthropology', value: 9 },
  { name: 'Linguistics', value: 10 },
  { name: 'Other (Please specify)', value: 11 }
  ] },
  { name: 'Master of Science (MSc)', value: 2 , subject:[
    { name: 'Physics', value: 1 },
  { name: 'Chemistry', value: 2 },
  { name: 'Biology', value: 3 },
  { name: 'Mathematics', value: 4 },
  { name: 'Computer Science', value: 5 },
  { name: 'Environmental Science', value: 6 },
  { name: 'Biotechnology', value: 7 },
  { name: 'Electronics', value: 8 },
  { name: 'Zoology', value: 9 },
  { name: 'Botany', value: 10 },
  { name: 'Geology', value: 11 },
  { name: 'Other (Please specify)', value: 12 }
  ]},
  { name: 'Master of Commerce (MCom)', value: 3 },
  { name: 'Master of Business Administration (MBA)', value: 4 },
  { name: 'Master of Technology (MTech)', value: 5,subject:[
    { name: 'Civil Engineering', value: 1 },
    { name: 'Mechanical Engineering', value: 2 },
    { name: 'Electrical Engineering', value: 3 },
    { name: 'Electronics and Communication Engineering', value: 4 },
    { name: 'Computer Science and Engineering', value: 5 },
    { name: 'Aerospace Engineering', value: 6 },
    { name: 'Chemical Engineering', value: 7 },
    { name: 'Biomedical Engineering', value: 8 },
    { name: 'Other (Please specify)', value: 9 }
  ] },
  { name: 'Master of Computer Applications (MCA)', value: 6 },
  { name: 'Master of Social Work (MSW)', value: 7 },
  { name: 'Master of Education (MEd)', value: 8 },
  { name: 'Master of Law (LLM)', value: 9 },
  { name: 'Master of Design (MDes)', value: 10 },
  { name: 'Master of Pharmacy (MPharm)', value: 11 },
  { name: 'Master of Fine Arts (MFA)', value: 12 },
  { name: 'Master of Journalism and Mass Communication (MJMC)', value: 13 },
  { name: 'MD (Doctor of Medicine)', value: 14 },
  { name: 'MS (Master of Surgery)', value: 15 },
  { name: 'MDS (Master of Dental Surgery)', value: 16 },
  { name: 'MD/MS Ayurveda', value: 17 },
  { name: 'MD Homeopathy', value: 18 },
  { name: 'MD Unani', value: 19 },
  { name: 'MPT (Master of Physiotherapy)', value: 20 },
  { name: 'M.Sc. Nursing (Master of Science in Nursing)', value: 21 },
  { name: 'M.Pharm (Master of Pharmacy)', value: 22 },
  { name: 'M.Sc. in Clinical Research', value: 23 },
  { name: 'Other (Please specify)', value: 24 }
];

const diplomaCourses = [
  { name: 'Diploma in Digital Marketing', value: 1 },
  { name: 'Diploma in Web Development', value: 2 },
  { name: 'Diploma in Graphic Designing', value: 3 },
  { name: 'Diploma in Animation and VFX', value: 4 },
  { name: 'Diploma in Interior Designing', value: 5 },
  { name: 'Diploma in Fashion Designing', value: 6 },
  { name: 'Diploma in Event Management', value: 7 },
  { name: 'Diploma in Photography', value: 8 },
  { name: 'Diploma in Hotel Management', value: 9 },
  { name: 'Diploma in Travel and Tourism', value: 10 },
  { name: 'Diploma in Culinary Arts', value: 11 },
  { name: 'Diploma in Film Making', value: 12 },
  { name: 'Diploma in Journalism and Mass Communication', value: 13 },
  { name: 'Diploma in Public Relations', value: 14 },
  { name: 'Diploma in Advertising', value: 15 },
  { name: 'Diploma in Business Management', value: 16 },
  { name: 'Diploma in Human Resource Management', value: 17 },
  { name: 'Diploma in Financial Management', value: 18 },
  { name: 'Diploma in Marketing Management', value: 19 },
  { name: 'Diploma in Operations Management', value: 20 },
  { name: 'Diploma in Supply Chain Management', value: 21 },
  { name: 'Diploma in Retail Management', value: 22 },
  { name: 'Diploma in Banking and Finance', value: 23 },
  { name: 'Diploma in Information Technology', value: 24 },
  { name: 'Diploma in Computer Applications', value: 25 },
  { name: 'Diploma in Mobile App Development', value: 26 },
  { name: 'Diploma in Software Testing', value: 27 },
  { name: 'Diploma in Cyber Security', value: 28 },
  { name: 'Diploma in Data Science', value: 29 },
  { name: 'Diploma in Artificial Intelligence', value: 30 },
  { name: 'Diploma in Machine Learning', value: 31 },
  { name: 'Diploma in Cloud Computing', value: 32 },
  { name: 'Diploma in Internet of Things (IoT)', value: 33 },
  { name: 'Diploma in Robotics', value: 34 },
  { name: 'Diploma in Renewable Energy', value: 35 },
  { name: 'Diploma in Environmental Management', value: 36 },
  { name: 'Diploma in Health and Nutrition', value: 37 },
  { name: 'Diploma in Yoga and Meditation', value: 38 },
  { name: 'Diploma in Fitness and Exercise Science', value: 39 },
  { name: 'Diploma in Beauty and Wellness', value: 40 },
  { name: 'Diploma in Ayurveda', value: 41 },
  { name: 'Diploma in Naturopathy', value: 42 },
  { name: 'Diploma in Acupuncture', value: 43 },
  { name: 'Diploma in Music', value: 44 },
  { name: 'Diploma in Dance', value: 45 },
  { name: 'Diploma in Theatre and Acting', value: 46 },
  { name: 'Diploma in Fine Arts', value: 47 },
  { name: 'Diploma in Foreign Languages', value: 48 },
  { name: 'Diploma in Sign Language Interpretation', value: 49 },
  { name: 'Diploma in Early Childhood Education and Care', value: 50 },
];
const professionalCourses = [
  { name: 'Chartered Accountancy (CA)', value: 1 },
  { name: 'Company Secretary (CS)', value: 2 },
  { name: 'Cost and Works Accountancy (ICWA)', value: 3 },
  { name: 'Chartered Financial Analyst (CFA)', value: 4 },
  { name: 'Certified Financial Planner (CFP)', value: 5 },
  { name: 'Certified Management Accountant (CMA)', value: 6 },
  { name: 'Certified Public Accountant (CPA)', value: 7 },
  { name: 'Chartered Institute of Management Accountants (CIMA)', value: 8 },
  { name: 'Financial Risk Manager (FRM)', value: 9 },
  { name: 'Certified Information Systems Auditor (CISA)', value: 10 },
  { name: 'Certified Internal Auditor (CIA)', value: 11 },
  { name: 'Chartered Financial Consultant (ChFC)', value: 12 },
  { name: 'Actuarial Science', value: 13 },
  { name: 'Certified Public Secretary (CPS)', value: 14 },
  { name: 'Certified Fraud Examiner (CFE)', value: 15 },
  { name: 'Chartered Institute of Management Accountants (CMA)', value: 16 },
  { name: 'Certified Supply Chain Professional (CSCP)', value: 17 },
  { name: 'Certified Professional in Supply Management (CPSM)', value: 18 },
  { name: 'Project Management Professional (PMP)', value: 19 },
  { name: 'Agile Certified Practitioner (ACP)', value: 20 },
  { name: 'Certified Information Systems Security Professional (CISSP)', value: 21 },
  { name: 'Certified Ethical Hacker (CEH)', value: 22 },
  { name: 'Certified Information Security Manager (CISM)', value: 23 },
  { name: 'Certified Data Scientist (CDS)', value: 24 },
  { name: 'Certified Business Analytics Professional (CBAP)', value: 25 },
  { name: 'Certified Human Resource Professional (CHRP)', value: 26 },
  { name: 'Certified Marketing Professional (CMP)', value: 27 },
  { name: 'Certified Digital Marketing Professional (CDMP)', value: 28 },
  { name: 'Certified Six Sigma Green Belt (CSSGB)', value: 29 },
  { name: 'Certified Six Sigma Black Belt (CSSBB)', value: 30 },
  { name: 'Certified Quality Engineer (CQE)', value: 31 },
  { name: 'Certified Software Quality Analyst (CSQA)', value: 32 },
  { name: 'Certified Information Systems Manager (CISM)', value: 33 },
  { name: 'Certified Professional in Healthcare Quality (CPHQ)', value: 34 },
  { name: 'Certified Professional in Learning and Performance (CPLP)', value: 35 },
  { name: 'Certified Professional in Talent Development (CPTD)', value: 36 },
  { name: 'Certified Professional in Human Resources (CPHR)', value: 37 },
  { name: 'Certified Supply Chain Professional (CSCP)', value: 38 },
  { name: 'Certified in Production and Inventory Management (CPIM)', value: 39 },
  { name: 'Certified Maintenance and Reliability Professional (CMRP)', value: 40 },
  { name: 'Other (Please specify)', value: 41 }
];

const academicYears = [
  { name: 'First Year', value: 1 },
  { name: 'Second Year', value: 2 },
  { name: 'Third Year', value: 3 },
  { name: 'Fourth Year', value: 4 }
];
