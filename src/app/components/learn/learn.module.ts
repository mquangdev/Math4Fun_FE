import { NgModule } from '@angular/core';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzProgressModule } from 'ng-zorro-antd/progress';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReuseableModule } from '../reuseable/reuseable.module';
import { ContainerComponent } from './components/container/container.component';
import { ContinueStreakComponent } from './components/continue-streak/continue-streak.component';
import { DetailComponent } from './components/detail/detail.component';
import { FinishComponent } from './components/finish/finish.component';
import { GuidComponent } from './components/guid/guid.component';
import { TypeChooseAnswerComponent } from './components/types/type-choose-answer/type-choose-answer.component';
import { TypeChoosePairComponent } from './components/types/type-choose-pair/type-choose-pair.component';
import { TypeChooseToBlankComponent } from './components/types/type-choose-to-blank/type-choose-to-blank.component';
import { TypeTypeToBlankComponent } from './components/types/type-type-to-blank/type-type-to-blank.component';
import { LearnComponent } from './learn.component';
import { LearnRoutes } from './learn.routing';
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
    ContinueStreakComponent,
  ],
  exports: [TypeChooseAnswerComponent],
})
export class LearnModule {}
