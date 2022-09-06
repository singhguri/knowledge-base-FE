import { LoadingProgressBar } from './../../services/types.d';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-api-spinner',
  templateUrl: './api-spinner.component.html',
  styleUrls: ['./api-spinner.component.css'],
})
export class ApiSpinnerComponent implements OnInit {
  isLoader: boolean = false;
  progressLoader: LoadingProgressBar = null;

  loaderSubscription: Subscription;
  loaderProgressbarSubscription: Subscription;

  constructor(private loaderService: LoaderService) {
    this.loaderSubscription = this.loaderService.isLoading.subscribe(
      (response: any) => {
        this.isLoader = response;
      }
    );
    this.loaderProgressbarSubscription =
      this.loaderService.isLoadingProgressbar.subscribe((response: any) => {
        this.progressLoader = response;
      });
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.loaderSubscription.unsubscribe();
    this.loaderProgressbarSubscription.unsubscribe();
  }
}
