import React, {
  createContext,
  useEffect,
  useReducer,
} from 'react'
import {
  BrowserRouter,
  Route,
  Routes,
} from 'react-router-dom'
import { WellcomePage } from './page/WellcomePage'

import AuthRoute from './component/auth-route/AuthRoute'
import PrivateRoute from './component/private-route/PrivateRoute'
import {
  ContexType,
  authReducer,
  loadStateFromLocalStorage,
} from './util/authReduser'
import SignupPage from './page/SignupPage'
import SignupConfirmPage from './page/SignupConfirmPage'
import SigninPage from './page/SigninPage'
import RecoveryPage from './page/RecoveryPage'
import RecoveryConfirmPage from './page/RecoveryConfirmPage'
import BalancePage from './page/BalancePage'
import NotificationsPage from './page/NotificationsPage'
import SettingsPage from './page/SettingsPage'
import RecivePage from './page/RecivePage'
import SendPage from './page/SendPage'
import TransactionPage from './page/TransactionPage'
import ErrorPage from './page/ErrorPage'

export const AuthContext = createContext<ContexType | null>(
  null,
)
// ======================================================
const App: React.FC = () => {
  const [state, dispatch] = useReducer(
    authReducer,
    loadStateFromLocalStorage(),
  )

  useEffect(() => {
    localStorage.setItem('authState', JSON.stringify(state))
  }, [state])

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      <BrowserRouter>
        <Routes>
          <Route
            index
            element={
              <AuthRoute>
                <WellcomePage />
              </AuthRoute>
            }
          />

          <Route
            path="/signup"
            element={
              <AuthRoute>
                <SignupPage />
              </AuthRoute>
            }
          />
          <Route
            path="/signup-confirm"
            element={
              <PrivateRoute>
                <SignupConfirmPage />
              </PrivateRoute>
            }
          />

          <Route
            path="/signin"
            element={
              <AuthRoute>
                <SigninPage />
              </AuthRoute>
            }
          />

          <Route
            path="/recovery"
            element={
              <AuthRoute>
                <RecoveryPage />
              </AuthRoute>
            }
          />

          <Route
            path="/recovery-confirm"
            element={
              <AuthRoute>
                <RecoveryConfirmPage />
              </AuthRoute>
            }
          />

          <Route
            path="/balance"
            element={
              <PrivateRoute>
                <BalancePage />
              </PrivateRoute>
            }
          />

          <Route
            path="/notifications"
            element={
              <PrivateRoute>
                <NotificationsPage />
              </PrivateRoute>
            }
          />

          <Route
            path="/settings"
            element={
              <PrivateRoute>
                <SettingsPage />
              </PrivateRoute>
            }
          />

          <Route
            path="/recive"
            element={
              <PrivateRoute>
                <RecivePage />
              </PrivateRoute>
            }
          />

          <Route
            path="/send"
            element={
              <PrivateRoute>
                <SendPage />
              </PrivateRoute>
            }
          />

          <Route
            path="/transaction/:transactionId"
            element={
              <PrivateRoute>
                <TransactionPage />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </AuthContext.Provider>
  )
}

export default App
