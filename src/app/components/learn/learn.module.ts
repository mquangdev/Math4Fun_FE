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
import { TypeChooseAnswerComponent } from './components/types/type-choose-answer/type-choose-answer.component';
import { TypeChoosePairComponent } from './components/types/type-choose-pair/type-choose-pair.component';
import { TypeChooseToBlankComponent } from './components/types/type-choose-to-blank/type-choose-to-blank.component';
import { TypeTypeToBlankComponent } from './components/types/type-type-to-blank/type-type-to-blank.component';
import { NzInputModule } from 'ng-zorro-antd/input';
@NgModule({
  imports: [
    LearnRoutes,
    SharedModule,
    NzDropDownModule,
    NzProgressModule,
    ReuseableModule,
    NzInputModule,
  ],
  declarations: [
    LearnComponent,
    GuidComponent,
    ContainerComponent,
    DetailComponent,
    FinishComponent,
    TypeChooseAnswerComponent,
    TypeChoosePairComponent,
    TypeChooseToBlankComponent,
    TypeTypeToBlankComponent,
  ],
  exports: [TypeChooseAnswerComponent],
})
export class LearnModule {}
