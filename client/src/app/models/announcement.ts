import { Address } from "./Address";
import { Photo } from "./photo";

export interface Announcement {
    id: number;
    name: string;
    description: string;
    startDate: Date;
    duration: number;
    photoUrl: string;
    dateCreated: Date;
    user: AnnouncementCreator;
    address: Address;
    photos: Photo[];
}

export interface AnnouncementCreator {
  id: number;
  userName: string;
  firstName: string;
  lastName: string;
  gender: string;
  created: Date;
  lastActive: Date;
}
