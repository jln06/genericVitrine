import { Directive, EventEmitter, HostBinding, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[jhiDrag]',
})
export class DragDirective {
  @Output() files: EventEmitter<File> = new EventEmitter<File>();

  @HostBinding('style.background')
  private background = '#eee';

  constructor() {}

  @HostListener('dragover', ['$event'])
  public onDragOver(evt: DragEvent): void {
    evt.preventDefault();
    evt.stopPropagation();
    this.background = '#999';
  }

  @HostListener('dragleave', ['$event'])
  public onDragLeave(evt: DragEvent): void {
    evt.preventDefault();
    evt.stopPropagation();
    this.background = '#eee';
  }

  @HostListener('drop', ['$event'])
  public onDrop(evt: DragEvent): void {
    evt.preventDefault();
    evt.stopPropagation();
    this.background = '#eee';
    if (evt.dataTransfer) {
      console.log('data transfer is not null');
      Array.from(evt.dataTransfer.files)
        .filter(f => Array.of('image/jpeg', 'image/png', 'image/gif').includes(f.type))
        .forEach(f => this.files.emit(f));
    }
  }
}
