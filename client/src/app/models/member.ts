import { Address } from "./Address";

export interface Member {
  id: number;
  userName: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
  dateCreated: string;
  LastActive: string;
  address: Address;
  roles: string[];
}
