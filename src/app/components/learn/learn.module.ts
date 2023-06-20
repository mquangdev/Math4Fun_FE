import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { LearnComponent } from './learn.component';
import { LearnRoutes } from './learn.routing';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { GuidComponent } from './components/guid/guid.component';
import { ContainerComponent } from './components/container/container.component';

@NgModule({
  imports: [LearnRoutes, SharedModule, NzDropDownModule],
  declarations: [LearnComponent, GuidComponent, ContainerComponent],
})
export class LearnModule {}
