import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FriendService } from 'src/app/services/friend.service';

@Component({
  selector: 'app-detail-friend',
  templateUrl: './detail-friend.component.html',
  styleUrls: ['./detail-friend.component.css'],
})
export class DetailFriendComponent implements OnInit {
  userId: string = '';
  constructor(
    private friendService: FriendService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params: any) => {
      this.userId = params.params.id;
    });
  }
}
