import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { Expose } from "class-transformer";
import status from "./enums/status";
import Person from "../model/Persons";
import Institution from "../model/Institutions";

@Entity({ name: "JobTitlesPermissions" })
export default class JobTitlesPermission {
    @PrimaryGeneratedColumn({ name: "pk_JobTitlesPermission" })
    @Expose()
    id?: number;

    @Column({ name: "personId", type: "integer", nullable: false })
    @Expose()
    personId?: number;

    @Column({ name: "institutionId", type: "integer", nullable: false })
    @Expose()
    institutionId?: number;

    @Column({ name: "startDate", type: "timestamp", default: () => "CURRENT_TIMESTAMP", nullable: false })
    @Expose()
    startDate?: Date;

    @Column({ name: "endDate", type: "timestamp", default: () => "CURRENT_TIMESTAMP", nullable: false })
    @Expose()
    endDate?: Date;

    @Column({ name: "status", type: "integer", default: status.ACTIVE })
    @Expose()
    status?: number;

    @ManyToOne(() => Person)
    @JoinColumn({ name: "personId", referencedColumnName: "id" })
    Person?: Person;

    @ManyToOne(() => Institution)
    @JoinColumn({ name: "institutionId", referencedColumnName: "id" })
    Institution?: Institution;
}