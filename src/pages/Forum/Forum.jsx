import {
  Category,
  Filter2TwoTone,
  FilterAltTwoTone,
  HelpCenterOutlined,
  HelpOutlineTwoTone,
  SearchTwoTone,
  Visibility,
  VisibilityOff,
} from '@mui/icons-material';
import {
  Badge,
  Box,
  Button,
  ButtonGroup,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Radio,
  RadioGroup,
  Select,
  Typography,
} from '@mui/material';
import { apiEksathi, apiForum, apiJsonAuth } from 'api';
import { useFormik } from 'formik';
import { useGlobalContext } from 'global/context';
import { Popup, pop2 } from 'layout/Popup';
import React, { useEffect, useState } from 'react';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import AskQuestion from './components/Questions/AskQuestion';
import QuestionCard from './components/Questions/QuestionCard';
import QuestionSkeleton from './components/Skeleton/QuestionSkeleton';
import './Forum.css';
import { LoadingButton } from '@mui/lab';
import SendIcon from '@mui/icons-material/Send';
import useError from 'lib/errorResponse';
import AccessDenied from 'components/Fallback/AccessDenied';
import ReportContent from './components/Modals/ReportContent';
import { ForumProvider } from './forumContext/forumContext';
import WelcomeForum from './components/Extras/WelcomeForum';
import RegisterForum from './components/Extras/RegisterForum';
import WelcomePopup from './components/Extras/WelcomePopup';
import AllQuestions from './components/Questions/AllQuestions';
import axios from 'axios';
import YuvaLoader from './components/Loader/YuvaLoader';
const Forum = () => {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState();
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [forumAccess, setForumAccess] = useState(true);
  const { userData } = useGlobalContext();
  const [showFilterBox, setShowFilterBox] = useState(false);
  const [pageHeading, setPageHeading] = useState('Recent Questions');
  const [sort, setSort] = useState('');
  const [filter, setFilter] = useState('');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [offset, setOffset] = useState();
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState('');
  const [loadMore, setLoadMore] = useState(false);
  const [showLoadBtn, setShowLoadBtn] = useState(true);
  const [sortAndFilter, setSortAndFilter] = useState({});
  const { ErrorResponder } = useError();
  const { token } = useGlobalContext();
  const [openReport, setOpenReport] = React.useState(false);
  const [filterCount, setFilterCount] = useState(0);
  const [showWelcome, setShowWelcome] = useState(false);
  const [isActivated, setIsActivated] = useState(true);
  const [welcomeLayout, setWelcomeLayout] = useState(undefined);
  const [stats, setStats] = useState();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getQuestionsByQuery = async () => {
    setLoading(true);
    try {
      const res = await apiForum.get(`/v1/api/query?sort=${sort}&filter=${filter}&page=${page}&limit=${limit}&offset=${offset}`);
      if (res.status === 200) {
        setQuestions(res?.data?.results);
        if (sort) {
          setPageHeading(`${sort.charAt(0).toUpperCase() + sort.slice(1)} Questions`);
        }
        // console.log("Sorted & Filtered Data: ", res);
        setLoading(false);
      }
    } catch (error) {
      // console.log(error?.response?.data?.error);
    }
  };

  const getQuestionsByCategory = async (categoryId) => {
    setLoading(true);
    navigate('/dashboard/forum');
    try {
      const res = await apiForum.get(
        `/v1/api/questions/category?categoryId=${categoryId}&sort=${sort}&filter=${filter}&page=${page}&limit=${limit}&offset=${offset}`
      );
      if (res.status === 200) {
        setQuestions(res?.data?.results);
        // if (sort) {
        //   setPageHeading(`${sort.charAt(0).toUpperCase() + sort.slice(1)} Questions`);
        // }
        // setPageHeading(`${category}`);
        // console.log("Category Data: ", res);
        setLoading(false);
      }
    } catch (error) {
      // console.log(error?.response?.data?.error);
    }
  };

  const getCategories = async () => {
    try {
      const res = await apiForum.get(`/v1/api/categories`);
      if (res?.status === 200) {
        setCategories(res?.data?.results);
        // console.log("Categories: ", res?.data?.results);
      }
    } catch (error) {
      // console.log(error);
      // pop2.error(error?.response?.data?.message);
    }
  };

  const getQuestions = async () => {
    setLoading(true);
    pop2.loading();
    try {
      // const res = await apiForum.get(`/v1/api/questions`);
      const res = await apiForum.get(`/v1/api/query?sort=&filter=${filter}&page=${page}&limit=${limit}&offset=${offset}`);
      if (res.status === 200) {
        setQuestions(res?.data?.results);
        setPageHeading(`Recent Questions`);
        // console.log("Question Data: ", res);
        setLoading(false);
        setShowWelcome(false);
        getStats();
      }
    } catch (error) {
      // console.log(error.response.data.error);
    }
  };

  const getMyQuestions = async () => {
    setLoading(true);
    try {
      const res = await apiForum.get(`/v1/api/questions/my?email=${userData?.email}`);
      if (res.status === 200) {
        setQuestions(res?.data?.results);
        setPageHeading(`My Questions`);
        // console.log("Question Data: ", res);
        setLoading(false);
      }
    } catch (error) {}
  };

  const formik = useFormik({
    initialValues: {
      search: '',
    },
    onSubmit: async (values, action) => {
      // console.log("Serching...  :", values);
      setLoading(true);
      navigate('/dashboard/forum');
      try {
        const response = await apiForum.get(`/v1/api/search?keyword=${values.search}`);
        if (response.status === 200) {
          // action.resetForm();
          setQuestions(response?.data?.result);
          setPageHeading(`Search Results (${response?.data?.result?.length})`);
          setLoading(false);
        }
      } catch (error) {
        console.error(error);
      }
    },
  });

  const createUser = async (isEksathiTNCAccepted) => {
    try {
      const resData = await apiJsonAuth.get('/student/detail', {
        headers: {
          Authorization: token,
        },
      });
      if (resData?.status === 200) {
        let user = resData?.data?.result[0];
        // setStudentData(user?.data?.result[0]);
        // console.log("User :", user?.data?.result[0]);
        const createUserRes = await apiForum.post(`/v1/api/create-user`, {
          name: user?.first_name + ' ' + user?.last_name,
          email: user?.email,
          profile_pic: user?.profile,
          instituteName: user?.institution_name,
          delegateCountry: user?.g20_country,
          delegateDesignation: user?.g20_designation,
        });
        if (createUserRes?.status === 200) {
          setIsActivated(true);
          setForumAccess(true);
          getQuestions();
          setSort('top-questions');
        }
        if (isEksathiTNCAccepted) {
          // console.log("Creating new accout to Eksathi, Accepted TNC");
          const createEksathiUser = await apiEksathi.post(`/app/user`, {
            email: user?.email,
            first_name: user?.first_name,
            last_name: user?.last_name,
            phone: user?.contact,
            avatar_url: user?.profile,
            role: 'student',
          });

          if (createEksathiUser?.status === 200) {
            Popup(
              'success',
              `Congratualations! Your Eksathi account has been created successfully and your password has been sent on ${userData?.email}.`
            );
            window.open('https://www.eksathi.com', '_blank');
            console.log('Thanks for choosing Eksathi');
            console.log('Eksathi User: ' + createEksathiUser);
          }
        }
      }
    } catch (error) {
      console.log(error);
      if (error?.response?.status === 409) {
        setForumAccess(true);
        getQuestions();
      } else {
        setForumAccess(false);
      }
    }
  };

  const updateUser = async () => {
    try {
      const resData = await apiJsonAuth.get('/student/detail', {
        headers: {
          Authorization: token,
        },
      });
      if (resData?.status === 200) {
        let user = resData?.data?.result[0];
        // setStudentData(user?.data?.result[0]);
        // console.log("User :", user?.data?.result[0]);
        const updateUserRes = await apiForum.put(`/v1/api/update-user?email=${user?.email}`, {
          name: user?.first_name + ' ' + user?.last_name,
          email: user?.email,
          profile_pic: user?.profile,
          instituteName: user?.institution_name,
          delegateCountry: user?.g20_country,
          delegateDesignation: user?.g20_designation,
        });
        if (updateUserRes?.status === 200) {
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const verifyUser = async () => {
    try {
      const res = await apiForum.post(`/v1/api/verify-user`, {
        email: userData?.email,
      });
      if (res?.status === 200) {
        // console.log("Verified User");
        setForumAccess(true);
        // setWelcomeLayout('center');
        getQuestions();
        updateUser();
        setLoading(false);
      }
    } catch (error) {
      // console.log(error);
      setLoading(false);
      if (error?.response?.status === 403) {
        setIsActivated(false);
      } else {
        console.log(error);
        setForumAccess(false);
      }
    }
  };

  const handleShowFilterBox = () => {
    if (showFilterBox) {
      setShowFilterBox(false);
    } else {
      setShowFilterBox(true);
    }
  };

  const getStats = async () => {
    try {
      const res = await apiForum.get(`/v1/api/question-stats`);
      if (res?.status === 200) {
        // console.log("Stats: ", res)
        setStats(res?.data?.results);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    verifyUser();
    getCategories();
  }, []);

  useEffect(() => {
    // console.log("Forum Component Questions");
    if (sort && filter) {
      setFilterCount(2);
    } else if (filter || sort) {
      setFilterCount(1);
    } else {
      setFilterCount(0);
    }
    getQuestionsByQuery();
  }, [sort, filter]);

  return (
    <div className="container py-4">
      {loading && <YuvaLoader setShow={setLoading} />}
      <ForumProvider>
        <div>
          {!isActivated ? (
            <RegisterForum createUser={createUser} />
          ) : forumAccess ? (
            <div className="row">
              <div className="col-lg-8">
                <FormControl variant="outlined" fullWidth className="mb-3 rounded">
                  {/* <InputLabel htmlFor="search">Search</InputLabel> */}
                  <OutlinedInput
                    color="warning"
                    id="search"
                    type="text"
                    className="rounded-4 px-3"
                    name="search"
                    value={formik.values.search}
                    onChange={formik.handleChange}
                    endAdornment={
                      <InputAdornment position="end">
                        <Typography variant="caption">
                          Powered by <span className="text-info">EkSathi</span>
                        </Typography>
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={formik.handleSubmit}
                          // onMouseDown={handleMouseDownPassword}
                          edge="end">
                          {/* {showPassword ? <VisibilityOff /> : <Visibility />} */}
                          <SearchTwoTone />
                        </IconButton>
                      </InputAdornment>
                    }
                    // label="Password"
                    placeholder="Search..."
                  />
                </FormControl>
                <div className="d-md-none mb-3">
                  <Button
                    variant="contained"
                    color="success"
                    fullWidth
                    onClick={handleClickOpen}
                    className="rounded py-2 fs-5 text-capitalize fw-bold">
                    <HelpOutlineTwoTone />
                    &nbsp;Ask Question
                  </Button>
                </div>
                <Outlet
                  context={[
                    { questions, pageHeading, loading },
                    {
                      loading,
                      questions,
                      pageHeading,
                      stats,
                      setSort,
                      filterCount,
                      handleShowFilterBox,
                      showFilterBox,
                      sortAndFilter,
                      setSortAndFilter,
                      setFilter,
                      setShowFilterBox,
                      setPage,
                      setPageHeading,
                      getQuestions,
                      showLoadBtn,
                      setLoadMore,
                      sort,
                      filter,
                      page,
                      limit,
                      offset,
                      setQuestions,
                      loadMore,
                      handleClickOpen,
                      setShowLoadBtn,
                    },
                  ]}
                />
                {/* <AllQuestions search={{ questions, pageHeading, loading }} /> */}
              </div>
              <div className="col-lg-4">
                <div className="mb-3 d-none d-md-block">
                  <Button
                    variant="contained"
                    color="success"
                    fullWidth
                    onClick={handleClickOpen}
                    className="rounded py-2 fs-5 text-capitalize fw-bold">
                    <HelpOutlineTwoTone />
                    &nbsp;Ask Question
                  </Button>
                </div>
                <div className="border rounded-3 mb-3 p-2 p-lg-3">
                  <nav class="nav nav-pills nav-fill flex-column">
                    <h6>Navigation</h6>
                    <ul className="nav-items">
                      <li className="forum-nav-item my-1 p-3 border rounded-3" onClick={getQuestions}>
                        Top Questions
                      </li>
                      <li className="forum-nav-item my-1 p-3 border rounded-3" onClick={getMyQuestions}>
                        My Question
                      </li>
                    </ul>
                    {categories?.length ? (
                      <>
                        <Divider className="my-3" />
                        <h6>Categories</h6>
                        <ul className="nav-items">
                          {categories?.map((category) => {
                            return (
                              <li
                                className="forum-nav-item my-1 p-3 border rounded-3"
                                onClick={() => {
                                  setPage(1);
                                  setPageHeading(category.name);
                                  getQuestionsByCategory(category.id);
                                }}>
                                {category?.name}
                              </li>
                            );
                          })}
                        </ul>
                      </>
                    ) : null}
                  </nav>
                </div>
                <div className="border rounded-4 p-4">
                  <p className="fs-6">If you didn't got your desired answer or you want to ask question publically, Try EkSathi Now!</p>
                  <div className="d-flex justify-content-between flex-wrap">
                    <Link to="http://www.eksathi.com" target="_blank">
                      <Button variant="outlined" color="success" className="text-center text-capitalize mb-2" size="small">
                        Connect to Expert
                      </Button>
                    </Link>
                    <div className="fs-6">
                      Powered By{' '}
                      <Link to="https://www.eksathi.com" target="_blank">
                        EkSathi
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <>
              <AccessDenied
                // title="Access Denied"
                message="It seems like you don't have access to the Q&A portal currently, Please contact your admin to activate the feature."
                contact="modelg20@yuvamanthan.org"
              />
            </>
          )}
        </div>
        <AskQuestion open={open} handleClose={handleClose} getQuestions={getQuestions} categories={categories} />
        <WelcomePopup layout={welcomeLayout} setLayout={setWelcomeLayout} canClose={!loading} />
      </ForumProvider>
    </div>
  );
};

export default Forum;
