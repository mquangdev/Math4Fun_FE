import { Routes, RouterModule } from '@angular/router';
import { LearnComponent } from './learn.component';
import { GuidComponent } from './components/guid/guid.component';
import { ContainerComponent } from './components/container/container.component';
import { DetailComponent } from './components/detail/detail.component';
import { FinishComponent } from './components/finish/finish.component';

const routes: Routes = [
  {
    path: '',
    component: LearnComponent,
    children: [
      {
        path: '',
        component: ContainerComponent,
      },
      {
        path: 'lesson/:id',
        component: DetailComponent,
      },
      {
        path: 'guid',
        component: GuidComponent,
      },
    ],
  },
];

export const LearnRoutes = RouterModule.forChild(routes);
