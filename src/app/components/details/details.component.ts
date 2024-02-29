import { Component, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { details } from '../../../core/interface/details.interface';
import { DetailsService } from '../../../services/details.service';
import {
  HttpErrorResponse,
  HttpResponse,
  HttpClientModule,
} from '@angular/common/http';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [ButtonModule, CardModule, HttpClientModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss',
  encapsulation: ViewEncapsulation.None,
  providers: [DetailsService],
})
export class DetailsComponent {
  productId: string | null = null;
  constructor(
    private route: ActivatedRoute,
    private detailsService: DetailsService
  ) {}
  detailsSubscription!: Subscription;
  details: details[] = [];
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.productId = params['id'];
      this.getDetails(this.productId);
    });
  }
  getDetails(productId: string | null) {
    if (!productId) {
      console.error('Product ID is missing');
      return;
    }
    this.detailsSubscription = this.detailsService
      .getDetails(productId)
      .subscribe({
        next: (res) => {
          if (res.status === 202) {
            console.log('get Data Success');
          }
          console.log(res);
          this.details?.push(res);
        },
        error: (err: HttpErrorResponse) => {
          if (err.status === 404) {
            console.log(err.statusText);
          }
        },
      });
  }

  ngOnDestroy(): void {
    if (this.detailsSubscription && this.detailsSubscription.closed) {
      this.detailsSubscription.unsubscribe();
    }
  }
}
