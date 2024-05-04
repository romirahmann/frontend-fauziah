import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PagesRoutingModule } from './pages-routing.module';
import { LayoutsModule } from '../layouts/layouts.module';
import { UsersComponent } from './data-master/users/users.component';
import { GroupsComponent } from './data-master/groups/groups.component';
import { MembersComponent } from './data-master/members/members.component';

import { MilkComponent } from './data-master/milk/milk.component';
import { PenerimaanComponent } from './reporting/penerimaan/penerimaan.component';
import { PengeluaranComponent } from './reporting/pengeluaran/pengeluaran.component';
import { ExportPdfComponent } from './reporting/export-pdf/export-pdf.component';
import { AddPenerimaanComponent } from './reporting/penerimaan/add-penerimaan/add-penerimaan.component';
import { AddPengeluaranComponent } from './reporting/pengeluaran/add-pengeluaran/add-pengeluaran.component';
import { ExportComponent } from './reporting/export/export.component';
import { CustomerComponent } from './data-master/customer/customer.component';


@NgModule({
  declarations: [
    UsersComponent,
    GroupsComponent,
    MembersComponent,

    MilkComponent,
    PenerimaanComponent,
    PengeluaranComponent,
    ExportPdfComponent,
    AddPenerimaanComponent,
    AddPengeluaranComponent,
    ExportComponent,
    CustomerComponent,

  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    LayoutsModule,
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class PagesModule {}
