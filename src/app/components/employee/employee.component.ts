import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from '../../services/employee.service';
import { EmployeeModel } from '../../models/employee.model';
import { Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { AddEmployee, DeleteEmployee, GetEmployee, UpdateEmployee } from 'src/app/store/actions/employee.action';
import { Observable, Subscription } from 'rxjs';
import { EmployeeState } from 'src/app/store/state/employee.state';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit, OnDestroy {

  empForm !: FormGroup;
  showModal: boolean = false;
  editMode: boolean = false;

  employees: EmployeeModel[] = [];
  @Select(EmployeeState.getEmployeeList) employees$ !: Observable<EmployeeModel[]>;
  @Select(EmployeeState.employeeLoaded) employeesLoaded$ !: Observable<boolean>;
  employeeLoadedSub!: Subscription;

  constructor(private fb: FormBuilder, private empService: EmployeeService, private router: Router, private store: Store) {

  }

  ngOnInit(): void {
    this.getEmployees();
    // Not needed as employee$ observable can be used in HTML
    // this.employees$.subscribe((res) => {
    //   this.employees = res;
    // });
    this.empForm = this.fb.group({
      _id: [''],
      name: ['', Validators.required],
      position: ['', Validators.required],
      department: ['', Validators.required]
    })
  }

  getEmployees() {
    this.employeeLoadedSub = this.employeesLoaded$.subscribe((employeeLoaded) => {
      if (!employeeLoaded) {
        this.store.dispatch(new GetEmployee());
      }
    });
    // this.empService.getEmployeeList().subscribe((res: any) => {
    //   this.employees = res.data;
    // }, (error) => {
    //   console.log('Error GetEmployees: ', error);
    // });
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
        this.store.dispatch(new UpdateEmployee(this.empForm.value));
        // this.empService.updateEmployee(this.empForm.value).subscribe((res) => {
        //   this.getEmployees();
        //   // this.onCloseModal();
        // }, (error) => {
        //   console.log('Error Employee Update: ', error);
        // });
      } else {
        this.store.dispatch(new AddEmployee(this.empForm.value));
        // this.onCloseModal();
        // this.empService.addEmployee(this.empForm.value).subscribe((res) => {
        //   this.getEmployees();
        //   this.onCloseModal();
        // }, (error) => {
        //   console.log('Error Add Employee: ', error);
        // });
      }
      this.onCloseModal();
    }
  }

  onEditEmployee(emp: any) {
    this.showModal = true;
    this.editMode = true;
    this.empForm.patchValue(emp)
  }

  onDeleteEmployee(id: any) {
    if (confirm('Do you really want to delete this emplyee data?')) {
      this.store.dispatch(new DeleteEmployee(id));
      // this.empService.deleteEmployee(id).subscribe((res) => {
      //   this.getEmployees();
      // }, (error) => {
      //   console.log('Error Delete Employee: ', error);
      // })
    }
  }

  navigateEmploye(id: any) {
    this.router.navigate([`employee`, id]);
  }

  ngOnDestroy(): void {
    this.employeeLoadedSub.unsubscribe();
  }

}
