import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss'],
})
export class GroupsComponent {
  groups!: any;
  displayGroups!: any;
  dataReceived: any;

  // pagination
  pageSize: number = 20;
  currentPage: number = 1;
  totalPages: number = 0;
  entires: any;

  constructor(private apiService: ApiService) {}
  ngOnInit() {
    this.getAllGroups();
  }

  getAllGroups() {
    this.apiService.getAllGroup().subscribe((res: any) => {
      this.groups = res.data;
      this.entires = this.groups.length;
      this.calculateTotalPages();
      this.updateDisplayGroups();
    });
  }

  // TOOGLE MODAL
  toogleModal(category_toogle: number, group: any) {
    if (category_toogle === 1) {
      let data = {
        text: '',
        category: 'ADD_GROUP',
      };
      this.dataReceived = data;
      const modal = document.querySelector('#modal-group');
      modal?.classList.toggle('hidden');
    }
    if (category_toogle === 2) {
      let data = {
        text: '',
        category: 'EDIT_GROUP',
        data: group,
      };
      this.dataReceived = data;
      const modal = document.querySelector('#modal-group');
      modal?.classList.toggle('hidden');
    }
    if (category_toogle === 3) {
      let data = {
        category: 'REMOVE_MODAL',
        data: group,
        funct: 'removeGroup',
      };
      this.dataReceived = data;
      const modal = document.querySelector('#modal-group');
      modal?.classList.toggle('hidden');
    }
    if (category_toogle === 0) {
      this.getAllGroups();
      const modal = document.querySelector('#modal-group');
      modal?.classList.toggle('hidden');
    }
  }
  // Pagination
  calculateTotalPages() {
    this.totalPages = Math.ceil(this.entires / this.pageSize);
  }

  updateDisplayGroups() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.displayGroups = this.groups.slice(startIndex, endIndex);
  }
  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updateDisplayGroups();
    }
  }
  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updateDisplayGroups();
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
