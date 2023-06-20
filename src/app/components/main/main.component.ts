import { Component } from '@angular/core';
import { RightBarService } from 'src/app/services/right-bar.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent {
  public isShowRightBar$ = this.rightBarService.isShowRightBar$;
  withHaveRighbar = '{width: calc(100vw - 510px)}';
  withDontHaveRighbar = '{width: calc(100vw - 255px)}';
  constructor(private rightBarService: RightBarService) {}
  getStyleMain() {
    this.isShowRightBar$.subscribe((data) => {
      if (data) {
        return 'calc(100vw - 510px)';
      } else {
        return 'calc(100vw - 255px)';
      }
    });
  }
}
