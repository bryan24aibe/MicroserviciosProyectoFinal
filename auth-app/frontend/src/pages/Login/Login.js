import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/authContext.js'
import styles from './styles.module.css'

const Login = () => {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  })

  const [error, setError] = useState(null)
  const navigate = useNavigate()
  const { login } = useContext(AuthContext)

  const handleChange = e => {
    setInputs(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await login(inputs)
      navigate("/")
    } catch (error) {
      setError(error.response?.data || 'An unexpected error occurred')
    }
  }

  return (
    <div className={styles.login_container}>
      <div className={styles.login_form_container}>
        <div className={styles.left}>
          <form className={styles.form_container} onSubmit={handleSubmit}>
            <h1>Login to Your Account</h1>
            <input
              required
              type="text"
              placeholder='username'
              name='username'
              onChange={handleChange}
              className={styles.input}
            />
            <input
              required
              type="password"
              placeholder='password'
              name='password'
              onChange={handleChange}
              className={styles.input}
            />
            {error && <div className={styles.error_msg}>{error}</div>}
            <button type="submit" className={styles.green_btn}>Sign In</button>
          </form>
        </div>
        <div className={styles.right}>
          <h1>New Here?</h1>
          <Link to='/register'>
            <button className={styles.white_btn}>Sign Up</button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Login
