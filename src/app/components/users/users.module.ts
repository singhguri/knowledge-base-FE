import { AuthguardserviceService } from './../../services/authguardservice.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users.component';
import { AddUserComponent } from './add-user/add-user.component';
import { ListUsersComponent } from './list-users/list-users.component';

const userRoutes: Routes = [
  {
    path: '',
    component: UsersComponent,
    data: {
      title: 'Users Manager',
      urls: [{ title: 'Dashboard', url: '/dashboard' }, { title: 'Users' }],
    },
    children: [
      {
        path: 'list-users',
        component: ListUsersComponent,
        data: {
          title: 'Users Manager',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'Users', url: '/users/list-users' },
            { title: 'List-Users' },
          ],
        },
      },
      {
        path: 'add-user',
        component: AddUserComponent,
        data: {
          title: 'Users Manager',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'Users', url: '/users/list-users' },
            { title: 'Add-User' },
          ],
        },
      },
    ],
  },
];

@NgModule({
  declarations: [UsersComponent, AddUserComponent, ListUsersComponent],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
    NgbModule,
    RouterModule.forChild(userRoutes),
  ],
})
export class UsersModule {}
