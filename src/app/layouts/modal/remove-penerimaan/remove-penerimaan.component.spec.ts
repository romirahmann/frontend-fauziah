import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemovePenerimaanComponent } from './remove-penerimaan.component';

describe('RemovePenerimaanComponent', () => {
  let component: RemovePenerimaanComponent;
  let fixture: ComponentFixture<RemovePenerimaanComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RemovePenerimaanComponent]
    });
    fixture = TestBed.createComponent(RemovePenerimaanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
