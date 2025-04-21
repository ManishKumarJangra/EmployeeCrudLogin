import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from './../../models/employee/employee';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  constructor(private httpClient: HttpClient) {}

  getAllEmployees(): Observable<any> {
    return this.httpClient.get<any>('https://localhost:7155/api/employees');
  }

  saveEmployee(employee: Employee): Observable<any> {
    return this.httpClient.post<any>(
      'https://localhost:7155/api/employees',
      employee
    );
  }

  updateEmployee(id: number, employee: Employee): Observable<any> {
    return this.httpClient.put<any>(
      'https://localhost:7155/api/employees/' + id,
      employee
    );
  }

  deleteEmployee(id: number): Observable<any> {
    return this.httpClient.delete<any>(
      'https://localhost:7155/api/employees/' + id
    );
  }
  
  getRoles(): Observable<any> {
    return this.httpClient.get<any>('https://localhost:7155/api/roles');
  }

  getGenders(): Observable<any> {
    return this.httpClient.get<any>('https://localhost:7155/api/genders');
  }

  getDepartments(): Observable<any> {
    return this.httpClient.get<any>('https://localhost:7155/api/department');
  }
}
