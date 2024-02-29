import { jeweleries } from './../../../core/interface/jeweleries.interface';
import { Component, ViewEncapsulation } from '@angular/core';
import { PhotoService } from '../../../services/photo.service';
import { Subscription } from 'rxjs';
import { image } from '../../../core/interface/photo.interface';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { GalleriaModule } from 'primeng/galleria';
import { HttpClientModule } from '@angular/common/http';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [GalleriaModule, HttpClientModule, CardModule, ButtonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  providers: [PhotoService],
  encapsulation: ViewEncapsulation.None,
})
export class HomeComponent {
  imageSubscription!: Subscription;
  images: image[] | any = [];
  responsiveOptions: any[] = [
    {
      breakpoint: '1024px',
      numVisible: 5,
    },
    {
      breakpoint: '768px',
      numVisible: 3,
    },
    {
      breakpoint: '560px',
      numVisible: 1,
    },
  ];
  constructor(private photoService: PhotoService, private router: Router) {}
  ngOnInit(): void {
    this.getPhoto();
  }
  getPhoto(): void {
    this.imageSubscription = this.photoService.getPhoto().subscribe({
      next: (res: HttpResponse<image[]>) => {
        if (res.status == 200) {
          console.log('get Data Success');
        }
        console.log(res);
        this.images = res.body;
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
        if (err.status == 404) {
          console.log(err.statusText);
        }
      },
    });
  }
  ngOnDestroy(): void {
    if (this.imageSubscription && this.imageSubscription.closed) {
      this.imageSubscription.unsubscribe();
    }
  }
  electronics() {
    this.router.navigate(['/electronics']);
  }
  jeweleries() {
    this.router.navigate(['/jeweleries']);
  }
  men() {
    this.router.navigate(['/men']);
  }
  women() {
    this.router.navigate(['/women']);
  }
}
