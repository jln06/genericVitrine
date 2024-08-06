import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DescriptionEcritureComponent } from './description-ecriture.component';

describe('DescriptionEcritureComponent', () => {
  let component: DescriptionEcritureComponent;
  let fixture: ComponentFixture<DescriptionEcritureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DescriptionEcritureComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DescriptionEcritureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
