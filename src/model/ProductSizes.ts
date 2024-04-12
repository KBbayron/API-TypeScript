import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
import { Expose } from "class-transformer";
import status from "./enums/status";


@Entity({ name: "ProductSizes" })
export default class ProductSize {
    @PrimaryGeneratedColumn({ name: "pk_ProductSize" })
    @Expose()
    id?: number;

    @Column({ name: "productId", type: "varchar", nullable: false })
    @Expose()
    productId?: number;

    @Column({ name: "sizeId", type: "integer", nullable: false })
    @Expose()
    sizeId?: number;

    @Column({ name: "status", type: "integer", default: status.ACTIVE })
    @Expose()
    status?: number;
}