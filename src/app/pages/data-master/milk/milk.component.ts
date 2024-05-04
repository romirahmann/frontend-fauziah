import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-milk',
  templateUrl: './milk.component.html',
  styleUrls: ['./milk.component.scss'],
})
export class MilkComponent {
  milks!: any;
  displayMilks!: any;
  totalStok!: number;
  dataReceived: any;

  // pagination
  pageSize: number = 20;
  currentPage: number = 1;
  totalPages: number = 0;
  entires: any;

  constructor(private apiService: ApiService) {}
  ngOnInit() {
    this.getAllMilks();
    this.getStok();
  }
  getStok() {
    this.apiService.getStok().subscribe((res: any) => {
      // console.log(res.data[0]);
      this.totalStok = res.data[0].stok_vol;
    });
  }
  getAllMilks() {
    this.apiService.getAllMilk().subscribe((res: any) => {
      this.milks = res.data;
      this.entires = this.milks.length;
      this.calculateTotalPages();
      this.updateDisplayMilk();
    });
  }

  // TOOGLE MODAL
  toogleModalKualitas(category: any, milk: any) {
    if (category === 0) {
      this.getAllMilks();
      const modal = document.querySelector('#modal-kualitas');
      modal?.classList.toggle('hidden');
    }
    if (category === 1) {
      let dataMilk = {
        group_id: milk.group_id,
        group_name: milk.group_name,
        member_id: milk.member_id,
        member_name: milk.member_name,
        milk_id: milk.milk_id,
        noID: milk.noID,
        stok: milk.stok,
        category_id: 1,
      };
      let data = {
        text: '',
        data: dataMilk,
      };
      this.dataReceived = data;
      const modal = document.querySelector('#modal-kualitas');
      modal?.classList.toggle('hidden');
    }
  }

  // TOOGLE MODAL
  toogleModal(category_toogle: number, milk: any) {
    if (category_toogle === 1) {
      let data = {
        text: '',
        category: 'ADD_MILK',
      };
      this.dataReceived = data;
      const modal = document.querySelector('#modal-milk');
      modal?.classList.toggle('hidden');
    }
    if (category_toogle === 2) {
      let data = {
        text: '',
        category: 'EDIT_MILK',
        data: milk,
      };
      this.dataReceived = data;
      const modal = document.querySelector('#modal-milk');
      modal?.classList.toggle('hidden');
    }
    if (category_toogle === 3) {
      let data = {
        category: 'REMOVE_MODAL',
        data: milk,
        funct: 'removeMilk',
      };
      this.dataReceived = data;
      const modal = document.querySelector('#modal-milk');
      modal?.classList.toggle('hidden');
    }
    if (category_toogle === 0) {
      this.getAllMilks();
      const modal = document.querySelector('#modal-milk');
      modal?.classList.toggle('hidden');
    }
  }

  // Pagination
  calculateTotalPages() {
    this.totalPages = Math.ceil(this.entires / this.pageSize);
  }

  updateDisplayMilk() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.displayMilks = this.milks.slice(startIndex, endIndex);
  }
  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updateDisplayMilk();
    }
  }
  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updateDisplayMilk();
    }
  }
  getStartIndex(): number {
    return (this.currentPage - 1) * this.pageSize + 1;
  }
  getEndIndex(): number {
    const endIndex: number = this.currentPage * this.pageSize;
    return Math.min(endIndex, this.entires);
  }
}
