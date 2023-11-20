import { YmBreadCrumbs } from 'pages/ModelUnParliament'
import React, { useEffect, useState } from 'react'
import ArrowBackIosNewTwoToneIcon from '@mui/icons-material/ArrowBackIosNewTwoTone';
import AddCircleTwoToneIcon from '@mui/icons-material/AddCircleTwoTone';
import { DiscussionBoardLiveCard, DiscussionBoardUpcomingCard } from './component';
import { useNavigate } from 'react-router-dom';
import { useDiscussionContext } from './discussionBoardContext/discussionContext';
import moment from 'moment';
import { DiscussionBoardPastCard } from './component/DiscussionBoardPastCard';



export const MainDiscussionBoard = () => {
    const { getDiscByInstituteId, isLoading } = useDiscussionContext()
    const [seeAll, setSeeAll] = useState(false)
    const [seeAllPast, setSeeAllPast] = useState(false)
    const [seeAllUpcoming, setSeeAllUpcoming] = useState(false)
    const [filterEvent, setFilterEvent] = useState('all')
    const [filterDiscList, setfilterDiscList] = useState([])
   
    const navigate = useNavigate()

    const applyFilter = () => {
        if (filterEvent == 'all') {
          
            setfilterDiscList(getDiscByInstituteId)
            return;
        }
        let filterData = getDiscByInstituteId.filter((item) => {
            return item.event_id == filterEvent
        })
        setfilterDiscList(filterData)

    }
    useEffect(()=>{
   if(filterDiscList <= 0){
 applyFilter()
   }
    },[getDiscByInstituteId])
    useEffect(() => {
        applyFilter()

    }, [filterEvent])


    var date = moment();
    var currentTime = date.format('HH:mm')
    var currentDate = date.format('YYYY/MM/DD');
    // <===============Live Discussion List fiter ========== > \\
    let LiveDicList = filterDiscList.filter((item) => {
        let eventDate = moment(item?.start_date).format('YYYY/MM/DD')
        let eventStartTime = moment(item?.start_time, 'h:mm a').format('HH:mm');
        let eventEndTime = moment(item?.end_time, 'h:mm a').format('HH:mm')
        return currentDate === eventDate && currentTime >= eventStartTime && currentTime <= eventEndTime
    })
    // <===============Upcoming Discussion List fiter ========== > \\
    let UpcomingDiscList = filterDiscList.filter((item) => {
        let eventDate = moment(item?.start_date).format('YYYY/MM/DD');
        let eventStartTime = moment(item?.start_time, 'h:mm a').format('HH:mm');
        if (currentDate === eventDate) {
            return currentTime < eventStartTime
        } else {
            return currentDate < eventDate
        }
    })
    console.log(UpcomingDiscList, "Upcoming List")

    // <===============Past Discussion List fiter ========== > \\
    let PastDiscList = filterDiscList.filter((item) => {
        console.log(item, "Item3")
        let eventDate = moment(item?.start_date).format('YYYY/MM/DD')
        let eventStartTime = moment(item?.start_time, 'h:mm a').format('HH:mm');
        let eventEndTime = moment(item?.end_time, 'h:mm a').format('HH:mm')
        if (currentDate === eventDate) {

            return currentTime > eventEndTime
        } else {
            return currentDate > eventDate;
        }
    })

    console.log(PastDiscList, "past")
    return (
        <>
            <div className="col-10 discussion_borad" >
                <YmBreadCrumbs start='Events' middle="United Nations" end="Discussions" />
                <div className="px-5">
                    {/* <=========== Second Breadcrumb start ================> */}
                    <div className="d-block d-md-flex justify-content-between pb-3">
                        <p className='fs-2 fw-semibold text-start text-md-center cursor-pointer' onClick={() => navigate("/new-dashboard")} ><ArrowBackIosNewTwoToneIcon sx={{ fontSize: "32px", color: "#7700FF" }} />Discussions</p>
                        <div className='d-flex'>
                            <div className='d-flex'>
                                <p className='text-center mt-2 mx-2'>Events</p>
                                <select id="forEvent" className="border border-0 rounded-2 shadow-none mx-2" value={filterEvent} style={{ height: "41px", background: "#F9ECFF" }} onChange={(e) => {
                                    setFilterEvent(e.target.value)
                                    applyFilter()
                                }}
                                    name='eventName' >
                                    <option value='all'>All</option>
                                    <option value="1">Model United Nation</option>
                                    <option value="2">Youth parliament</option>
                                    <option value="3">Youth Hackathon</option>
                                </select>

                            </div>
                            <button
                                className='btn-save-create'
                                onClick={() => navigate("/new-dashboard/create-discussion")}
                            >
                                <AddCircleTwoToneIcon sx={{ padding: "4px" }} />
                                Create
                            </button>
                        </div>

                    </div>
                    {/* <=========== Second Breadcrumb end ================> */}

                    {/* <============= Live Discussion Board Start ===============> */}
                    <div className='w-100 rounded-4 shadow py-4 px-4 '>
                        <div className="d-flex justify-content-between">

                            <p className="fs-6 fw-semibold">Live Discussions</p>
                            {LiveDicList.length > 3 ? <span className='cursor-pointer' onClick={() => setSeeAll(!seeAll)}>See all</span> : null}

                        </div>
                        <div className={seeAll ? `row` : `row flex-nowrap scroll-discussion-board`}>
                            {LiveDicList.length > 0 ? LiveDicList?.map((item) => (
                                <div className=" col-12 col-md-6 col-lg-4 mb-3 " key={item.id}>
                                    <DiscussionBoardLiveCard item={item} />
                                </div>
                            )) : (<p className='text-center fs-14 text-danger'>Empty Live Discussion</p>)}

                        </div>
                    </div>
                    {/* <============= Upcoming Discussion Board Start ===============> */}
                    <div className='w-100 rounded-4 shadow py-4 px-4 my-4'>
                        <div className="d-flex justify-content-between">
                            <p className="fs-6 fw-semibold">Upcoming Discussions</p>
                            {UpcomingDiscList.length > 3 ? <span className='cursor-pointer' onClick={() => setSeeAllUpcoming(!seeAllUpcoming)}>See all</span> : null}

                        </div>
                        <div className={seeAllUpcoming ? `row` : `row flex-nowrap scroll-discussion-board`}>
                            {UpcomingDiscList.length > 0 ? UpcomingDiscList?.map((item) => (
                                <div className="col-12 col-sm-12 col-md-6 col-lg-4 mb-3 mb-sm-3" key={item.id}>
                                    <DiscussionBoardUpcomingCard item={item} />
                                </div>
                            )) : (<p className='text-center fs-14 text-danger'>Empty Upcoming Discussion</p>)}

                        </div>
                    </div>
                    {/* <============= Past Discussion Board Start ===============> */}
                    <div className='w-100 rounded-4 shadow py-4 px-4 my-4'>
                        <div className="d-flex justify-content-between">
                            <p className="fs-6 fw-semibold">Past Discussions</p>
                            {PastDiscList.length > 3 ? (<span className='cursor-pointer' onClick={() => setSeeAllPast(!seeAllPast)}>See all</span>) : null}

                        </div>
                        <div className={seeAllPast ? `row` : `row flex-nowrap scroll-discussion-board`}>
                            {PastDiscList.length > 0 ? PastDiscList?.map((item) => (
                                <div className="col-12 col-sm-12 col-md-6 col-lg-4 mb-3 mb-sm-3" key={item.id}>
                                    <DiscussionBoardPastCard item={item} />
                                </div>
                            )) : (<p className='text-center fs-14 text-danger'>Empty Past Discussion</p>)}

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
