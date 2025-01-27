export interface IUser {
  _id: string;
  name: string;
  email: string;
  role: "CUSTOMER" | "ADMIN";
  id: string;
}
