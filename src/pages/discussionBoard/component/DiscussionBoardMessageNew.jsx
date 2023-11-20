import React, { useState } from 'react'
import KeyboardArrowUpTwoToneIcon from '@mui/icons-material/KeyboardArrowUpTwoTone';
import KeyboardArrowDownTwoToneIcon from '@mui/icons-material/KeyboardArrowDownTwoTone';
import ThumbUpAltTwoToneIcon from '@mui/icons-material/ThumbUpAltTwoTone';
import ThumbDownAltTwoToneIcon from '@mui/icons-material/ThumbDownAltTwoTone';
import { DiscussionBoardComments } from '.';
import moment from 'moment';

const comments = [
    {
        id: 1,
        msgId: 2,
        name: "Saurabh Sharma",
        profile: "/ui2.0dashboard/men2.png",
        time: "2023-10-07 09:08:05",
        message: "Climate change is undeniably real, and the scientific consensus is overwhelming. We're witnessing the consequences with extreme weather events, rising sea levels, and disruptions to ecosystems. It's high time we take immediate action to reduce our carbon footprint and transition to sustainable energy sources."
    },
    {

        id: 2,
        msgId: 2,
        name: "Santosh Kushwaha",
        profile: "/ui2.0dashboard/Rectangle 3305.png",
        time: "2023-10-09 09:07:50",
        message: "I agree, Saurabh. We need to acknowledge the urgent need for climate action. The evidence is clear, and our planet is at a tipping point. We must promote renewable energy and prioritize conservation efforts to protect our environment and future generations."

    },
    {
        id: 3,
        msgId: 1,
        name: "Sahil Gagan",
        profile: "/ui2.0dashboard/Mask Group.png",
        time: "2023-10-09 12:34:59",
        message: "While I understand the concerns about climate change, we must also consider the economic impact of transitioning to green energy."
    }
]

export const DiscussionBoardMessageNew = ({ messages, time }) => {
    const [isclicked, setIsclicked] = useState(false)
    const handleMessaageIcon = (id) => {

        setIsclicked(!isclicked);
    }
    const MessageId = comments.map((item) => item.msgId)

    return (
        <>
            <section className="comments-thread-list">
                <div className="comment-thread-container hover">

                    {/* <div className="comment-thread">
                        <div className="comment-message-block">
                            <div className="comment-initials-container" aria-hidden="true">
                                <div className='mx-2' style={{ width: "37px", height: "37px", borderRadius: "50%", }}>
                                    <img src="/ui2.0dashboard/Mask Group.png" alt="Shailesh" />
                                </div>
                            </div>
                            <div className="comment-initials-vline"></div>
                            <div className="comment-message-container">
                                <span className="screen-reader-text">Message sent by Al Big</span>
                                <div className="comment-message-text"><span className="screen-reader-text">Message contents </span>
                                <div className="d-flex flex-column">
                                  <span className="DisName">Shailesh sainee  &nbsp; &nbsp; <span style={{color:"#ACACAC"}}>12:23 PM</span></span>
                                   <p className='DisPara'>Climate change is undeniably real, and the scientific consensus is overwhelming. We're witnessing the consequences with extreme weather events, rising sea levels, and disruptions to ecosystems. It's high time we take immediate action to reduce our carbon footprint and transition to sustainable energy sources.</p>
                                </div>
                                </div>
                            </div>
                        </div>
                        <div className="comment-message-block">
                            <div className="comment-initials-container" aria-hidden="true">
                                <div className='mx-2' >
                                <img src="/ui2.0dashboard/Group 288.png" alt="message" style={{ height: 23, width: 23, marginLeft: "6px" }} />
                                </div>
                            </div>
                            <div className="comment-message-container">

                                <span className="screen-reader-text">Message sent by Kristopher Dev</span>
                                <div className="comment-message-text"><span className="screen-reader-text">Message contents </span> <p className='' style={{ color: "#959292", fontSize: "12px", fontWeight: "600", cursor: "pointer", }} onClick={() => handleMessaageIcon()}>Comments {isclicked ? <KeyboardArrowUpTwoToneIcon /> : <KeyboardArrowDownTwoToneIcon />}</p></div>
                            </div>
                        </div>
                    </div> */}
                    {messages.map((message) => (
                        <div className="comment-thread" key={message.id}>
                            <div className="comment-message-block">
                                <div className="comment-initials-container" aria-hidden="true">
                                    <div className='mx-2' style={{ width: "37px", height: "37px", borderRadius: "50%", }}>
                                        <img src={message.profile} alt={message.name} />
                                    </div>
                                </div>
                                {MessageId.includes(message?.id) || message?.isPoint ? (
                                <div className="comment-initials-vline"></div>):null}
                                <div className="comment-message-container">
                                    <span className="screen-reader-text">Message sent by Al Big</span>
                                    <div className="comment-message-text"><span className="screen-reader-text">Message contents </span>
                                        <div className="d-flex flex-column">
                                            <span className="DisName">{message.name} &nbsp; &nbsp; <span style={{ color: "#ACACAC" }}>{time ? moment(message?.time).format('LT') : moment(message?.time).format('L')}</span></span>
                                           {message?.isPoint ?(<p className='DisPara'>Added New Point to the discussion.</p>) : (<p className='DisPara'>{message.message}</p>) }
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {MessageId.includes(message?.id) || message?.isPoint ? (
                            <div className="comment-message-block">
                                <div className="comment-initials-container" aria-hidden="true">
                                    <div className='mx-2' >
                                        <img src="/ui2.0dashboard/Group 288.png" alt="message" style={{ height: 23, width: 23, marginLeft: "6px" }} />
                                    </div>
                                </div>
                                <div className="comment-message-container">

                                    <span className="screen-reader-text">Message sent by Kristopher Dev</span>
                                    <div className="comment-message-text"><span className="screen-reader-text">Message contents </span> {message?.isPoint ? (<div className='d-flex flex-column rounded-3 p-3' style={{background:"#F8F4FC"}}>
                                        <p className='DisPara'>{message.message}</p>
                                        <div>
                                        <span style={{color:"#4979d1"}}> <ThumbUpAltTwoToneIcon />&nbsp; &nbsp;<ThumbDownAltTwoToneIcon /></span> 
                                        </div>
                                    </div>) : (<p className='' style={{ color: "#959292", fontSize: "12px", fontWeight: "600", cursor: "pointer", }} onClick={() => handleMessaageIcon(message.id)}>Comments {isclicked ? <KeyboardArrowUpTwoToneIcon /> : <KeyboardArrowDownTwoToneIcon />}</p> )}</div>
                                </div>
                            </div>):null}

                            {isclicked && (
                                comments.map((comment) => {
                                    if (comment.msgId === message.id) {
                                        return (
                                            <div className="d-flex px-5 " key={comment.id}>
                                                <DiscussionBoardComments data={comment} />
                                            </div>
                                        );
                                    }
                                    return null;
                                })
                            )}
                        </div>
                    ))}
                </div>

            </section>

        </>
    )
}
