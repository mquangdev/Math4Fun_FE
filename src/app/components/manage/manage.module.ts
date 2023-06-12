import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageComponent } from './manage.component';
import { ManageRoutes } from './manage.routing';
import { SharedModule } from 'src/app/shared/shared.module';
@NgModule({
  declarations: [ManageComponent],
  imports: [CommonModule, ManageRoutes, SharedModule],
})
export class ManageModule {}
