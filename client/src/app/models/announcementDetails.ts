import { Address } from "./Address";
import { AnnouncementCreator } from "./announcementCreator";

import { Photo } from "./photo";

export interface AnnouncementDetails {
    id: number;
    name: string;
    description: string;
    startDate: Date;
    duration: number;
    photoUrl: string;
    dateCreated: Date;
    isAccpeted: boolean;
    isActive: boolean;
    user: AnnouncementCreator;
    address: Address;
    photos: Photo[];
}

