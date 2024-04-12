import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { Expose } from "class-transformer";
import status from "./enums/status";
import Institution from "./Institutions";

@Entity({ name: "Commissions" })
export default class Commission {
    @PrimaryGeneratedColumn({ name: "pk_Commission" })
    @Expose()
    id?: number;

    @Column({ name: "institutionId", type: "integer", nullable: false })
    @Expose()
    institutionId?: number;

    @Column({ name: "percentage", type: "integer", nullable: false })
    @Expose()
    percentage?: number;

    @Column({ name: "startDate", type: "timestamp", default: () => "CURRENT_TIMESTAMP", nullable: false })
    @Expose()
    startDate?: Date;

    @Column({ name: "endDate", type: "timestamp", default: () => "CURRENT_TIMESTAMP", nullable: false })
    @Expose()
    endDate?: Date;

    @Column({ name: "status", type: "integer", default: status.ACTIVE })
    @Expose()
    status?: number;

    @ManyToOne(() => Institution)
    @JoinColumn({ name: "institutionsId", referencedColumnName: "id" })
    Institution?: Institution;
}