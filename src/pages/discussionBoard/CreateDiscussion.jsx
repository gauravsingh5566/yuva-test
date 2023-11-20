import { YmBreadCrumbs } from 'pages/ModelUnParliament'
import React, { useEffect, useState } from 'react'
import ArrowBackIosNewTwoToneIcon from '@mui/icons-material/ArrowBackIosNewTwoTone';
import AddCircleTwoToneIcon from '@mui/icons-material/AddCircleTwoTone';
import { DiscussionBoardStudentProfileList } from './component';
import { useNavigate } from 'react-router-dom';
import { useDiscussionContext } from './discussionBoardContext/discussionContext';
import { useGlobalContext } from 'global/context';
import { apiJson } from 'api';
import { Autocomplete, Box, TextField } from '@mui/material';
import * as Yup from 'yup'
import { useFormik } from 'formik';
import moment from "moment";
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';


export const CreateDiscussion = () => {
    const navigate = useNavigate();
    const { userData } = useGlobalContext()
    const [typeofAttendees, setTypeOfAttendees] = useState('')
    const [userListByRole, setUserListByRole] = useState([])
    const [userList, setUserList] = useState([])
    const [submitState, setSubmitState] = useState(false)
    const [value, setValue] = useState(userList[0]);
    const [inputValue, setInputValue] = useState('');

    let role = userData?.role
    let userId = userData?.id
    let instituteId = '';

    if (role === 'institute') {
        instituteId = userData.id;
    } else {
        instituteId = userData.instituteId;
    }
    // ==============Add Event validate ==============\\\

    // ========== Find All User  api Call ========
    useEffect(() => {
        let instituteId = '';

        if (role === 'institute') {
            instituteId = userData.id;
        } else {
            instituteId = userData.instituteId;
        }
        const res = async () => {
            const result = await apiJson.get(`/api/v2/discussion_board/userList?instituteId=${instituteId}`)
            setUserList(result?.data?.userList)
        }
        res();
    }, [])
    // =============== create discussion  input field validation ============
    const CreateDiscSchema = Yup.object().shape({
        discTitle: Yup.string().required('Discussion title is required.'),
        eventDate: Yup.string().required('Event Date is required.'),
        eventSTime: Yup.string().required("Event Start time is required"),
        eventETime: Yup.string().required('Event End Time is required. ')
    })

    const CreateDiscussionFormik = useFormik({
        initialValues: {
            discTitle: "",
            eventDate: "",
            eventSTime: "01:00",
            eventETime: "02:00",
            eventName: "1",
            attendees: []
        },
        validationSchema: CreateDiscSchema,
        onSubmit: async (values, action) => {

            const EventDate = moment(values.eventDate).format('L');
            const date = new Date();
            const currentDate = moment(date).format('L')
            if (EventDate < currentDate) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'You are provide previous date!',

                })
                return
            }
            try {
                setSubmitState(true)

                const res = await apiJson.post(`/api/v2/discussion_board/createDiscussion?instituteId=${instituteId}&role=${role}&userId=${userId}`, values);
                toast.success(res?.data?.message)
                if (res) {
                    setSubmitState(false)
                }
                action.resetForm();
                navigate("/new-dashboard/discussion-board")
            } catch (error) {
                setSubmitState(false)
                console.log("Error", error)
            }
        }
    })

    useEffect(() => {
        let instituteId = '';

        if (role === 'institute') {
            instituteId = userData.id;
        } else {
            instituteId = userData.instituteId;
        }
        const res = async () => {
            const result = await apiJson.get(`/api/v2/discussion_board/usersListByRole?instituteId=${instituteId}&role=${typeofAttendees}`)
            setUserListByRole(result?.data?.allUsers)
        }
        res();

    }, [typeofAttendees])


    // <=========When we click select all then all user selected and when click deselect button then all user is deselected========>>
    const handleSelectAttendees = (e) => {
        setTypeOfAttendees(e.target.value)

    };
    useEffect(() => {
        if (userListByRole.length > 0) {
            CreateDiscussionFormik.setFieldValue('attendees', userListByRole);
        }

    }, [userListByRole])

    ///======== Handle remove user ==========\\
    const handleRemoveUser = (id) => {
        let arr = userListByRole.filter(item => item.id !== id)
        setUserListByRole(arr)
    }
    // ================= Select user Handler =============== 
    const handleSelectUsers = (item) => {
        setUserListByRole([...userListByRole, item])

    }


    return (
        <>

            <YmBreadCrumbs start='Events' middle="United Nations" end="Discussions" />
            <div className="px-5 create-discussion" style={{ marginBottom: "40px" }} >
                {/* <=========== Second Breadcrumb start ================> */}
                <div className="d-flex justify-content-between pb-3">
                    <p className='fs-3 fs-md-2 fs-lg-2 fw-semibol text-start text-lg-center cursor-pointer  '><ArrowBackIosNewTwoToneIcon sx={{ fontSize: "32px", color: "#7700FF" }} onClick={() => navigate("/new-dashboard/discussion-board")} />Create Discussion</p>
                    <button
                        disabled={submitState}
                        type='submit'
                        className='btn-save-create'
                        onClick={CreateDiscussionFormik.handleSubmit}
                    >
                        <AddCircleTwoToneIcon sx={{ padding: "4px" }} />
                        Save
                    </button>
                </div>
                {/* <============= Discussion create  form start =============> */}
                <div className='row'>
                    {/*<=================== Left Column of form start ================> */}

                    <div className="col-12 col-md-6 col-lg-6 mb-2">
                        <div className="row g-2">
                            <div className="col-12 col-lg-12">
                                <label htmlFor="title" className="form-label discTitle ">Title of the discussion <span className='text-danger'>*</span></label>
                                <input type="text" className="form-control shadow-none border border-0 rounded-2 bg-light px-3" id="title" name='discTitle' placeholder='First Delegate Meeting'
                                    value={CreateDiscussionFormik?.values?.discTitle}
                                    onChange={CreateDiscussionFormik.handleChange}
                                />
                                {CreateDiscussionFormik.touched.discTitle && CreateDiscussionFormik.errors.discTitle ? <div className='discError'>{CreateDiscussionFormik.errors.discTitle}</div> : null}
                            </div>


                            <label htmlFor="title" className="form-label discTitle">Date and Time</label>
                            <div className="col-12 col-lg-5">
                                <input type="date" className="form-control shadow-none border border-0 rounded-2 bg-light px-3" id="date" name='eventDate'
                                    value={CreateDiscussionFormik?.values?.eventDate}
                                    onChange={CreateDiscussionFormik.handleChange}
                                />
                                {CreateDiscussionFormik.touched.eventDate && CreateDiscussionFormik.errors.eventDate ? <div className='discError'>{CreateDiscussionFormik.errors.eventDate}</div> : null}
                            </div>
                            <div className="col-12 col-lg-3">
                                <input type="time" className="form-control shadow-none border border-0 rounded-2 bg-light px-2" id="date" name='eventSTime'
                                    onChange={CreateDiscussionFormik.handleChange}
                                    value={CreateDiscussionFormik?.values?.eventSTime}
                                />
                                {CreateDiscussionFormik.touched.eventSTime && CreateDiscussionFormik.errors.eventSTime ? <div className='discError'>{CreateDiscussionFormik.errors.eventSTime}</div> : null}
                            </div>
                            <div className="d-flex col-lg-1 align-items-center justify-content-center ">To</div>
                            <div className="col-12 col-lg-3">
                                <input type="time" className="form-control shadow-none border border-0 rounded-2 bg-light px-2"
                                    onChange={CreateDiscussionFormik.handleChange}
                                    value={CreateDiscussionFormik?.values?.eventETime}
                                    id="date" name='eventETime'
                                />
                                {CreateDiscussionFormik.touched.eventETime && CreateDiscussionFormik.errors.eventETime ? <div className='discError'>{CreateDiscussionFormik.errors.eventETime}</div> : null}
                            </div>
                            <div className="col-12">
                                <div className="form-check">
                                    <input className="form-check-input text-success shadow-none border border-0 bg-light" type="checkbox"
                                        id="gridCheck" />
                                    <label className="form-check-label" for="gridCheck">
                                        Add to Google Calender
                                    </label>
                                </div>
                            </div>
                            <div className="col-12">
                                <label htmlFor="forEvent" className='form-label discTitle'>Type Of Meeting</label>
                                <select id="forEvent" className="form-select border border-0 bg-light shadow-none" style={{ height: "46px" }}
                                    onChange={CreateDiscussionFormik.handleChange}
                                    value={CreateDiscussionFormik?.values?.eventName} name='eventName' >

                                    <option value="1">Model United Nation</option>
                                    <option value="2">Youth parliament</option>
                                    <option value="3">Youth Hackathon</option>
                                </select>

                            </div>
                            <div className="col-12">
                                <label htmlFor="forAttendees" className='form-label discTitle'>List Of Attendees </label>
                                <select className='form-select border border-0 bg-light   shadow-none' style={{ height: "46px" }}
                                    onChange={(e) => handleSelectAttendees(e)}
                                    value={typeofAttendees} name='attendees'>
                                    <option value="">All Staff</option>
                                    <option value="student">All Student</option>
                                    <option value="teacher">All Teacher</option>

                                </select>

                            </div>
                        </div>
                    </div>

                    {/*<=================== Right Column of form start ================> */}
                    <div className="col-12 col-md-6 col-lg-6 ">
                        <div className='px-2'>
                            <label htmlFor="title" className="form-label discTitle">Attendees</label>
                            <Autocomplete
                                id="userSelect"
                                // sx={{ width: 300 }}
                                onChange={(event, newValue) => {
                                    setValue(newValue);
                                    handleSelectUsers(newValue)
                                }}
                                onInputChange={(event, newInputValue) => {
                                    setInputValue(newInputValue);
                                }}
                                inputValue={inputValue}
                                options={userList}
                                autoHighlight
                                getOptionLabel={(option) => `${option.first_name} ${option.last_name}`}
                                renderOption={(props, option) => (
                                    <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props} key={option?.id}>
                                        <img
                                            loading="lazy"
                                            width="30"

                                            src={option?.profile ? option?.profile : "/ui2.0dashboard/Rectangle 3148.png"}
                                            alt={option?.first_name}
                                        />
                                        {option?.first_name} {option?.last_name ? option?.last_name : null}  <span className='rounded-3 text-end' style={{ padding: "6px 10px", background: "red", marginLeft: 10 }}> {option?.role}</span>
                                    </Box>
                                )}
                                renderInput={(params) => <TextField {...params} label="Add Attendees" />}
                            />

                        </div>

                        {/* <========= student card list  ============> */}
                        <div className='mx-3'>
                            {userListByRole.map((data) => {

                                return (
                                    <div className='d-flex align-items-center justify-content-md-between mt-3' key={data?.id}>

                                        <DiscussionBoardStudentProfileList data={data} handleRemoveUser={handleRemoveUser} />
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    {/*<=================== Right Column of form End ================> */}

                </div>

            </div>

        </>
    )
}
