import React, { useContext, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './css/addpost.css';
import axios from 'axios';
import { MyContext } from '../EventTimeline';
import { UserContext } from 'global/context';
import Modal from 'react-bootstrap/Modal';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { apiAuth } from 'api';

const AddPost = ({ posts }) => {
  const { userData, token, loginStatus } = useContext(UserContext);
  const { setUserPosts } = useContext(MyContext);
  const { id, email, type, role } = userData;
  const [showError, setshowError] = useState(false);
  const [adminDetail, setadminDetail] = useState(0);
  const [image, setImage] = useState('');
  const {
    first_name: admin_first_name,
    last_name: admin_last_name,
    email: admin_email,
    institution_name: admin_institution_name,
    logo: admin_logo,
    gender: admin_gender,
  } = adminDetail;
  const [postPayload, setPostPayload] = useState({
    postBy: '',
    content: '',
    img: '',
    logo: admin_logo,
    createdAt: '',
    updatedAt: '',
    instituteId: id,
  });

  const initialValues = {
    content: '',
    // img:'',
  };

  const validationSchema = Yup.object().shape({
    content: Yup.string()
      .required('This is Required')
      .when('$submitting', {
        is: true,
        then: Yup.string().required('Content is required'),
      }),
  });
  const fetchAdminDetails = () => {
    axios
      .post(process.env.REACT_APP_API_BASE_URL + 'timeline/getInstituteDetail/', {
        instituteId: id,
      })
      .then((response) => setadminDetail(response.data));
  };

  const fetchPost = () => {
    axios
      .get(process.env.REACT_APP_API_BASE_URL + 'timeline/get')
      .then((response) => {
        setUserPosts(response.data);
      })
      .catch((error) => {});
  };

  const handlePublish = () => {
    formik.setSubmitting(true);
    const postby = userData.institution_name;
    const newPost = {
      postBy: postby,
      logo: admin_logo,
      content: formik.values.content,
      createdAt: postPayload.createdAt,
      updatedAt: postPayload.updatedAt,
      instituteId: id,
    };
    if (type === 1) {
      apiAuth
        .post(process.env.REACT_APP_API_BASE_URL + 'timeline/post', {
          ...newPost,
          img: image,
        })
        .then((response) => {
          setPostPayload((prev) => ({
            ...prev,
            postBy: '',
            content: '',
          }));
          formik.resetForm();
          fetchPost();
        })
        .catch((error) => {});
    } else {
      setshowError(true);
    }
  };

  function showFileInput() {
    if (role === 'institute' && type === 1 && token) {
      fetchAdminDetails();
    }
    var img = document.getElementById('img');
    img.click();
  }

  useEffect(() => {}, []);

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handlePublish,
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <div className="card card-hover" style={{ background: 'white' }}>
          <div className="header d-flex flex-row pt-2" style={{ marginBottom: '24px' }}>
            <div className="publish" style={{ marginRight: '38px', marginLeft: '30px' }}>
              <span style={{ color: 'black' }}>Add Post</span>
            </div>
          </div>
          <div className="middle d-flex flex-row align-items-center pl-2" style={{ paddingLeft: '12px' }}>
            <div className="left">
              <img
                src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt=""
                style={{
                  height: '66px',
                  width: '66px',
                  objectFit: 'cover',
                  borderRadius: '50%',
                }}
              />
            </div>
            <div className="right" style={{ marginLeft: '12px', width: '100%' }}>
              <input
                type="text"
                name="content"
                value={formik.values.content}
                onChange={formik.handleChange}
                // onBlur={formik.handleBlur}
                placeholder={formik.touched.content && formik.errors.content ? '' : 'Write something about you'}
                style={{
                  border: 'none',
                  background: 'transparent',
                  width: '94%',
                }}
              />
              {formik.touched.content && formik.errors.content && <div style={{ color: 'red', paddingBottom: '15px' }}>{formik.errors.content}</div>}
            </div>
          </div>
          <div className="lower d-flex" style={{ padding: '31px 0 12px 0' }}>
            <div className="media button" style={{ marginRight: '28px' }} onClick={showFileInput}>
              <span>Media</span>
            </div>
            <input
              type="file"
              id="img"
              style={{ display: 'none' }}
              accept=".png, .jpg, .jpeg"
              name="files[]"
              onChange={(e) => {
                if (e.target.files.length) {
                  setImage(e.target.files[0]);
                }
              }}
            />
            <div className="activity button" onClick={formik.handleSubmit}>
              <span>Publish</span>
            </div>
          </div>
        </div>
      </form>

      {showError ? (
        <Modal show={showError} onHide={() => setshowError(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Confirmation</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>You are not authorized to create</p>
          </Modal.Body>
        </Modal>
      ) : null}
    </>
  );
};

export default AddPost;
