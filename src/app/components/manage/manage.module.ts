import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { ManageComponent } from './manage.component';
import { ManageRoutes } from './manage.routing';
@NgModule({
  declarations: [ManageComponent],
  imports: [CommonModule, ManageRoutes, SharedModule],
})
export class ManageModule {}
