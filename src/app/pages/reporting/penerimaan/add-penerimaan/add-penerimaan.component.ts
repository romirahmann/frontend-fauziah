import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-add-penerimaan',
  templateUrl: './add-penerimaan.component.html',
  styleUrls: ['./add-penerimaan.component.scss'],
})
export class AddPenerimaanComponent {
  formAddMilk!: FormGroup;
  formAddTransactionNew!: FormGroup;
  formAddTransaction!: FormGroup;
  formAddKualitas!: FormGroup;

  members!: any;
  jenisPenerimaan: any = 0;
  userLogin!: any;
  newIdMilk!: number;
  dataMilks!: any;
  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private route: Router,
    private authService: AuthService
  ) {}
  ngOnInit() {
    this.getUserLogin();
    this.getAllMember();
    this.createFormAddMilk();
    this.createFormAddTransactionNew(null);
    this.createFormKualitas(null);
    this.createFormAddTransaction();
    this.getDataMilk();
  }

  getUserLogin() {
    this.userLogin = this.authService.getUserLogin();
  }
  btnJenisPenerimaan() {
    if (this.jenisPenerimaan == 1) {
      const formAddNewMilk = document.querySelector('#form-add-milk');
      formAddNewMilk?.classList.toggle('hidden');
      const formSelect = document.querySelector('#selectPenerimaan');
      formSelect?.classList.toggle('hidden');
    }
    if (this.jenisPenerimaan == 2) {
      const addTransaction = document.querySelector('#form-add-transaction');
      addTransaction?.classList.toggle('hidden');
      const formSelect = document.querySelector('#selectPenerimaan');
      formSelect?.classList.toggle('hidden');
    }
  }
  // ADD ABSENSI
  createFormAddMilk() {
    this.formAddMilk = this.fb.group({
      member_id: ['', Validators.required],
      stok: ['', Validators.required],
    });
  }
  submitAddMilk() {
    const formAddNewMilk = document.querySelector('#form-add-milk');
    formAddNewMilk?.classList.toggle('hidden');
    const formKualitas = document.querySelector('#form-add-kualitas');
    formKualitas?.classList.toggle('hidden');

    this.apiService.addMilk(this.formAddMilk.value).subscribe((res: any) => {
      this.newIdMilk = res.data[0];
      this.apiService.getStok().subscribe((res: any) => {
        let response = res.data[0];
        let dataStok = {
          stok_vol: response.stok_vol + this.formAddMilk.value.stok,
        };
        console.log('respon getstok', res.data[0]);
        console.log('datastok', dataStok);
        this.apiService.updateStok(1, dataStok).subscribe((res: any) => {
          this.createFormKualitas(this.newIdMilk);
        });
      });
    });
  }
  // ADD TRANSACTION NEW
  createFormAddTransactionNew(data: any) {
    const inputSusu = this.formAddMilk.value;
    this.formAddTransactionNew = this.fb.group({
      category_id: [1],
      milk_id: [data],
      date: ['', Validators.required],
      vol: [inputSusu.stok],
      user_id: [this.userLogin.user_id],
    });
  }
  // ADD TRANSACTION
  createFormAddTransaction() {
    this.formAddTransaction = this.fb.group({
      category_id: [1],
      milk_id: ['', Validators.required],
      date: ['', Validators.required],
      vol: ['', Validators.required],
      user_id: [this.userLogin.user_id],
    });
  }

  getDataMilk() {
    this.apiService.getAllMilk().subscribe((res: any) => {
      this.dataMilks = res.data;
    });
  }
  submitAddTranscationNew() {
    this.apiService
      .addTransaction(this.formAddTransactionNew.value)
      .subscribe((res: any) => {
        console.log('Add Successfully!');
        this.route.navigate(['/penerimaan-susu']);
      });
  }
  submitAddTranscation() {
    let dataTrans = this.formAddTransaction.value;

    this.apiService
      .addTransaction(this.formAddTransaction.value)
      .subscribe((res: any) => {
        console.log('Uplaod Transaction Success!');
        this.apiService.getStok().subscribe((res: any) => {
          let response = res.data[0];
          let dataStok = {
            stok_vol: response.stok_vol + this.formAddTransaction.value.vol,
          };
          console.log('respon getstok', res.data[0]);
          console.log('datastok', dataStok);
          this.apiService.updateStok(1, dataStok).subscribe((res: any) => {
            this.route.navigate(['/penerimaan-susu']);
          });
        });
      });
  }

  // CREATE ADD FORM KUALITAS SUSU
  createFormKualitas(data: any) {
    this.formAddKualitas = this.fb.group({
      milk_id: [data],
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
    console.log(this.formAddKualitas.value);
    let data = this.formAddKualitas.value;
    this.apiService
      .addQuantity(this.formAddKualitas.value)
      .subscribe((res: any) => {
        console.log('succesfully');
        const formKualitas = document.querySelector('#form-add-kualitas');
        formKualitas?.classList.toggle('hidden');
        const addTransaction = document.querySelector(
          '#form-add-transaction-new'
        );
        addTransaction?.classList.toggle('hidden');
        this.createFormAddTransactionNew(data.milk_id);
      });
  }

  getAllMember() {
    this.apiService.getAllMembers().subscribe((res: any) => {
      this.members = res.data;
    });
  }
}
