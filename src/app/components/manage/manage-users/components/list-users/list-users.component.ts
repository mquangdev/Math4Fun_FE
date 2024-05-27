import { Component, OnInit } from '@angular/core';
import IMAGE from 'src/app/const/image';
import { ROLE_OBJECT } from 'src/app/const/role';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css'],
  styles: [
    `
      .search-box {
        padding: 8px;
      }

      .search-box input {
        width: 188px;
        margin-bottom: 8px;
        display: block;
      }

      .search-box button {
        width: 90px;
      }

      .search-button {
        margin-right: 8px;
      }
      .anticon-search {
        padding: 8px;
      }
    `,
  ],
})
export class ListUsersComponent implements OnInit {
  public page: number = 1;
  public limit: number = 10;
  public keyword: string = '';
  public listData: User[] = [];
  public total: number = 0;
  public defaultAvatar = IMAGE.anoAvatar;
  public ROLE_OBJECT = ROLE_OBJECT;
  public visibleFilter: boolean = false;
  public searchValue: string = '';
  public typeSearch: 'name' | 'username' | 'email' | '' = '';
  constructor(private userService: UserService) {}

  ngOnInit() {
    this.getAllUsersFunction();
  }
  public getAllUsersFunction() {
    this.userService
      .getAllUsers(this.page, 100000, this.keyword)
      .subscribe((data) => {
        this.listData = data.data;
        this.total = data.total;
      });
  }
  public pageIndexChange(page: number) {
    console.log(page);
  }
  search(): void {
    switch (this.typeSearch) {
      case 'email': {
        this.listData = this.listData.filter(
          (item: User) => item.email!.indexOf(this.searchValue) !== -1
        );
        break;
      }
      case 'name': {
        this.listData = this.listData.filter(
          (item: User) => item.fullname!.indexOf(this.searchValue) !== -1
        );
        break;
      }
      case 'username': {
        this.listData = this.listData.filter(
          (item: User) => item.username!.indexOf(this.searchValue) !== -1
        );
        break;
      }
      default: {
        this.getAllUsersFunction();
      }
    }
    this.visibleFilter = false;
  }
  visibleFilterHeader(type: string) {
    return this.typeSearch === type && this.visibleFilter;
  }
  activeFilterHeader(type: string) {
    return this.typeSearch === type && this.searchValue.length > 0;
  }
  reset(): void {
    this.searchValue = '';
    this.typeSearch = '';
    this.visibleFilter = false;
    this.search();
  }
}
