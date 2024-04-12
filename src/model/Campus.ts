import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { Expose } from "class-transformer";
import status from "./enums/status";
import Corporation from "./Corporations";

@Entity({ name: "Campus" })
export default class Campus {
    @PrimaryGeneratedColumn({ name: "pk_Campus" })
    @Expose()
    id?: number;

    @Column({ name: "corporationId", type: "integer", nullable: false })
    @Expose()
    corporationId?: number;

    @Column({ name: "name", type: "varchar", nullable: false })
    @Expose()
    name?: string;

    @Column({ name: "code", type: "varchar", nullable: false })
    @Expose()
    code?: string;

    @Column({ name: "status", type: "integer", default: status.ACTIVE })
    @Expose()
    status?: number;

    @ManyToOne(() => Corporation)
    @JoinColumn({ name: "corporationId", referencedColumnName: "id" })
    Corporation?: Corporation;
}