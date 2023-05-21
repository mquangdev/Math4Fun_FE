import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReuseableModule } from '../reuseable/reuseable.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, ReuseableModule, SharedModule],
})
export class ComponentsModule {}
