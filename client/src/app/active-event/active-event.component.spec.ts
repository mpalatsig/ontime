import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveEventComponent } from './active-event.component';

describe('ActiveEventComponent', () => {
  let component: ActiveEventComponent;
  let fixture: ComponentFixture<ActiveEventComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActiveEventComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActiveEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
