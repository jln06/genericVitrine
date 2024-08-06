import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GallerieComponent } from './gallerie.component';

describe('GallerieComponent', () => {
  let component: GallerieComponent;
  let fixture: ComponentFixture<GallerieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GallerieComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GallerieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
