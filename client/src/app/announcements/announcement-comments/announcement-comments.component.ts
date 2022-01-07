import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Announcement } from 'src/app/models/announcement';
import { CreateComment } from 'src/app/models/createComment';
import { AccountService } from 'src/app/services/account.service';
import { CommentService } from 'src/app/services/comment.service';

@Component({
  selector: 'gs-announcement-comments',
  templateUrl: './announcement-comments.component.html',
  styleUrls: ['./announcement-comments.component.css']
})
export class AnnouncementCommentsComponent implements OnInit {
  @ViewChild('commentForm') commentForm: NgForm;
  @Input() announcement: Announcement;
  comments: Comment[];
  model: any = {};
  loading = false;
  InputText = EnumInputText;

  constructor(private commentService: CommentService, public accountService: AccountService) { }

  ngOnInit(): void {
    this.getComments();
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


}

export enum EnumInputText {
  add_comment = "Dodaj komentarz",
  log_in_first = "Zaloguj się, aby móc dodać komentarz"
}

