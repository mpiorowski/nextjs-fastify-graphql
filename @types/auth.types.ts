export type Credentials = {
  email: string;
  password: string;
};

export type Token = {
  id?: string;
  token: string;
  type: string;
  identifier: string;
  expires: Date;
  created: Date;
  edited: Date;
};
