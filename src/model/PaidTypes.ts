import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
import { Expose } from "class-transformer";
import status from "./enums/status";



@Entity({ name: "PaidTypes" })
export default class PaidType {
    @PrimaryGeneratedColumn({ name: "pk_PaidTypes" })
    @Expose()
    id?: number;

    @Column({ name: "name", type: "varchar", nullable: false })
    @Expose()
    name?: string;

    @Column({ name: "code", type: "varchar", nullable: false })
    @Expose()
    code?: string;

    @Column({ name: "status", type: "integer", default: status.ACTIVE })
    @Expose()
    status?: number;
}