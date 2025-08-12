import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  OnDestroy,
  OnInit,
  viewChild,
} from '@angular/core';
import { LottieService } from '../../../core/services/lottie.service';
import { AnimationItem } from 'lottie-web';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-not-found',
  imports: [RouterLink],
  templateUrl: './not-found.html',
  styleUrl: './not-found.css',
})
export class NotFound implements AfterViewInit, OnDestroy {
  containerLottie = viewChild.required<ElementRef>('lottieContainer');
  lottieService = inject(LottieService);
  path: string = 'assets/lottie/404.json';

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
