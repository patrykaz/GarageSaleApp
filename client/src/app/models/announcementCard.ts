import { Address } from "./Address";
import { AnnouncementCreator } from "./AnnouncementCreator";

export interface AnnouncementCard {
    id: number;
    name: string;
    startDate: Date;
    duration: number;
    photoUrl: string;
    dateCreated: Date;
    user: AnnouncementCreator;
    address: Address;
}

