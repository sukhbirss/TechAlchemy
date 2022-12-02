import { Document } from 'mongoose'

export interface IUser {
  name: string;
  email: string;
  hash: string
  password: string
  role: 'USER';
  isDisabled: boolean;
}

export interface IUserDocument extends IUser, Document {
  matchPassword(enteredPassword: string): boolean
  getSignedJwtToken(): string
  getRefreshJwtToken(): string
}

