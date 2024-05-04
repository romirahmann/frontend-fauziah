import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPengeluaranComponent } from './add-pengeluaran.component';

describe('AddPengeluaranComponent', () => {
  let component: AddPengeluaranComponent;
  let fixture: ComponentFixture<AddPengeluaranComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddPengeluaranComponent]
    });
    fixture = TestBed.createComponent(AddPengeluaranComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
