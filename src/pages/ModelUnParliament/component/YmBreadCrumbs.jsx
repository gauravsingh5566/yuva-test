
import React from "react";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

export const YmBreadCrumbs = ({start,end,middle}) => {
    
    
      return (
        <>
        <div className="px-5 py-4">
            <span className="cursor-pointer" style={{color:"#979797"}}>{start}  {middle ?<KeyboardArrowRightIcon /> : null} {middle} {middle ?<KeyboardArrowRightIcon /> : null}   {end} </span>
        </div>
        </>
      );
};
