import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import { ProfileRoutes } from './profile.routing';
import { SharedModule } from 'src/app/shared/shared.module';
import { ViewComponent } from './components/view/view.component';

@NgModule({
  declarations: [ProfileComponent, ViewComponent],
  imports: [CommonModule, ProfileRoutes, SharedModule],
})
export class ProfileModule {}
