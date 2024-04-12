import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { Expose } from "class-transformer";
import status from "./enums/status";
import Employee from "./Employees";
import HiringType from "./HiringTypes";

@Entity({ name: "Hirings" })
export default class Hiring {
    @PrimaryGeneratedColumn({ name: "pk_Hiring" })
    @Expose()
    id?: number;

    @Column({ name: "employeeId", type: "integer", nullable: false })
    @Expose()
    employeeId?: number;

    @Column({ name: "hiringTypeId", type: "integer", nullable: false })
    @Expose()
    hiringTypeId?: number;

    @Column({ name: "salary", type: "float", nullable: false })
    @Expose()
    salary?: number;

    @Column({ name: "startDate", type: "timestamp", default: () => "CURRENT_TIMESTAMP", nullable: false })
    @Expose()
    startDate?: Date;

    @Column({ name: "endDate", type: "timestamp", default: () => "CURRENT_TIMESTAMP", nullable: false })
    @Expose()
    endDate?: Date;

    @Column({ name: "description", type: "varchar", nullable: false })
    @Expose()
    description?: string;

    @Column({ name: "status", type: "integer", default: status.ACTIVE })
    @Expose()
    status?: number;

    @ManyToOne(() => Employee)
    @JoinColumn({ name: "employeesId", referencedColumnName: "id" })
    Employee?: Employee;

    @ManyToOne(() => HiringType)
    @JoinColumn({ name: "hiringTypeId", referencedColumnName: "id" })
    hiringType?: HiringType;
}