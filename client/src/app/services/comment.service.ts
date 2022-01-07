import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CommentOfAnnouncement } from '../models/commentOfAnnouncement';
import { CreateComment } from '../models/createComment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient ) { }

  getComments(id: number){
    return this.http.get<CommentOfAnnouncement[]>(this.baseUrl + 'Announcements/' + id + '/get-comments')
  }

  sendComment(id: number, comment: CreateComment){
    return this.http.post<CommentOfAnnouncement>(this.baseUrl + 'Announcements/' + id + '/add-comment', comment)
  }

  deleteComment(id: number){
    return this.http.delete(this.baseUrl + 'Announcements/delete-comment/' + id)
  }
}
