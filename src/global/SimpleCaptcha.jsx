import { VerifiedTwoTone } from '@mui/icons-material';
import { Button } from '@mui/material';
import { useEffect } from 'react';
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';

const SimpleCaptcha = ({ verified, setVerified }) => {
  useEffect(() => {
    loadCaptchaEnginge(5);
  }, []);
  const doSubmit = () => {
    let user_captcha = document.getElementById('user_captcha_input').value;
    if (validateCaptcha(user_captcha) == true) {
      setVerified(true);
      loadCaptchaEnginge(6);
      document.getElementById('user_captcha_input').value = '';
    } else {
      document.getElementById('user_captcha_input').value = '';
    }
  };
  return (
    <>
      {!verified ? (
        <div className="captcha-simple row g-2 align-items-end justify-content-start p-2 border">
          <div className="col-12">
            <h6>Verification</h6>
          </div>
          <div className="col-8">
            <LoadCanvasTemplate />
            <input placeholder="Enter Captcha" id="user_captcha_input" name="user_captcha_input" type="text"></input>
          </div>
          <div className="col-4">
            <div>
              <Button
                variant="contained"
                color="success"
                fullWidth
                className="rounded-0 text-capitalize"
                startIcon={<VerifiedTwoTone />}
                onClick={() => doSubmit()}>
                verify
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <small className="text-success">
          <VerifiedTwoTone className="fs-6" /> Verified
        </small>
      )}
    </>
  );
};

export default SimpleCaptcha;
