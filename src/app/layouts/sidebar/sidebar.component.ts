import { AuthService } from 'src/app/services/auth.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  userLogin!: any;
  constructor(private authService: AuthService) {}
  ngOnInit() {
    this.getUserLogin();
  }

  getUserLogin() {
    this.userLogin = this.authService.getUserLogin();
    console.log(this.userLogin);
  }
  toggleDataMaster() {
    const dataMaster = document.querySelector('#submenu-data-master');
    dataMaster?.classList.toggle('hidden');
  }
  toogleReporting() {
    const reporting = document.querySelector('#submenu-reporting');
    reporting?.classList.toggle('hidden');
  }
  logout() {
    this.authService.logout();
  }
}
