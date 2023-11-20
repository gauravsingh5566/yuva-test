import * as React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Check from '@mui/icons-material/Check';
import HelpIcon from '@mui/icons-material/Help';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import * as Yup from 'yup';
import dayjs from 'dayjs';

import OnboardStep1 from './OnboardStep1';
import OnboardStep2 from './OnboardStep2';
import OnboardStep3 from './OnboardStep3';
import useError from 'lib/errorResponse';
import { Button } from '@mui/material';
import { FormikProvider, useFormik } from 'formik';
import { apiAuth } from 'api';
import { Popup } from 'layout/Popup';
import { useNavigate } from 'react-router-dom';
import { ArrowCircleLeftOutlined, ArrowCircleRightOutlined, CheckCircleOutlineOutlined, PersonSearchOutlined } from '@mui/icons-material';
import { useGlobalContext } from 'global/context';

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
    1: <PersonSearchOutlined style={{ height: 35 }} />,
    2: <HelpIcon sx={{ fontSize: 35 }} />,
    3: <SubscriptionsIcon sx={{ fontSize: 35 }} />,
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

const steps = [
  { label: 'Create Profile', sublabel: 'Start by creating your profile' },
  { label: 'Tell us more', sublabel: 'Help us let us know you better' },
  {
    label: 'E-Module',
    sublabel: 'Please complete this short e-module to participate',
  },
];

const validationSchemaStudent = new Yup.object({
  class: Yup.string().required('Education is a Required Field'),
  fb: Yup.string()
    .max(500)
    .matches(/(?:www.facebook.com|www.fb.com|facebook.com|fb.com)/, 'Facebook profile not found')
    .notRequired(),
  twitter: Yup.string()
    .max(500)
    .matches(/(?:twitter.com|www.twitter.com)/, 'Twitter Profile not found')
    .notRequired(),
  insta: Yup.string()
    .max(500)
    .matches(/(?:instagram.com|www.instagram.com)/, 'Instagram profile not found')
    .notRequired(),
  lkd: Yup.string()
    .max(500)
    .matches(/(?:linkedin.com|www.linkedin.com)/, 'Linkedin profile not found')
    .notRequired(),
  ytb: Yup.string()
    .max(500)
    .matches(/(?:youtube.com|www.youtube.com)/, 'Youtube profile not found')
    .notRequired(),
  bio: Yup.string().max(400, 'Bio is Too long! ( max 400 characters )').notRequired(),
  question2: Yup.string().notRequired(),
});

export default function StudentOnboard() {
  const { ErrorResponder } = useError();
  const { token } = useGlobalContext();
  const [activeStep, setActiveStep] = React.useState(0);
  const [redirectionPage, setRedirectionPage] = React.useState('/dashboard/');
  const [selectedInterests, setSelectedInterest] = React.useState([]);
  const [selectedWorries, setSelectedWorries] = React.useState([]);

  const navigate = useNavigate();
  // ===================
  // FormStepTwo
  // ===================
  const [profile, setProfile] = React.useState('');
  // ===================
  // FormStepThree
  // ===================
  const [date, setDate] = React.useState(dayjs('2022-04-07'));
  // ==========
  // Formik
  // ==========
  const formik = useFormik({
    initialValues: {
      bio: '',
      fb: '',
      insta: '',
      lkd: '',
      class: '12th',
      twitter: '',
      ytb: '',
      question1: '',
      question2: '',
      question3: '',
    },
    validationSchema: validationSchemaStudent,
    onSubmit: async (values, Actions) => {
      Popup('loading');
      if (true) {
        const newBio = values.bio.replaceAll("'", '’');
        const formData = new FormData();
        // formData.append("bio", values.bio);
        formData.append('class', values.class);
        formData.append('bio', newBio);
        formData.append('fb', values.fb);
        formData.append('insta', values.insta);
        formData.append('lkd', values.lkd);
        formData.append('twitter', values.twitter);
        formData.append('ytb', values.ytb);
        formData.append('profile', profile);
        formData.append('question1', JSON.stringify(selectedInterests));
        formData.append('question2', JSON.stringify(selectedWorries));
        formData.append('question3', values.question3);
        if (token) {
          try {
            const response = await apiAuth.post('/student/onboard', formData, {
              headers: {
                Authorization: token,
              },
            });
            if (response.status === 200) {
              Popup('success', response.data.message);
              navigate(redirectionPage);
            }
          } catch (err) {
            if (err?.response?.status === 409) {
              Popup('warning', err?.response?.data?.message);
              navigate(redirectionPage);
            } else {
              ErrorResponder(err);
            }
          }
        }
      }
    },
  });
  const Render = (formik) => {
    switch (activeStep) {
      case 0: {
        return <OnboardStep1 formik={formik} profile={profile} setProfile={setProfile} />;
      }
      case 1: {
        return (
          <OnboardStep2
            formik={formik}
            selectedInterests={selectedInterests}
            setSelectedInterest={setSelectedInterest}
            selectedWorries={selectedWorries}
            setSelectedWorries={setSelectedWorries}
          />
        );
      }
      case 2: {
        return <OnboardStep3 formik={formik} date={date} setDate={setDate} setRedirectionPage={setRedirectionPage} />;
      }
      default:
        <OnboardStep1 />;
    }
  };
  // Button Handler
  // console.log(formik?.errors)
  function nextHandler() {
    if (activeStep < 2) {
      if (profile?.size > 2100000) {
        Popup('warning', 'Your profile picture should have a maximum file size of 2MB');
      } else if (formik?.errors?.class) {
        Popup('warning', formik?.errors?.class);
      } else if (formik?.errors?.bio) {
        Popup('warning', formik?.errors?.bio);
      } else if (formik?.errors?.fb || formik?.errors?.insta || formik?.errors?.twitter || formik?.errors?.lkd || formik?.errors?.ytb) {
        Popup('warning', 'Invalid social media links provided');
      } else {
        setActiveStep(activeStep + 1);
      }
    } else {
      formik.handleSubmit();
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
        <Stepper alternativeLabel activeStep={activeStep} className="row g-2 ">
          {steps?.map((label) => (
            <Step key={label?.label} className="col-12" style={{ minWidth: '300px' }}>
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
              {activeStep > 0 && (
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
              )}
            </div>
            <div className="d-flex align-items-center justify-content-between">
              <Button variant="contained" className="text-initial rounded-4 btn-bg-green-grad" onClick={nextHandler} sx={{ m: 1, py: 2, px: 3 }}>
                {activeStep === 2 ? (
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
          </div>
        </form>
      </FormikProvider>
    </>
  );
}
