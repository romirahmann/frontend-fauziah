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
  selector: 'app-modal-user',
  templateUrl: './modal-user.component.html',
  styleUrls: ['./modal-user.component.scss'],
})
export class ModalUserComponent {
  formAddUser!: FormGroup;
  formEditUser!: FormGroup;
  rolesData!: any;
  hideToglePassword: boolean = true;

  selectedFile!: File;
  filename!: string;
  @Input() dataReceived: any;
  @Output() closeModalEvent: EventEmitter<any> = new EventEmitter<any>();
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private apiService: ApiService,
    private route: Router
  ) {}
  ngOnChanges(changes: SimpleChanges): void {
    this.getAllRole();
    if ('dataReceived' in changes && this.dataReceived) {
      if (this.dataReceived.category === 'ADD_USER') {
        this.createFormAdd();
      }
      if (this.dataReceived.category === 'EDIT_USER') {
        this.createFormEdit();
      }
    }
  }
  executeTestingFunction() {
    const functionToExecute: keyof ModalUserComponent | undefined =
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
  getAllRole() {
    this.apiService.getAllRole().subscribe((res: any) => {
      this.rolesData = res.data;
    });
  }
  togglePasswordVisibility() {
    const inputanPassword = document.querySelector('#password');
    this.hideToglePassword = !this.hideToglePassword;
    inputanPassword?.setAttribute('type', 'text');
  }
  // ADD ABSENSI
  createFormAdd() {
    this.formAddUser = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      role_id: ['', [Validators.required]],
    });
  }
  submitAdd() {
    // console.log(this.formAddUser.value);
    this.authService
      .registrasi(this.formAddUser.value)
      .subscribe((res: any) => {
        console.log('Add Successfully');
        this.closeModal();
      });
  }
  // EDIT USERS
  createFormEdit() {
    const data = this.dataReceived.users;
    this.formEditUser = this.fb.group({
      username: [data.username],
      role_id: [data.role_id],
    });
  }
  submitEdit() {
    const data = this.dataReceived.users;
    const id = data.user_id;
    this.apiService
      .updateUser(id, this.formEditUser.value)
      .subscribe((res: any) => {
        console.log('Update Successfully');
        this.closeModal();
      });
  }
  // REMOVE
  removeUser() {
    const data = this.dataReceived.users;
    const newData = {
      is_deleted: 1,
    };
    this.apiService.updateUser(data.user_id, newData).subscribe((res: any) => {
      console.log('Delete Successfully');
      this.closeModal();
    });
  }
}
