import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShipOrderComponent } from './ship_order.component';

describe('ShipOrderComponent', () => {
  let component: ShipOrderComponent;
  let fixture: ComponentFixture<ShipOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShipOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShipOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
