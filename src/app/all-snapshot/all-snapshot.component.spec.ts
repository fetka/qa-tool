import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllSnapshotComponent } from './all-snapshot.component';

describe('AllSnapshotComponent', () => {
  let component: AllSnapshotComponent;
  let fixture: ComponentFixture<AllSnapshotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllSnapshotComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllSnapshotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
