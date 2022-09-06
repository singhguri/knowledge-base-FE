import { Injectable } from '@angular/core';

@Injectable()
export class GlobalsX {
  UserType: any;
  authTocken: any;
  showSolution: boolean = false;
  showHomeBtn: boolean = false;
  title: string;

  headingId: number = 0;
  kbHeadingId: number = 0;
  articleId: number = 0;
  article: any;
  user: any;

  addUser: boolean = false;
  addArticle: boolean = false;

  statuses = [
    { value: 1, viewValue: 'Active' },
    { value: 0, viewValue: 'In-Active' },
  ];
}

export function workRoleFormatter(params) {
  switch (params.data.value) {
    case 1:
      return 'Admin Role';
    case 2:
      return 'Editor Role';
  }
}

export function userStatusFormatter(params) {
  switch (params.data.value) {
    case 1:
      return 'Active';

    default:
      return 'In-active';
  }
}
