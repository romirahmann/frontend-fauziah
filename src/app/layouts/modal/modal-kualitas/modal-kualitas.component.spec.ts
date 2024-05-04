import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalKualitasComponent } from './modal-kualitas.component';

describe('ModalKualitasComponent', () => {
  let component: ModalKualitasComponent;
  let fixture: ComponentFixture<ModalKualitasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalKualitasComponent]
    });
    fixture = TestBed.createComponent(ModalKualitasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
