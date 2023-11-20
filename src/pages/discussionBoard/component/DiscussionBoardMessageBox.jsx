import React, { useState } from 'react'
import MoodTwoToneIcon from '@mui/icons-material/MoodTwoTone';
import AlternateEmailTwoToneIcon from '@mui/icons-material/AlternateEmailTwoTone';
import AddCircleTwoToneIcon from '@mui/icons-material/AddCircleTwoTone';
import { Mention, MentionsInput } from 'react-mentions';
const users = [
    {
        id: '1',
        display: 'Nitesh',
    },
    {
        id: '2',
        display: 'Shailesh',
    },
    {
        id: '3',
        display: 'Sahil'
    },
    {
        id: '4',
        display: 'Rahul'
    },
];

const mentionsInputStyle = {
    control: {
        fontSize: 12,
        // fontWeight: 'normal',
    },

    "&multiLine": {
        control: {

            minHeight: 30
        },
        highlighter: {
            padding: 9
        },
        input: {
            outline: "none",
            border: "none",
            padding: 9
        }
    },

    "&singleLine": {
        display: "inline-block",


        highlighter: {
            padding: 1
        },
        input: {
            outline: "none",
            border: "none",
            padding: 1
        }
    },

    suggestions: {
        list: {
            fontSize: 16
        },
        item: {
            padding: "5px 15px",

            "&focused": {
                backgroundColor: "#cee4e5"
            }
        }
    }
};


export const DiscussionBoardMessageBox = () => {
    const [comments, setComments] = useState('')
    const [commentList, setCommentList] = useState([]);
    const [vpoint,setVpoint] = useState(false);
    const handleClick = () => {
        setCommentList((commentList) => [...commentList, comments])
    }
    const handleInputChange = (e, newValue, newPlainTextValue, mentions) => {
        setComments(newPlainTextValue); 
        
      };


    return (
        <>
            <div className="d-flex px-3">
                <div style={{ width: "46px", height: "46px", borderRadius: "50%" }}>
                    <img src="/ui2.0dashboard/Man Avatar.png" alt="Sahil" />
                </div>
                {/*<============= Message Box Ui Start ============> */}
                <div className='w-100 rounded-3 ms-2 p-3' style={{ background: "#F3F3F3" }}>
                    {/* <<============= Tag anyone and message input field start ============>> */}
                    <div>

                        <span className='rounded-3 cursor-pointer' style={{ background: "#DBDBDB", padding: "5px", fontSize: "12px", color: "#525252" }} ><span className='d-inline-block text-center' style={{ background: "#9D9D9D", height: "19px", width: "19px", borderRadius: "9px", color: "#FFFFFF", marginRight: "5px" }}>#</span>Everyone in the discussion</span>
                        <div className='w-100'>
                  {vpoint ? (<>
                  <div className="d-flex mt-4">
                      <span className='fs-6 fw-semibold p-2 rounded-2' style={{background:"#A38CFF",color:"#ffffff",fontSize:"13px"}}>Point</span>
                      <div className='w-100'>
                      <input type="text" className='border border-0 outline-0 fw-normal my-2 w-100' style={{ fontSize: "12px", background: "#F3F3F3", color: "#5E0080",marginLeft:"10px",paddingLeft:"8px" }} placeholder='We need to reduce a carbon'/>
                        {/* <input type="text"   className='border '/> */}
                      </div>
                  </div>
                </>) : (
                                <MentionsInput
                                    className="mentions__mention"
                                    placeholder='Start typing a message or Start with  “/” for typing votable points'
                                    value={comments}
                                    onChange={handleInputChange}
                                    style={mentionsInputStyle} >
                                    <Mention displayTransform={(id, display) => `@${display}`}
                                        data={users}
                                      style={{color :"red"}}
                                    />
                                </MentionsInput>
                            )}

                        </div>
                    </div>
                    {/* <<============= Bottom icon section and Button section start ============>> */}

                    <div className='"d-grid gap-2 d-md-flex justify-content-md-between mt-4'>
                        <div className='cursor-pointer'>
                            <MoodTwoToneIcon sx={{ color: "#FFB800", height: "17px", width: "17px", marginRight: "10px" }} />
                            <AlternateEmailTwoToneIcon sx={{ color: "#3B1BFF", height: "17px", width: "17px", marginRight: "10px" }} />
                            <AddCircleTwoToneIcon sx={{ color: "#6100FF", height: "35px", width: "35px" }} onClick={()=>setVpoint(!vpoint)} />
                            <span className='fw-normal' style={{ fontSize: "12px", color: "#130031", marginTop: "10px" }}>4 votable points left</span>
                        </div>
                        <div className='d-flex justify-content-end'>
                            <button className='rounded-2 px-3 py-2 mx-2' style={{ background: "#E3E3E3", color: "#535353", fontSize: "13px", fontWidth: 500 }}>Discard</button>
                            <button className='rounded-2 px-3 py-2' style={{ background: "#8CB3FF", color: "#000000", fontSize: "13px", fontWidth: 500 }} onClick={handleClick}>Post</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
