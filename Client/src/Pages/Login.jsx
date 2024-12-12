import React from 'react'
import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from '../axiosConfig'

const Login = () => {
      const emailDom = useRef()
      const passwordDom = useRef()
      const navigate = useNavigate()


      async function handleSubmit (e) {
            e.preventDefault()
            const emaivalue = emailDom.current.value
            const password = passwordDom.current.value

            if (!emaivalue || !password) {
                  return
            }
            try {
                  const {data} = await axios.post('users/login', {
                        email: emaivalue,
                        password: password
                  })
                  alert('User logged in successfully')
                  console.log('User logged in successfully')
                  localStorage.setItem('token', data.token)
                  // navigate('/')
                  console.log(data);
                  
            } catch (error) {
                  console.log(error.response.data.message)
            }

            
      }

      return (
            <div>
                  <form onSubmit={handleSubmit}>
                        
                        <div>
                              <span> Email</span>
                              <input 
                                    ref={emailDom} 
                                    type="email" 
                                    placeholder='email'/>
                        </div>
                        <br />
                        <div>
                              <span> Password</span>
                              <input 
                                    ref={passwordDom} type="password" placeholder='password'/>
                        </div>
                        <button type='submit'> Login </button>
                  </form>
            </div>
      )
}

export default Login