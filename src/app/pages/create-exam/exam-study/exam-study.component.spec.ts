import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamStudyComponent } from './exam-study.component';

describe('ExamStudyComponent', () => {
  let component: ExamStudyComponent;
  let fixture: ComponentFixture<ExamStudyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExamStudyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamStudyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
