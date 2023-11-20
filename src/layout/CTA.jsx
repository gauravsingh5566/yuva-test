import { AndroidSharp, AndroidTwoTone, PhoneAndroid } from '@mui/icons-material';
import { Button } from '@mui/material';
import React from 'react';

const CTA = () => {
  return (
    <div className="eventsbg bg-dark">
      <div className="container">
        <div className="row row-cols-1 row-cols-lg-2 align-items-center">
          <div className="col">
            <div className="py-5">
              <h3 className="text-white">Download Yuvamanthan App</h3>
              <p className="lh-sm text-white">
                Explore economic discussions, financial outlooks, and initiatives aimed at fostering peace and harmony worldwide. Join us in building
                a better future through knowledge and awareness.
              </p>
              <Button
                variant="contained"
                size="large"
                href="https://www.glcloud.in/apps/yuvamanthan.apk"
                download={'Yuvamanthan'}
                startIcon={<AndroidTwoTone sx={{ color: '#3bd481' }} />}
                className="rounded-pill bg-light text-dark border-2 text-capitalize"
                style={{ border: '2px solid #3bd481' }}>
                <span style={{ textShadow: '1px 1px 0px grey', color: '#3bd481' }}>Download</span>&nbsp;(<small>Android</small>)
              </Button>
            </div>
          </div>
          <div className="col pt-4">
            <img
              src="https://www.glcloud.in/apps/yuvamanthan-app-mockup.png"
              alt=""
              className="w-100 h-100"
              style={{ objectFit: 'contain', objectPosition: 'bottom' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CTA;
