import React, { useState } from 'react'
import {DiscussionBoardMessageNew } from '.'
import moment from 'moment';
import { Divider } from '@mui/material';

export const DiscussionBoardMesssageArea = () => {
    const [message,setMassage] = useState([
        {
            id: 1,
            name: "Saurabh Sharma",
            profile: "/ui2.0dashboard/men2.png",
            time: "2023-10-07 09:08:05",
            message: "Climate change is undeniably real, and the scientific consensus is overwhelming. We're witnessing the consequences with extreme weather events, rising sea levels, and disruptions to ecosystems. It's high time we take immediate action to reduce our carbon footprint and transition to sustainable energy sources.",
            isPoint:false
        },
        {
    
            id: 2,
            name: "Santosh Kushwaha",
            profile: "/ui2.0dashboard/Rectangle 3305.png",
            time: "2023-10-10 09:07:50",
            message: "I agree, Saurabh. We need to acknowledge the urgent need for climate action. The evidence is clear, and our planet is at a tipping point. We must promote renewable energy and prioritize conservation efforts to protect our environment and future generations.",
            isPoint:false
    
        },
        {
            id: 3,
            name: "Sahil Gagan",
            profile: "/ui2.0dashboard/Mask Group.png",
            time: "2023-10-10 12:34:59",
            message: "While I understand the concerns about climate change, we must also consider the economic impact of transitioning to green energy.",
            isPoint:false
        },
        {
            id: 4,
            name: "Nitesh",
            profile: "/ui2.0dashboard/Mask Group.png",
            time: "2023-10-06 12:34:59",
            message: "While I understand the concerns about climate change, we must also consider the economic impact of transitioning to green energy.",
            isPoint:true
        },
        {
            id: 5,
            name: "Manan",
            profile: "/ui2.0dashboard/Mask Group.png",
            time: "2023-09-12 12:34:59",
            message: "While I understand the concerns about climate change, we must also consider the economic impact of transitioning to green energy.", 
            isPoint:false
        },
        {
            id: 6,
            name: "Rohan",
            profile: "/ui2.0dashboard/Mask Group.png",
            time: "2023-10-12 12:34:59",
            message: "While I understand the concerns about climate change, we must also consider the economic impact of transitioning to green energy.",
            isPoint:false
        }
    ])
    const now = new Date();

    function groupMessagesByDate(messages) {

        const groupedMessages = {};

        messages.forEach((message) => {
            const messageTime = new Date(message.time);
            const timeDifferenceInHours = (now - messageTime) / (1000 * 60 * 60);
            const date = moment(message.time).format('YYYY-MM-DD');

            if (!groupedMessages[date]) {
                groupedMessages[date] = [];
            }
            message.timeDifferenceInHours = timeDifferenceInHours;
            groupedMessages[date].push(message);
        });

        return groupedMessages;
    }
    const groupedMessages = groupMessagesByDate(message);

    return (
        <>
 
            {Object.entries(groupedMessages).map(([date, messages]) => {
                const timeRes = messages?.map((item) => item.timeDifferenceInHours);
                const isToday = timeRes.some((hours) => hours < 24);

                return (
                    <div key={date}>

                        {isToday ? <Divider>Today</Divider> : null}
                            <>
                                    {/* <DiscussionBoardMessage data={data} time={isToday}  /> */}
                                    <DiscussionBoardMessageNew messages={messages} time={isToday} />
                            </>
                    </div>)
            })}
        </>
    )
}
