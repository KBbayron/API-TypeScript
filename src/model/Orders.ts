import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { Expose } from "class-transformer";
import status from "./enums/status";
import Client from "../model/Clients";
import OrderStatue from "../model/OrderStatues";
import Employee from "../model/Employees";

@Entity({ name: "Orders" })
export default class Order {
    @PrimaryGeneratedColumn({ name: "pk_Order" })
    @Expose()
    id?: number;

    @Column({ name: "ClientId", type: "integer", nullable: false })
    @Expose()
    ClientsId?: number;

    @Column({ name: "EmployeeId", type: "integer", nullable: false })
    @Expose()
    EmployeeId?: number;

    @Column({ name: "OrderStatueId", type: "integer", nullable: false })
    @Expose()
    OrderStatuesId?: number;

    @Column({ name: "pendingAmount", type: "integer", nullable: false })
    @Expose()
    pendingAmount?: number;

    @Column({ name: "discount", type: "integer", nullable: false })
    @Expose()
    discount?: number;

    @Column({ name: "idPaid", type: "integer", nullable: false })
    @Expose()
    idPaid?: number;

    @Column({ name: "date", type: "timestamp", default: () => "CURRENT_TIMESTAMP", nullable: false })
    @Expose()
    date?: Date;

    @Column({ name: "status", type: "integer", default: status.ACTIVE })
    @Expose()
    status?: number;

    @ManyToOne(() => Client)
    @JoinColumn({ name: "ClientId", referencedColumnName: "id" })
    Client?: Client;

    @ManyToOne(() => Employee)
    @JoinColumn({ name: "EmployeeId", referencedColumnName: "id" })
    Employee?: Employee;

    @ManyToOne(() => OrderStatue)
    @JoinColumn({ name: "OrderStatueId", referencedColumnName: "id" })
    OrderStatue?: OrderStatue;
}