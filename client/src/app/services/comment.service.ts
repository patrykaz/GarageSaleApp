import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CreateComment } from '../models/createComment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient ) { }

  getComments(id: number){
    return this.http.get<Comment[]>(this.baseUrl + 'Announcements/' + id + '/get-comments')
  }

  sendComment(id: number, comment: CreateComment){
    return this.http.post<Comment>(this.baseUrl + 'Announcements/' + id + '/add-comment', comment)
  }
}
