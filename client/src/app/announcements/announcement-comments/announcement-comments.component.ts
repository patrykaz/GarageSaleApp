import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AnnouncementDetails } from 'src/app/models/announcementDetails';
import { CommentOfAnnouncement } from 'src/app/models/commentOfAnnouncement';
import { User } from 'src/app/models/user';
import { AccountService } from 'src/app/services/account.service';
import { CommentService } from 'src/app/services/comment.service';

@Component({
  selector: 'gs-announcement-comments',
  templateUrl: './announcement-comments.component.html',
  styleUrls: ['./announcement-comments.component.css']
})
export class AnnouncementCommentsComponent implements OnInit {
  @ViewChild('commentForm') commentForm: NgForm;
  @Input() announcement: AnnouncementDetails;
  comments: CommentOfAnnouncement[];
  model: any = {};
  loading = false;
  InputText = EnumInputText;
  user: User;
  canDeleteComments: boolean;

  constructor(private commentService: CommentService, public accountService: AccountService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getComments();
    this.accountService.currentUser$.subscribe(user => {
      this.user = user;
      this.canDeleteComments = this.user?.roles.find(x => x === "Moderator" || x === "Admin") != null;
    })
  }

  sendComment(){
    this.loading = true;
    this.commentService.sendComment(this.announcement.id, this.model).subscribe(response => {
      this.commentForm.reset();
      this.comments.push(response);
      this.loading = false;
    })
  }

  getComments(){
    this.commentService.getComments(this.announcement.id).subscribe(response =>{
      this.comments = response;
    })
  }

  deleteComment(comment: CommentOfAnnouncement){
    if(confirm("Czy na pewno chcesz usunąć ten komentarz?")){
      this.commentService.deleteComment(comment.id).subscribe(() =>{
        this.comments = this.comments.filter(item => item.id !== comment.id);
        this.toastr.success("Komentarz został usunięty pomyślnie")
      })
    }
  }
}

export enum EnumInputText {
  add_comment = "Dodaj komentarz",
  log_in_first = "Zaloguj się, aby móc dodać komentarz"
}

