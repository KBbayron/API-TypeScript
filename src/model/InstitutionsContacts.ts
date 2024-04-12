import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { Expose } from "class-transformer";
import status from "./enums/status";
import Person from "../model/Persons";
import Institution from "../model/Institutions";

@Entity({ name: "InstitutionsContacts" })
export default class InstitutionsContact {
    @PrimaryGeneratedColumn({ name: "pk_InstitutionsContacts" })
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
    @JoinColumn({ name: "personsId", referencedColumnName: "id" })
    Person?: Person;

    @ManyToOne(() => Institution)
    @JoinColumn({ name: "institutionsId", referencedColumnName: "id" })
    Institution?: Institution;
}