import { Component, Input, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  @Input() bgButton!: string;
  @Input() edge!: string;
  @Input() text!: string;
  @Input() prefix!: TemplateRef<any>;
  @Input() width: string = 'fit-content';
  @Input() customStyles: any = {};
  @Input() fontSize!: number;
  @Input() padding!: string;
  @Input() textColor!: string;
}
