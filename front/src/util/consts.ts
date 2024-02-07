type FormFieldName =
  | "EMAIL"
  | "USER_ID"
  | "NEW_EMAIL"
  | "PASSWORD"
  | "NEW_PASSWORD"
  | "CODE"
  | "SUM"
  | "PAY_SYSTEM"
  | "PAY_TO";

type FormFieldError =
  | "IS_EMPTY"
  | "IS_BIG"
  | "EMAIL"
  | "PASSWORD"
  | "PPASSWORD_AGAIN"
  | "MONEY";

export const FIELD_NAME: Record<FormFieldName, string> = {
  EMAIL: "email",
  USER_ID: "userId",
  NEW_EMAIL: "newEmail",
  PASSWORD: "password",
  NEW_PASSWORD: "newPassword",
  CODE: "code",
  SUM: "sum",
  PAY_SYSTEM: "paymentSystem",
  PAY_TO: "payTo",
};

export const FIELD_ERR: Record<FormFieldError, string> = {
  IS_EMPTY: "Enter the value in the field",
  IS_BIG: "Very long value, remove excess",
  EMAIL: "Enter the correct value of the e-mail address",
  PASSWORD:
    "The password must be at least 8 characters long, including at least one number and an uppercase letter",
  PPASSWORD_AGAIN: "Your second password does not match the first",
  MONEY: "Enter the correct sum value",
};

export const REG_EXP_EMAIL: RegExp = new RegExp(
  /^[\w-.]+@([\w-]+\.)+[\w-]{2,}$/
);
export const REG_EXP_PASSWORD: RegExp = new RegExp(
  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/
);

export const REG_EXP_MONEY: RegExp = new RegExp(
  /^(?!0[.,]00$)(\d{1,6}(?:[.]\d{1,2})?)$/
);

export const LABLE_NAME = {
  EMAIL: "Email",
  NEW_EMAIL: "New email",
  PASSWORD: "Password",
  NEW_PASSWORD: "New Password",
  OLD_PASSWORD: "Old Password",
  AMOUNT: "Enter the transfer amount",
  CODE: "Code",
};

export const PLACEHOLDER_NAME = {
  EMAIL: "Enter your email",
  NEW_EMAIL: "Enter new your email",
  SEND_EMAIL: "Enter receiving email",
  PASSWORD: "Enter your password",
  NEW_PASSWORD: "Enter your new password",
  AMOUNT: "Enter your amount",
  CODE: "Enter your code",
};

export const BACKGROUND_COLOR = {
  WHITE: "#fff",
  LIGHT_WHITE: "#F5F5F7",
};

export interface ResData {
  message: string;
  session: {
    token: string;
    user: { email: string; id: number; isConfirm: boolean };
    balance: number;
    transaction: Transaction | null;
    transactions: Transaction[] | null;
    notifications: Notifications[] | null;
  };
  code?: string;
}
export interface Transaction {
  amount: number;
  date: string;
  type: string;
  sender: string;
  id: number;
}

export interface Notifications {
  id: number;
  userId: number;
  type: string;
  message: string;
  date: string;
}

export const apiUrl = null;

export const SERVER_IP = apiUrl || "http://localhost:4000";
