import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MainRoutes } from './main.routing';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [MainComponent],
  imports: [MainRoutes],
})
export class MainModule {}
