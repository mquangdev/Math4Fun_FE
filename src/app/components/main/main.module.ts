import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { MainComponent } from './main.component';
import { MainRoutes } from './main.routing';
import { CommonModule } from '@angular/common';
import { RightBarComponent } from './components/right-bar/right-bar.component';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
@NgModule({
  declarations: [MainComponent, SidebarComponent, RightBarComponent],
  imports: [CommonModule, SharedModule, MainRoutes, NzDropDownModule],
})
export class MainModule {}
