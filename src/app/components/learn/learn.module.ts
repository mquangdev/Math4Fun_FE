import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { LearnComponent } from './learn.component';
import { LearnRoutes } from './learn.routing';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { GuidComponent } from './components/guid/guid.component';
import { ContainerComponent } from './components/container/container.component';
import { DetailComponent } from './components/detail/detail.component';
import { NzProgressModule } from 'ng-zorro-antd/progress';
import { ReuseableModule } from '../reuseable/reuseable.module';
import { FinishComponent } from './components/finish/finish.component';
@NgModule({
  imports: [
    LearnRoutes,
    SharedModule,
    NzDropDownModule,
    NzProgressModule,
    ReuseableModule,
  ],
  declarations: [
    LearnComponent,
    GuidComponent,
    ContainerComponent,
    DetailComponent,
    FinishComponent,
  ],
})
export class LearnModule {}
