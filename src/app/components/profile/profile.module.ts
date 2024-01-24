import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import { ProfileRoutes } from './profile.routing';
import { SharedModule } from 'src/app/shared/shared.module';
import { ViewComponent } from './components/view/view.component';
import { EditComponent } from './components/edit/edit.component';
import { EditMenuComponent } from './components/edit/edit-menu/edit-menu.component';

@NgModule({
  declarations: [
    ProfileComponent,
    ViewComponent,
    EditComponent,
    EditMenuComponent,
  ],
  imports: [CommonModule, ProfileRoutes, SharedModule],
})
export class ProfileModule {}
