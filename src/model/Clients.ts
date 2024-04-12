import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { Expose } from "class-transformer";
import status from "./enums/status";
import Person from "../model/Persons";


@Entity({ name: "Clients" })
export default class Client {
    @PrimaryGeneratedColumn({ name: "pk_Client" })
    @Expose()
    id?: number;

    @Column({ name: "personId", type: "integer", nullable: false })
    @Expose()
    personalId?: number;

    @Column({ name: "createdAt", type: "date", nullable: false })
    @Expose()
    createdAt?: Date;

    @Column({ name: "status", type: "integer", default: status.ACTIVE })
    @Expose()
    status?: number;

    @ManyToOne(() => Person)
    @JoinColumn({ name: "personId", referencedColumnName: "id" })
    person?: Person;
}