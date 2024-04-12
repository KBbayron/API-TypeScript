import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { Expose } from "class-transformer";
import status from "./enums/status";
import Person from "./Persons";
import ContactInformation from "../model/ContactInformations";

@Entity({ name: "PersonalContacts" })
export default class PersonalContact {
    @PrimaryGeneratedColumn({ name: "pk_PersonalContact" })
    @Expose()
    id?: number;

    @Column({ name: "personId", type: "integer", nullable: false })
    @Expose()
    personId?: number;

    @Column({ name: "contactId", type: "integer", nullable: false })
    @Expose()
    contactId?: number;

    @Column({ name: "description", type: "varchar", nullable: false })
    @Expose()
    description?: string;

    @Column({ name: "status", type: "integer", default: status.ACTIVE })
    @Expose()
    status?: number;

    @Column({ name: "date", type: "timestamp", default: () => "CURRENT_TIMESTAMP", nullable: false })
    @Expose()
    date?: Date;

    @ManyToOne(() => Person)
    @JoinColumn({ name: "personId", referencedColumnName: "id" })
    person?: Person;

    @ManyToOne(() => ContactInformation)
    @JoinColumn({ name: "contactId", referencedColumnName: "id" })
    contact?: ContactInformation;

}