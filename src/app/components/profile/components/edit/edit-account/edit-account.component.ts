import { Component } from '@angular/core';
import { UserService } from '../../../../../services/user.service';

@Component({
  selector: 'app-edit-account',
  templateUrl: './edit-account.component.html',
  styleUrls: ['./edit-account.component.scss'],
})
export class EditAccountComponent {
  constructor(private userService: UserService) {}
}
