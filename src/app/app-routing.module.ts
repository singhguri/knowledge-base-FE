import { AuthguardserviceService } from './services/authguardservice.service';
import { FullComponent } from './layouts/full/full.component';
import { MasterComponent } from './layout/master/master.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BlankComponent } from './layouts/blank/blank.component';

export const routes: Routes = [
  {
    path: '',
    component: MasterComponent,
    children: [
      {
        path: 'support',
        loadChildren: () =>
          import('./components/support/support.module').then(
            (m) => m.SupportModule
          ),
      },
    ],
  },
  {
    path: '',
    component: BlankComponent,
    children: [
      {
        path: 'authentication',
        loadChildren: () =>
          import('./authentication/authentication.module').then(
            (m) => m.AuthenticationModule
          ),
      },
    ],
  },

  {
    path: '',
    component: FullComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./authentication/dashboards/dashboard.module').then(
            (m) => m.DashboardModule
          ),
        canLoad: [AuthguardserviceService],
      },
      {
        path: 'users',
        loadChildren: () =>
          import('./components/users/users.module').then((m) => m.UsersModule),
        canLoad: [AuthguardserviceService],
      },
      {
        path: 'articles',
        loadChildren: () =>
          import('./components/articles/articles.module').then(
            (m) => m.ArticlesModule
          ),
        canLoad: [AuthguardserviceService],
      },
      // {
      //   path: 'profile',
      //   loadChildren: () =>
      //     import('./profile/ngx-wizard/ngx-wizard.module').then(
      //       (m) => m.NGXFormWizardModule
      //     ),
      //   canLoad: [AuthguardserviceService],
      // },

      // {
      //   path: 'extra-component',
      //   loadChildren: () =>
      //     import('./extra-component/extra-component.module').then(
      //       (m) => m.ExtraComponentModule
      //     ),
      // },

      // {
      //   path: 'order',
      //   loadChildren: () =>
      //     import('././orders/orders.module').then((m) => m.OrdersModule),
      //   canLoad: [AuthguardserviceService],
      // },
      // {
      //   path: 'payment',
      //   loadChildren: () =>
      //     import('././payments/payments.module').then((m) => m.PaymentsModule),
      //   canLoad: [AuthguardserviceService],
      // },
      {
        path: 'settings',
        loadChildren: () =>
          import('./components/settings/settings.module').then(
            (m) => m.SettingsModule
          ),
        canLoad: [AuthguardserviceService],
      },
      // {
      //   path: 'channels',
      //   loadChildren: () =>
      //     import('./channels/channels.module').then((m) => m.ChannelsModule),
      // },
      // {
      //   path: 'ndr',
      //   loadChildren: () => import('./ndr/ndr.module').then((m) => m.NdrModule),
      //   canLoad: [AuthguardserviceService],
      // },
      // {
      //   path: 'reports',
      //   loadChildren: () =>
      //     import('./reports/reports.module').then((m) => m.ReportsModule),
      //   canLoad: [AuthguardserviceService],
      // },
      // {
      //   path: 'rate-calculator',
      //   loadChildren: () =>
      //     import('./rate-calculator/rate-calculator.module').then(
      //       (m) => m.RateCalculatorModule
      //     ),
      //   canLoad: [AuthguardserviceService],
      // },
      // {
      //   path: 'complaints',
      //   loadChildren: () =>
      //     import('./complaints/complaints.module').then(
      //       (m) => m.ComplaintsModule
      //     ),
      //   canLoad: [AuthguardserviceService],
      // },
      // {
      //   path: 'remittance',
      //   loadChildren: () =>
      //     import('./remittance/remittance.module').then(
      //       (m) => m.RemittanceModule
      //     ),
      //   canLoad: [AuthguardserviceService],
      // },
      // {
      //   path: 'user-remittance',
      //   loadChildren: () =>
      //     import('./user-remittance/user-remittance.module').then(
      //       (m) => m.UserRemittanceModule
      //     ),
      //   canLoad: [AuthguardserviceService],
      // },
    ],
  },
  {
    path: '**',
    redirectTo: '/authentication/404',
  },
  // {
  //   path: '',
  //   data: { title: false, depth: 1 },
  //   component: MasterComponent,
  //   loadChildren: () =>
  //     import('./components/support/support.module').then(
  //       (m) => m.SupportModule
  //     ),
  // },
  // {
  //   path: 'auth',
  //   component: BlankComponent,
  //   data: { title: false, depth: 2 },
  //   loadChildren: () =>
  //     import('./authentication/authentication.module').then(
  //       (m) => m.AuthenticationModule
  //     ),
  // },
  // {
  //   path: '',
  //   component: FullComponent,
  //   children: [
  //     {
  //       path: 'dashboard',
  //       loadChildren: () =>
  //         import('./authentication/dashboards/dashboard.module').then(
  //           (m) => m.DashboardModule
  //         ),
  //       // canLoad: [AuthguardserviceService],
  //     },
  //     {
  //       path: 'users',
  //       loadChildren: () =>
  //         import('./components/users/users.module').then((m) => m.UsersModule),
  //       // canLoad: [AuthguardserviceService],
  //     },
  //     {
  //       path: 'articles',
  //       loadChildren: () =>
  //         import('./components/articles/articles.module').then(
  //           (m) => m.ArticlesModule
  //         ),
  //       // canLoad: [AuthguardserviceService],
  //     },
  //     {
  //       path: 'settings',
  //       loadChildren: () =>
  //         import('./components/settings/settings.module').then(
  //           (m) => m.SettingsModule
  //         ),
  //       // canLoad: [AuthguardserviceService],
  //     },
  //   ],
  // },
  // {
  //   path: '**',
  //   redirectTo: '/auth/404',
  // },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
