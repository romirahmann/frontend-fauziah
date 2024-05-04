import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalMilkComponent } from './modal-milk.component';

describe('ModalMilkComponent', () => {
  let component: ModalMilkComponent;
  let fixture: ComponentFixture<ModalMilkComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalMilkComponent]
    });
    fixture = TestBed.createComponent(ModalMilkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
