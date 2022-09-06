import { SharedModule } from './../../shared/shared.module';
import { SupportComponent } from './support.component';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { KbHeadingComponent } from './kb-heading/kb-heading.component';
import { HeadingComponent } from './heading/heading.component';
import { ArticleComponent } from './article/article.component';

@NgModule({
  declarations: [
    SupportComponent,
    KbHeadingComponent,
    HeadingComponent,
    ArticleComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: '', component: SupportComponent },
      { path: 'kbHeading', component: KbHeadingComponent },
      { path: 'heading', component: HeadingComponent },
      { path: 'article', component: ArticleComponent },
    ]),
  ],
  providers: [],
})
export class SupportModule {}
