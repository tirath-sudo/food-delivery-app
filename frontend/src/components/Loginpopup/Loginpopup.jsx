import React, { useContext, useState } from 'react'
import "./Loginpopup.css"
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext'
import axios from "axios"
const Loginpopup = ({setShowLogin}) => {
   const[currState , setCurrState] = useState("Sign Up")
   const[data,setData] = useState({
    name:"",
    email:"",
    password:""
   })

   const {url, setToken} = useContext(StoreContext)

   const onChangeHandler = (event)=>{
    const name = event.target.name
    const value = event.target.value
    setData(data=>({...data,[name]:value}))
  }

  const onLogin = async(event)=>{
   event.preventDefault();
   let newurl = url;
   if(currState === "Login"){
    newurl+="/api/user/login"
   }
   else{
    newurl+="/api/user/register"
   }
   const response = await axios.post(newurl,data);

   if(response.data.success){
    setToken(response.data.token)
    localStorage.setItem("token",response.data.token)
    setShowLogin(false)
   }

   else{
    alert(response.data.message)
   }
  }

  return (
    <div className='login-popup'>
      <form onSubmit={onLogin} className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <img onClick={()=>{setShowLogin(false)}} src={assets.cross_icon} alt='//'/>
        </div>  
        <div className="login-popup-inputs">
          {currState==="Login"?<></>:<input type='text' placeholder='Your Name' name='name' onChange={onChangeHandler} value={data.name} required/>} 

          <input name='email' onChange={onChangeHandler}
          value={data.email} type='email' placeholder='Your Email' required/>

          <input name='password' onChange={onChangeHandler} value={data.password} type='password' placeholder='Your Password' required/>

        </div>
        <button type='submit'>{currState === "Sign Up"?"Create Account":"Login"}</button>
        <div className="login-popup-condition">
          <input type='checkbox' required/>
          <p>
            By continuing, I agree to the Terms and Policies.
          </p>
        </div>
        {currState === "Login"?<p>Create a New Account? <span onClick={()=>setCurrState("Sign Up")}>Click Here</span></p>:<p>Already have an Account? <span onClick={()=>setCurrState("Login")}>Login Here</span></p>}
        
        
      </form>      
    </div>
  )
}

export default Loginpopup
