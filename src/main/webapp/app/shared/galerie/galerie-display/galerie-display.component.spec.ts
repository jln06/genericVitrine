import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GalerieDisplayComponent } from './galerie-display.component';

describe('GalerieDisplayComponent', () => {
  let component: GalerieDisplayComponent;
  let fixture: ComponentFixture<GalerieDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GalerieDisplayComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GalerieDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
