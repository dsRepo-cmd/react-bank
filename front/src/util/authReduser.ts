// ====================================
export type ContexType = {
  state: {
    isLogged: boolean
    token: string | null
    user: {
      email: string
      id: number
      isConfirm: boolean
    } | null
  }
  dispatch: (action: Action) => void
}

export type Action =
  | {
      type: 'LOGIN'
      payload: {
        token: string
        user: {
          email: string
          id: number
          isConfirm: boolean
        }
      }
    }
  | {
      type: 'AUTH'
      payload: {
        token: string
        user: {
          email: string
          id: number
          isConfirm: boolean
        }
      }
    }
  | { type: 'LOGOUT' }

export const authInitialState = {
  isLogged: false,
  token: null,
  user: { email: null, id: null, isConfirm: null },
}

export function authReducer(state: any, action: Action) {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        isLogged: true,
        token: action.payload.token,
        user: action.payload.user,
      }

    case 'AUTH':
      return {
        ...state,
        isLogged: false,
        token: action.payload.token,
        user: action.payload.user,
      }
    case 'LOGOUT':
      return {
        ...state,
        isLogged: false,
        token: null,
        user: {},
      }
    default:
      return state
  }
}

export const loadStateFromLocalStorage = () => {
  try {
    const serializedState =
      localStorage.getItem('authState')
    if (serializedState === null) {
      return authInitialState
    }
    return JSON.parse(serializedState)
  } catch (err) {
    return authInitialState
  }
}
