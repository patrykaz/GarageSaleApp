import { Address } from "./Address";

export interface Member {
  id: number;
  userName: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
  created: string;
  lastActive: string;
  address: Address;
}
