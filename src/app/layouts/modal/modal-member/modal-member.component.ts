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
  selector: 'app-modal-member',
  templateUrl: './modal-member.component.html',
  styleUrls: ['./modal-member.component.scss'],
})
export class ModalMemberComponent {
  formAddMember!: FormGroup;
  formEditMember!: FormGroup;
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
    this.getGroups();
    if ('dataReceived' in changes && this.dataReceived) {
      if (this.dataReceived.category === 'ADD_MEMBER') {
        this.createFormAdd();
      }
      if (this.dataReceived.category === 'EDIT_MEMBER') {
        this.createFormEdit();
      }
    }
  }
  executeTestingFunction() {
    const functionToExecute: keyof ModalMemberComponent | undefined =
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
  getGroups() {
    this.apiService.getAllGroup().subscribe((res: any) => {
      this.groups = res.data;
    });
  }

  // ADD ABSENSI
  createFormAdd() {
    this.formAddMember = this.fb.group({
      noID: ['', Validators.required],
      member_name: ['', Validators.required],
      group_id: ['', Validators.required],
    });
  }
  submitAdd() {
    console.log(this.formAddMember.value);
    this.apiService
      .addMember(this.formAddMember.value)
      .subscribe((res: any) => {
        console.log('Add Successfully');
        this.closeModal();
      });
  }
  // EDIT USERS
  createFormEdit() {
    const data = this.dataReceived.data;
    console.log(data);
    this.formEditMember = this.fb.group({
      noID: [data.noID],
      member_name: [data.member_name],
      group_id: [data.group_id],
    });
  }
  submitEdit() {
    const data = this.dataReceived.data;
    const id = data.member_id;
    this.apiService
      .updateMember(id, this.formEditMember.value)
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
      .updateMember(data.member_id, newData)
      .subscribe((res: any) => {
        console.log('Delete Successfully');
        this.closeModal();
      });
  }
}
