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
  selector: 'app-modal-group',
  templateUrl: './modal-group.component.html',
  styleUrls: ['./modal-group.component.scss'],
})
export class ModalGroupComponent {
  formAddGroup!: FormGroup;
  formEditGroup!: FormGroup;
  rolesData!: any;

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
      if (this.dataReceived.category === 'ADD_GROUP') {
        this.createFormAdd();
      }
      if (this.dataReceived.category === 'EDIT_GROUP') {
        this.createFormEdit();
      }
    }
  }
  executeTestingFunction() {
    const functionToExecute: keyof ModalGroupComponent | undefined =
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

  // ADD ABSENSI
  createFormAdd() {
    this.formAddGroup = this.fb.group({
      group_name: ['', Validators.required],
    });
  }
  submitAdd() {
    // console.log(this.formAddUser.value);
    this.apiService.addGroup(this.formAddGroup.value).subscribe((res: any) => {
      console.log('Add Successfully');
      this.closeModal();
    });
  }
  // EDIT USERS
  createFormEdit() {
    const data = this.dataReceived.data;
    this.formEditGroup = this.fb.group({
      group_name: [data.group_name],
    });
  }
  submitEdit() {
    const data = this.dataReceived.data;
    const id = data.group_id;
    this.apiService
      .updateGroup(id, this.formEditGroup.value)
      .subscribe((res: any) => {
        console.log('Update Successfully');
        this.closeModal();
      });
  }
  // REMOVE
  removeGroup() {
    const data = this.dataReceived.data;
    const newData = {
      is_deleted: 1,
    };
    this.apiService
      .updateGroup(data.group_id, newData)
      .subscribe((res: any) => {
        console.log('Delete Successfully');
        this.closeModal();
      });
  }
}
