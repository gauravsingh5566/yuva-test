import React, { useContext, useEffect, useState } from 'react'
import EventNoteIcon from '@mui/icons-material/EventNote';
import VerifiedIcon from '@mui/icons-material/Verified';
import { Card } from 'react-bootstrap';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import OnBoardContext from '../context/onBoardContext';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { api, apiJson } from 'api';
import { toast } from 'react-toastify';
import { useGlobalContext } from 'global/context';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
// import { GoogleLogin } from 'react-google-login';
import axios from 'axios';
export const OnBoardingComponent = () => {
  const location = useLocation()
  const googleAuthStatus = new URLSearchParams(location.search).get('googleAuthStatus');

  const navigate = useNavigate()
  const {setToken,setUser} = useGlobalContext()
  const [step, setStep] = useState(1);
  const [selectedType, setSelectedType] = useState('')
  const [showType, setShowType] = useState('')
  const [validEmail, setValidEmail] = useState('')
  const [emailExist, setemailExist] = useState(false)
  const [emailExistLogin, setemailLoginExist] = useState(true)
  const [emailLoading, setEmailLoading] = useState(false)
  const [isVerified, setIsVerified] = useState(false)
  const [sentVerificationEmail, setsentVerificationEmail] = useState(false)
  const [currentToken, setCurrentToken] = useState('')
  const [currentEmail, setCurrentEmail] = useState('')
  const [isSubmitingEmail, setisSubmitingEmail] = useState(false)
  const [showEyeIconNew, setShowEyeIconNew] = useState(false)
  const [showEyeIconConfirm, setShowEyeIconConfirm] = useState(false)
  const [showEyeIconEnterPass, setShowEyeIconEnterPass] = useState(false)
  const [showCredential, setShowCredential] = useState(false)
  console.log(googleAuthStatus)
  const userDetail = useFormik({
    initialValues:{
      email:'',
      type:'Student',
      password:'',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
        
    }),
  })
 

  // if fail then show message
  useEffect(()=>{
    console.log(googleAuthStatus)
    if(googleAuthStatus==='fail'){
      toast.dismiss()
      toast.error('Not a registered Email')
    }
  },[])
  const validation = Yup.object().shape({
    newPassword: Yup.string()
        .matches(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*()_+])(?=.{6,})/,
        'Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 symbol, 1 number, and be at least 6 characters'
        )
        .required('Password is required'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
        .required('Confirm Password is required'),
        });

        const initialValues = {
          newPassword:'',
          confirmPassword:'',
      }
      const onSubmit = () => {
        console.log("asfjasklfj")
        if(userDetail.values.type==='Institution'){
          newInstituteRegister()
        }
        else if(userDetail.values.type==='Student'){
          console.log("alsdfjasdklfj")
          newStudentRegister()
        }
        else if(userDetail.values.type==='Teacher'){
          newStudentRegister()
        }
    }
      const formik = useFormik({
        initialValues,
        validationSchema: validation,
        onSubmit
    })

  useEffect(()=>{
    if(location.pathname.includes('/login')){
      setEmailLoading(false)
      setStep(6)
    }
    if(location.pathname.includes('/registration')){
      setEmailLoading(false)
      setStep(1)
    }

  },[location.pathname])

  useEffect(()=>{
    setemailLoginExist(true)
    setemailExist(false)
  },[step])

  
  const setFormikData = (name, value)=>{
    userDetail.setFieldValue(name,value)
  }

// Institute register with email and password
const newInstituteRegister = ()=>{
  const data={
    email:userDetail.values.email,
    password:formik.values.newPassword
  }
  apiJson.post('v2/register/newInstituteRegister',data)
  .then((res)=>{
    if(res.data.success===true){
      setUser(res.data.user)
    setToken(res.data.token)
    }
  }).then(()=>{
    // window.location.href = '/institute-on-boarding';
    navigate('/institute-on-boarding')
  })
  .catch((error)=>{
    console.log(error.message)
    toast.dismiss('Internal server error')
  })
}

const newStudentRegister = ()=>{
  const data={
    email:userDetail.values.email,
    password:formik.values.newPassword,
    role:userDetail.values.type==='Student'?'student':'teacher'
  }
  apiJson.post('v2/register/newStudentRegister',data)
  .then((res)=>{
    if(res.data.success===true){
      setUser(res.data.user)
    setToken(res.data.token)
    }
  }).then(()=>{
    // window.location.href = '/student-on-boarding';
    data.role==='student'?navigate('/student-on-boarding'):navigate('/teacher-on-boarding')
  })
  .catch((error)=>{
    console.log(error.message)
    toast.dismiss('Internal server error')
  })
}

// after enter email it execute
  const checkIfEmailExist = (email)=>{
    setEmailLoading(true)
    console.log('=>>>', email)
    apiJson.post('v2/register/checkEmailExist', {email: email })
    .then((res)=>{
      setEmailLoading(false)
      setemailExist(res.data.result)
      setemailLoginExist(res.data.result)
      if(res.data.result){
        toast.dismiss()
        toast.error('Email Already Exist')
        console.log('Email Already Exist')
      }
      else{
        setStep(5)
        sendVerifyEmail(email)
      }
    }).catch((error)=>{
      setEmailLoading(false)
      toast.dismiss()
      toast.error('Internal Server Error')
    })
  }
  const checkIfEmailExistLogIn = (email)=>{
    setEmailLoading(true)
    console.log('=>>>', email)
    apiJson.post('v2/register/checkEmailExist', {email: email })
    .then((res)=>{
      setEmailLoading(false)
      setemailLoginExist(res.data.result)

      if(res.data.result){
       
        setStep(7)
      }
      else{
      }
    }).catch((error)=>{
      setEmailLoading(false)
      toast.dismiss()
      toast.error('Internal Server Error')
    })
  }

  const handleLogIn = ()=>{
    const data = {
      email:userDetail.values.email,
      password:userDetail.values.password,
    }
    if(!data.password && data.email){
      setShowCredential("Enter your Password")
    }
    else {
      apiJson
      .post('v2/auth/v2-login', data)
      .then((res) => {
        if (res.data.success === true) {
          setUser(res.data.user);
          setToken(res.data.jwt);
          navigate('/new-dashboard');
        } else {
          setShowCredential("Invalid password");
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
    }
  }


  const checkEmailVerification = (email)=>{
    console.log("===>>>>",email)
    if(userDetail.values.type==='Institution'){
      apiJson.post('v2/register/is-verified',{email})
      .then((res)=>{
        setEmailLoading(false)
        setIsVerified(res.data.result)
        console.log(res.data.result)
      }).catch((error)=>{
        setEmailLoading(false)
        console.log(error.message)
      })
    }
    else{
      apiJson.post('v2/register/is-verified/student',{email,role:userDetail.values.type==='Student'?'student':'teacher'})
      .then((res)=>{
        setEmailLoading(false)
        setIsVerified(res.data.result)
      }).catch((error)=>{
        setEmailLoading(false)
        console.log(error.message)
      })
    }
  }

  const sendVerifyEmail =(email)=>{
    setEmailLoading(true)
    // for Institutes
    if(userDetail.values.type==='Institution'){
      apiJson.post('/v2/register/institution/verify-email',{email})
    .then((res)=>{
      setsentVerificationEmail(true)
      toast.success('Email sent SuccessFully')
      setCurrentToken(res.data.token)
      setUser({email:res.data.email, token:res.data.token})
      const checkInterval = setInterval(() => {
        console.log('verification',isVerified)
        if (isVerified) {
          console.log('there', isVerified)
          clearInterval(checkInterval);
          setsentVerificationEmail(false)
        }else{
          console.log('userDetail.email', userDetail.values.email)
          checkEmailVerification(email)
        }
        
      }, 5000);
    })
    .catch((error)=>{
      setEmailLoading(false)
      toast.error('Internal Server Error')
    })
    }

    // for student/teacher
    else{
      apiJson.post('/v2/register/student/verify-email',{email,role:userDetail.values.type==='Student'?'student':'teacher'})
    .then((res)=>{
      setsentVerificationEmail(true)
      toast.success('Email sent SuccessFully')
      setCurrentToken(res.data.token)
      setUser({email:res.data.email, token:res.data.token})
      const checkInterval = setInterval(() => {
        console.log('verification',isVerified)
        if (isVerified) {
          console.log('there', isVerified)
          clearInterval(checkInterval);
          setsentVerificationEmail(false)
        }else{
          console.log('userDetail.email', userDetail.values.email)
          checkEmailVerification(email)
        }
        
      }, 5000);
    })
    .catch((error)=>{
      setEmailLoading(false)
      toast.error('Internal Server Error')
    })
    }


    // for teacher


  }
  // useEffect(()=>{
  //   if(sentVerificationEmail){

  //     const checkInterval = setInterval(() => {
  //       console.log('verification',isVerified)
  //       if (isVerified) {
  //         console.log('there', isVerified)
  //         clearInterval(checkInterval);
  //         setsentVerificationEmail(false)
  //       }else{
  //         console.log('userDetail.email', userDetail.values.email)
  //         checkEmailVerification(userDetail.values.email)
  //       }
        
  //     }, 5000);
  //     return () => {
  //       clearInterval(checkInterval);
  //     };
  //   }
  // },[sentVerificationEmail,isVerified])

  useEffect(() => {
    if (step === 2) {
      setSelectedType('Student')
    }
    if (step === 3) {
      setSelectedType('Individual Institute')
    }
  }, [step])


  const handleClickAccountType = (type) => {
    if (type === 'Institution') {
      setStep(3)
      return
    }

    setShowType(accountType.find((item) => {
      return item.type === type
    }).show)
    setStep(4)


  }
  const accountType = [
    {
      type: 'Student',
      body: 'Students who wish to participate in Yuvamanthan events and their institutions have already registered.',
      show: 'Register Student'

    },
    {
      type: 'Teacher',
      body: 'Teachers who are involved in Yuvamanthan events in their institutions.',
      show: 'Register Teacher'

    },
    {
      type: 'Institution',
      body: 'Only for the registered institutions who wish to create a account with Yuvamanthan and conduct events.',
    },
    {
      type: 'Individual Institute',
      show: 'Register Individual Institute',
      showFor: 'Institute'
    },
    {
      type: 'Group of Institution',
      show: 'Register Group of Institute',
      showFor: 'Institute'
    },
  ]

  const handleEyeToogleNew = ()=>{
    setShowEyeIconNew(!showEyeIconNew)
  }
  const handleEyeToogleConfirm = ()=>{
    setShowEyeIconConfirm(!showEyeIconConfirm)
  }
  const handleEyeToogleEnterPass = ()=>{
    setShowEyeIconEnterPass(!showEyeIconEnterPass)
  }

  const renderStepContent = () => {
    // step 1 create Account 
    // step 2 choose Account Type
    // step 3 creating Institution Account
    // step 4 Register 
    // step 5 Verify
    // step 6 Sign In

    switch (step) {

      // create Account
      case 1:

        return (
          <div>
            <span className='mb-50 d-block fs-2 fw-semibold'>Create Account</span>
            <span className='mb-4  d-block fs-4 fw-semibold'>Welcome to Yuvamanthan</span>
            <span className='fs-17px fw-500' style={{ color: '#989898' }}>
            Experiential learning lies at the heart of Yuvamanthan's pedagogy. Through interactive sessions, simulated situations, and guided discussions, the platform offers the youth a practical learning environment, where they can apply their knowledge and skills in a risk-free setting.
            </span>

            <div className="d-flex justify-content-between mt-4">
              <button
                className="btn-onboard"
                onClick={() => navigate('/login')}
              >
                Sign In
              </button>
             
                <button className="btn-onboard-fill" onClick={() => setStep(2)}>
                  Continue <span><img src='./images/onBoarding/right-icon.png'/></span>
                </button>
           
           
             
            </div>



          </div>
        );


      // Choose Account Type
      case 2:
          
        return (
          <div>
            <div className='mb-50'>
              <span className=' fs-35px fw-600'>Choose The Account Type </span>
            </div>
            <div>
              {
                accountType.map((acc, index) => {
                  return (
                    <>
                      {!acc.showFor &&
                        <Card onClick={() => {
                          setFormikData('type',acc.type)
                          setSelectedType(acc.type)}} style={{ borderColor: 'transparent' }} className={`cursor-pointer rounded-3 mb-4  border-2 ${selectedType === acc.type && 'border-primary '}`}>
                          <Card.Body>
                            <div className="form-check d-flex ">
                              <span>
                              <input onChange={() =>{ 
                                setSelectedType(acc.type)
                                setFormikData('type',acc.type)}} className="form-check-input"
                                type="radio" name="account" id={acc.type} value={acc.type} checked={selectedType === acc.type} />
                              </span>
                              <div className="form-check-label ms-2 " for={acc.type}>
                                <div>
                                  <span className='fw-500 fs-22px'> For {acc.type}</span>
                                </div>
                                <div>
                                  <span style={{
                                    color:'#9A9A9A'
                                  }} className='fs-15px fw-500'> {acc.body}</span>
                                </div>
                              </div>
                            </div>
                          </Card.Body>
                        </Card>
                      }
                    </>
                  )
                })
              }

            </div>
            <div className="d-flex justify-content-between mt-4">
              <button
                className="btn-onboard"
                onClick={() => setStep(1)}
              >
                Previous
              </button>

              <button onClick={() => { handleClickAccountType(selectedType) }} className="btn-onboard-fill" >
                Next <span className='ms-4'><img src='./images/onBoarding/right-icon.png'/></span>
              </button>


            </div>
          </div>
        );

      // creating Institution Account
      case 3:


        return (
          <div>
            <div className='mb-4'>
              <span className='fw-600 fs-35px'>Creating Institute Account</span>
            </div>
            <div>
              {
                accountType?.map((inst) => {
                  return (
                    <>
                      {
                        inst.showFor === 'Institute' &&
                        <Card onClick={() => setSelectedType(inst.type)} style={{ cursor: 'pointer', userSelect: 'none', borderColor: 'transparent' }}
                          className={`rounded-3 mb-2 px-2 border-2  ${selectedType === inst.type && 'border-primary '}`}
                        >
                          <Card.Body>
                            <div className="form-check px-4">
                              <div className=''>
                                <input onChange={() => setSelectedType(inst.type)} className="form-check-input"
                                  type="radio" name="account" id="student" value="student" checked={selectedType === inst.type} />
                              </div>
                              <div className="form-check-label ms-2 " for="student">
                                <div>
                                  <span className='fs-22px fw-500'> {inst.type}</span>
                                </div>
                              </div>
                            </div>
                          </Card.Body>
                        </Card>
                      }
                    </>
                  )
                })
              }
            </div>
            <div className="d-flex justify-content-between mt-4">
              <button
                className="btn-onboard"
                onClick={() => setStep(2)}
              >
                Previous
              </button>

              <button className="btn-onboard-fill" onClick={() => { handleClickAccountType(selectedType) }}>
                Next<span className='ms-4'><img src='./images/onBoarding/right-icon.png'/></span>
              </button>

            </div>
          </div>
        );

      // Register 
      case 4:

        return (
         <form onSubmit={userDetail.handleSubmit}>
           <div>
            <div className='mb-4'>
              <span className=' fs-35px fw-600'> {showType}</span>
            </div>
            <div className='mb-4'>
              <div
                style={{
                  marginBottom: '2rem'
                }}
                className=''>
                <span className='' style={{
                  color: '#989898',
                  fontSize: '19px',
                  fontWeight: '500',
                }}>Provide detail to register</span>
              </div>
              <div style={{
                padding:'31px 0 29px 0'
              }} className=''>
           { 
           emailLoading?    
            <div className='w-100 text-center'>
            <div class="spinner-border text-center" role="status">
  <span class="visually-hidden">Loading...</span>
</div>
            </div>
           :<input style={{ boxShadow: 'none', background: '#dcdcdc2b' }} class={`form-control rounded-3 form-control-lg  custom-placeholder ${emailExist?'border-danger border-2':'border-0'}`}
                  type="email"
                  placeholder="Email Address"
                  aria-label=".form-control-lg example"
                  value={userDetail.values.email}
                  onBlur={userDetail.handleBlur}
                    onChange={(e)=>{
                      setFormikData('email',e.target.value)
                      setemailExist(false)
                      setisSubmitingEmail(false)
                      }}
                  />}
                  { userDetail.errors.email && isSubmitingEmail ? (
        <span className='text-danger'>{userDetail.errors.email}</span>
      ) : null}
      {emailExist && !userDetail.errors.email &&<span className='text-danger'> Email Already Exist</span> }
              </div>
              <div>
                <div className='p-2 rounded-3 border-1 d-flex' style={{
                  background: '#F0EBFF',
                  border:'1px solid #EDCFFF'
                }}> 
                <div><span className='me-2'> <img src='./images/onBoarding/note.png' /></span></div>
                <div>
                  <span style={{
                    color: '#633CFF'
                  }} className='fw-semibold fs-6 mb-4'>
                  {showType === "Register Student" ? "Sign Up now and be a part of Yuvamanthan’s exciting students' community! " : showType === "Register Teacher" ? 
                  "Sign Up now as a Teacher and be a part of Yuvamanthan’s and inspire the leaders of tomorrow!" : " Register your institution and begin its transformative journey into experiential learning based-intervention. A journey whose impact will reverberate through generations, shaping a future that is truly Amrit Kaal - a time of limitless possibilities and collective growth."
                    }
                  </span>
                </div>

                  {/* <span style={{
                    color: '#633CFF'
                  }} className='fw-semibold fs-6 mb-4'><span className='me-2'> <img src='./images/onBoarding/note.png' /></span>{showType === "Register Student" ? "Sign Up now and be a part of Yuvamanthan’s exciting students' community! " : showType === "Register Teacher" ? 
                  "Sign Up now as a Teacher and be a part of Yuvamanthan’s and inspire the leaders of tomorrow!" : " Register your institution and begin its transformative journey into experiential learning based-intervention. A journey whose impact will reverberate through generations, shaping a future that is truly Amrit Kaal - a time of limitless possibilities and collective growth."
                    }</span> */}
                </div>
              </div>
            </div>

            <div className="d-flex justify-content-between my-4 mb-4">
              <button
                className="btn-onboard"
                onClick={() => {
                    
                    setFormikData('email','') 
                    setisSubmitingEmail(false)
                    navigate('/login')

                }}
              >
                Sign In
              </button>

              <button className="btn-onboard-fill" onClick={(e) =>
                {
                  e.preventDefault()
                  setisSubmitingEmail(true)
                 if(userDetail.isValid){
                  console.log("userDetail.values.email",userDetail.values.email)
                  checkIfEmailExist(userDetail.values.email)
                  
                 }
                 
                 }}>
                Next <span className='ms-4'><img src='./images/onBoarding/right-icon.png'/></span>
              </button>

            </div>
            <div className='row justify-content-center mb-4 ' >
              <span style={{
                fontSize: '19px',
                color: 'grey'
              }} className='col-3 fw-semibold text-center '>-OR-</span>
            </div>
            <div className='row justify-content-center'>

              <div className=' col-12  text-center '>
                <div style={{ background: '#FAFBFB' }} 
                className='px-4 py-2 shadow-sm d-inline-block rounded-3 cursor-pointer'>
                  <img style={{
                    height: '61px'
                  }} src={'/images/googleLogo.webp'} /> <span style={{
                    fontSize: '19px', color: '#717171'
                  }} className='fw-semibold'> Sign In With Google</span>
                </div>
              </div>


            </div>
            
          </div>
         </form>
        );

      // Verify
      case 5:

        return (
          <div>
            <div className='mb-2'>
              <span className=' fs-35px fw-600'>Verify</span>
            </div>
            <div>
              <div className='mb-4'>
                <span className='' style={{
                  color: '#989898',
                  fontSize: '19px',
                  fontWeight: '500'
                }}>Please verify your account</span>
              </div>
              <div className='mt-4 mb-4'>
                <span className='fw-500 fs-5'>
                A verification email sent to 
                  <span className='ms-1 me-1 fw-600 '
                    style={{
                      color: '#3600A9'
                    }}
                  >{userDetail.values.email}
                  </span>,
                  check your email and clink on the link to verify email.
                </span>
              </div>
            {isVerified &&  <div>
                <span className='me-2'><img src='./images/onBoarding/verified account.png'/></span><span className='fw-500 fs-22px '>Email Verified</span>
              </div>}

              {
                emailLoading &&  <div className='w-100 text-center'>
            <div class="spinner-border text-center" role="status">
  <span class="visually-hidden">Loading...</span>
</div>
            </div>
              }

            </div>

            <div className="d-flex justify-content-between mt-4">
              <button
                className="btn-onboard"
                onClick={() => {
                  window.location.href = '/registration'
                  // setStep(4)
                }}
              >
                Change Email
              </button>

              <button disabled={!isVerified} className={`${isVerified?"btn-onboard-fill":'btn-onboard-fill-disabled'}`} onClick={
                ()=>{
              if(isVerified){
                  setStep(8)
                // if(showType==='Register Student'){
                //   navigate('/student-on-boarding')
                // }
                // else if (showType==='Register Teacher'){
                //   navigate('/teacher-on-boarding')
                // }
                // else{

                //   navigate('/institute-on-boarding')
                // }
              }
                
              }
                }>
                Next  <span className='ms-4'><img src='./images/onBoarding/right-icon.png'/></span>
              </button>

            </div>
          </div>
        );

      // Sign In
      case 6:

        return (
          <div className='user-select-none'>
            <div className='mb-2'>
              <span className=' fs-35px fw-600 '>Sign In</span>
            </div>
            <div>
              <div
                style={{
                  marginBottom: '2rem'
                }}
                className=''>
                <span className='mb-50 d-block' style={{
                  color: '#989898',
                  fontSize: '19px',
                  fontWeight: '500',
                }}>Enter your credentials to continue</span>
              </div>
              <div className='mb-4 mt-4'>
              { 
           emailLoading?    
            <div className='w-100 text-center'>
            <div class="spinner-border text-center" role="status">
  <span class="visually-hidden">Loading...</span>
</div>
            </div>
           :<input style={{ boxShadow: 'none', background: '#dcdcdc2b' }} class={`form-control rounded-3 form-control-lg  custom-placeholder ${!emailExistLogin?'border-danger border-2':'border-0'}`}
                  type="email"
                  placeholder="Registered Email Address"
                  aria-label=".form-control-lg example"
                  value={userDetail.values.email}
                  onBlur={userDetail.handleBlur}
                    onChange={(e)=>{
                      setFormikData('email',e.target.value)
                      setemailLoginExist(true)
                      setisSubmitingEmail(false)
                      }}
                  />}
                   { userDetail.errors.email && isSubmitingEmail ? (
        <span className='text-danger'>{userDetail.errors.email}</span>
      ) : null}
      {
         !emailExistLogin && isSubmitingEmail && !emailLoading && !userDetail.errors.email &&
       <span className='text-danger'>Email Not Exist</span>
       }
              </div>
              <div>
                <span className='fw-500 fs-17px'>Not your computer? User Guest mode to sign in privately.</span>
                <br />
                <a href='#'>Learn More</a>
              </div>
            </div>


            <div className="d-flex justify-content-between mt-4 mb-4">
              <button
                className="  btn-onboard"
                onClick={(e) => {
                  setFormikData('email','')
                  setisSubmitingEmail(false)

                  window.location.href = '/registration'
                }}
              >
                Create Account
              </button>

              <button className="btn-onboard-fill" onClick={(e) => {
                  setisSubmitingEmail(true)
                if(userDetail.isValid){
                  checkIfEmailExistLogIn(userDetail.values.email)

                }
              }}>
                Next<span className='ms-4'><img src='./images/onBoarding/right-icon.png'/></span>
              </button>

            </div>
            <div className='row justify-content-center mb-4 ' >
              <span style={{
                fontSize: '19px',
                color: 'grey'
              }} className='col-3 fw-semibold text-center '>-OR-</span>
            </div>
            <div className='row justify-content-center'>

              <div className=' col-12  text-center '>
                <div onClick={()=>window.location.href='http://localhost:2100/auth/google'} style={{ background: '#FAFBFB' }} 
                className='px-4 py-2 shadow-sm d-inline-block rounded-3 cursor-pointer'>
                  <img style={{
                    height: '61px'
                  }} src={'/images/googleLogo.webp'} /> <span style={{
                    fontSize: '19px', color: '#717171'
                  }} className='fw-semibold'> Sign In With Google</span>
                </div>
                <div>
    {/* <h2>Login with Google</h2>
    <a href="http://localhost:2100/auth/google">Login with Google</a> */}
  </div>
  <div>
  {/* <GoogleLogin
    clientId={`440877516726-bnd95t54g7lg6j5e35r6k9rrkjn8btp8.apps.googleusercontent.com`}
    buttonText="Log in with Google"
    onSuccess={handleLogin}
    onFailure={handleLogin}
    cookiePolicy={'single_host_origin'}
/> */}
  </div>
              </div>
            </div>
          </div>
        );


      // Enter Password
      case 7:

      return (
       <>
         <div className="d-flex flex-column col-6 mb-4">
                    <span className="fs-3 fw-500 mb-3 d-block">Enter Password</span>
                    <div className='d-flex justify-content-center align-items-center background-grey box-shadow-0 border-0'>
                    <input style={{fontSize: "18px"}} onChange={(e)=>setFormikData('password',e.target.value)} placeholder="********" type={showEyeIconEnterPass ? "text" : "password"} className="form-control rounded-3 background-grey box-shadow-0 border-0" />
                    {
                      showEyeIconEnterPass ? (  <div className='pe-2'><VisibilityIcon className='cursor-pointer' onClick={handleEyeToogleEnterPass}/></div>) : (  <div className='pe-2'><VisibilityOffIcon className='cursor-pointer' onClick={handleEyeToogleEnterPass}/></div>)
                    }
                    </div>
                    <div>{showCredential ? <span className='text-danger'>{showCredential}</span> : null}</div>

                </div>
                 <div className="d-flex justify-content-between  mt-4">
                <button onClick={()=>{
                  setFormikData('password','')
                  setStep(6)
                }} className="btn-onboard">
                    Previous
                </button>
                <button onClick={()=>{
                  handleLogIn()
                }} className="btn-onboard-fill">
                    <span>Next Step</span><img className="ms-2" src="./images/onBoarding/right-icon.png" />
                </button>
            </div>
       </>
      );


      // create password
      case 8:
        return (
          <>
            <form onSubmit={formik.handleSubmit}>
           <div className="mb-2">
                <span className=" fs-2 fw-600">Set Password</span>
            </div>
            <div className="mb-50">
                <span className="fs-5 fw-500 color-grey">
                    Create a strong password for your yuvamanthan account
                </span>
            </div>

            <div className="d-flex flex-column mb-4">
                <div className="d-flex flex-column col-6 mb-4">
                    <span className="fs-5 fw-500 mb-3 d-block">New Password</span>
                    <div className='d-flex justify-content-center align-items-center background-grey box-shadow-0 border-0'>
                    <input style={{fontSize: "18px"}} onChange={(e)=>formik.setFieldValue('newPassword',e.target.value)} placeholder="********" type={showEyeIconNew ? "text" : "password"} className="form-control letter-spacing-5px rounded-3 background-grey box-shadow-0 border-0" />
                    {
                      showEyeIconNew ? (  <div className='pe-2'><VisibilityIcon className='cursor-pointer' onClick={handleEyeToogleNew}/></div>) : (  <div className='pe-2'><VisibilityOffIcon className='cursor-pointer' onClick={handleEyeToogleNew}/></div>)
                    }
                    </div>
                  
                    {/* <div><VisibilityOffIcon onClick={handleEyeToogle}/></div> */}
                    {
                        formik.errors.newPassword && formik.touched.newPassword &&
                        <span className="text-danger">{formik.errors.newPassword}</span>
                    }

                </div>
                <div className="d-flex flex-column col-6">
                    <span className="fs-5 fw-500 mb-3 d-block">Confirm Password</span>
                    <div className='d-flex justify-content-center align-items-center  background-grey box-shadow-0 border-0'>
                    <input style={{fontSize: "18px"}} onChange={(e)=>{
                        formik.setFieldValue('confirmPassword',e.target.value)}}  placeholder="********" type={ showEyeIconConfirm ? "text" : "password"} className="form-control letter-spacing-5px rounded-3 background-grey box-shadow-0 border-0" />
                        {
                          showEyeIconConfirm ? (  <div className='pe-2'><VisibilityIcon className='cursor-pointer' onClick={handleEyeToogleConfirm}/></div>) : (  <div className='pe-2'><VisibilityOffIcon className='cursor-pointer' onClick={handleEyeToogleConfirm}/></div>)
                        }
                        </div>
                    {
                        formik.errors.confirmPassword && formik.touched.confirmPassword &&
                        <span className="text-danger">{formik.errors.confirmPassword}</span>
                    }
                </div>
            </div>

            <div className=" d-flex background-purple p-3 rounded-3 border-purple">
               <span> <img className="me-2" src="./images/onBoarding/note.png" /></span>
                <span className="color-purple fs-17px fw-500">Your password should contain, atleast 1 capital, 1 small, 1 symbol and 1 number. </span>
            </div>

            <div className="d-flex justify-content-between  mt-4">
                <button onClick={()=> setStep(5)} className="btn-onboard">
                    Previous
                </button>
                <button type="submit" className="btn-onboard-fill">
                    <span>Next Step</span><img className="ms-2" src="./images/onBoarding/right-icon.png" />
                </button>
            </div>

           </form>
          </>
        )


      default:
        return null;
    }
  };
  return (
    <>
      <div className="container mt-4">
        <div className="card border-0">
          <div className="card-body">
            {renderStepContent()}
          </div>
        </div>
      </div>
    </>
  )
}