import { Authorized, Field, ID, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "../../product/entity/product.entity";

@Entity()
@ObjectType()
export class Users extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id!: number;

    @Field(() => String)
    @Column({ type: "varchar", length: 50, nullable: false })
    name!: string;

    @Field(() => String)
    @Column({ type: "varchar", length: 50, nullable: false })
    email!: string;

    @Column({ type: "varchar", length: 50, nullable: false })
    password!: string;

    @Column({ type: "varchar", nullable: false, default: "" })
    accessToken!: string;

    @Column({ type: "varchar", nullable: false, default: "" })
    refreshToken!: string;

    @Column({ type: "varchar", nullable: false, default: "" })
    jwtid!: string;

    @Field(() => String)
    @Column({ type: "varchar", length: 50, nullable: false })
    rol!: string;

    @OneToMany((type) => Product, (products) => products.user)
    products!: Array<Product>;

    @Column({ type: "boolean", nullable: false })
    isConfirmed!: boolean;
}
