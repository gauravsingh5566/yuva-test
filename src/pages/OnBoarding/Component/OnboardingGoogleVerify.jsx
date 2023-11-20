import { apiJson } from 'api'
import { useGlobalContext } from 'global/context';
import React, { useEffect, useState } from 'react'
import { useFetcher, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export const OnboardingGoogleVerify = () => {
    const navigate = useNavigate()
    const {setUser, setToken,token} = useGlobalContext()
    const [loading, setLoading] = useState(true);

    
    useEffect( ()=>{
        const userObjectString = decodeURIComponent(window.location.search.split('=')[1]);
        const userObject = JSON.parse(userObjectString);
        console.log('userobject', userObject)

        setUser(userObject.user)
        setToken(userObject.jwt)
        
    },[])
    useEffect(()=>{
       if(token){
        // navigate('/new-dashboard')
        window.location.href = '/new-dashboard'
       }
    },[token])
  return (
    <div>
    
    {loading && (
      <div className="google-verify-loader-overlay">
        <div className="google-verify-loader"></div>
      </div>
    )}
  </div>
  )
}

