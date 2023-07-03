import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { Bar, RightBarService } from 'src/app/services/right-bar.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit, AfterViewInit {
  public isShowBar$ = this.rightBarService.isShowBar$;
  @ViewChild('main') mainElement!: ElementRef;

  constructor(
    private rightBarService: RightBarService,
    private renderer: Renderer2
  ) {}
  ngOnInit(): void {}
  ngAfterViewInit(): void {
    setTimeout(() => {
      this.getStyleMain();
    });
  }
  getStyleMain() {
    this.isShowBar$.subscribe((isShow: Bar) => {
      if (isShow.left && isShow.right) {
        this.renderer.setStyle(
          this.mainElement.nativeElement,
          'width',
          'calc(100vw - 510px)'
        );
      }
      if (isShow.left && !isShow.right) {
        this.renderer.setStyle(
          this.mainElement.nativeElement,
          'width',
          'calc(100vw - 255px)'
        );
      }
      if (!isShow.left && !isShow.right) {
        this.renderer.setStyle(
          this.mainElement.nativeElement,
          'width',
          '100vw'
        );
      }
    });
  }
}
