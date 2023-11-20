import React, { useEffect, useState } from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import axios from 'axios';
import { api } from 'api';
import { Button, OutlinedInput } from '@mui/material';
import { AddCircleOutlineTwoTone } from '@mui/icons-material';
import { Popup } from 'layout/Popup';
//? Data================

// =================ONBOARD 2 COMPONENTS======================
const OnboardStep2 = ({ formik, selectedInterests, setSelectedInterest, selectedWorries, setSelectedWorries }) => {
  const [interests, setInterest] = useState([
    'Adventure',
    'Music',
    'Sports',
    'Politics',
    'Education ',
    'Fashion',
    'Technology',
    'Gaming',
    'Food',
    'Gaming ',
    'Reading',
    'Art / Photography',
    'Writing ',
    'Movies',
    'TV Shows',
    'Business / Career',
    'Health / Wellness',
  ]);
  const [worries, setWorries] = useState([
    'Global Warming',
    'Climate Change',
    'Over Population',
    'Air Pollution',
    'Water Pollution  ',
    'Noise Pollution ',
    'Terrorism',
    'Access to Health',
    'Access to Education',
    'Mental Health',
    'Gender Inequality',
    'Sexual Violence',
    'Communalism',
    'Casteism',
    'Poverty',
    'Food Insecurity ',
    'Human Rights Violations',
    'Unemployment',
    'Wars',
  ]);

  const [g20Countries, setG20Countries] = useState([]);
  const [g20Roles, setG20Roles] = useState([]);
  const [g20Topics, setG20RTopics] = useState([]);
  async function fetchCountriesAndDesignation() {
    try {
      const res = await api.get('/public/g20_countries');
      const res2 = await api.get('/public/g20_designations');
      const res3 = await api.get('/public/topics');
      if (res.status === 200 && res2.status === 200 && res3) {
        setG20Countries(res.data.result);
        setG20Roles(res2.data.result);
        setG20RTopics(res3.data.result);
      }
    } catch (error) {
      // console.log("Error", error);
    }
  }
  useEffect(() => {
    fetchCountriesAndDesignation();
  }, []);

  const handleInterest = (ele) => {
    // console.log("selectedInterests", selectedInterests);
    if (selectedInterests.includes(ele)) {
      const newArr = selectedInterests.filter((worry) => worry != ele);
      setSelectedInterest(newArr);
    } else if (selectedInterests.length < 5) {
      setSelectedInterest([...selectedInterests, ele]);
    }
  };
  const handleWorries = (ele) => {
    // console.log("selectedWorries", selectedWorries);
    if (selectedWorries.includes(ele)) {
      const newArr = selectedWorries.filter((worry) => worry != ele);
      setSelectedWorries(newArr);
    } else if (selectedWorries.length <= 5) {
      setSelectedWorries([...selectedWorries, ele]);
    }
  };
  const [addInterestEle, setAddInterestEle] = useState('');
  const [showAddInterestEle, setShowAddInterest] = useState(false);
  const addInterest = () => {
    // console.log("Add Interest", addInterestEle, selectedInterests);
    if (addInterestEle.length) {
      if (!interests.includes(addInterestEle)) {
        setSelectedInterest([...selectedInterests, addInterestEle]);
        setInterest([...interests, addInterestEle]);
        setAddInterestEle('');
        setShowAddInterest(false);
      } else {
        // console.log("error", "Interest is Already Available");
      }
    } else {
      setShowAddInterest(true);
    }
  };
  const [addWorryEle, setAddWorryEle] = useState('');
  const [showAddWorry, setShowAddWorry] = useState(false);
  const addWorries = () => {
    if (addWorryEle.length) {
      setSelectedWorries([...selectedWorries, addWorryEle]);
      setWorries([...worries, addWorryEle]);
      setAddWorryEle('');
      setShowAddWorry(false);
    } else {
      setShowAddWorry(true);
    }
  };
  return (
    <div className="row row-cols-1 row-cols-lg-2 border rounded-5 g-0" style={{ overflow: 'hidden' }}>
      <div className="col">
        {/* ==================
        Some Questions 
        ================== */}
        <div className="p-4 p-lg-5">
          <div className="row gy-3">
            <div className="col-12">
              <div>
                <FormLabel className="text-dark fs-5 mb-3">I am Interested in</FormLabel>
                <div>
                  {interests?.map((interest, index) => {
                    return (
                      <Button
                        className="text-capitalize rounded-4 me-2 mb-2  px-3 py-2 fs-6"
                        size="small"
                        key={index}
                        color="success"
                        onClick={() => handleInterest(interest)}
                        variant={selectedInterests.includes(interest) ? 'contained' : 'outlined'}
                        disabled={selectedInterests?.length >= 5 && !selectedInterests.includes(interest)}>
                        {interest}
                      </Button>
                    );
                  })}
                  <div className="row row-cols-2 mt-4">
                    <div className={`col fade ${showAddInterestEle && selectedInterests.length < 5 ? 'show' : 'hide  d-none'}`}>
                      <TextField fullWidth label="Write your Interest.." onChange={(e) => setAddInterestEle(e.target.value)} />
                    </div>
                    <div className="col">
                      <Button
                        className="text-capitalize rounded-4 px-3 py-2 fs-6 d-block "
                        size="small"
                        color="primary"
                        variant={'outlined'}
                        onClick={addInterest}
                        disabled={selectedInterests?.length >= 5}>
                        <AddCircleOutlineTwoTone /> Add Interest
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12">
              <div>
                <FormLabel className="text-dark fs-5 mb-4">What worries me the most about the world </FormLabel>
                <div>
                  {worries?.map((worry, index) => {
                    return (
                      <Button
                        className="text-capitalize rounded-4 me-2 mb-2 px-3 py-2 fs-6"
                        size="small"
                        key={index}
                        color="success"
                        onClick={() => handleWorries(worry)}
                        variant={selectedWorries.includes(worry) ? 'contained' : 'outlined'}
                        disabled={selectedWorries?.length >= 5 && !selectedWorries.includes(worry)}>
                        {worry}
                      </Button>
                    );
                  })}
                  <div className="row row-cols-2 mt-4">
                    <div className={`col fade ${showAddWorry && selectedWorries?.length < 5 ? 'show' : 'hide d-none'}`}>
                      <TextField fullWidth label="Write your Interest.." onChange={(e) => setAddWorryEle(e.target.value)} />
                    </div>
                    <div className="col">
                      <Button
                        className="text-capitalize rounded-4 px-3 py-2 fs-6 d-block "
                        size="small"
                        color="primary"
                        // onClick={() => handleWorries(worry)}
                        variant={'outlined'}
                        onClick={addWorries}
                        disabled={selectedWorries?.length >= 5}>
                        <AddCircleOutlineTwoTone /> Add Interest
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 mt-4">
              <FormControl>
                <FormLabel id="question3" className="text-dark fs-5">
                  What is the change you want to see in this world?
                  <br />
                  <span className="text-secondary">( you will be required to take photos and videos of the summit )</span>
                </FormLabel>
              </FormControl>
              <TextField
                multiline
                id="question3"
                name="question3"
                value={formik?.values.question3}
                onChange={formik?.handleChange}
                error={formik?.touched.question3 && Boolean(formik?.errors.question3)}
                helperText={formik?.touched.question3 && formik?.errors.question3}
                rows={6}
                fullWidth
                className="mt-3"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="col bg-light-maroon-grad  d-none d-lg-block">
        <img src="/assets/images/covers/onboardstudent2.png" alt="" className="d-block w-100 h-100" style={{ objectFit: 'cover' }} />
      </div>
    </div>
  );
};

export default OnboardStep2;
