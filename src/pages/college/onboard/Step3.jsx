import * as React from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { CalendarPicker } from '@mui/x-date-pickers/CalendarPicker';

import { Button, IconButton, Input, TextField, Tooltip } from '@mui/material';
import { Field, FieldArray } from 'formik';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { Add, Delete, HelpOutlineOutlined, Info, Person2Outlined, QuestionMarkOutlined, QuestionMarkRounded } from '@mui/icons-material';
import moment from 'moment';
import dayjs from 'dayjs';
import { FormText } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const themes = [
  'Select a Theme',
  'Future of Work: Industry 4.0, Innovation, & 21st-Century Skills',
  'Peacebuilding and Reconciliation: Usheringin an Era of No War',
  'Climate Change and Disaster Risk Reduction:Making Sustainability a Way of Life',
  'Shared Future: Youth in Democracy and Governance Youth in Legislature And Politics',
  'Health, Wellbeing, and Sports: Agenda forYouth',
  'Lifestyle for Environment (LiFE): Making Sustainability a Way of Life',
];
const Step3 = ({ formik, setDate, date, details }) => {
  const datePicker = React.useRef();
  // console.log(details);
  React.useEffect(() => {
    if (details?.club === 'life') {
      formik.setFieldValue('theme', 'Lifestyle for Environment (LiFE): Making Sustainability a Way of Life');
    }
  }, [details]);

  return (
    <div className="row row-cols-1 row-cols-lg-2 border rounded-4 g-0 p-0" style={{ overflow: 'hidden' }}>
      <div className="col bg-light-white2-grad  d-none d-lg-block">
        <img src="/assets/images/covers/onboardstudent2.png" alt="" className="d-block w-100 h-100" style={{ objectFit: 'contain' }} />
      </div>
      <div className="col">
        <div className="row g-3 p-2 p-md-4 p-lg-5">
          {/* ==================
        Date Of Appointment 
        ================== */}
          <div className="col-12">
            <div>
              <h4 className="font-ubd fw-semibold text-dark fs-4">
                Choose A Date On Which You Want To Organise Yuvamanthan Model G20.&nbsp;
                <Tooltip arrow title={<span className="text-white fs-6">Ideally you should plan a Model G20 Summit 15 days in advance.</span>}>
                  <HelpOutlineOutlined className="fs-5" />
                </Tooltip>
              </h4>
            </div>
            <span></span>
          </div>
          <div className="col-12  onboard-step-3">
            <LocalizationProvider dateAdapter={AdapterDayjs} className="py-4">
              <StaticDatePicker
                disablePast={true}
                value={date}
                slots={{
                  ActionBar: <> </>,
                }}
                orientation={'landscape'}
                required
                onChange={(newDate) => {
                  setDate(newDate);
                  formik.setFieldValue('appointment_date', newDate);
                }}
              />
            </LocalizationProvider>
            <div className="container text-end">
              <small className="text-danger">
                *{formik?.errors?.appointment_date && formik?.touched?.appointment_date ? formik?.errors?.appointment_date : ''}
              </small>
            </div>
          </div>
          <div className="col-12">
            <h5 className="text-dark fs-5 fw-semibold">Student Registration Deadline</h5>
            <p className="lh-sm lh-sm fs-6 mb-0 text-secondary">
              Select a deadline for students to register for the YMG20 summit that you wish to organise in your institution. Ideally, the deadline
              should be kept atleast a week before the summit so that the students get ample time to prepare.
            </p>
          </div>
          <div className="col-12">
            <div>
              <Field
                name="deadline"
                className="form-control"
                type="date"
                onClick={(e) => e.target.showPicker()}
                id="deadline"
                min={moment().format('YYYY-MM-DD')}
                max={moment(new Date(date)).format('YYYY-MM-DD')}
              />
              <small className="text-danger">{formik?.errors?.deadline && formik?.touched?.deadline ? formik?.errors?.deadline : ''}</small>
            </div>
          </div>
          <div className="col-12">
            <span className="fs-5 text-dark text-capitalize">Select a Theme for your Event</span>
            <p className="fs-6 mt-1 mb-0">
              Participating students will be discussing certain topics or themes. You may choose from the 5 listed themes for your YMG20. For details
              on the theme visit the following links.
            </p>
            <ul className="mt-2 mx-2">
              <li className="fs-6">
                <Link to="/future-of-work" target="_blank">
                  {' '}
                  Future of Work{' '}
                </Link>
              </li>
              <li className="fs-6">
                <Link to="/peacebuilding-and-reconciliation" target="_blank">
                  {' '}
                  PeaceBuilding and Reconciliation
                </Link>
              </li>
              <li className="fs-6">
                {' '}
                <Link to="/climate-change-and-disaster-risk-reduction" target="_blank">
                  Climate Change and Disaster Risk Reduction
                </Link>
              </li>
              <li className="fs-6">
                {' '}
                <Link to="/shared-future" target="_blank">
                  Shared Future
                </Link>
              </li>
              <li className="fs-6">
                {' '}
                <Link to="/health-well-being-and-sports" target="_blank">
                  Health, Wellbeing and Sports
                </Link>
              </li>
              <li className="fs-6">
                {' '}
                <Link to="/life" target="_blank">
                  Lifestyle for Environment (LiFE): Making Sustainability a Way of Life
                </Link>
              </li>
            </ul>
          </div>
          <div className="col-12">
            <Field className="mx-auto form-select mt-0 w-100 py-3" name="theme" as="select" disabled={details?.club === 'life'}>
              {details?.club === 'life' && <option>{'Lifestyle for Environment (LiFE): Making Sustainability a Way of Life'}</option>}
              {themes.map((theme, i) => {
                return <option key={i}>{theme}</option>;
              })}
            </Field>
            <small className="text-danger">{formik?.errors?.theme && formik?.touched?.theme ? formik?.errors?.theme : ''}</small>
          </div>
          <FieldArray
            name="coordinators"
            render={(arrayHelpers) => (
              <div>
                <div className="d-flex align-items-center justify-content-between mt-3">
                  <div className="font-ubd fw-thin text-dark fs-5 d-flex align-items-center">
                    Add Teacher Coordinator
                    <Tooltip
                      arrow
                      title={
                        <span className="text-white fs-6">
                          Add a Teacher Coordinator who will be responsible for managing and conducting the YMG20 Summit. They will also be orienting
                          students on G20.
                        </span>
                      }>
                      <HelpOutlineOutlined className="fs-5" sx={{ marginLeft: 1 }} />
                    </Tooltip>
                  </div>
                  {/* <div className="d-flex align-items-center">
                    <Button
                      color="success"
                      variant="outlined"
                      className="rounded-3 py-2 text-capitalize fw-semibold"
                      onClick={() => arrayHelpers.insert(formik.values?.coordinators.length + 1, "")}
                      sx={{ m: 1 }}
                    >
                      <Add /> Add Coordinator
                    </Button>
                  </div> */}
                </div>
                {formik.values?.coordinators &&
                  formik.values?.coordinators?.length > 0 &&
                  formik.values?.coordinators.map((coordinator, index) => (
                    <div key={index} className="row g-2 mb-3">
                      <div className="col-12">
                        {/* <span className="text-dark mb-0"><Person2Outlined />&nbsp;Coordinator {index + 1} </span> */}
                        {/* <IconButton
                          type="button"
                          color="error"
                          className={`text-initial ${index === 0 ? "fade" : "text-danger"}`}
                          onClick={() => arrayHelpers.remove(index)} // remove a friend from the list
                          disabled={index === 0}
                        >
                          <Delete />
                        </IconButton> */}
                      </div>
                      <div className="col-12 col-md-6">
                        <Field className={'form-control'} name={`coordinators.${index}.name`} type="text" placeholder="Cordinators's Name" />
                        <small className="text-danger">
                          {formik?.errors?.coordinators && formik?.touched?.coordinators ? formik?.errors?.coordinators[index]?.name : ''}
                        </small>
                      </div>
                      <div className="col-12 col-md-6">
                        <Field className={'form-control'} name={`coordinators.${index}.email`} type="email" placeholder="Cordinators's Email" />{' '}
                        <small className="text-danger">
                          {formik?.errors?.coordinators && formik?.touched?.coordinators ? formik?.errors?.coordinators[index]?.email : ''}
                        </small>
                      </div>
                      <div className="col-12 col-md-6">
                        <Field
                          className={'form-control'}
                          name={`coordinators.${index}.contact`}
                          type="text"
                          placeholder="Cordinators's Contact Number"
                        />
                        <small className="text-danger">
                          {formik?.errors?.coordinators && formik?.touched?.coordinators ? formik?.errors?.coordinators[index]?.contact : ''}
                        </small>
                      </div>
                      <div className="col-12 col-md-6">
                        <Field
                          className={'form-control'}
                          name={`coordinators.${index}.designation`}
                          type="text"
                          placeholder="Cordinators's Designation"
                        />
                        <small className="text-danger">
                          {formik?.errors?.coordinators && formik?.touched?.coordinators ? formik?.errors?.coordinators[index]?.designation : ''}
                        </small>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default Step3;
