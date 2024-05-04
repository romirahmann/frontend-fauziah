import { Injectable } from '@angular/core';
import { environment } from 'src/environment/environment.prod';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  api = environment.apiUrl;
  constructor(private http: HttpClient) {}

  // USERS
  getAllUsers(): Observable<any> {
    return this.http.get(`${this.api}/master/users`);
  }
  updateUser(id: number, data: any): Observable<any> {
    return this.http.put(`${this.api}/master/user/${id}`, data);
  }
  getAllRole(): Observable<any> {
    return this.http.get(`${this.api}/master/roles`);
  }

  // GROUP
  getAllGroup(): Observable<any> {
    return this.http.get(`${this.api}/master/groups`);
  }
  getGroupById(id: number): Observable<any> {
    return this.http.get(`${this.api}/master/group/${id}`);
  }
  addGroup(data: any): Observable<any> {
    return this.http.post(`${this.api}/master/group`, data);
  }
  updateGroup(id: number, data: any): Observable<any> {
    return this.http.put(`${this.api}/master/group/${id}`, data);
  }

  // MEMBERS
  getAllMembers(): Observable<any> {
    return this.http.get(`${this.api}/master/members`);
  }
  getMemberById(id: number): Observable<any> {
    return this.http.get(`${this.api}/master/member/${id}`);
  }
  addMember(data: any): Observable<any> {
    return this.http.post(`${this.api}/master/member`, data);
  }
  updateMember(id: number, data: any): Observable<any> {
    return this.http.put(`${this.api}/master/member/${id}`, data);
  }
  // MEMBERS
  getAllMilk(): Observable<any> {
    return this.http.get(`${this.api}/master/milks`);
  }
  getMilkById(id: number): Observable<any> {
    return this.http.get(`${this.api}/master/milk/${id}`);
  }
  addMilk(data: any): Observable<any> {
    return this.http.post(`${this.api}/master/milk`, data);
  }
  updateilk(id: number, data: any): Observable<any> {
    return this.http.put(`${this.api}/master/milk/${id}`, data);
  }
  // CUSTOMERS
  getAllCustomer(): Observable<any> {
    return this.http.get(`${this.api}/master/customers`);
  }
  getCustomerById(id: number): Observable<any> {
    return this.http.get(`${this.api}/master/customer/${id}`);
  }
  addCustomer(data: any): Observable<any> {
    return this.http.post(`${this.api}/master/customer`, data);
  }
  updateCustomer(id: number, data: any): Observable<any> {
    return this.http.put(`${this.api}/master/customer/${id}`, data);
  }

  // TRANSACTION
  getAllTransactions(): Observable<any> {
    return this.http.get(`${this.api}/master/transactions`);
  }
  getTransactionById(id: number): Observable<any> {
    return this.http.get(`${this.api}/master/transaction/${id}`);
  }
  getTransactionByCategory(id: number): Observable<any> {
    return this.http.get(`${this.api}/master/transaction-by-category/${id}`);
  }
  getTotalStockById(id: number): Observable<any> {
    return this.http.get(`${this.api}/master/total-stock/${id}`);
  }
  addTransaction(data: any): Observable<any> {
    return this.http.post(`${this.api}/master/transaction`, data);
  }
  updateTransaction(id: number, data: any): Observable<any> {
    return this.http.put(`${this.api}/master/transaction/${id}`, data);
  }
  deleteTransaction(id: number): Observable<any> {
    return this.http.delete(`${this.api}/master/transaction/${id}`);
  }

  // STOK
  getStok(): Observable<any> {
    return this.http.get(`${this.api}/master/stoks`);
  }
  addStok(data: any): Observable<any> {
    return this.http.post(`${this.api}/master/stok`, data);
  }
  updateStok(id: number, data: any): Observable<any> {
    return this.http.put(`${this.api}/master/stok/${id}`, data);
  }

  // QUANTITY
  getQuantityByMilkId(id: number): Observable<any> {
    return this.http.get(`${this.api}/master/quantity/${id}`);
  }
  getQuantityByTransactionId(id: number): Observable<any> {
    return this.http.get(`${this.api}/master/quantity-by-transaction/${id}`);
  }
  addQuantity(data: any): Observable<any> {
    return this.http.post(`${this.api}/master/quantity`, data);
  }
  updateQuantity(id: number, data: any): Observable<any> {
    return this.http.put(`${this.api}/master/quantity/${id}`, data);
  }
  deleteQuantity(id: number): Observable<any> {
    return this.http.delete(`${this.api}/master/quantity/${id}`);
  }
}
