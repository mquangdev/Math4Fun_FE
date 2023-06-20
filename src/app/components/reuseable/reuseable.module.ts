import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table/table.component';
import { UploadImageComponent } from './upload-image/upload-image.component';
import { HeaderComponent } from './header/header.component';
import { MathjaxComponent } from './mathjax/mathjax.component';

@NgModule({
  declarations: [
    TableComponent,
    UploadImageComponent,
    HeaderComponent,
    MathjaxComponent,
  ],
  imports: [CommonModule],
  exports: [
    TableComponent,
    UploadImageComponent,
    HeaderComponent,
    MathjaxComponent,
  ],
})
export class ReuseableModule {}
