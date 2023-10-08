import React from 'react'
import { AuthContext } from '../../App'
import { Navigate } from 'react-router-dom'

const AuthRoute: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  const auth = React.useContext(AuthContext)

  if (!auth) return <>{children}</>

  return auth.state.isLogged ? (
    <Navigate to="/balance" replace />
  ) : (
    <>{children}</>
  )
}

export default AuthRoute
