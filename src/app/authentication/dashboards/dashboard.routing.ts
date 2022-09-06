import { Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';

export const DashboardRoutes: Routes = [
  {
    path: 'dashboard',
    children: [
      {
        path: '',
        component: DashboardComponent,
        data: {
          title: 'Knowledge Base Dashboard',
        },
      },
    ],
  },
];
