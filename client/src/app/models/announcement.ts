export interface Announcement {
    id: number;
    name: string;
    description: string;
    startDate: Date;
    duration: number;
    photoUrl: string;
    created: Date;
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

export interface Address {
  street: string;
  city: string;
  postalCode: string;
}

export interface Photo {
    id: number;
    url: string;
    isMain: boolean;
}
