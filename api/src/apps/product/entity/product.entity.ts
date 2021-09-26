import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    BaseEntity,
    ManyToOne,
} from "typeorm";
import { Field, Int, ObjectType, ID } from "type-graphql";
import { Users } from "../../auth";

@Entity()
@ObjectType()
export class Product extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id: number | undefined;

    @Field(() => String)
    @Column("varchar")
    name: string | undefined;

    @Field(() => Int)
    @Column({ type: "int", default: 0 })
    quantity: number | undefined;

    @Field(() => String)
    @CreateDateColumn({ type: "timestamp" })
    createdAt: string | undefined;

    @Field(() => Users)
    @ManyToOne(() => Users, (user) => user.products)
    user!: Users;
}
