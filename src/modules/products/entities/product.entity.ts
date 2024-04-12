import { CategoryEntity } from 'src/modules/category/entities/category.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { CartEntity } from 'src/modules/cart/entities/cart.entity';

@Entity({ name: 'products' })
export class ProductsEntity {
  @PrimaryGeneratedColumn()
  products_id: number;

  @Column({
    type: 'varchar',
    length: 255,
  })
  productName: string;

  @Column({
    type: 'longtext',
  })
  productImg: string;

  @Column({
    type: 'int',
  })
  productPrice: number;

  @Column({
    type: 'int',
  })
  productStock: number;

  @ManyToOne(() => CategoryEntity, (category) => category.products)
  @JoinColumn({ name: 'category_id' })
  category: CategoryEntity;

  @Column({type:"varchar",length:255})
  categoryName:string

  @OneToMany(()=>CartEntity,(cart)=>cart.products)
  cart:CartEntity[]
}
