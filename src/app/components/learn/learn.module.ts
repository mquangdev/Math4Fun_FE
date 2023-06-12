import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { LearnComponent } from './learn.component';
import { LearnRoutes } from './learn.routing';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [LearnRoutes, SharedModule],
  declarations: [LearnComponent],
})
export class LearnModule {}
