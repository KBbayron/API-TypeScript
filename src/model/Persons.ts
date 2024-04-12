import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
import { Expose } from "class-transformer";
import status from "./enums/status";


@Entity({ name: "Persons" })
export default class Person {
    @PrimaryGeneratedColumn({ name: "pk_person" })
    @Expose()
    id?: number;

    @Column({ name: "name", type: "varchar", nullable: false })
    @Expose()
    name?: string;

    @Column({ name: "firtsLastName", type: "varchar", nullable: false })
    @Expose()
    firstLastName?: string;

    @Column({ name: "secondsLastName", type: "varchar", nullable: true })
    @Expose()
    secondLastName?: string;

    @Column({ name: "status", type: "integer", default: status.ACTIVE })
    @Expose()
    status?: number;
}