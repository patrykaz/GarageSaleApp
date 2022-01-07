import { Address } from "./Address";

export interface UpdateUser {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
  address: Address;
}
