import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateGoodiesDialogComponent } from './create-goodies-dialog.component';

describe('CreateGoodiesDialogComponent', () => {
  let component: CreateGoodiesDialogComponent;
  let fixture: ComponentFixture<CreateGoodiesDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateGoodiesDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateGoodiesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
