import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
import { Expose } from "class-transformer";
import status from "./enums/status";


@Entity({ name: "ContactInformations" })
export default class ContactInformation {
    @PrimaryGeneratedColumn({ name: "pk_ContactInformation" })
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