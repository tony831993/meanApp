import { EmployeeModel } from "src/app/models/employee.model";

export class AddEmployee {
    static readonly type = '[Employee] Add';

    constructor(public payload: EmployeeModel) {

    }
}

export class GetEmployee {
    static readonly type = '[Employee] Get';

    constructor() { }
}

export class DeleteEmployee {
    static readonly type = '[Employee] Delete';

    constructor(public id: string) {

    }
}

export class UpdateEmployee {
    static readonly type = '[Employee] Update';

    constructor(public payload: EmployeeModel) {

    }
}