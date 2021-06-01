import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { CalenderComponentComponent } from './calender-component.component';

describe('CalenderComponentComponent', () => {
  let component: CalenderComponentComponent;
  let fixture: ComponentFixture<CalenderComponentComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CalenderComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalenderComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
