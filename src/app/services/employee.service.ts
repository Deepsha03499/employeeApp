import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) {}

  getEmployee(payload: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/Emp/GetEmployee`, payload);
  }

  addEmployee(payload: any): Observable<any> {
    console.log('Fetching employees with payload:', payload); 
    return this.http.post<any>(`${environment.apiUrl}/Emp/AddEmployee`, payload);
  }

  updateEmployee(payload: any): Observable<any> {
    console.log('Fetching employees with payload:', payload); 
    return this.http.post<any>(`${environment.apiUrl}/Emp/UpdateEmployee`, payload);
  }

  deleteEmployee(payload: any): Observable<any> {
    console.log('Fetching employees with payload:', payload); 
    return this.http.post<any>(`${environment.apiUrl}/Emp/DeleteEmployee`, payload);
  }
  
}
