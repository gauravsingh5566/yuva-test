import React from 'react';
import "../Css/subscription.css";

const SubscribeSec = () => {
  return (
    <>
        <div className="container py-5">
            <div className='subscribe py-5'>
                <h3 className="text-center text-white">Subscribe to receive news from Yuvamanthan.</h3>
                <form className='d-flex justify-content-center my-3 gap-2'>
                    <input type="email" placeholder='Your Email Here' />

                    <input type="submit" value="Submit" />
                </form>
            </div>
        </div>
    </>
  )
}

export default SubscribeSec