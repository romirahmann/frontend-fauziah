import { Component, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import * as html2pdf from 'html2pdf.js';

@Component({
  selector: 'app-export-pdf',
  templateUrl: './export-pdf.component.html',
  styleUrls: ['./export-pdf.component.scss'],
})
export class ExportPdfComponent {
  transactions!: any;
  displayTransactions!: any;
  dataReceived: any;
  idTransaction: any;
  categoryTransaction: any;

  // pagination
  pageSize: number = 20;
  currentPage: number = 1;
  totalPages: number = 0;
  entires: any;
  @ViewChild('templatePDF', { static: false }) templatePDF!: ElementRef;
  constructor(
    private apiService: ApiService,
    private activeRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.getParams();
  }
  getParams() {
    this.activeRoute.params.subscribe((param) => {
      this.idTransaction = +param['id'];
      console.log(this.idTransaction);
      this.getAllTranscation();
      if (this.idTransaction === 1) {
        this.categoryTransaction = 'PENERIMAAN';
      }
      if (this.idTransaction === 2) {
        this.categoryTransaction = 'PENGELUARAN';
      }
    });
  }
  getAllTranscation() {
    this.apiService
      .getTransactionByCategory(this.idTransaction)
      .subscribe((res: any) => {
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

  generatePDF() {
    const options = {
      margin: 0.1,
      filename: `LAPORAN ${this.categoryTransaction} SUSU.pdf`,
      image: { type: 'png', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'A4', orientation: 'portrait' },
    };

    const element = this.templatePDF.nativeElement;

    html2pdf().from(element).set(options).save();
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
