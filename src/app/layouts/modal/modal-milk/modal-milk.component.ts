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
  selector: 'app-modal-milk',
  templateUrl: './modal-milk.component.html',
  styleUrls: ['./modal-milk.component.scss'],
})
export class ModalMilkComponent {
  formAddMilk!: FormGroup;
  formEditMilk!: FormGroup;
  groups!: any;

  @Input() dataReceived: any;
  @Output() closeModalEvent: EventEmitter<any> = new EventEmitter<any>();
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private apiService: ApiService,
    private route: Router
  ) {}
  ngOnChanges(changes: SimpleChanges): void {}
  executeTestingFunction() {
    const functionToExecute: keyof ModalMilkComponent | undefined =
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

  // REMOVE
  removeMilk() {
    const data = this.dataReceived.data;
    const newData = {
      is_deleted: 1,
    };
    this.apiService.updateilk(data.milk_id, newData).subscribe((res: any) => {
      console.log('Delete Successfully');
      this.closeModal();
    });
  }
}
