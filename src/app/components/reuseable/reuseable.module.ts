import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table/table.component';
import { UploadImageComponent } from './upload-image/upload-image.component';
import { HeaderComponent } from './header/header.component';
import { MathjaxComponent } from './mathjax/mathjax.component';
import { ButtonComponent } from './button/button.component';

@NgModule({
  declarations: [
    TableComponent,
    UploadImageComponent,
    HeaderComponent,
    MathjaxComponent,
    ButtonComponent,
  ],
  imports: [CommonModule],
  exports: [
    TableComponent,
    UploadImageComponent,
    HeaderComponent,
    MathjaxComponent,
    ButtonComponent,
  ],
})
export class ReuseableModule {}
