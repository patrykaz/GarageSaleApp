export class AnnouncementParams {
  pageNumber = 1;
  pageSize = 5;
  name: string;
  description: string;
  city: string;
  province: string;
  orderBy: string;
}


export class UserAnnouncementParams {
  pageNumber = 1;
  pageSize = 5;
  isActive = true;
  orderBy: string;
}
