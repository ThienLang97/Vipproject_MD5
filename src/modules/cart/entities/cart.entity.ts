import { ProductsEntity } from 'src/modules/products/entities/product.entity';
import { UserEntity } from 'src/modules/users/entities/user.entity';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'cart' })
export class CartEntity {
  @PrimaryGeneratedColumn()
  cart_id: number;

  @Column()
  quantity: number;

  @ManyToOne(() => UserEntity, (user) => user.cart)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

 
  @ManyToOne(() => ProductsEntity, (product) => product.cart)
  @JoinColumn({ name: 'products_id' })
  products: ProductsEntity;
}
