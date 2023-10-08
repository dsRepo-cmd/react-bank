import React from 'react'
import { AuthContext } from '../../App'
import Error from '../../page/error/Error'
import { Navigate } from 'react-router-dom'

const PrivateRoute: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  const auth = React.useContext(AuthContext)

  if (!auth) return <Error />

  return auth.state.isLogged ? (
    <>{children}</>
  ) : (
    <Navigate to="/" replace />
  )
}
export default PrivateRoute
