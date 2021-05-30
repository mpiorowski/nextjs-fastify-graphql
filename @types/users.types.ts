export type User = {
  id?: string;
  name: string | null;
  email: string;
  email_verified: Date;
  image: string | null;
  active?: boolean;
  created?: Date;
  updated?: Date;
};
