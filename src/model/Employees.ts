import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { Expose } from "class-transformer";
import status from "./enums/status";
import Person from "./Persons";
import JobTitle from "./JobTitles";

@Entity({ name: "Employees" })
export default class Employee {
    @PrimaryGeneratedColumn({ name: "pk_Employees" })
    @Expose()
    id?: number;

    @Column({ name: "personId", type: "integer", nullable: false })
    @Expose()
    personId?: number;

    @Column({ name: "jobTitleId", type: "integer", nullable: false })
    @Expose()
    jobTitleId?: number;

    @Column({ name: "status", type: "integer", default: status.ACTIVE })
    @Expose()
    status?: number;

    @ManyToOne(() => Person)
    @JoinColumn({ name: "personId", referencedColumnName: "id" })
    person?: Person;

    @ManyToOne(() => JobTitle)
    @JoinColumn({ name: "jobTitleId", referencedColumnName: "id" })
    jobTitle?: JobTitle;
}