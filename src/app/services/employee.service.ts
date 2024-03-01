import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EmployeeModel } from '../models/employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) { }

  url = 'http://localhost:8000/api/v1/employees/';

  addEmployee(emp: EmployeeModel) {
    return this.http.post(`${this.url}/add`, emp);
  }

  getEmployeeList() {
    return this.http.get(this.url);
  }

  deleteEmployee(id: any) {
    return this.http.delete(`${this.url}/${id}`);
  }

  updateEmployee(emp: EmployeeModel) {
    return this.http.put(`${this.url}/${emp._id}`, emp)
  }

  getEmployeeById(empId: any) {
    return this.http.get(`${this.url}/${empId}`);
  }
}
