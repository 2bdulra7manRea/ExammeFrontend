import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CameraRecordComponent } from './camera-record.component';

describe('CameraRecordComponent', () => {
  let component: CameraRecordComponent;
  let fixture: ComponentFixture<CameraRecordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CameraRecordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CameraRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
