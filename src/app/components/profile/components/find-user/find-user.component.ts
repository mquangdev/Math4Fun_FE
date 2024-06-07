import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import {
  debounce,
  debounceTime,
  distinctUntilChanged,
  fromEvent,
  map,
} from 'rxjs';
import IMAGE from 'src/app/const/image';
import { KeyStorage } from 'src/app/enums/storage.enums';
import { FindFriend } from 'src/app/models/friend.models';
import { FriendService } from 'src/app/services/friend.service';
import { NotiService } from 'src/app/services/noti.service';

@Component({
  selector: 'app-find-user',
  templateUrl: './find-user.component.html',
  styleUrls: ['./find-user.component.css'],
})
export class FindUserComponent implements OnInit, AfterViewInit {
  listResults: FindFriend[] = [];
  total: number = 0;
  isLoading: boolean = false;
  valueSearch: string = '';
  anonymousAva = IMAGE.anoAvatar;
  yourUserId = localStorage.getItem(KeyStorage.user_id);
  constructor(
    private friendService: FriendService,
    private router: Router,
    private route: ActivatedRoute,
    private modalService: NzModalService,
    private notiService: NotiService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params: any) => {
      if (params.search) {
        this.searchFriend(params.search);
        this.valueSearch = params.search;
      }
    });
  }
  ngAfterViewInit(): void {
    const searchField = document.getElementById('search-input');
    const inputObservable = fromEvent(searchField!, 'input');
    const debounceInput = inputObservable.pipe(
      debounceTime(300),
      map((event: any) => event.target.value),
      distinctUntilChanged()
    );
    debounceInput.subscribe((inputValue: string) => {
      this.router.navigate(['/main/profile/find-user'], {
        queryParams: {
          search: inputValue,
        },
      });
      // this.searchFriend(inputValue);
    });
  }
  searchFriend(keyword: string) {
    this.isLoading = true;
    this.friendService.searchFriend(keyword).subscribe((data: any) => {
      if (data) {
        this.listResults = data.data;
        this.total = data.total;
      }
      this.isLoading = false;
    });
  }
  follow(userId: string, e: any) {
    e.stopPropagation();
    const modal = this.modalService.confirm({
      nzTitle: 'Bạn chắc chắn muốn theo dõi người dùng này chứ',
      nzOkText: 'Có',
      nzCancelText: 'Không',
      nzOnOk: () => {
        return true;
      },
    });
    modal.afterClose.subscribe((data) => {
      if (data) {
        this.friendService.followUser(userId).subscribe((data) => {
          this.notiService.success('Kết bạn thành công');
          this.searchFriend(this.valueSearch);
        });
      }
    });
  }
  detailUser(userId: string) {
    this.router.navigate([`/main/profile/detail-user/${userId}`]);
  }
}
