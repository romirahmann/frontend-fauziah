import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPenerimaanComponent } from './add-penerimaan.component';

describe('AddPenerimaanComponent', () => {
  let component: AddPenerimaanComponent;
  let fixture: ComponentFixture<AddPenerimaanComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddPenerimaanComponent]
    });
    fixture = TestBed.createComponent(AddPenerimaanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
