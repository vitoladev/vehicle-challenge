import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Vehicle } from './vehicle.interface';

@Injectable({
  providedIn: 'root',
})
export class VehicleService {
  private baseUrl = 'http://127.0.0.1:3000/vehicles';

  constructor(private http: HttpClient) {}

  create(vehicle: Partial<Vehicle>): Observable<Vehicle> {
    return this.http.post<Vehicle>(`${this.baseUrl}`, vehicle);
  }

  update(id: number, vehicle: Partial<Vehicle>): Observable<Vehicle> {
    return this.http.put<Vehicle>(`${this.baseUrl}/${id}`, vehicle);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  delete(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  findById(id: number): Observable<Vehicle> {
    return this.http.get<Vehicle>(`${this.baseUrl}/${id}`);
  }

  findAll({ page, pageSize }: { page: number; pageSize: number }): Observable<{
    data: Vehicle[];
    totalRecords: number;
    totalPages: number;
  }> {
    return this.http.get<{
      data: Vehicle[];
      totalRecords: number;
      totalPages: number;
    }>(`${this.baseUrl}?page=${page}&pageSize=${pageSize}`);
  }
}
