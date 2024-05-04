import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-modal-customer',
  templateUrl: './modal-customer.component.html',
  styleUrls: ['./modal-customer.component.scss'],
})
export class ModalCustomerComponent {
  formAddCustomer!: FormGroup;
  formEditCustomer!: FormGroup;
  groups!: any;

  @Input() dataReceived: any;
  @Output() closeModalEvent: EventEmitter<any> = new EventEmitter<any>();
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private apiService: ApiService,
    private route: Router
  ) {}
  ngOnChanges(changes: SimpleChanges): void {
    if ('dataReceived' in changes && this.dataReceived) {
      if (this.dataReceived.category === 'ADD_CUSTOMER') {
        this.createFormAdd();
      }
      if (this.dataReceived.category === 'EDIT_CUSTOMER') {
        this.createFormEdit();
      }
    }
  }
  executeTestingFunction() {
    const functionToExecute: keyof ModalCustomerComponent | undefined =
      this.dataReceived?.funct;
    if (
      typeof functionToExecute === 'string' &&
      typeof this[functionToExecute] === 'function'
    ) {
      // Panggil fungsi jika ditemukan
      this[functionToExecute]();
    } else {
      // Penanganan jika nama fungsi tidak valid atau tidak ditemukan
      console.log('Function does not exist or is not a function');
    }
  }
  closeModal() {
    this.closeModalEvent.emit();
  }

  // ADD ABSENSI
  createFormAdd() {
    this.formAddCustomer = this.fb.group({
      customer_name: ['', Validators.required],
      noIdCustomer: ['', Validators.required],
    });
  }
  submitAdd() {
    console.log(this.formAddCustomer.value);
    this.apiService
      .addCustomer(this.formAddCustomer.value)
      .subscribe((res: any) => {
        console.log('Add Successfully');
        this.closeModal();
      });
  }
  // EDIT USERS
  createFormEdit() {
    const data = this.dataReceived.data;
    this.formEditCustomer = this.fb.group({
      customer_name: [data.customer_name],
      noIdCustomer: [data.noIdCustomer],
    });
  }
  submitEdit() {
    const data = this.dataReceived.data;
    const id = data.customer_id;

    this.apiService
      .updateCustomer(id, this.formEditCustomer.value)
      .subscribe((res: any) => {
        console.log('Update Successfully');
        this.closeModal();
      });
  }
  // REMOVE
  removeMember() {
    const data = this.dataReceived.data;
    const newData = {
      is_deleted: 1,
    };
    this.apiService
      .updateCustomer(data.customer_id, newData)
      .subscribe((res: any) => {
        console.log('Delete Successfully');
        this.closeModal();
      });
  }
}
