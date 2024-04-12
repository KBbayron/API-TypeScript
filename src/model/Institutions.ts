import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { Expose } from "class-transformer";
import status from "./enums/status";
import InstitutionType from "../model/InstitutionTypes";

@Entity({ name: "Institutions" })
export default class Institution {
    @PrimaryGeneratedColumn({ name: "pk_Institution" })
    @Expose()
    id?: number;

    @Column({ name: "typeId", type: "integer", nullable: false })
    @Expose()
    typeId?: number;

    @Column({ name: "description", type: "varchar", nullable: false })
    @Expose()
    description?: string;

    @Column({ name: "name", type: "varchar", nullable: false })
    @Expose()
    name?: string;

    @Column({ name: "status", type: "integer", default: status.ACTIVE })
    @Expose()
    status?: number;

    @ManyToOne(() => InstitutionType)
    @JoinColumn({ name: "typeId", referencedColumnName: "id" })
    InstitutionType?: InstitutionType;
}