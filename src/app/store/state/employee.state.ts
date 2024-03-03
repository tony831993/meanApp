import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { EmployeeModel } from "src/app/models/employee.model";
import { AddEmployee, DeleteEmployee, GetEmployee, SetSelectedEmployee, UpdateEmployee } from "../actions/employee.action";
import { EmployeeService } from "src/app/services/employee.service";
import { tap } from "rxjs";

// State Model
export class EmployeeStateModel {
    employees: EmployeeModel[] = [];
    employeeLoaded: boolean = false;
    selectedEmployee: EmployeeModel | null = null;
}

// State
@State<EmployeeStateModel>({
    name: 'employees',
    defaults: {
        employees: [],
        employeeLoaded: false,
        selectedEmployee: null
    }
})

@Injectable()
export class EmployeeState {

    constructor(private empService: EmployeeService) { }

    // Selector has logic to get state data
    // Get employee list from state
    @Selector()
    static getEmployeeList(state: EmployeeStateModel) {
        return state.employees;
    }
    // Action for Get employees state
    @Action(GetEmployee)
    getEmployees({ getState, setState }: StateContext<EmployeeStateModel>) {
        return this.empService.getEmployeeList().pipe(tap((res: any) => {
            if (res.success) {
                const state = getState();
                setState({
                    ...state,
                    employees: res.data,
                    employeeLoaded: true
                });
            }
        }));
    }

    // Get employeeLoaded info from state
    @Selector()
    static employeeLoaded(state: EmployeeStateModel) {
        return state.employeeLoaded;
    }

    @Selector()
    static selectedEmployee(state: EmployeeStateModel) {
        return state.selectedEmployee;
    }
    // Set selected employee data to state
    @Action(SetSelectedEmployee)
    setSelectedEmployee({ getState, setState }: StateContext<EmployeeStateModel>, { id }: SetSelectedEmployee) {
        const state = getState();
        const employeeList = state.employees;
        const index = employeeList.findIndex(emp => emp._id === id);
        if (employeeList.length > 0) {
            setState({
                ...state,
                selectedEmployee: employeeList[index]
            });
            return;
        } else {
            return this.empService.getEmployeeById(id).pipe(tap((res: any) => {
                if (res.success) {
                    const state = getState();
                    const empList = [res.data];
                    setState({
                        ...state,
                        employees: empList,
                        selectedEmployee: empList[0]
                    })
                }
            }));
        }
    }
    // Add employee to state and DB
    @Action(AddEmployee)
    addEmployee({ getState, patchState }: StateContext<EmployeeStateModel>, { payload }: AddEmployee) {
        return this.empService.addEmployee(payload).pipe(tap((res: any) => {
            const state = getState();
            patchState({
                employees: [...state.employees, res.data]
            })
        }))
    }
    // Delete employe from state and DB
    @Action(DeleteEmployee)
    deleteEmployee({ getState, setState }: StateContext<EmployeeStateModel>, { id }: DeleteEmployee) {
        return this.empService.deleteEmployee(id).pipe(tap((res: any) => {
            const state = getState();
            const newState = state.employees.filter(emp => emp._id !== id);
            setState({
                ...state,
                employees: newState
            })
        }))
    }
    // Update employee in state and DB
    @Action(UpdateEmployee)
    updateEmployee({ getState, patchState }: StateContext<EmployeeStateModel>, { payload }: UpdateEmployee) {
        return this.empService.updateEmployee(payload).pipe(tap((res: any) => {
            const state = getState();
            const empList = state.employees;
            const index = empList.findIndex(emp => emp._id === payload._id);
            empList[index] = res.data;
            patchState({
                employees: empList
            })
        }))
    }
}