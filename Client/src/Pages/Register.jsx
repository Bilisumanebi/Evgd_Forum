import React from 'react'
import { useRef } from 'react'
import axios from '../axiosConfig'
import { useNavigate } from 'react-router-dom'


const Register = () => {

      const Navigate = useNavigate()
      const userNameDom = useRef(null)
      const emailDom = useRef(null)
      const passwordDom = useRef(null)
      const firstNameDom = useRef(null)
      const lastNameDom = useRef(null)

      async function handleSubmit(e) {
            e.preventDefault()
            const userValue = userNameDom.current.value
            const emailValue = emailDom.current.value
            const passwordValue = passwordDom.current.value
            const firstnameValue = firstNameDom.current.value
            const lastnameValue = lastNameDom.current.value

            if (!userValue || !emailValue || !passwordValue || !firstnameValue || !lastnameValue) {
                  return
            }
            try {
                  await axios.post('/users/register', {
                        username: userValue,
                        email: emailValue,
                        password: passwordValue,
                        firstname: firstnameValue,
                        lastname: lastnameValue
                  })
                  console.log('User registered successfully. Please login');
                  Navigate('/login')
                  
            } catch (error) {
                  console.log(error.response);
                  
            }
            
            
      }

      
      return (
            <section>
                  <form onSubmit={handleSubmit}>
                        <div>
                              <span> First name</span>
                              <input 
                                    ref={firstNameDom}
                                    type="text" 
                                    placeholder='first name'/>
                        </div>
                        <br />
                        <div>
                              <span> Last name</span>
                              <input
                                    ref={lastNameDom} 
                                    type="text" 
                                    placeholder='last name'/>
                        </div>
                        <br />
                        <div>
                              <span> Username</span>
                              <input
                                    ref={userNameDom}
                                    type="text" 
                                    placeholder='username'/>
                        </div>
                        <br />
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
                                    ref={passwordDom} 
                                    type="password" placeholder='password'/>
                        </div>
                        <button type='submit'>Register</button>
                  </form>

            </section>
  )
}

export default Register