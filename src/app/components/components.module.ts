import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReuseableModule } from '../reuseable/reuseable.module';
import { SharedModule } from '../shared/shared.module';
import { LearnModule } from './learn/learn.module';
import { MainModule } from './main/main.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ReuseableModule,
    SharedModule,
    LearnModule,
    MainModule,
  ],
})
export class ComponentsModule {}
