import { apiJson } from 'api';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import jwt from 'jwt-decode';

export const OnboardingComponentVerify = () => {
  const {token} = useParams()
  const [decodedToken, setDecodedToken] = useState(null);

  const closeTab = () => {
      window.close(); 
  };

  const verifyingUser = ()=>{
    console.log('==>', decodedToken)
    if(decodedToken.type==='institute'){
      apiJson.put('v2/register/verifying/institute',{
        email:decodedToken.email
      })
      .then((res)=>{
        closeTab()
        console.log(res.data)
      })
      .catch((error)=>{
        
        console.log(error.message)
      })
    }
    if(decodedToken.type==='student'){
      apiJson.put('v2/register/verifying/user',{
        email:decodedToken.email,
        role:'student'
      })
      .then((res)=>{
        closeTab()
        console.log(res.data)
      })
      .catch((error)=>{
        
        console.log(error.message)
      })
    }
    if(decodedToken.type==='teacher'){
      apiJson.put('v2/register/verifying/user',{
        email:decodedToken.email,
        role:'teacher'
      })
      .then((res)=>{
        closeTab()
        console.log(res.data)
      })
      .catch((error)=>{
        
        console.log(error.message)
      })
    }
  }

  useEffect(() => {
    const decoded = jwt(token);
    setDecodedToken(decoded);
  }, []);

  useEffect(()=>{
    if(decodedToken){
      verifyingUser()
    }
  },[decodedToken])

  return (
    <div>Loading...</div>
  )
}
