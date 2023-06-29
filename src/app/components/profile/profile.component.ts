import { Component } from '@angular/core';
import { RightBarService } from 'src/app/services/right-bar.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  constructor(private rightBarService: RightBarService) {
    this.rightBarService.setIsShowBar({ left: true, right: false });
  }
}
