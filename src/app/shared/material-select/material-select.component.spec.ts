import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialSelectComponent } from './material-select.component';

describe('MaterialSelectComponent', () => {
  let component: MaterialSelectComponent;
  let fixture: ComponentFixture<MaterialSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaterialSelectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterialSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
