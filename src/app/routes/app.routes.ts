'use strict';

import { provideRouter, RouterConfig }  from '@angular/router';
import { HeroesComponent } from '../components/heroes/heroes.component';
import { HeroDetailComponent } from '../components/hero-detail/hero-detail.component';
import { DashboardComponent } from '../components/dashboard/dashboard.component';

const routes: RouterConfig = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'detail/:id',
    component: HeroDetailComponent
  },
  {
    path: 'heroes',
    component: HeroesComponent
  }
];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes)
];
