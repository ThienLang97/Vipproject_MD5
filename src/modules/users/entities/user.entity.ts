import { CartEntity } from "src/modules/cart/entities/cart.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

enum Status {
  Active = 'Active',
  Inactive = 'Inactive',
}
enum Role {
    User = 1,
    Admin = 0
}
@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn()
  user_id: number;

  @Column({
    type: 'varchar',
    length: 255,
  })
  userName: string;

  @Column({
    type: 'varchar',
    length: 255,
  })
  password: string;

  @Column({
    type: 'varchar',
    length: 255,
  })
  email: string;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.User,
  })
  role: Role;

  @Column({
    type: 'enum',
    enum: Status,
    default: Status.Active,
  })
  status: "Status";

  @OneToMany(() => CartEntity, (cart) => cart.user)
  cart: CartEntity[];
}
