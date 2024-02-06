// ====================================
export type ContexType = {
  state: {
    isLogged: boolean;
    token: string | null;
    user: {
      email: string;
      id: number;
      isConfirm: boolean;
    } | null;
  };
  dispatch: (action: Action) => void;
};

export enum AUTH_ACTION_TYPE {
  LOGIN = "login",
  AUTH = "auth",
  LOGOUT = "logout",
}

export type Action =
  | {
      type: AUTH_ACTION_TYPE.LOGIN;
      payload: {
        token: string;
        user: {
          email: string;
          id: number;
          isConfirm: boolean;
        };
      };
    }
  | {
      type: AUTH_ACTION_TYPE.AUTH;
      payload: {
        token: string;
        user: {
          email: string;
          id: number;
          isConfirm: boolean;
        };
      };
    }
  | { type: AUTH_ACTION_TYPE.LOGOUT };

export const authInitialState = {
  isLogged: false,
  token: null,
  user: { email: null, id: null, isConfirm: null },
};

export function authReducer(state: any, action: Action) {
  switch (action.type) {
    case AUTH_ACTION_TYPE.LOGIN:
      return {
        ...state,
        isLogged: true,
        token: action.payload.token,
        user: action.payload.user,
      };

    case AUTH_ACTION_TYPE.AUTH:
      return {
        ...state,
        isLogged: false,
        token: action.payload.token,
        user: action.payload.user,
      };
    case AUTH_ACTION_TYPE.LOGOUT:
      return {
        ...state,
        isLogged: false,
        token: null,
        user: {},
      };
    default:
      return state;
  }
}

export const loadStateFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem("authState");
    if (serializedState === null) {
      return authInitialState;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return authInitialState;
  }
};
