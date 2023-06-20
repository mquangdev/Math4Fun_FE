import { Component } from '@angular/core';
import { RightBarService } from 'src/app/services/right-bar.service';

@Component({
  selector: 'app-home',
  templateUrl: './learn.component.html',
  styleUrls: ['./learn.component.scss'],
})
export class LearnComponent {
  constructor(private righbarService: RightBarService) {
    this.righbarService.setIsShowRightBar(true);
  }
}
