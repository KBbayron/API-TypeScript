import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
import { Expose } from "class-transformer";
import status from "./enums/status";

@Entity({ name: "InstitutionTypes" })
export default class InstitutionType {
    @PrimaryGeneratedColumn({ name: "pk_InstitutionType" })
    @Expose()
    id?: number;

    @Column({ name: "typeId", type: "integer", nullable: false })
    @Expose()
    typeId?: number;

    @Column({ name: "name", type: "varchar", nullable: false })
    @Expose()
    name?: string;

    @Column({ name: "description", type: "varchar", nullable: false })
    @Expose()
    description?: string;

    @Column({ name: "status", type: "integer", default: status.ACTIVE })
    @Expose()
    status?: number;
}