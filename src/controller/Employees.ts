import { Repository } from "typeorm";
import dbConnector from "../database/dbConector";
import ResponseError from "../response/ResponseError";
import status from "../model/enums/status";
import Employee from "../model/Employees";

export default class EmployeeController {
    private readonly EmployeeModel: Repository<Employee>

    constructor() {
        this.EmployeeModel = dbConnector.getRepository(Employee)
    }

    async getAll(): Promise<Employee[]> {
        const Employee = await this.EmployeeModel.findBy({
            status: status.ACTIVE
        })
        return Employee
    }

    async getById(id: number): Promise<Employee> {
        const Employee = await this.EmployeeModel.findOneBy({
            id,
            status: status.ACTIVE
        })
        if (!Employee) {
            throw new ResponseError(
                404,
                "Sin resultados",
                "No se han encontrado una cliente con el id proporcionado"
            )
        }
        return Employee
    }

    async create(Employee: Employee): Promise<Employee> {
        const newEmployee = await this.EmployeeModel.save({
            personalId: Employee.personId,
            jobTitleId: Employee.jobTitleId,
            status: status.ACTIVE
        })
        if (!newEmployee) {
            throw new ResponseError(
                400,
                "Error al crear la persona",
                "Ocurrio un error al intentar crear el cliente, intente nuevamente."
            )
        }
        return newEmployee
    }

    async update(Employee: Employee): Promise<Employee> {
        const newEmployee = await this.EmployeeModel.save({
            id: Employee.id,
            personalId: Employee.personId,
            jobTitleId: Employee.jobTitleId,
            status: status.ACTIVE
        })
        if (!newEmployee) {
            throw new ResponseError(
                400,
                "Error al actualizar la persona",
                "Ocurrio un error al intentar actualizar el cliente, intente nuevamente."
            )
        }
        return newEmployee
    }

    async remove(id: number): Promise<Employee> {
        const newEmployee = await this.EmployeeModel.save({
            id,
            status: status.INCATIVE
        })
        if (!newEmployee) {
            throw new ResponseError(
                400,
                "Error al eliminar la persona",
                "Ocurrio un error al intentar eliminar el cliente, intente nuevamente."
            )
        }
        return newEmployee
    }

}