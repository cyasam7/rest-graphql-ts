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
    @Column({ type: "varchar", length: 50, nullable: false, array: true })
    permissions!: Array<string>;
}
