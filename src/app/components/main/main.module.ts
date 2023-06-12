import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { MainComponent } from './main.component';
import { MainRoutes } from './main.routing';
import { CommonModule } from '@angular/common';
@NgModule({
  declarations: [MainComponent, SidebarComponent],
  imports: [CommonModule, SharedModule, MainRoutes],
})
export class MainModule {}
