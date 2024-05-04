import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-penerimaan',
  templateUrl: './penerimaan.component.html',
  styleUrls: ['./penerimaan.component.scss'],
})
export class PenerimaanComponent {
  transactions!: any;
  displayTransactions!: any;
  dataReceived: any;

  // pagination
  pageSize: number = 20;
  currentPage: number = 1;
  totalPages: number = 0;
  entires: any;
  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.getAllTranscation();
  }
  getAllTranscation() {
    this.apiService.getTransactionByCategory(1).subscribe((res: any) => {
      console.log(res.data);
      this.transactions = res.data;
      this.entires = this.transactions.length;
      this.calculateTotalPages();
      this.updateDisplayTransaction();
    });
  }

  // TOOGLE MODAL
  toogleModalKualitas(category: any, penerimaan: any) {
    if (category === 0) {
      this.getAllTranscation();
      const modal = document.querySelector('#modal-kualitas');
      modal?.classList.toggle('hidden');
    }
    if (category === 1) {
      let data = {
        text: '',
        data: penerimaan,
      };
      this.dataReceived = data;
      const modal = document.querySelector('#modal-kualitas');
      modal?.classList.toggle('hidden');
    }
  }

  toogleRemove(category: any, penerimaan: any) {
    if (category === 1) {
      let data = {
        category: 'REMOVE_MODAL',
        data: penerimaan,
        funct: 'removePenerimaan',
      };
      this.dataReceived = data;
      const modal = document.querySelector('#modal-penerimaan');
      modal?.classList.toggle('hidden');
    }
    if (category === 0) {
      this.getAllTranscation();
      const modal = document.querySelector('#modal-penerimaan');
      modal?.classList.toggle('hidden');
    }
  }

  // Pagination
  calculateTotalPages() {
    this.totalPages = Math.ceil(this.entires / this.pageSize);
  }

  updateDisplayTransaction() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.displayTransactions = this.transactions.slice(startIndex, endIndex);
  }
  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updateDisplayTransaction();
    }
  }
  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updateDisplayTransaction();
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
