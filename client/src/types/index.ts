export default interface ITweetProps {
  id: string | number | undefined;
  username: string;
  fullname: string;
  updated_at?: string;
  created_at?: any;
  caption: string;
  user_id: string;
}

export interface IButtonProps {
  children: any;
  onclick?: any;
  className?: any;
}

export interface ILoginProps {
  email: string;
  password: string;
}

export interface IRegisterProps {
  id?: string;
  fullname: string;
  username: string;
  email: string;
  password: string;
}

export interface StateType<T = any> {
  pending?: boolean;
  result: T;
  error: ErrorResponseType | null;
}

export interface ILoginProps {
  email: string;
  password: string;
}

export interface UserType {
  id: string;
  fullname: string;
  username: string;
  email: string;
  created_at: string;
}

export interface UpdateUserParamsType {
  fullname: string;
  username: string;
  email: string;
}

export interface ICreateTweetTypes {
  caption: string;
  user_id: string | null;
}

export interface ErrorResponseType {
  message: string;
  statusCode?: number;
  error?: string;
}

export interface IMessagesProps {
  id: number | string;
  sender_id: string;
  recipient_id: string;
  message: string;
  user_id: string;
}

export interface IMessageProps {
  id?: string;
  sender_id: string;
  recipient_id?: any;
  message: string;
  timestamp?: any;
}
