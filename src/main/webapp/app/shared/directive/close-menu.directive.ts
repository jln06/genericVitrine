import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[jhiCloseMenu]',
})
export class closeMenuDirective {
  @Input()
  htmlElement: HTMLElement[];

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('click', ['$event'])
  public onClickLink(evt: Event): void {
    if (window.innerWidth <= 768) {
      this.htmlElement.forEach(f => this.renderer.removeClass(f, 'opened'));
    }
  }
}
