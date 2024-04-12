import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { Expose } from "class-transformer";
import status from "./enums/status";
import Order from "./Orders";
import PaidType from "./PaidTypes";

@Entity({ name: "OrderPaids" })
export default class OrderPaid {
    @PrimaryGeneratedColumn({ name: "pk_OrderPaid" })
    @Expose()
    id?: number;

    @Column({ name: "ClientsId", type: "integer", nullable: false })
    @Expose()
    typeId?: number;

    @Column({ name: "OrderId", type: "integer", nullable: false })
    @Expose()
    orderId?: number;

    @Column({ name: "PaidTypeId", type: "integer", nullable: false })
    @Expose()
    paidTypeId?: number;

    @Column({ name: "amount", type: "integer", nullable: false })
    @Expose()
    amount?: number;

    @Column({ name: "status", type: "integer", default: status.ACTIVE })
    @Expose()
    status?: number;

    @ManyToOne(() => Order)
    @JoinColumn({ name: "OrderId", referencedColumnName: "id" })
    Order?: Order;

    @ManyToOne(() => PaidType)
    @JoinColumn({ name: "PaidTypeId", referencedColumnName: "id" })
    PaidTypes?: PaidType;
}