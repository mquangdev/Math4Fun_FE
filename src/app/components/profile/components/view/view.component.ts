import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { KeyStorage } from 'src/app/enums/storage.enums';
import { CommonService } from 'src/app/services/common.service';
import { NotiService } from 'src/app/services/noti.service';
import { UploadService } from 'src/app/services/upload.service';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import IMAGE from 'src/app/const/image';
import { StreakCurrent } from 'src/app/models/streak.models';
import { FriendService } from 'src/app/services/friend.service';
import { PageResult } from 'src/app/models/common.models';
import { DetailFriend, Friend } from 'src/app/models/friend.models';
import { Subscription } from 'rxjs';
import { StreakService } from 'src/app/services/streak.service';
import { NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss'],
})
export class ViewComponent implements OnInit, OnDestroy {
  @Input() anotherUserId?: string;
  private dataSubscription: Subscription[] = [];
  public userInfo: any;
  public anoAva = IMAGE.anoAvatar;
  public listCourse: any[] = [];
  // public streakInformation!: StreakCurrent;
  public streakCurrent!: StreakCurrent;
  public friendDetail!: DetailFriend;
  listFollowings: PageResult<Friend> = {
    data: [],
    total: 0,
  };
  listFollowers: PageResult<Friend> = {
    data: [],
    total: 0,
  };
  constructor(
    private userService: UserService,
    private uploadService: UploadService,
    private noti: NotiService,
    private commonService: CommonService,
    private router: Router,
    private friendService: FriendService,
    private streakService: StreakService,
    private modalService: NzModalService
  ) {}
  ngOnInit(): void {
    this.getInfoUser();
    this.getListCourseByUserId();
    this.getListFollowing();
    this.getFollowers();
    this.getStreakCurrent();
    if (this.anotherUserId) {
      this.getDetailUserFriend();
    }
  }
  ngOnDestroy(): void {
    this.dataSubscription.forEach((subscription) => subscription.unsubscribe());
  }
  getDetailUserFriend() {
    let subscription = this.friendService
      .getDetailUser(this.anotherUserId!)
      .subscribe((data: any) => {
        this.friendDetail = data;
      });
    this.dataSubscription.push(subscription);
  }
  getListFollowing() {
    let subscription = this.friendService
      .getFriendsFollowing(this.anotherUserId)
      .subscribe((data: any) => {
        this.listFollowings = data;
      });
    this.dataSubscription.push(subscription);
  }
  getStreakCurrent() {
    let subscription = this.streakService
      .getCurrentStreak(this.anotherUserId)
      .subscribe((data: any) => {
        this.streakCurrent = data.streak;
      });
    this.dataSubscription.push(subscription);
  }
  getFollowers() {
    let subscription = this.friendService
      .getAllFollowers(this.anotherUserId)
      .subscribe((data: any) => {
        this.listFollowers = data;
      });
    this.dataSubscription.push(subscription);
  }
  getInfoUser() {
    let subscription = this.userService
      .getById(this.anotherUserId)
      .subscribe((data) => {
        this.userInfo = data;
      });
    this.dataSubscription.push(subscription);
  }
  getListCourseByUserId() {
    let subscription = this.userService
      .getAllCourseByUserId(this.anotherUserId)
      .subscribe((data) => {
        this.listCourse = data;
      });
    this.dataSubscription.push(subscription);
  }
  unFollowing() {
    let modal = this.modalService.confirm({
      nzTitle: 'Bạn có chắc chắn muốn hủy theo dõi người dùng này không',
      nzOkText: 'Chắc chắn',
      nzCancelText: 'Hủy',
      nzOnOk: () => {
        return true;
      },
    });
    modal.afterClose.subscribe((data) => {
      if (data) {
        this.friendService
          .unFollowUser(this.anotherUserId!)
          .subscribe((data) => {
            this.noti.success('Hủy theo dõi thành công');
            this.getDetailUserFriend();
            this.getFollowers();
          });
      }
    });
  }
  unFollower() {
    let modal = this.modalService.confirm({
      nzTitle:
        'Bạn có chắc chắn muốn gỡ người dùng này không cho theo dõi bạn nữa không',
      nzOkText: 'Chắc chắn',
      nzCancelText: 'Hủy',
      nzOnOk: () => {
        return true;
      },
    });
    modal.afterClose.subscribe((data: any) => {
      if (data) {
        this.friendService
          .removeFollower(this.anotherUserId!)
          .subscribe((data) => {
            this.noti.success('Gỡ theo dõi thành công');
            this.getDetailUserFriend();
            this.getListFollowing();
          });
      }
    });
  }
  followUser() {
    let modal = this.modalService.confirm({
      nzTitle: 'Bạn có chắn chắn muốn theo dõi người dùng này',
      nzOkText: 'Chắc chắn',
      nzCancelText: 'Hủy',
      nzOnOk: () => {
        return true;
      },
    });
    modal.afterClose.subscribe((data: any) => {
      if (data) {
        this.friendService.followUser(this.anotherUserId!).subscribe((data) => {
          this.noti.success('Đã theo dõi người dùng này');
          this.getDetailUserFriend();
          this.getFollowers();
        });
      }
    });
  }
  cancelFromBoth() {
    let modal = this.modalService.confirm({
      nzTitle: 'Bạn có chắn chắn muốn hủy theo dõi ở cả 2 phía không',
      nzOkText: 'Chắc chắn',
      nzCancelText: 'Hủy',
      nzOnOk: () => {
        return true;
      },
    });
    modal.afterClose.subscribe((data: any) => {
      if (data) {
        this.friendService
          .unfollowFromBoth(this.anotherUserId!)
          .subscribe((data) => {
            this.noti.success();
            this.getDetailUserFriend();
            this.getFollowers();
            this.getListFollowing();
          });
      }
    });
  }
  changeAvatar(e: any) {
    this.uploadService
      .uploadFile(e.target.files[0], 'avatar')
      .subscribe((data) => {
        let body = {
          id: this.userInfo.id,
          avatar: data[0],
        };
        this.userService.updateInfo(body).subscribe(
          (data) => {
            this.noti.success();
            this.getInfoUser();
            this.commonService.setChangeAvatarSource(true);
          },
          (err) => {
            this.noti.warning();
          }
        );
      });
  }

  editProfile() {
    this.router.navigate(['/main/profile/edit']);
  }
}
