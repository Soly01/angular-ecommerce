import { Component } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
  providers: [provideAnimations()],
})
export class FooterComponent {
  rotateState = 'initial';
}
