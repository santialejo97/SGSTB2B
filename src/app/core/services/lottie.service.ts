import { Injectable } from '@angular/core';
import lottie, { AnimationItem } from 'lottie-web';

@Injectable({
  providedIn: 'root',
})
export class LottieService {
  loadAnimation(container: HTMLElement, path: string): AnimationItem {
    return lottie.loadAnimation({
      container: container,
      loop: true,
      renderer: 'svg',
      autoplay: true,
      path: path,
    });
  }
}
