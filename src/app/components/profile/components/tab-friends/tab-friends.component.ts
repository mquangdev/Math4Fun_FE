import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Router } from '@angular/router';
import IMAGE from 'src/app/const/image';
import { PageResult } from 'src/app/models/common.models';
import { Friend } from 'src/app/models/friend.models';
import { FriendService } from 'src/app/services/friend.service';
export enum Tabs {
  following,
  follower,
}
@Component({
  selector: 'app-tab-friends',
  templateUrl: './tab-friends.component.html',
  styleUrls: ['./tab-friends.component.css'],
})
export class TabFriendsComponent implements OnInit, OnChanges {
  @Input() anotherUserId?: string;
  @Input() isReload?: boolean;
  @Input() listFollowings: PageResult<Friend> = {
    data: [],
    total: 0,
  };
  @Input() listFollowers: PageResult<Friend> = {
    data: [],
    total: 0,
  };
  Tabs = Tabs;
  tabSelected = Tabs.following;
  anonymousAva = IMAGE.anoAvatar;
  constructor(private friendService: FriendService, private router: Router) {}
  ngOnChanges(changes: SimpleChanges): void {
    // if (changes['isReload']) {
    //   this.getListFollowing(this.anotherUserId);
    //   this.getFollowers(this.anotherUserId);
    // }
  }

  ngOnInit() {
    // this.getListFollowing(this.anotherUserId);
    // this.getFollowers(this.anotherUserId);
  }
  getListFollowing(anotherUserId?: string) {
    this.friendService
      .getFriendsFollowing(anotherUserId)
      .subscribe((data: any) => {
        this.listFollowings = data;
      });
  }
  getFollowers(anotherUserId?: string) {
    this.friendService.getAllFollowers(anotherUserId).subscribe((data: any) => {
      this.listFollowers = data;
    });
  }
  changeTab(tab: any) {
    this.tabSelected = tab;
  }
  detailFriend(userId: string) {
    if (!this.anotherUserId) {
      this.router.navigate([`/main/profile/detail-user/${userId}`]);
    }
  }
}
