import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GalerieUploadComponent } from './galerie-upload.component';

describe('GalerieUploadComponent', () => {
  let component: GalerieUploadComponent;
  let fixture: ComponentFixture<GalerieUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GalerieUploadComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GalerieUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
