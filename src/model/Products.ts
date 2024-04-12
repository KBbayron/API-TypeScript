import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { Expose } from "class-transformer";
import status from "./enums/status";
import ProductCategorie from "../model/ProductCategories";
import Institution from "../model/Institutions";

@Entity({ name: "Products" })
export default class Product {
    @PrimaryGeneratedColumn({ name: "pk_Product" })
    @Expose()
    id?: number;

    @Column({ name: "categoryId", type: "integer", nullable: false })
    @Expose()
    categoryId?: number;

    @Column({ name: "institutionId", type: "integer", nullable: false })
    @Expose()
    institutionId?: number;

    @Column({ name: "name", type: "varchar", nullable: false })
    @Expose()
    name?: string;

    @Column({ name: "description", type: "varchar", nullable: false })
    @Expose()
    description?: string;

    @Column({ name: "image", type: "varchar", nullable: false })
    @Expose()
    image?: string;

    @Column({ name: "status", type: "integer", default: status.ACTIVE })
    @Expose()
    status?: number;

    @ManyToOne(() => ProductCategorie)
    @JoinColumn({ name: "categoryId", referencedColumnName: "id" })
    ProductCategories?: ProductCategorie;

    @ManyToOne(() => Institution)
    @JoinColumn({ name: "institutionsId", referencedColumnName: "id" })
    Institution?: Institution;
}