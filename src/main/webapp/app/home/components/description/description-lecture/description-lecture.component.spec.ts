import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DescriptionLectureComponent } from './description-lecture.component';

describe('DescriptionLectureComponent', () => {
  let component: DescriptionLectureComponent;
  let fixture: ComponentFixture<DescriptionLectureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DescriptionLectureComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DescriptionLectureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
