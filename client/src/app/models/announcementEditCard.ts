import { Address } from "./Address";

export interface AnnouncementEditCard {
    id: number;
    name: string;
    startDate: Date;
    duration: number;
    isActive: boolean;
    isAccepted: boolean;
    photoUrl: string;
    dateCreated: Date;
    address: Address;
}

