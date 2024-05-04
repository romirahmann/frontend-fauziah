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
  selector: 'app-remove-penerimaan',
  templateUrl: './remove-penerimaan.component.html',
  styleUrls: ['./remove-penerimaan.component.scss'],
})
export class RemovePenerimaanComponent {
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
    const functionToExecute: keyof RemovePenerimaanComponent | undefined =
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
  removePenerimaan() {
    this.apiService.getStok().subscribe((res: any) => {
      let response = res.data[0];
      const data = this.dataReceived.data;
      console.log(data);
      let newStok = {
        stok_vol: response.stok_vol - data.vol,
      };
      this.apiService.updateStok(1, newStok).subscribe((res: any) => {
        this.apiService
          .deleteTransaction(data.transaction_id)
          .subscribe((res: any) => {
            console.log('Delete Successfully');
            this.closeModal();
          });
      });
    });
  }
}
