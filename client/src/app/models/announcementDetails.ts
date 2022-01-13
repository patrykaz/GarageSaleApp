import { Address } from "./Address";
import { AnnouncementCreator } from "./AnnouncementCreator";
import { Photo } from "./photo";

export interface AnnouncementDetails {
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

