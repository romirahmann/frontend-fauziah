import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-add-pengeluaran',
  templateUrl: './add-pengeluaran.component.html',
  styleUrls: ['./add-pengeluaran.component.scss'],
})
export class AddPengeluaranComponent {
  formAddTransaction!: FormGroup;
  formAddKualitas!: FormGroup;
  dataCustomer!: any;
  userLogin!: any;
  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private route: Router,
    private authService: AuthService
  ) {}
  ngOnInit() {
    this.getUserLogin();
    this.getDataCustomer();
    this.createFormAddTransaction();
    this.createFormKualitas(null);
  }
  getUserLogin() {
    this.userLogin = this.authService.getUserLogin();
  }
  // ADD TRANSACTION
  createFormAddTransaction() {
    this.formAddTransaction = this.fb.group({
      category_id: [2],
      customer_id: ['', Validators.required],
      date: ['', Validators.required],
      vol: ['', Validators.required],
      user_id: [this.userLogin.user_id],
    });
  }
  submitAddTransaction() {
    let data = this.formAddTransaction.value;
    this.apiService.getStok().subscribe((res: any) => {
      let respons = res.data[0];
      if (respons.stok_vol !== 0 && data.vol < respons.stok_vol) {
        let newStok = {
          stok_vol: respons.stok_vol - data.vol,
        };
        this.apiService.updateStok(1, newStok).subscribe((res: any) => {
          this.apiService.addTransaction(data).subscribe((res: any) => {
            console.log('Add Transaction Successfully');
            this.createFormKualitas(res.data);
            this.toogleKualitas();
          });
        });
      } else {
        alert('Jumlah volume keluar melebihi stok');
        this.route.navigate(['/pengeluaran-susu']);
      }
    });
  }
  getDataCustomer() {
    this.apiService.getAllCustomer().subscribe((res: any) => {
      this.dataCustomer = res.data;
    });
  }
  toogleKualitas() {
    const formKualitas = document.querySelector('#form-add-kualitas');
    formKualitas?.classList.toggle('hidden');
    const formTransaction = document.querySelector('#form-add-transaction');
    formTransaction?.classList.toggle('hidden');
  }
  // CREATE ADD FORM KUALITAS SUSU
  createFormKualitas(data: any) {
    this.formAddKualitas = this.fb.group({
      milk_id: [null],
      transaction_id: [data],
      uji_alkohol: ['', Validators.required],
      uji_bj: ['', Validators.required],
      fat: ['', Validators.required],
      snf: ['', Validators.required],
      density: ['', Validators.required],
      lactosa: ['', Validators.required],
      salts: ['', Validators.required],
      protein: ['', Validators.required],
      ts: ['', Validators.required],
      added_water: ['', Validators.required],
      temp_sample: ['', Validators.required],
      freez_point: ['', Validators.required],
    });
  }

  submitFormKualitas() {
    this.apiService
      .addQuantity(this.formAddKualitas.value)
      .subscribe((res: any) => {
        this.route.navigate(['/pengeluaran-susu']);
      });
  }
}
