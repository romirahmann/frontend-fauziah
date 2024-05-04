import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalMemberComponent } from './modal-member.component';

describe('ModalMemberComponent', () => {
  let component: ModalMemberComponent;
  let fixture: ComponentFixture<ModalMemberComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalMemberComponent]
    });
    fixture = TestBed.createComponent(ModalMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
