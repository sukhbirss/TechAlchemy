
export interface IUserCategory {
  name: string;
  email: string;
  role: "USER";
  isDisabled: boolean;
}

export interface IUserDocument extends IUserCategory, Document {
}
