import { WhatsApp } from '@mui/icons-material';
import { Button } from '@mui/material';
import { useGlobalContext } from 'global/context';
import React from 'react';
import * as yup from 'yup';
import { Helmet } from 'react-helmet';
import { NavLink, useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Widget from '../layout/whatsapp/Widget';
import { apiJson } from 'api';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import { pop2 } from '../layout/Popup';

const Footer = () => {
  const { token } = useGlobalContext();
  var CurrentYear = new Date().getFullYear();
  var NextYear = new Date().getFullYear() + 1;
  const copydate = CurrentYear + ' ~ ' + NextYear;
  const { pathname } = useLocation();
  const validationSchema = yup.object().shape({
    email: yup.string().email().required('Email is required'),
  });
  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema,
    onSubmit: async (values, action) => {
      const responce = await apiJson.post('/public/newsletter', {
        ...values,
        type: 'newsletter',
      });
      switch (responce?.data?.status) {
        case 'success':
          toast.dismiss('');
          pop2.success({
            title: 'Thank You',
            description:
              'Your subscription to our newsletter is active now. Through the Yuvamanthan monthly newsletter, you will receive our latest updates, news, views and more. You can unsubscribe any time by clicking on the ‘unsubscribe’ link on the newsletter.',
            timer: 3000,
          });
          action.resetForm();
          break;
        case 'warning':
          toast.dismiss('');
          toast.warning(responce?.data?.message);
          break;
        case 'error':
          toast.dismiss('');
          toast.error(responce?.data?.message);
          break;
      }
    },
  });
  return (
    <footer>
      {/* main footer */}
      <div className={`py-5 border-top ${token || pathname == '/login' ? 'd-none' : ''}`} style={{ background: '#f5f5f7', color: '#6e6e73' }}>
        <div className="container">
          <div className="row justify-content-between">
            {/* footer content */}
            <div className="col-lg-5 mb-5 mb-lg-0">
              {/* logo */}
              <Link to={'/'}>
                {/* <img
                  className="img-responsive height-50  border-end pe-2  border-3"
                  src={process.env.REACT_APP_MAIN_URL + "images/yuva-logo.png"}
                  alt="G20india"
                />
                */}
                <img className="img-responsive" style={{ maxWidth: '300px', objectFit: 'contain' }} src={'/images/logo.png'} alt="G20india" />
              </Link>
              <p className="text-secondary fs-5 mb-1 lh-sm mt-4">
                Engaging the youth in a global dialogue on international diplomacy, leadership and collective duty. A platform to drive change by
                creating awareness on issues that matter and build capacity to navigate the changing economic scenarios.
              </p>
              <p className="text-secondary mb-5 fs-5">Proudly representing India to the world for sustainability, peace and growth.</p>
              <h4 className="text-secondary mb-4">Follow Us On</h4>
              {/* social links */}
              <ul className="list-inline social-icon-alt">
                <li className="list-inline-item">
                  <a
                    className="hover-ripple border-secondary"
                    target={'_blank'}
                    href="https://www.facebook.com/profile.php?id=100089167461647&mibextid=ZbWKwL">
                    <i className="bi bi-facebook text-secondary"></i>
                  </a>
                </li>
                <li className="list-inline-item">
                  <a className="hover-ripple border-secondary" target={'_blank'} href="https://www.instagram.com/yuvamanthan_org/">
                    <i className="bi bi-instagram text-secondary"></i>
                  </a>
                </li>
                <li className="list-inline-item">
                  <a className="hover-ripple border-secondary" target={'_blank'} href="https://twitter.com/Yuvamanthan_org">
                    <i className="bi bi-twitter text-secondary"></i>
                  </a>
                </li>
                <li className="list-inline-item">
                  <a className="hover-ripple border-secondary" target={'_blank'} href="https://www.linkedin.com/in/yuva-manthan-09aa2025b/">
                    <i className="bi bi-linkedin text-secondary"></i>
                  </a>
                </li>
                <li className="list-inline-item">
                  <a className="hover-ripple border-secondary" target={'_blank'} href="https://pin.it/1HUmny3">
                    <i className="bi bi-pinterest text-secondary"></i>
                  </a>
                </li>
                <li className="list-inline-item">
                  <a
                    className="hover-ripple border-secondary"
                    target={'_blank'}
                    href="https://www.snapchat.com/add/yuvamanthan?sender_web_id=cc1dcfed-7ef4-4996-9c78-6d5df3acdee6&device_type=desktop&is_copy_url=true">
                    <i className="bi bi-snapchat text-secondary"></i>
                  </a>
                </li>
                <li className="list-inline-item">
                  <a className="hover-ripple border-secondary" target={'_blank'} href="https://www.youtube.com/@yuvamanthan_">
                    <i className="bi bi-youtube text-secondary"></i>
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-lg-6">
              <div className="row">
                {/* service list */}
                <div className="col-12 col-md-6 mb-5">
                  <h4 className="text-secondary mb-4">Engage with us</h4>
                  <ul className="list-styled">
                    <li className="mb-2">
                      <a className="text-secondary d-block" href="/model-g20">
                        Model G20
                      </a>
                    </li>
                    <li className="mb-2">
                      <a className="text-secondary d-block" href="/course/detail/g20-orientation-course">
                        G20 Genius Certification
                      </a>
                    </li>
                    <li className="mb-2">
                      <a className="text-secondary d-block" href="/life">
                        LiFE
                      </a>
                    </li>
                  </ul>
                </div>
                {/* contact info */}
                <div className="col-12 col-md-6 mb-5">
                  <a href="/contactus">
                    <h4 className="text-secondary mb-4">Contact Us</h4>
                  </a>
                  <ul className="list-unstyled">
                    <li className="text-secondary mb-3">A 92 (First Floor) South Extension Part II New Delhi- 110049</li>
                    <a href="tel:+919560771911." className="text-secondary mb-3">
                      +91 95607 71911
                    </a>
                    <br />
                    <a href="mailto:modelg20@yuvamanthan.org" className="text-secondary mb-3">
                      modelg20@yuvamanthan.org
                    </a>
                  </ul>
                </div>
                {/* newsletter */}
                <div className="col-12">
                  <h4 className="text-secondary mb-4">Subscribe to our newsletter</h4>
                  <form onSubmit={formik.handleSubmit}>
                    <div className="position-relative">
                      <input
                        type="email"
                        className="form-control text-secondary newsletter-form bg-white border border-2"
                        id="email"
                        name="email"
                        value={formik?.values?.email}
                        onChange={formik.handleChange}
                        placeholder="Enter your email"
                      />
                      <button type="submit" className="btn btn-primary btn-subscribe">
                        Subscribe
                      </button>
                    </div>
                  </form>
                </div>
                {/* Useful links */}
                <div className="col-6">
                  <h4 className="text-secondary mt-5 mb-4">Resources</h4>
                  <ul className="d-flex justify-content-between">
                    <li>
                      <a href="/press-and-media" className="text-secondary">
                        Press Release
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="col-6">
                  <h4 className="text-secondary mt-5 mb-4">Company</h4>
                  <ul className="d-flex justify-content-between">
                    <Link style={{ color: 'inherit' }} to="/terms-conditions">
                      Terms & Conditions
                    </Link>
                    <Link style={{ color: 'inherit' }} to="/privacy-policy">
                      Privacy Policy
                    </Link>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* copyright */}
      <div className="bg-secondary-darken py-3">
        <div className="container">
          <div className="row">
            <div className=" text-center text-md-left mb-3 mb-md-0">
              <p className="mb-0 text-white fs-6">
                <span className="text-primary fs-6">Model G20 India</span> &copy; {copydate} All Rights Reserved |{' '}
                <a href="https://nasp.in" target="_blank">
                  <i className="bi bi-cloud-fill"></i> Govardhan Learning Cloud
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
      <Widget />
    </footer>
  );
};

export default Footer;
