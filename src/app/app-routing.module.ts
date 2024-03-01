import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SingleEmployeeComponent } from './components/single-employee/single-employee.component';
import { EmployeeComponent } from './components/employee/employee.component';

const routes: Routes = [
  { path: '', component: EmployeeComponent },
  { path: 'employee/:id', component: SingleEmployeeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
