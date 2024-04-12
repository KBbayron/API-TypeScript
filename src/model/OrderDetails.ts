import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { Expose } from "class-transformer";
import status from "./enums/status";
import Order from "../model/Orders";
import Product from "../model/Products";

@Entity({ name: "OrderDetails" })
export default class OrderDetail {
    @PrimaryGeneratedColumn({ name: "pk_OrderDetail" })
    @Expose()
    id?: number;

    @Column({ name: "orderId", type: "integer", nullable: false })
    @Expose()
    orderId?: number;

    @Column({ name: "productId", type: "integer", nullable: false })
    @Expose()
    productId?: number;

    @Column({ name: "quantity", type: "integer", nullable: false })
    @Expose()
    quantity?: number;

    @Column({ name: "description", type: "varchar", nullable: false })
    @Expose()
    description?: string;

    @Column({ name: "amount", type: "integer", nullable: false })
    @Expose()
    amount?: number;

    @Column({ name: "status", type: "integer", default: status.ACTIVE })
    @Expose()
    status?: number;

    @ManyToOne(() => Order)
    @JoinColumn({ name: "orderId", referencedColumnName: "id" })
    Order?: Order;

    @ManyToOne(() => Product)
    @JoinColumn({ name: "productId", referencedColumnName: "id" })
    Product?: Product;
}