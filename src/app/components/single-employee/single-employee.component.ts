import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeModel } from 'src/app/models/employee.model';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-single-employee',
  templateUrl: './single-employee.component.html',
  styleUrls: ['./single-employee.component.scss']
})
export class SingleEmployeeComponent implements OnInit {

  empId: string = '';
  empData!: EmployeeModel;

  constructor(private empService: EmployeeService, private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.route.params.subscribe((params: any) => {
      this.empId = params['id'];
    });
    if (this.empId) {
      this.empService.getEmployeeById(this.empId).subscribe((res: any) => { 
        if(res.success) {
          this.empData = res.data
        }
      }, (error: any) => {
        console.log('Error Get Employee By ID: ', error)
       })
    }
  }
}
