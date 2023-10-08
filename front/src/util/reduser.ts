import { FIELD_ERR, FIELD_NAME } from './consts'

export enum REQUEST_ACTION_TYPE {
  PROGRESS = 'progress',
  SUCCESS = 'success',
  RESET = 'reset',
  SET_FORM_ERRORS = 'formErrors',
  SET_FORM_VALUES = 'formValues',
  SET_ALERT = 'alert',
}

export interface RequestState {
  status: REQUEST_ACTION_TYPE | null
  message: string | null
  data: any | null
  formValues: any | null
  formErrors: any | null
  alert?: string
}

export interface RequestAction {
  type: REQUEST_ACTION_TYPE
  payload?: any
}

export const initialState: RequestState = {
  status: null,
  message: null,
  data: null,
  formValues: {
    [FIELD_NAME.EMAIL]: '',
    [FIELD_NAME.NEW_EMAIL]: '',
    [FIELD_NAME.PASSWORD]: '',
    [FIELD_NAME.NEW_PASSWORD]: '',
    [FIELD_NAME.CODE]: '',
    [FIELD_NAME.SUM]: '',
    [FIELD_NAME.PAY_SYSTEM]: '',
    [FIELD_NAME.PAY_TO]: '',
  },
  formErrors: {
    [FIELD_ERR.IS_EMPTY]: '',
    [FIELD_ERR.IS_BIG]: '',
    [FIELD_ERR.EMAIL]: '',
    [FIELD_ERR.PASSWORD]: '',
    [FIELD_ERR.MONEY]: '',
    [FIELD_ERR.PPASSWORD_AGAIN]: '',
  },
  alert: '',
}

export const reducer = (
  state: RequestState,
  action: RequestAction,
): RequestState => {
  switch (action.type) {
    case REQUEST_ACTION_TYPE.SUCCESS:
      return {
        ...state,
        status: action.type,
        data: action.payload,
      }
    case REQUEST_ACTION_TYPE.SET_FORM_VALUES:
      return {
        ...state,
        status: action.type,
        formValues: action.payload,
      }

    case REQUEST_ACTION_TYPE.SET_FORM_ERRORS:
      return {
        ...state,
        status: action.type,
        formErrors: action.payload,
      }

    case REQUEST_ACTION_TYPE.SET_ALERT:
      return {
        ...state,
        status: action.type,
        alert: action.payload,
      }

    case REQUEST_ACTION_TYPE.RESET:
      return {
        ...initialState,
      }
    default:
      return { ...state }
  }
}
