import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private httpClient: HttpClient) {
  }
    getStudents(params: any):Observable<any> {
      return this.httpClient.get('https://localhost:7155/api/students', {params});
    }
}
