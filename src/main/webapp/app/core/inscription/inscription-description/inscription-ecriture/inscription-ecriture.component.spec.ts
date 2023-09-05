import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InscriptionEcritureComponent } from './inscription-ecriture.component';

describe('InscriptionEcritureComponent', () => {
  let component: InscriptionEcritureComponent;
  let fixture: ComponentFixture<InscriptionEcritureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InscriptionEcritureComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(InscriptionEcritureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
