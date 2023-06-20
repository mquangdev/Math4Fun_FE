import { Component, ContentChild, Input, TemplateRef } from '@angular/core';

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
  @Input() disabled: boolean = false;
  @Input() isRounded: boolean = false;
  @Input() isCustom: boolean = false;
  @ContentChild('content') content!: TemplateRef<any>;
  getDarkerColor(originalColor: string): string {
    // Convert hexadecimal to RGB
    const rgbColor = this.hexToRgb(originalColor);

    // Adjust the RGB values to make the color darker
    const darkerColor = `rgb(${Math.round(rgbColor.r * 0.8)}, ${Math.round(
      rgbColor.g * 0.8
    )}, ${Math.round(rgbColor.b * 0.8)})`;

    return darkerColor;
  }
  hexToRgb(hex: string): { r: number; g: number; b: number } {
    const bigint = parseInt(hex.slice(1), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return { r, g, b };
  }
}
