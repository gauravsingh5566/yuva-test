import React, { useContext, useEffect, useState } from "react";
import EventNoteIcon from "@mui/icons-material/EventNote";
import VerifiedIcon from "@mui/icons-material/Verified";
import OnBoardContext from "pages/OnBoarding/context/onBoardContext";
import BackupIcon from "@mui/icons-material/Backup";
import * as Yup from 'yup';
import { toast } from "react-toastify";
import { ErrorMessage, useFormik } from 'formik';
import { apiAuth } from "api";
import Avatar from '@mui/material/Avatar';

export const StudentStepAppearance = () => {
  const {
    activeStep,
    setActiveStep,
    activeChildStep,
    setActiveChildStep,
    count,
    setCount,
    stepperArray,
    handleNextChild,
    handleBack,
    studentFormik,
    setStudenteData,
} = useContext(OnBoardContext);
const [image, setImage] = useState('');
const [imageLink, setimageLink] = useState('');
const [imageLoading, setImageLoading]= useState(false)
const [url, setUrl] = useState('');
const [isValid, setIsValid] = useState(true);
// const [websiteStatus, setWebsiteStatus] = useState(null);

const validationSchema = Yup.object().shape({
    image: Yup.mixed()
    .when('profile', {
        is: (profile) => !profile,
        then: Yup.mixed()
          .required('Image is required')
          .test('fileSize', 'Image file is too large', (value) => {
            return value && value.size <= 5000000; // 5 MB limit
          })
          .test('fileType', 'Unsupported image file type', (value) => {
            return value && ['image/jpeg', 'image/png', 'image/jpg'].includes(value.type);
          }),
      }),
  });
 const  onSubmit=()=>{
    if (url === '' || isValid) {
        handleNextChild();
      }
}
  const formik = useFormik({
    initialValues:{profile:studentFormik.values.profile||'', image:''},
    validationSchema: validationSchema,
    onSubmit
})


const getImageLink = ()=>{
    setImageLoading(true)
    if(image){
        apiAuth.post('v2/register/uploadInstituteLogo',{img:image})
        .then((res)=>{
            setImageLoading(false)
            setimageLink(res.data.result);
            setStudenteData('profile',res.data.result)
            formik.setFieldValue('profile', res.data.result)
        }).catch((error)=>{
            setImageLoading(false)
            toast.dismiss()
            toast.error('Internal server Error')
        })
    }
}
useEffect(()=>{
    if(image){
        getImageLink()
    }
},[image])

function showFileInput() {
    var img = document.getElementById('img');
    img.click();
  }

  const validateURL = (inputURL) => {
    // Regular expression for a simple URL validation
    const urlPattern = /^(?!(https?:\/\/|www\.))[a-zA-Z]+\.[^\s/$.?#][^\s]*$/;
    return urlPattern.test(inputURL);
  };

   // ************To check URL validation************
   const handleURLChange = (e) => {
    const inputURL = e.target.value;
    setUrl(inputURL);
  
    if (inputURL === '' || validateURL(inputURL)) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };

  
//   const checkWebsite = () => {
//       console.log("url", url);
//     fetch(url, {method : "HEAD"})
//       .then((response) => {
//         console.log("response", response);
//         if (response.status === 200) {
//           setWebsiteStatus('Website is accessible');
//         } else {
//           setWebsiteStatus('Website is not accessible');
//         }
//       })
//       .catch((error) => {
//         setWebsiteStatus('Error occurred while checking', error);
//       });
//   };



return (
    <>
     <form onSubmit={formik.handleSubmit}>
     <div>
            <div className="mb-2">
                <span className=" fs-35px fw-600">Appearance</span>
            </div>
            <div>
                <div className="mb-50">
                    <span
                        className="fw-500 fs-19px color-grey"
                    >
                        Personalize your institute account
                    </span>
                </div>
            </div>

            <div className="d-flex mb-4">
         {imageLoading?<>
            <div className="me-4 d-flex justify-content-center align-items-center" style={{ height: "100px", width: "100px" }}>
                <div class="spinner-border" role="status">
                </div>
            </div>
         </>   
         :    <div className="me-4  " style={{ height: "100px", width: "100px" }}>
              {  formik?.values?.profile?<img
                        className="w-100 h-100 rounded-3"
                        src={formik?.values?.profile}
                    />:    <Avatar
                        className="w-100 h-100 rounded-3"
                        // src={"./images/onBoarding/default_inst.png"}
                    />
                    }
                </div>}
                <div className="">
                    <div className="mb-4">
                        <span className="fs-17px fw-500">
                        Upload your profile picture
                        </span>
                    </div>

                    <div
                        className="p-2 rounded-3 text-center w-auto border-1 cursor-pointer"
                        style={{
                            background: "#F0EBFF",
                        }}
                        onClick={showFileInput}
                    >
                    <input
                        type="file"
                        id="img"
                        style={{ display: 'none' }}
                        accept=".png, .jpg, .jpeg"
                        name="files[]"
                        onChange={(e) => {
                            if (e.target.files.length) {
                                formik.setFieldValue('image',e.target.files[0])
                            setImage(e.target.files[0]);
                            }
                        }}
                        />

                        <span className="me-2 "><img src="./images/onBoarding/upload.png" /></span>
                        <span  className="fs-15px color-purple fw-500 text-center  mb-4"
                        >Upload
                        </span>
                       
                    </div>
                    <span className="text-danger">{formik.errors.image}</span>
                </div>
            </div>


            <div className="d-flex  rounded-3 background-purple border-purple p-3">
                <span className="me-1"><img src="./images/onBoarding/note.png" /> </span>
                <span className="fw-500 fs-15px color-purple">
                Image Quality:  To avoid issues during uploading, ensure your profile picture does not exceed the 5MB file size limit. A smaller image will work perfectly.
                </span>
            </div>

            <div className="my-4">
                <div>
                    <div
                        className="mb-4"
                    >
                        <span className="onboard-form-span-sm">
                            Add a Institute' Website
                        </span>
                    </div>
                    <div className="d-flex align-items-center">
                        <div
                            className="p-2 rounded-3 text-center w-auto border-1 cursor-pointer"
                            style={{
                                background: "#F0EBFF",
                            }}
                        >
                            <span className="color-purple fs-17px fw-500">https://</span>
                        </div>
                        <div className="ms-2" >
                            <input placeholder="example.com" className=" border-0 box-shadow-0 form-control text-dark"
                             type="text"  value={url}  onChange={handleURLChange}/>
                               {!isValid && <p className="text-danger error-message">Invalid URL</p>}
                        </div>
                    </div>
                </div>
            </div>


            <div className="d-flex justify-content-between  mt-4">
                <button onClick={handleBack} className="btn-onboard">
                    Previous
                </button>
                <button type="submit"
                  className="btn-onboard-fill">
                    <span>Next Step</span><img className="ms-2" src="./images/onBoarding/right-icon.png" />
                </button>
            </div>
        </div>
     </form>
    </>
);
};
