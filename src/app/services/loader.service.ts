import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LoadingProgressBar } from './types';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  isLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoadingProgressbar: BehaviorSubject<LoadingProgressBar> =
    new BehaviorSubject({
      loaderState: false,
    });

  avoidLoaderURL: LoadingProgressBar[] = [];

  show() {
    if (!this.isLoading.getValue()) {
      this.isLoading.next(true);
    }
    console.log('this.isLoading.getValue()', this.isLoading.getValue());
  }
  hide() {
    if (this.isLoading.getValue()) {
      this.isLoading.next(false);
    }
  }

  showProgressbar(loaderText: string, toastrMsg?: string) {
    if (!this.isLoadingProgressbar.getValue().loaderState) {
      this.isLoadingProgressbar.next({
        loaderState: true,
        loaderText: loaderText,
        toastrMsg: toastrMsg ?? '',
      });

      // console.log(
      //   "this.isLoadingProgressbar.getValue()",
      //   this.isLoadingProgressbar.getValue()
      // );
    }
  }
  hideProgressbar() {
    if (this.isLoadingProgressbar.getValue().loaderState) {
      this.isLoadingProgressbar.next({
        loaderState: false,
        loaderText: this.isLoadingProgressbar.getValue().loaderText,
      });
      this.avoidLoaderURL = [];
    }
  }

  constructor() {}
}
