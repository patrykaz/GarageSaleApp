import { Address } from "./Address";
import { AnnouncementCreator } from "./announcementCreator";


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

