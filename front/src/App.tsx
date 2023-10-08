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
import { WellcomePage } from './page/wellcome/WellcomePage'
import SignupPage from './page/signup/SignupPage'
import SigninPage from './page/signin/SigninPage'
import SignupConfirmPage from './page/signup-confirm/SignupConfirmPage'
import RecoveryPage from './page/recovery/RecoveryPage'
import RecoveryConfirmPage from './page/recovery-confirm/RecoveryConfirmPage'
import SendPage from './page/send/SendPage'
import BalancePage from './page/balance/BalancePage'
import Error from './page/error/Error'
import SettingsPage from './page/settings/SettingsPage'
import NotificationsPage from './page/notifications/NotificationsPage'
import RecivePage from './page/recive/RecivePage'
import TransactionPage from './page/transaction/TransactionPage'
import AuthRoute from './component/auth-route/AuthRoute'
import PrivateRoute from './component/private-route/PrivateRoute'
import {
  ContexType,
  authReducer,
  loadStateFromLocalStorage,
} from './util/authReduser'

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
          <Route path="*" element={<Error />} />
        </Routes>
      </BrowserRouter>
    </AuthContext.Provider>
  )
}

export default App
