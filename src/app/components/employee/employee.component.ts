import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from '../../services/employee.service';
import { EmployeeModel } from '../../models/employee.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {

  empForm !: FormGroup;
  showModal: boolean = false;
  editMode: boolean = false;

  employees: EmployeeModel[] = [];

  constructor(private fb: FormBuilder, private empService: EmployeeService, private router: Router) {

  }

  ngOnInit(): void {
    this.getEmployees();

    this.empForm = this.fb.group({
      _id: [''],
      name: ['Alex Johnson', Validators.required],
      position: ['Full Stack Developer', Validators.required],
      department: ['Development', Validators.required]
    })
  }

  getEmployees() {
    this.empService.getEmployeeList().subscribe((res: any) => {
      this.employees = res.data;
    }, (error) => {
      console.log('Error GetEmployees: ', error);
    });
  }

  onAddEmployee() {
    this.showModal = true;
  }

  onCloseModal() {
    this.showModal = false;
    this.editMode = false;
    this.empForm.reset()
  }

  onEmpSubmit() {
    if (this.empForm.valid) {
      if (this.editMode) {
        this.empService.updateEmployee(this.empForm.value).subscribe((res) => {
          this.getEmployees();
          this.onCloseModal();
        }, (error) => {
          console.log('Error Employee Update: ', error);
        });
      } else {
        this.empService.addEmployee(this.empForm.value).subscribe((res) => {
          this.getEmployees();
          this.onCloseModal();
        }, (error) => {
          console.log('Error Add Employee: ', error);
        });
      }

    }
  }

  onEditEmployee(emp: any) {
    this.showModal = true;
    this.editMode = true;
    this.empForm.patchValue(emp)
  }

  onDeleteEmployee(id: any) {
    if (confirm('Do you really want to delete this emplyee data?')) {
      this.empService.deleteEmployee(id).subscribe((res) => {
        this.getEmployees();
      }, (error) => {
        console.log('Error Delete Employee: ', error);
      })
    }
  }

  navigateEmploye(id: any) {
    this.router.navigate([`employee`, id]);
  }

}
