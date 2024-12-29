import React from 'react'
import { Navigate, redirect, useNavigate } from 'react-router-dom'
import { AppState } from '../../App'

const ProtectedRoute = (children, msg, redirect ) => {
      const token = localStorage.getItem('token')
      const navigate = useNavigate()
      const { user, setUser } = useContext(AppState)

      if (!token) {
            return <Navigate to='/login' state={{msg, redirect}} />
      }
      return children          
}

export default ProtectedRoute