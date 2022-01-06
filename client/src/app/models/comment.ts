import { Announcement } from "./announcement";
import { Member } from "./member";

export interface Comment {
    id: number;
    senderId: number;
    sender: Member;
    announcementId: number;
    announcement: Announcement;
    content: string;
    dateSend: Date;
    isDeleted: boolean;
}
