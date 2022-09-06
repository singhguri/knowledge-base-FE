import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { SettingsComponent } from './settings.component';

const settingRoutes: Routes = [
  {
    path: '',
    component: SettingsComponent,
    data: {
      title: 'Settings',
      urls: [{ title: 'Dashboard', url: '/dashboard' }, { title: 'Settings' }],
    },
    children: [
      {
        path: 'change-password',
        component: ChangePasswordComponent,
        data: {
          title: 'Change Password',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'Settings', url: '/settings/change-password' },
            { title: 'Change Password' },
          ],
        },
      },
      // {
      //   path: 'add-user',
      //   component: AddUserComponent,
      //   data: {
      //     title: 'Users Manager',
      //     urls: [
      //       { title: 'Dashboard', url: '/dashboard' },
      //       { title: 'Users', url: '/users/list-users' },
      //       { title: 'Add-User' },
      //     ],
      //   },
      // },
    ],
  },
];

@NgModule({
  declarations: [SettingsComponent, ChangePasswordComponent],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
    RouterModule.forChild(settingRoutes),
  ],
})
export class SettingsModule {}
