import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogFollowersComponent } from './dialog-followers.component';

describe('DialogFollowersComponent', () => {
  let component: DialogFollowersComponent;
  let fixture: ComponentFixture<DialogFollowersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogFollowersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogFollowersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
