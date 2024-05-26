import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css'],
})
export class ListUsersComponent implements OnInit {
  public page: number = 1;
  public limit: number = 10;
  public keyword: string = '';
  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService
      .getAllUsers(this.page, this.limit, this.keyword)
      .subscribe((data) => {
        console.log(data);
      });
  }
}
