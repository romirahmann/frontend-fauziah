import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemovePengeluaranComponent } from './remove-pengeluaran.component';

describe('RemovePengeluaranComponent', () => {
  let component: RemovePengeluaranComponent;
  let fixture: ComponentFixture<RemovePengeluaranComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RemovePengeluaranComponent]
    });
    fixture = TestBed.createComponent(RemovePengeluaranComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
