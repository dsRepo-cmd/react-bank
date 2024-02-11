import { FIELD_ERR, FIELD_NAME, ResData } from "./consts";

export enum REQUEST_ACTION_TYPE {
  LOADING = "loading",
  SUCCESS = "success",
  RESET = "reset",
  SET_FORM_ERRORS = "formErrors",
  SET_FORM_VALUES = "formValues",
  SET_ALERT = "alert",
}

interface FormValues {
  [key: string]: string;
}

interface FormErrors {
  [key: string]: string;
}

export interface RequestState {
  status: REQUEST_ACTION_TYPE;
  message: string | null;
  data: ResData | null;
  formValues: FormValues;
  formErrors: FormErrors;
  alert?: string;
}

export interface RequestAction {
  type: REQUEST_ACTION_TYPE;
  payload?: ResData | FormValues | FormErrors | string | null | boolean;
}

export const initialState: RequestState = {
  status: REQUEST_ACTION_TYPE.SUCCESS,
  message: null,
  data: null,
  formValues: {
    [FIELD_NAME.EMAIL]: "",
    [FIELD_NAME.NEW_EMAIL]: "",
    [FIELD_NAME.PASSWORD]: "",
    [FIELD_NAME.NEW_PASSWORD]: "",
    [FIELD_NAME.CODE]: "",
    [FIELD_NAME.SUM]: "",
    [FIELD_NAME.PAY_SYSTEM]: "",
    [FIELD_NAME.PAY_TO]: "",
  },
  formErrors: {
    [FIELD_ERR.IS_EMPTY]: "",
    [FIELD_ERR.IS_BIG]: "",
    [FIELD_ERR.EMAIL]: "",
    [FIELD_ERR.PASSWORD]: "",
    [FIELD_ERR.MONEY]: "",
    [FIELD_ERR.PPASSWORD_AGAIN]: "",
  },
  alert: "",
};

export const reducer = (
  state: RequestState,
  action: RequestAction
): RequestState => {
  switch (action.type) {
    case REQUEST_ACTION_TYPE.SUCCESS:
      return {
        ...state,
        status: action.type,
        data: action.payload as ResData,
      };
    case REQUEST_ACTION_TYPE.SET_FORM_VALUES:
      return {
        ...state,
        status: action.type,
        formValues: action.payload as FormValues,
      };

    case REQUEST_ACTION_TYPE.SET_FORM_ERRORS:
      return {
        ...state,
        status: action.type,
        formErrors: action.payload as FormErrors,
      };

    case REQUEST_ACTION_TYPE.SET_ALERT:
      return {
        ...state,
        status: action.type,
        alert: action.payload as string,
      };

    case REQUEST_ACTION_TYPE.RESET:
      return {
        ...initialState,
      };

    case REQUEST_ACTION_TYPE.LOADING:
      return {
        ...state,
        status: action.type,
      };
    default:
      return { ...state };
  }
};
