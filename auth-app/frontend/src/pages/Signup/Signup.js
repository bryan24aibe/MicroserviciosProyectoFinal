import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import styles from './styles.module.css'
import axios from 'axios'
const Signup = () => {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
  })
   const [error, setError] = useState("")
const navigate = useNavigate()  
  const handleChange = e =>{
setInputs(prev =>({...prev, [e.target.name]: e.target.value}))
  }
  const handleSubmit = async e =>{
    e.preventDefault()
   try{
   await axios.post("/auth/register", inputs)

    navigate("/login");
  }catch(error){
setError(error.response.data)
  }  }
  return (
    <div className={styles.signup_container}>
          <div className={styles.signup_form_container}>
          <div className={styles.left}>

    <h1>Welcome Back</h1>
    <Link to='/login'>
    <button type='button' className={styles.white_btn}>
    Sign in
    </button>
    </Link>
    </div>
    <div className={styles.right}>
    <form className={styles.form_container}>
    <h1>Create Account</h1>
    <input required 
    type="text" 
    placeholder='username'
     name='username' 
     onChange={handleChange} 
    className={styles.input} />
 

    <input required type="email" 
    placeholder='email' 
    name='email'
     onChange={handleChange}
    className={styles.input} />

    <input required type="password" placeholder='password' name='password' onChange={handleChange} className={styles.input}/>

    { error && <div className={styles.error_msg}>{error}</div>}
    
    <button onClick={handleSubmit} className={styles.green_btn}>Sign up</button>
 
    </form>
    </div>
    </div>
   
    </div>
 )
}
export default Signup;