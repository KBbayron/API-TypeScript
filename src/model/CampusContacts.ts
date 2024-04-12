import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { Expose } from "class-transformer";
import status from "./enums/status";
import ContactInformation from "./ContactInformations";
import Campus from "./Campus";

@Entity({ name: "CampusContacts" })
export default class CampusContact {
    @PrimaryGeneratedColumn({ name: "pk_CampusContact" })
    @Expose()
    id?: number;

    @Column({ name: "contactId", type: "integer", nullable: false })
    @Expose()
    contactId?: number;

    @Column({ name: "campusId", type: "integer", nullable: false })
    @Expose()
    campusId?: number;

    @Column({ name: "description", type: "varchar", nullable: false })
    @Expose()
    description?: string;

    @Column({ name: "status", type: "integer", default: status.ACTIVE })
    @Expose()
    status?: number;

    @ManyToOne(() => ContactInformation)
    @JoinColumn({ name: "contactId", referencedColumnName: "id" })
    ContactInformation?: ContactInformation;

    @ManyToOne(() => Campus)
    @JoinColumn({ name: "campusId", referencedColumnName: "id" })
    Campus?: Campus;
}