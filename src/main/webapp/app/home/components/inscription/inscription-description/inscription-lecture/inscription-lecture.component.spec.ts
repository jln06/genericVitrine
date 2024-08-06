import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InscriptionLectureComponent } from './inscription-lecture.component';

describe('InscriptionLectureComponent', () => {
  let component: InscriptionLectureComponent;
  let fixture: ComponentFixture<InscriptionLectureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InscriptionLectureComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(InscriptionLectureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
