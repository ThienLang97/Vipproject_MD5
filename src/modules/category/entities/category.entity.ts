import { ProductsEntity } from "src/modules/products/entities/product.entity";
import {Column, PrimaryGeneratedColumn, Entity, OneToMany} from "typeorm";
@Entity({ name: 'category' })
export class CategoryEntity {
  @PrimaryGeneratedColumn()
  category_id: number;

  @Column({
    type: 'varchar',
    length: 255,
  })
  categoryName: string;
  
  @OneToMany(() => ProductsEntity, (product) => product.category)
  products: ProductsEntity[];
}
