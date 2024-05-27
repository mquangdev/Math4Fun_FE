import { Component, OnInit } from '@angular/core';
import { RightBarService } from 'src/app/services/right-bar.service';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.css'],
})
export class ManageUsersComponent implements OnInit {
  constructor(private rightBarService: RightBarService) {
    this.rightBarService.setIsShowBar({
      left: true,
      right: false,
    });
  }

  ngOnInit() {}
}
