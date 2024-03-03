import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { EmployeeModel } from "src/app/models/employee.model";
import { GetEmployee, SetSelectedEmployee } from "../actions/employee.action";
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

    @Action(SetSelectedEmployee)
    setSelectedEmployee({ getState, setState }: StateContext<EmployeeStateModel>, { id }: SetSelectedEmployee) {
        const state = getState();
        const employeeList = state.employees;
        const index = employeeList.findIndex(emp => emp._id === id);
        setState({
            ...state,
            selectedEmployee: employeeList[index]
        });
    }
}