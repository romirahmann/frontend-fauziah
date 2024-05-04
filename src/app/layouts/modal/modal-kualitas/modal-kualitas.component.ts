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
  selector: 'app-modal-kualitas',
  templateUrl: './modal-kualitas.component.html',
  styleUrls: ['./modal-kualitas.component.scss'],
})
export class ModalKualitasComponent {
  dataKualitas!: any;
  @Input() dataReceived: any;
  @Output() closeModalEvent: EventEmitter<any> = new EventEmitter<any>();
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private apiService: ApiService,
    private route: Router
  ) {}
  ngOnChanges(changes: SimpleChanges): void {
    // console.log(this.dataReceived);
    let data = this.dataReceived.data;
    console.log(data);
    if (data.category_id === 1) {
      this.getKualitasByMilkId();
    }
    if (data.category_id == 2) {
      this.getKualitasByTransactionId();
    }
  }
  closeModal() {
    this.closeModalEvent.emit();
  }
  getKualitasByMilkId() {
    let data = this.dataReceived.data;
    // console.log(data);
    this.apiService.getQuantityByMilkId(data.milk_id).subscribe((res: any) => {
      // console.log(res.data[0]);
      this.dataKualitas = res.data[0];
    });
  }
  getKualitasByTransactionId() {
    let data = this.dataReceived.data;
    this.apiService
      .getQuantityByTransactionId(data.transaction_id)
      .subscribe((res: any) => {
        // console.log(res.data[0]);
        this.dataKualitas = res.data[0];
      });
  }
}
