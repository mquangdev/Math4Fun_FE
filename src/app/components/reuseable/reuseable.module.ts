import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table/table.component';
import { UploadImageComponent } from './upload-image/upload-image.component';
import { HeaderComponent } from './header/header.component';
import { MathjaxComponent } from './mathjax/mathjax.component';
import { ButtonComponent } from './button/button.component';
import { StreakComponent } from '../main/components/right-bar/streak/streak.component';
import { NzCalendarModule } from 'ng-zorro-antd/calendar';
import { FormsModule } from '@angular/forms';
import { QuestionDetailComponent } from '../manage/manage-course/components/question/question-detail/question-detail.component';
import { NzInputModule } from 'ng-zorro-antd/input';
import { SharedModule } from 'src/app/shared/shared.module';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzButtonModule } from 'ng-zorro-antd/button';

@NgModule({
  declarations: [
    TableComponent,
    UploadImageComponent,
    HeaderComponent,
    MathjaxComponent,
    ButtonComponent,
    StreakComponent,
    QuestionDetailComponent,
  ],
  imports: [
    NzCalendarModule,
    CommonModule,
    NzInputModule,
    FormsModule,
    NzFormModule,
    NzSelectModule,
    NzRadioModule,
    NzButtonModule,
  ],
  exports: [
    TableComponent,
    UploadImageComponent,
    HeaderComponent,
    MathjaxComponent,
    ButtonComponent,
    StreakComponent,
    QuestionDetailComponent,
  ],
})
export class ReuseableModule {}
