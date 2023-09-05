import { AfterViewInit, Directive, ElementRef, HostListener, Input } from '@angular/core';
import Splide from '@splidejs/splide';

@Directive({
  selector: '[jhiSplide]',
})
export class SplideDirective {
  @Input() splide: Splide;
  @Input() index: number;

  constructor(private el: ElementRef) {}

  @HostListener('click')
  public onClickEvent(): void {
    this.splide.go(this.index);
  }
}
