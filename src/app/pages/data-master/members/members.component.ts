import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss'],
})
export class MembersComponent {
  members!: any;
  displayMembers!: any;
  dataReceived: any;

  // pagination
  pageSize: number = 20;
  currentPage: number = 1;
  totalPages: number = 0;
  entires: any;

  constructor(private apiService: ApiService) {}
  ngOnInit() {
    this.getAllMembers();
  }

  getAllMembers() {
    this.apiService.getAllMembers().subscribe((res: any) => {
      this.members = res.data;
      this.entires = this.members.length;
      this.calculateTotalPages();
      this.updateDisplayMembers();
    });
  }

  // TOOGLE MODAL
  toogleModal(category_toogle: number, member: any) {
    if (category_toogle === 1) {
      let data = {
        text: '',
        category: 'ADD_MEMBER',
      };
      this.dataReceived = data;
      const modal = document.querySelector('#modal-member');
      modal?.classList.toggle('hidden');
    }
    if (category_toogle === 2) {
      console.log(member);
      let data = {
        text: '',
        category: 'EDIT_MEMBER',
        data: member,
      };
      this.dataReceived = data;
      const modal = document.querySelector('#modal-member');
      modal?.classList.toggle('hidden');
    }
    if (category_toogle === 3) {
      let data = {
        category: 'REMOVE_MODAL',
        data: member,
        funct: 'removeMember',
      };
      this.dataReceived = data;
      const modal = document.querySelector('#modal-member');
      modal?.classList.toggle('hidden');
    }
    if (category_toogle === 0) {
      this.getAllMembers();
      const modal = document.querySelector('#modal-member');
      modal?.classList.toggle('hidden');
    }
  }

  // Pagination
  calculateTotalPages() {
    this.totalPages = Math.ceil(this.entires / this.pageSize);
  }

  updateDisplayMembers() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.displayMembers = this.members.slice(startIndex, endIndex);
  }
  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updateDisplayMembers();
    }
  }
  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updateDisplayMembers();
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
