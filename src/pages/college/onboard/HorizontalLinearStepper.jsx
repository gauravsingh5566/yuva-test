import * as React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Check from '@mui/icons-material/Check';
import SettingsIcon from '@mui/icons-material/Settings';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import InsertInvitationIcon from '@mui/icons-material/InsertInvitation';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';

import VideoLabelIcon from '@mui/icons-material/VideoLabel';
import * as Yup from 'yup';
import dayjs from 'dayjs';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import { Button } from '@mui/material';
import Swal from 'sweetalert2';
import { FormikProvider, useFormik } from 'formik';
import { apiAuth, apiJsonAuth } from 'api';
import { pop2, Popup } from 'layout/Popup';
import { useNavigate } from 'react-router-dom';
import { ArrowCircleLeftOutlined, ArrowCircleRightOutlined, CheckCircleOutlineOutlined, DiamondTwoTone } from '@mui/icons-material';
import { useGlobalContext } from 'global/context';
import useError from 'lib/errorResponse';
import { toast } from 'react-toastify';
import useImgCompressor from 'lib/fileCompresser';

const QontoStepIconRoot = styled('div')(({ theme, ownerState }) => ({
  color: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#eaeaf0',
  display: 'flex',
  height: 22,
  alignItems: 'center',
  ...(ownerState.active && {
    color: '#784af4',
  }),
  '& .QontoStepIcon-completedIcon': {
    color: '#784af4',
    zIndex: 1,
    fontSize: 18,
  },
  '& .QontoStepIcon-circle': {
    width: 8,
    height: 8,
    borderRadius: '50%',
    backgroundColor: 'currentColor',
  },
}));

function QontoStepIcon(props) {
  const { active, completed, className } = props;

  return (
    <QontoStepIconRoot ownerState={{ active }} className={className}>
      {completed ? <Check className="QontoStepIcon-completedIcon" /> : <div className="QontoStepIcon-circle" />}
    </QontoStepIconRoot>
  );
}

QontoStepIcon.propTypes = {
  /**
   * Whether this step is active.
   * @default false
   */
  active: PropTypes.bool,
  className: PropTypes.string,
  /**
   * Mark the step as completed. Is passed to child components.
   * @default false
   */
  completed: PropTypes.bool,
};

const ColorlibStepIconRoot = styled('div')(({ theme, ownerState }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccc',
  zIndex: 1,
  color: '#fff',
  width: 80,
  height: 80,
  display: 'flex',
  borderRadius: '50%',
  justifyContent: 'center',
  alignItems: 'center',
  ...(ownerState.active && {
    backgroundImage: 'linear-gradient( 136deg, #81FBB8 0%, #28C76F 50%, #28C76F 100%)',
    boxShadow: '0 4px 20px 0 rgba(0,0,0,.25)',
  }),
  ...(ownerState.completed && {
    backgroundImage: 'linear-gradient( 136deg, #81FBB8 0%, #28C76F 50%, #28C76F 100%)',
  }),
}));

function ColorlibStepIcon(props) {
  const { active, completed, className } = props;
  const icons = {
    1: <QuestionMarkIcon sx={{ fontSize: 35 }} />,
    2: <DiamondTwoTone sx={{ fontSize: 35 }} />,
    3: <InsertInvitationIcon sx={{ fontSize: 35 }} />,
  };

  return (
    <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
      {icons[String(props.icon)]}
    </ColorlibStepIconRoot>
  );
}

ColorlibStepIcon.propTypes = {
  active: PropTypes.bool,
  className: PropTypes.string,
  completed: PropTypes.bool,
  icon: PropTypes.node,
};

// const steps = ["Add a Question", "Upload your logo", "Select a date"];
const steps = [
  { label: 'Tell us more', sublabel: 'Tell us more about your institution' },
  {
    label: 'Logo and Social Profile',
    sublabel: ' Upload Logo and update Social Profile',
  },
  {
    label: 'Select a date',
    sublabel: 'Select a Date and Appoint Teacher Coordinator',
  },
];

export default function CustomizedSteppers() {
  const { ErrorResponder } = useError();
  const { token } = useGlobalContext();
  const [activeStep, setActiveStep] = React.useState(0);
  const navigate = useNavigate();
  const validationSchema = new Yup.object({
    fb: Yup.string()
      .max(500)
      .matches(/(?:www.facebook.com|www.fb.com)/, 'Facebook profile not found')
      .notRequired(),
    twitter: Yup.string()
      .max(500)
      .matches(/(?:twitter.com|www.twitter.com)/, 'Twitter Profile not found')
      .notRequired(),
    insta: Yup.string()
      .max(500)
      .matches(/(www.instagram.com)/, 'Instagram profile not found')
      .notRequired(),
    lkd: Yup.string()
      .max(500)
      .matches(/(www.linkedin.com)/, 'Linkedin profile not found')
      .notRequired(),
    ytb: Yup.string()
      .max(500)
      .matches(/(www.youtube.com)/, 'Youtube profile not found')
      .notRequired(),
    institution_name: Yup.string().notRequired(),
    bio: Yup.string().max(400, 'Bio is Too long! ( max 400 characters )').notRequired(),
    question1: Yup.string().notRequired(),
    question2: Yup.string().required('Institution type is required'),
    question3: Yup.string().required('Participants Profile is required'),
    question4: Yup.string().notRequired(),
    question5: Yup.string().notRequired(),
    question6: Yup.string().notRequired(),
    app_date: Yup.string().notRequired(),
    deadline: Yup.string().required('Select DeadLine for event'),
    appointment_date: Yup.string().required('Select DeadLine for event'),
    theme: Yup.string().required('Theme for Event is required'),
    coordinators: Yup.array()
      .of(
        Yup.object().shape({
          name: Yup.string().max(400).required('Coordinator Name is required'),
          email: Yup.string().email('email must be a valid.').max(300).required('Coordinator Email is required'),
          contact: Yup.string()
            .required('Coordinator Contact Number is required')
            .max(300)
            .matches(/^[0-9]{10}$/, 'Invalid Contact Number'),
          designation: Yup.string().max(300).required('Coordinator Designation is required'),
        })
      )
      .required('Must have Coordinator')
      .min(1, 'Minimum of 1 Coordinator is required'),
  });
  // ===================
  // FormStepTwo
  // ===================
  const [profile, setProfile] = React.useState('');
  useImgCompressor(profile, setProfile);
  // ===================
  // FormStepThree
  // ===================
  const [date, setDate] = React.useState(dayjs(Date.now()));
  const [deadline, setDeadline] = React.useState();
  const [theme, setTheme] = React.useState();
  const [details, setDetails] = React.useState({});
  const fetchDetails = async () => {
    if (token) {
      Popup('loading');
      try {
        const res = await apiJsonAuth.get('/institute', {
          headers: {
            Authorization: token,
          },
        });
        if (!res?.data?.onboard) {
          Popup();
          setDetails(res.data.result[0]);
        } else {
          navigate('/dashboard/');
          pop2.success({
            title: 'Welcome',
            description: 'Welcome to Yuvamanthan, Please proceed with our onboarding process.',
          });
        }
      } catch (error) {
        ErrorResponder(error);
      }
    }
  };
  React.useEffect(() => {
    // fetchDetails();
  }, [token]);
  // ==========
  // Formik
  // ==========
  const formik = useFormik({
    initialValues: {
      password: '',
      confirm_password: '',
      bio: '',
      fb: '',
      insta: '',
      lkd: '',
      twitter: '',
      ytb: '',
      question1: '',
      question2: 'school',
      question3: 'Upper primary/Middle School(Standards VI to VIII)',
      question4: '',
      question5: '',
      question6: '',
      app_date: '',
      deadline: '',
      theme: '',
      appointment_date: '',
      coordinators: [
        {
          name: '',
          email: '',
          contact: '',
          designation: '',
        },
      ],
    },
    validationSchema: validationSchema,
    validateOnChange: true,
    onSubmit: async (values, Actions) => {
      toast?.dismiss();
      toast.loading('Onboarding please wait..');
      const newBio = values.bio.replaceAll("'", '’');
      const formData = new FormData();
      // formData.append("bio", values.bio);
      formData.append('bio', newBio);
      // formData.append("password", values.password);
      formData.append('confirm_password', values.confirm_password);
      formData.append('fb', values.fb);
      formData.append('insta', values.insta);
      formData.append('lkd', values.lkd);
      formData.append('twitter', values.twitter);
      formData.append('ytb', values.ytb);
      formData.append('logo', profile);
      formData.append('question1', values.question1);
      formData.append('question2', values.question2);
      formData.append('question3', values.question3);
      formData.append('question4', values.question4);
      formData.append('question5', values.question5);
      formData.append('question6', values.question6);
      formData.append('coordinators', JSON.stringify(values.coordinators));
      formData.append('appointment_date', date.$d.toISOString().slice(0, 10));
      formData.append('deadline', values.deadline ?? date.$d.toISOString().slice(0, 10));
      formData.append('theme', values.theme);
      try {
        const response = await apiAuth.post('/institute/onboard', formData, {
          headers: {
            Authorization: token,
          },
        });
        switch (response?.data?.status) {
          case 'success':
            toast.dismiss();
            toast.success(response.data.message);
            navigate('/dashboard/');
            break;
          case 'error':
            toast.dismiss();
            toast.error(response.data.message);
            break;
          case 'warning':
            toast.dismiss();
            toast.warning(response.data.message);
            navigate('/dashboard/');
            break;
          default:
            break;
        }
      } catch (err) {
        ErrorResponder(err);
      }
    },
  });
  const Render = (formik) => {
    switch (activeStep) {
      case 0: {
        return <Step1 formik={formik} details={details} />;
        break;
      }
      case 1: {
        return <Step2 formik={formik} profile={profile} setProfile={setProfile} />;
        break;
      }
      case 2: {
        return <Step3 formik={formik} date={date} setDate={setDate} setTheme={setTheme} setDeadline={setDeadline} details={details} />;
        break;
      }
      default:
        <Step1 />;
    }
  };

  // Button Handler
  function nextHandler() {
    if (activeStep < 2) {
      if (formik?.errors?.bio) {
        toast.dismiss();
        toast.warning(formik?.errors?.bio);
      } else if (
        (formik?.errors?.fb || formik?.errors?.insta || formik?.errors?.twitter || formik?.errors?.lkd || formik?.errors?.ytb) &&
        activeStep > 0
      ) {
        toast.dismiss();
        toast.warning('Invalid social media links provided');
      } else {
        setActiveStep(activeStep + 1);
      }
    } else if (formik?.errors?.coordinators) {
      toast.dismiss();
      toast.warning('Please Add Coordinator details');
    } else {
      if (formik?.errors.length) {
        toast.dismiss();
        toast.warning(formik?.errors[0]);
      } else {
        formik.handleSubmit();
      }
    }
  }
  function prevHandler() {
    if (activeStep > 0) {
      setActiveStep(activeStep - 1);
    }
  }
  return (
    <>
      <div className="text-center py-3 bg-light-green-grad">
        <p className="font-ubd  text-white m-0 fw-bold fs-1">Welcome to Yuvamanthan!</p>
        <p className="font-ubd  text-white">You are just a few steps away from your Yuvamanthan dashboard.</p>
      </div>
      <Stack className="container py-5" sx={{ width: '100%' }} spacing={1}>
        <Stepper alternativeLabel activeStep={activeStep} className="row g-2 align-items-stretch">
          {steps?.map((label) => (
            <Step key={label?.label} className="col-12 special h-100" style={{ minWidth: '300px' }}>
              <div className="d-inline-block bg-white border rounded-pill w-100 h-100">
                <div className="d-flex align-items-center p-2 pe-4">
                  <StepLabel StepIconComponent={ColorlibStepIcon}></StepLabel>
                  <span className="bg-white ms-3">
                    <b className="fs-5 text-dark">{label?.label} </b> <br />
                    {label?.sublabel}
                  </span>
                </div>
              </div>
            </Step>
          ))}
        </Stepper>
      </Stack>
      <FormikProvider value={formik}>
        <form onSubmit={formik.handleSubmit} className="container pb-5">
          <div>{Render(formik)}</div>
          <div className="d-flex flex-wrap align-items-center justify-content-between mt-4">
            <div>
              <Button
                variant="outlined"
                className="text-initial rounded-4"
                size="small"
                color="warning"
                onClick={prevHandler}
                sx={{ m: 1, py: 2, px: 3 }}>
                <ArrowCircleLeftOutlined />
                &nbsp;&nbsp;Back
              </Button>
            </div>
            <Button variant="contained" className="text-initial rounded-4 btn-bg-green-grad" onClick={nextHandler} sx={{ m: 1, py: 2, px: 3 }}>
              {activeStep == 2 ? (
                <>
                  Submit&nbsp;&nbsp;
                  <CheckCircleOutlineOutlined />
                </>
              ) : (
                <>
                  Next&nbsp;&nbsp;
                  <ArrowCircleRightOutlined />
                </>
              )}
            </Button>
          </div>
        </form>
      </FormikProvider>
    </>
  );
}
