import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticlesComponent } from './articles.component';
import { ListArticlesComponent } from './list-articles/list-articles.component';
import { AddArticleComponent } from './add-article/add-article.component';

const articleRoutes: Routes = [
  {
    path: '',
    component: ArticlesComponent,
    data: {
      title: 'Articles Manager',
      urls: [{ title: 'Dashboard', url: '/dashboard' }, { title: 'Articles' }],
    },
    children: [
      {
        path: 'list-articles',
        component: ListArticlesComponent,
        data: {
          title: 'Articles Manager',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'Articles', url: '/articles/list-articles' },
            { title: 'List-Articles' },
          ],
        },
      },
      {
        path: 'add-article',
        component: AddArticleComponent,
        data: {
          title: 'Articles Manager',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'Articles', url: '/articles/list-articles' },
            { title: 'Add-Article' },
          ],
        },
      },
    ],
  },
];

@NgModule({
  declarations: [ArticlesComponent, ListArticlesComponent, AddArticleComponent],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild(articleRoutes),
  ],
})
export class ArticlesModule {}
