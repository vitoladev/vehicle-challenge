import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VehicleService {
  private baseUrl = 'http://127.0.0.1:3000/vehicles';

  constructor(private http: HttpClient) {}

  create(vehicle: any): Observable<any> {
    return this.http.post(`${this.baseUrl}`, vehicle);
  }

  update(id: number, vehicle: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, vehicle);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  findById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  findAll(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }
}
