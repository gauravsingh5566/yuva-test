import React, { useState } from 'react';
import { useFormik } from 'formik';
import { toast } from 'react-hot-toast';
import { campusregisterSchema } from '../../schema/register';
import { postCampusRegister } from '../../api';
import Swal from 'sweetalert2';
import { Navigate } from 'react-router-dom';

const CampusRegComp = () => {
  const [resume, setResume] = useState();
  const [tnc, setTnc] = useState(false);
  const formdata = new FormData();
  const onSubmit = async (values, action) => {
    toast.loading('Submitting form please wait');
    formdata.append('resume', resume);
    formdata.append('first_name', values.first_name);
    formdata.append('middle_name', values.middle_name);
    formdata.append('last_name', values.last_name);
    formdata.append('institute_name', values.institute_name);
    formdata.append('institute_address', values.institute_address);
    formdata.append('state', values.state);
    formdata.append('pincode', values.pincode);
    formdata.append('email', values.email);
    formdata.append('confirm_email', values.confirm_email);
    formdata.append('contact', values.contact);
    formdata.append('g20_certification_num', values.g20_certification_num);
    formdata.append('social_active', values.social_active);
    formdata.append('views_on_g20', values.views_on_g20);
    formdata.append('topics', values.topics);
    if (resume.size > 1200000) {
      toast.dismiss();
      return toast.error('Maximum resume file size is 600kb');
    } else {
      try {
        const registerto = await postCampusRegister({ ...values, resume });
        if (registerto.data.status === 'ERROR') {
          toast.dismiss();
          Swal.fire({
            title: 'Error',
            text: registerto.data.message,
            icon: 'error',
          });
        } else {
          toast.dismiss();
          Swal.fire({
            title: 'Registered',
            text: registerto.data.message,
            icon: 'success',
          });
          Navigate('/');
          action.resetForm();
        }
      } catch (error) {
        toast.dismiss();
        return toast.error('Something went wrong check your connection');
      }
    }
  };

  const { values, errors, touched, isSubmitting, handleSubmit, handleChange } = useFormik({
    initialValues: {
      first_name: '',
      middle_name: '',
      last_name: '',
      institute_name: '',
      institute_address: '',
      state: '',
      pincode: '',
      email: '',
      confirm_email: '',
      contact: '',
      g20_certification_num: '',
      reference: '',
      social_active: '',
      views_on_g20: '',
      topics: ['', '', ''],
    },
    validationSchema: campusregisterSchema,
    onSubmit,
  });
  return (
    <>
      <form id="campusForm" onSubmit={handleSubmit} className="container" style={{ maxWidth: '1100px' }}>
        <div className="row g-3 gy-2 text-dark">
          <div className="col-12 col-md-6 col-lg-4">
            <span className="form-label">
              First Name <b className="text-danger">*</b>
            </span>
            <input
              type="text"
              id="first_name"
              value={values.first_name}
              onChange={handleChange}
              className={errors.first_name && touched.first_name ? 'form-control border-danger' : 'form-control'}
            />
            {errors.first_name && touched.first_name && <span className="text-danger fnt-small">{errors.first_name}</span>}
          </div>
          <div className="col-12 col-md-6 col-lg-4">
            <span className="form-label">Middle Name </span>
            <input
              type="text"
              id="middle_name"
              value={values.middle_name}
              onChange={handleChange}
              className={errors.middle_name && touched.middle_name ? 'form-control border-danger' : 'form-control'}
            />
            {errors.middle_name && touched.middle_name && <span className="text-danger fnt-small">{errors.middle_name}</span>}
          </div>
          <div className="col-12 col-md-6 col-lg-4">
            <span className="form-label">
              Last Name <b className="text-danger">*</b>
            </span>
            <input
              type="text"
              id="last_name"
              value={values.last_name}
              onChange={handleChange}
              className={errors.last_name && touched.last_name ? 'form-control border-danger' : 'form-control'}
            />
            {errors.last_name && touched.last_name && <span className="text-danger fnt-small">{errors.last_name}</span>}
          </div>
          <div className="col-12 col-lg-6">
            <span className="form-label">
              Resume
              <b className="text-danger">*</b>
            </span>
            <input
              type="file"
              id="resume"
              name="resume"
              onChange={(e) => setResume(e.target.files[0])}
              className="form-control form-control-lg p-3"
              accept="application/msword, text/plain, application/pdf"
              // accept="application/msword, text/plain, application/pdf, image/*"
              required
            />
          </div>
          <div className="col-12 col-lg-6">
            <span className="form-label">
              Institution/College Name where the event will be organised <b className="text-danger">*</b>
            </span>
            <input
              type="text"
              id="institute_name"
              value={values.institute_name}
              onChange={handleChange}
              className={errors.institute_name && touched.institute_name ? 'form-control border-danger' : 'form-control'}
            />
            {errors.institute_name && touched.institute_name && <span className="text-danger fnt-small">{errors.institute_name}</span>}
          </div>
          <div className="col-12 col-lg-6">
            <span className="form-label">
              Institution/College Address <b className="text-danger">*</b>
            </span>
            <input
              type="text"
              id="institute_address"
              value={values.institute_address}
              onChange={handleChange}
              className={errors.institute_address && touched.institute_address ? 'form-control border-danger' : 'form-control'}
            />
            {errors.institute_address && touched.institute_address && <span className="text-danger fnt-small">{errors.institute_address}</span>}
          </div>
          <div className="col-12 col-lg-3">
            <span className="form-label">
              State <b className="text-danger">*</b>
            </span>
            <input
              type={'text'}
              id="state"
              value={values.state}
              onChange={handleChange}
              className={errors.state && touched.state ? 'form-control border-danger' : 'form-control'}
            />
            {errors.state && touched.state && <span className="text-danger fnt-small">{errors.state}</span>}{' '}
          </div>
          <div className="col-12 col-lg-3">
            <span className="form-label">
              Pincode <b className="text-danger">*</b>
            </span>
            <input
              type="text"
              id="pincode"
              value={values.pincode}
              onChange={handleChange}
              className={errors.pincode && touched.pincode ? 'form-control border-danger' : 'form-control'}
            />
            {errors.pincode && touched.pincode && <span className="text-danger fnt-small">{errors.pincode}</span>}{' '}
          </div>
          {/* contact Information  */}
          <div className="col-12">
            <hr className="my-4" />
            <h5>Contact Information</h5>
          </div>
          <div className="col-12 col-lg-6">
            <span className="form-label">
              Email <b className="text-danger">*</b>
            </span>
            <input
              type="email"
              id="email"
              value={values.email}
              onChange={handleChange}
              className={errors.email && touched.email ? 'form-control border-danger' : 'form-control'}
            />
            {errors.email && touched.email && <span className="text-danger fnt-small">{errors.email}</span>}{' '}
          </div>
          <div className="col-12 col-lg-6">
            <span className="form-label">
              Confirm Email <b className="text-danger">*</b>
            </span>
            <input
              type="email"
              id="confirm_email"
              value={values.confirm_email}
              onChange={handleChange}
              className={errors.confirm_email && touched.confirm_email ? 'form-control border-danger' : 'form-control'}
            />
            {errors.confirm_email && touched.confirm_email && <span className="text-danger fnt-small">{errors.confirm_email}</span>}{' '}
          </div>
          <div className="col-12 col-lg-6">
            <span className="form-label">
              Contact Number <b className="text-danger">*</b>
            </span>
            <input
              type="number"
              id="contact"
              value={values.contact}
              onChange={handleChange}
              className={errors.contact && touched.contact ? 'form-control border-danger' : 'form-control'}
            />
            {errors.contact && touched.contact && <span className="text-danger fnt-small">{errors.contact}</span>}{' '}
          </div>
          {/* Additional Information */}
          <div className="col-12">
            <hr className="my-4" />
            <h5>Additional Information</h5>
          </div>
          <div className="col-12 col-lg-6">
            <span className="form-label">
              Enter G20 Certification Number <b className="text-danger">*</b>
            </span>
            <input
              type="text"
              id="g20_certification_num"
              value={values.g20_certification_num}
              onChange={handleChange}
              className={errors.g20_certification_num && touched.g20_certification_num ? 'form-control border-danger' : 'form-control'}
            />
            {errors.g20_certification_num && touched.g20_certification_num && (
              <span className="text-danger fnt-small">{errors.g20_certification_num}</span>
            )}{' '}
          </div>
          <div className="col-12 col-lg-6">
            <span className="form-label">
              How did your team came to know about the Model G20 Summit? <b className="text-danger">*</b>
            </span>
            <input
              type="text"
              id="reference"
              value={values.reference}
              onChange={handleChange}
              className={errors.reference && touched.reference ? 'form-control border-danger' : 'form-control'}
            />
            {errors.reference && touched.reference && <span className="text-danger fnt-small">{errors.reference}</span>}
          </div>
          <div className="col-12 col-lg-6">
            <span className="form-label">
              Do you use social media, if yes please mention your current social media platforms! <b className="text-danger">*</b>
            </span>
            <input
              type="text"
              id="social_active"
              value={values.social_active}
              onChange={handleChange}
              className={errors.social_active && touched.social_active ? 'form-control border-danger' : 'form-control'}
            />
            {errors.social_active && touched.social_active && <span className="text-danger fnt-small">{errors.social_active}</span>}
          </div>
          <div className="col-12 col-lg-6">
            <span className="form-label">
              What are your views on India's G20 Presidency <b className="text-danger">*</b> (minimum 100 words)
            </span>
            <textarea
              type="text"
              rows="5"
              style={{ resize: 'none' }}
              id="views_on_g20"
              value={values.views_on_g20}
              onChange={handleChange}
              className={errors.views_on_g20 && touched.views_on_g20 ? 'form-control border-danger' : 'form-control'}
            />
            {errors.views_on_g20 && touched.views_on_g20 && <span className="text-danger fnt-small">{errors.views_on_g20}</span>}
          </div>
          <div className="col-12">
            <span className="form-label">
              What topics your team would like to address in the model G20 summit? <b className="text-danger">*</b> (any 3)
            </span>
            <div className="row row-cols-1 gy-3 row-cols-lg-3">
              <div className="col">
                <input
                  type="text"
                  placeholder="Topic 1"
                  id="topics[0]"
                  value={values.topics.topic1}
                  onChange={handleChange}
                  className={errors.topics && touched.topics ? 'form-control border-danger' : 'form-control'}
                />
                {errors.topics && touched.topics && <span className="text-danger fnt-small">{errors.topics}</span>}
              </div>
              <div className="col">
                <input
                  type="text"
                  placeholder="Topic 2"
                  id="topics[1]"
                  value={values.topics.topic2}
                  onChange={handleChange}
                  className={errors.topics && touched.topics ? 'form-control border-danger' : 'form-control'}
                />
                {errors.topics && touched.topics && <span className="text-danger fnt-small">{errors.topics}</span>}
              </div>
              <div className="col">
                <input
                  type="text"
                  placeholder="Topic 3"
                  id="topics[2]"
                  value={values.topics.topic3}
                  onChange={handleChange}
                  className={errors.topics && touched.topics ? 'form-control border-danger' : 'form-control'}
                />
                {errors.topics && touched.topics && <span className="text-danger fnt-small">{errors.topics}</span>}
              </div>
            </div>
          </div>
          {/* Model G20 Terms and Conditions * */}
          <div className="col-12">
            <div className="form-check">
              <h5>Model G20 Terms and Conditions *</h5>
              <input
                className="form-check-input"
                type="checkbox"
                value="accept"
                checked={tnc}
                onChange={(e) => {
                  setTnc(e.target.checked);
                }}
                id="checkAgreement"
              />
              <label className="form-check-label" htmlFor="checkAgreement">
                I agree all the information provided by me is true and i agree to the{' '}
                <span className="text-primary" style={{ cursor: 'pointer' }} data-bs-toggle="modal" data-bs-target="#g20campusModal">
                  terms of conditions.
                </span>
              </label>
            </div>
          </div>
          <div className="col-12">
            <button type="submit" className="btn btn-primary-outline hover-ripple" disabled={isSubmitting || !tnc}>
              REGISTER NOW
            </button>
            {errors.length !== 0 && touched.views_on_g20 && <span className="text-danger fnt-small d-block">Please fill form correctly</span>}
          </div>
        </div>
      </form>
    </>
  );
};

export default CampusRegComp;
