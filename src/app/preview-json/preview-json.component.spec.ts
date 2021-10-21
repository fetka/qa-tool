import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewJsonComponent } from './preview-json.component';

describe('PreviewJsonComponent', () => {
  let component: PreviewJsonComponent;
  let fixture: ComponentFixture<PreviewJsonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreviewJsonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviewJsonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
