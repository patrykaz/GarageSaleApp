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

export class MemberParams {
  pageNumber = 1;
  pageSize = 5;
  userName: string;
  firstName: string;
  lastName: string;
  gender: string;
  role: string;
  orderBy: string;
}

export class AdminAnnouncementParams {
  pageNumber = 1;
  pageSize = 5;
}

