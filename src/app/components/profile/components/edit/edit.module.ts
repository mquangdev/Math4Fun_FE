import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditRoutes } from './edit.routing';

import { EditAccountComponent } from './edit-account/edit-account.component';
import { EditCourseComponent } from './edit-course/edit-course.component';
import { EditPasswordComponent } from './edit-password/edit-password.component';

@NgModule({
  declarations: [
    EditAccountComponent,
    EditCourseComponent,
    EditPasswordComponent,
  ],
  imports: [CommonModule, EditRoutes],
})
export class EditModule {}
