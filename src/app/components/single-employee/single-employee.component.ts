import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { EmployeeModel } from 'src/app/models/employee.model';
import { EmployeeService } from 'src/app/services/employee.service';
import { SetSelectedEmployee } from 'src/app/store/actions/employee.action';
import { EmployeeState } from 'src/app/store/state/employee.state';

@Component({
  selector: 'app-single-employee',
  templateUrl: './single-employee.component.html',
  styleUrls: [
    './single-employee.component.scss',
    '../employee/employee.component.scss'
  ]
})
export class SingleEmployeeComponent implements OnInit, OnDestroy {

  empData!: EmployeeModel;
  @Select(EmployeeState.selectedEmployee) selectedEmployee$ !: Observable<EmployeeModel>;
  selectedEmpSub!: Subscription;

  constructor(private empService: EmployeeService, private activatedRoute: ActivatedRoute, private store: Store) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params: Params) => {
      let id = params['get']('id');
      this.getEmployeeById(id);
    });
  }

  getEmployeeById(id: string) {
    if (id) {
      this.store.dispatch(new SetSelectedEmployee(id));
      this.selectedEmpSub = this.selectedEmployee$?.subscribe((emp: EmployeeModel) => {
        this.empData = emp;
      });
      // this.empService.getEmployeeById(id).subscribe((res: any) => {
      //   if (res.success) {
      //     this.empData = res.data
      //   }
      // }, (error: any) => {
      //   console.log('Error Get Employee By ID: ', error)
      // });
    }
  }

  ngOnDestroy(): void {
    this.selectedEmpSub.unsubscribe();
  }
}
