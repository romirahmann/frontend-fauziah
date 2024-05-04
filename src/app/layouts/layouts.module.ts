import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutsComponent } from './layouts.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalUserComponent } from './modal/modal-user/modal-user.component';
import { ModalGroupComponent } from './modal/modal-group/modal-group.component';
import { ModalMemberComponent } from './modal/modal-member/modal-member.component';
import { ModalMilkComponent } from './modal/modal-milk/modal-milk.component';
import { ModalKualitasComponent } from './modal/modal-kualitas/modal-kualitas.component';
import { RemovePenerimaanComponent } from './modal/remove-penerimaan/remove-penerimaan.component';
import { RemovePengeluaranComponent } from './modal/remove-pengeluaran/remove-pengeluaran.component';
import { ModalCustomerComponent } from './modal/modal-customer/modal-customer.component';

@NgModule({
  declarations: [
    LayoutsComponent,
    SidebarComponent,
    ModalUserComponent,
    ModalGroupComponent,
    ModalMemberComponent,
    ModalMilkComponent,
    ModalKualitasComponent,
    RemovePenerimaanComponent,
    RemovePengeluaranComponent,
    ModalCustomerComponent,
  ],
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  exports: [
    SidebarComponent,
    ModalGroupComponent,
    ModalMemberComponent,
    ModalMilkComponent,
    ModalUserComponent,
    ModalKualitasComponent,
    RemovePenerimaanComponent,
    RemovePengeluaranComponent,
    ModalCustomerComponent,
  ],
})
export class LayoutsModule {}
