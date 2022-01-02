export interface NewAnnouncement {
  name: string;
  description: string;
  startDate: Date;
  duration: number;
  address: NewAddress;
}

export interface NewAddress {
  street: string;
  city: string;
  postalCode: string;
}
