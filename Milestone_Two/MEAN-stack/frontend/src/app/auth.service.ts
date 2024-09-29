import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  private apiUrl = 'http://localhost:5000/services';

  constructor(private http: HttpClient) {}

  // Method to fetch services
  getServices(): Observable<any> {
    return this.http.get(`${this.apiUrl}/`);
  }

  // Method to create a service
  createService(service: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/create`, service);
  }

  // Method to delete a service
  deleteService(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
