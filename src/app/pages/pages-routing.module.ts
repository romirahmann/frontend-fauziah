import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UsersComponent } from './data-master/users/users.component';
import { GroupsComponent } from './data-master/groups/groups.component';
import { MembersComponent } from './data-master/members/members.component';
import { PenerimaanComponent } from './reporting/penerimaan/penerimaan.component';
import { PengeluaranComponent } from './reporting/pengeluaran/pengeluaran.component';
import { MilkComponent } from './data-master/milk/milk.component';
import { AddPenerimaanComponent } from './reporting/penerimaan/add-penerimaan/add-penerimaan.component';
import { AddPengeluaranComponent } from './reporting/pengeluaran/add-pengeluaran/add-pengeluaran.component';
import { ExportPdfComponent } from './reporting/export-pdf/export-pdf.component';
import { CustomerComponent } from './data-master/customer/customer.component';

const routes: Routes = [
  { path: '', component: PenerimaanComponent },
  { path: 'users', component: UsersComponent },
  { path: 'groups', component: GroupsComponent },
  { path: 'members', component: MembersComponent },
  { path: 'milk', component: MilkComponent },
  { path: 'customer', component: CustomerComponent },
  { path: 'penerimaan-susu', component: PenerimaanComponent },
  { path: 'pengeluaran-susu', component: PengeluaranComponent },
  { path: 'export-pdf', component: PengeluaranComponent },
  { path: 'add-penerimaan', component: AddPenerimaanComponent },
  { path: 'add-pengeluaran', component: AddPengeluaranComponent },
  { path: 'export/:id', component: ExportPdfComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
