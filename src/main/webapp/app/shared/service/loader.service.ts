import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  private loadingSubject = new BehaviorSubject<boolean>(false);
  readonly loading$ = this.loadingSubject.asObservable();

  constructor() {}

  setLoading(value: boolean) {
    this.loadingSubject.next(value);
  }

  getLoading() {
    return this.loadingSubject.value;
  }

  show() {
    this.setLoading(true);
  }

  hide() {
    this.setLoading(false);
  }
}
