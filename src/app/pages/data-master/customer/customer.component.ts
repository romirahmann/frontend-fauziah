import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss'],
})
export class CustomerComponent {
  customers!: any;
  displayCustomers!: any;
  dataReceived: any;

  // pagination
  pageSize: number = 20;
  currentPage: number = 1;
  totalPages: number = 0;
  entires: any;

  constructor(private apiService: ApiService) {}
  ngOnInit() {
    this.getAllCustomer();
  }

  getAllCustomer() {
    this.apiService.getAllCustomer().subscribe((res: any) => {
      this.customers = res.data;
      this.entires = this.customers.length;
      this.calculateTotalPages();
      this.updateDisplayCustomers();
    });
  }

  // TOOGLE MODAL
  toogleModal(category_toogle: number, customer: any) {
    if (category_toogle === 1) {
      let data = {
        text: '',
        category: 'ADD_CUSTOMER',
      };
      this.dataReceived = data;
      const modal = document.querySelector('#modal-customer');
      modal?.classList.toggle('hidden');
    }
    if (category_toogle === 2) {
      let data = {
        text: '',
        category: 'EDIT_CUSTOMER',
        data: customer,
      };
      this.dataReceived = data;
      const modal = document.querySelector('#modal-customer');
      modal?.classList.toggle('hidden');
    }
    if (category_toogle === 3) {
      let data = {
        category: 'REMOVE_MODAL',
        data: customer,
        funct: 'removeMember',
      };
      this.dataReceived = data;
      const modal = document.querySelector('#modal-customer');
      modal?.classList.toggle('hidden');
    }
    if (category_toogle === 0) {
      this.getAllCustomer();
      const modal = document.querySelector('#modal-customer');
      modal?.classList.toggle('hidden');
    }
  }

  // Pagination
  calculateTotalPages() {
    this.totalPages = Math.ceil(this.entires / this.pageSize);
  }

  updateDisplayCustomers() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.displayCustomers = this.customers.slice(startIndex, endIndex);
  }
  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updateDisplayCustomers();
    }
  }
  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updateDisplayCustomers();
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
