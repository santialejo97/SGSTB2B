import { Component, ElementRef, inject, viewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AnimationItem } from 'lottie-web';
import { LottieService } from '../../../core/services/lottie.service';

@Component({
  selector: 'app-auth-layout',
  imports: [RouterOutlet],
  templateUrl: './auth-layout.html',
  styleUrl: './auth-layout.css',
})
export class AuthLayout {
  containerLottie = viewChild.required<ElementRef>('lottieContainer');
  lottieService = inject(LottieService);
  path: string = 'assets/lottie/auth.json';

  private animation?: AnimationItem;

  ngAfterViewInit(): void {
    this.loadAnimation();
  }

  ngOnDestroy(): void {
    this.animation?.destroy();
  }

  private async loadAnimation() {
    const container = this.containerLottie().nativeElement;

    if (!container) {
      console.error('Container not found');
      return;
    }

    console.log('Loading animation from:', this.path);
    this.lottieService.loadAnimation(container, this.path);
  }
}
