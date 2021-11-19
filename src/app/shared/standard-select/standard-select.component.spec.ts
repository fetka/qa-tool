import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { StandardSelectComponent } from './standard-select.component';

describe('StandardSelectComponent', () => {
  let component: StandardSelectComponent;
  let fixture: ComponentFixture<StandardSelectComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StandardSelectComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StandardSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  describe('selectChange fn', () => {
    it('should emit change event', () => {
      const spyEmitter = spyOn(component.resultChanged, 'emit');
      const mockValue = '2';
      const event: any = { target: { value: mockValue } };
      component.selectChanged(event);
      expect(spyEmitter).toHaveBeenCalledOnceWith(mockValue);
    });
    it('option value change should call selectChanged fn', () => {
      const spySelectChanged = spyOn(component, 'selectChanged');

      const select: HTMLSelectElement = fixture.debugElement.query(
        By.css('select')
      ).nativeElement;
      select.value = select.options[2].value; // <-- select a new value
      const event = new Event('change');
      select.dispatchEvent(event);
      fixture.detectChanges();
      expect(spySelectChanged).toHaveBeenCalled();
    });
    it('change event should call stopPropagation fn', () => {
      const select: HTMLSelectElement = fixture.debugElement.query(
        By.css('select')
      ).nativeElement;
      select.value = select.options[2].value; // <-- select a new value
      const event = new Event('change');
      const spyStopPropagation = spyOn(event, 'stopPropagation');
      select.dispatchEvent(event);
      fixture.detectChanges();
      expect(spyStopPropagation).toHaveBeenCalled();
    });
  });
});
