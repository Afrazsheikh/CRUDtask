import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
// import { environment } from 'src/environments/environment';
import { environment } from '../../enviroment.ts/environment';

@Injectable({
  providedIn: 'root'
})
export class EmplopyeeService {
  // private apiUrl = 'environment.apiBaseUrl'
  private apiUrl = 'http://localhost:3000';
  constructor(private http: HttpClient) { }


  
  addEmployee(employee: any): Observable<any> {
    const url = `${this.apiUrl}/employees`;
    return this.http.post(url, employee);
  }
  updateEmployee(id: string, employee: any): Observable<any> {
    const url = `${this.apiUrl}/employees/${id}`;
    return this.http.patch(url, employee);
  }
  deleteEmployee(id: string): Observable<any> {
    const url = `${this.apiUrl}/employees/${id}`;
    return this.http.delete(url);
  }
  getEmployees(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/employees`);
  }
  getSortedEmployees(sortField: string, sortOrder: string): Observable<any> {
    const url = `${this.apiUrl}/employees?sortField=${sortField}&sortOrder=${sortOrder}`;
    return this.http.get(url);
  }
}
