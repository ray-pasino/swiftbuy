import React, { useContext, useEffect, useState } from 'react'
import './loginpopup.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPassport, faXmark, faEye, faEyeSlash, faCircleNotch} from '@fortawesome/free-solid-svg-icons'
import { StoreContext } from '../../context/StoreContext'
import axios from "axios"

const LoginPopUp = ({setShowLogin}) => {

    const {url, setToken} = useContext(StoreContext)

    const [currState, setCurrState] = useState("Login")

    const [isSpinning, setIsSpinning] = useState(false)

    const [ErrorMessage, setErrorMessage] = useState("")

    const [loading, setLoading] = useState(false)

    const [showPassword, setShowPassword] = useState(false)

    const [data, setData] = useState({
        name:"",
        email:"",
        password:""
    })

    const onChangeHandler = (event)=> {
        const name = event.target.name
        const value = event.target.value
        setData(data=>({...data,[name]:value}))
    }

    const onLogin = async (event)=>{
        event.preventDefault()
        setLoading(true)
        let newUrl = url
        if(currState==="Login"){
            newUrl += "/api/user/login"
        }else{
            newUrl += "/api/user/register"
        }

        const response = await axios.post(newUrl,data)
        setLoading(false)
        if (response.data.success){
            setToken(response.data.token)
            localStorage.setItem("token",response.data.token)
            setShowLogin(false)
        }

        else{
            setErrorMessage(response.data.message)
        }
    }

    const handleSignup = ()=> {
        setCurrState("Sign Up")
        setErrorMessage("")
    }


    const handlelogin = ()=> {
        setCurrState("Login")
        setErrorMessage("")
    }
  return (
    <div className='login-popup'>
        <form onSubmit={onLogin} className='login-popup-container'>
            <div className="login-popup-title">
                <h2>{currState}</h2>
                <FontAwesomeIcon onClick={()=>setShowLogin(false)} icon={faXmark} size='2xl' className='crossIcon' onMouseOver={()=>{setIsSpinning(true)}} onMouseLeave={()=>{setIsSpinning(false)}} spin={isSpinning}/>
            </div>
            <div className="login-popup-inputs">
                {currState === "Login" ?<></> : <input type="text" name='name' id='name' onChange={onChangeHandler} value={data.name} required/>}
                {currState === "Login" ?<></> : <label for="name" className='name-label'>Your name</label>}
                <input type="text" name='email' onChange={onChangeHandler} value={data.email} id='email' required/>
                <label for="email" className={currState === "Login" ? 'signin-email-label' : 'email-label'}>Your email</label>
                <input type={showPassword? 'text' : 'password'} name='password' onChange={onChangeHandler} value={data.password} id='password'  className='password-input'required/>
                <label for="password" className={currState === 'Login' ? 'signin-password-label' : 'password-label'}>Password</label>
                <div className="show-password">
                 <input type="checkbox" checked={showPassword} onChange={()=> setShowPassword(!showPassword)}/>
                 <p>Show Password</p>
                </div>
                {/* <FontAwesomeIcon icon={faEye} className='eye-icon'/> */}
                </div>
                {
                    loading 
                    ? 
                <button type='submit' className='btn-loading'>
                    {currState === "Sign Up" ?
                      <pre>Creating account...    <FontAwesomeIcon icon={faCircleNotch} spin style={{color: "#fff",}} /></pre>
                     :<pre>Logging in...    <FontAwesomeIcon icon={faCircleNotch} spin style={{color: "#fff",}} /></pre>}
                </button>
                    :
                    <>
                <button type='submit'>{currState === "Sign Up" ? "Create account" : "Login"}</button>
                    </>
                }
                <p className='error-text'>{ErrorMessage}</p>
                <div className="login-popup-condition">
                    <input type="checkbox" required className='check-box'/>
                    <p>By continuing, I agree to the terms of use & privacy policy</p>
            </div>
            {currState === 'Login'?
            <p>Don't have an account? <span onClick={()=>handleSignup()}>Join Us</span></p> :
            <p>Already have an account? <span onClick={()=>handlelogin()}>Login here</span></p>
            }
        </form>
    </div>
  )
}

export default LoginPopUp