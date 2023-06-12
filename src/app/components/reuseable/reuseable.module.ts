import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table/table.component';
import { UploadImageComponent } from './upload-image/upload-image.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [TableComponent, UploadImageComponent, HeaderComponent],
  imports: [CommonModule],
  exports: [TableComponent, UploadImageComponent, HeaderComponent],
})
export class ReuseableModule {}
