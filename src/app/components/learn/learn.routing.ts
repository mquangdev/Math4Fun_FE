import { Routes, RouterModule } from '@angular/router';
import { LearnComponent } from './learn.component';

const routes: Routes = [
  {
    path: '',
    component: LearnComponent,
  },
];

export const LearnRoutes = RouterModule.forChild(routes);
