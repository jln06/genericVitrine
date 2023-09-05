import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InscriptionDescriptionComponent } from './inscription-description.component';

describe('InscriptionDescriptionComponent', () => {
  let component: InscriptionDescriptionComponent;
  let fixture: ComponentFixture<InscriptionDescriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InscriptionDescriptionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(InscriptionDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
