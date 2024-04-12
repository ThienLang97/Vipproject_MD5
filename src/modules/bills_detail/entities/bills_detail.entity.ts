import { BillsEntity } from "src/modules/bills/entities/bill.entity";
import { ProductsEntity } from "src/modules/products/entities/product.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
@Entity({ name: 'bills_detail' })
export class BillsDetailEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => BillsEntity)
  @JoinColumn({ name: 'bills_id' })
  bills_id: BillsEntity;

  @ManyToOne(() => ProductsEntity)
  @JoinColumn({ name: 'products_id' })
  products_id: ProductsEntity;

  @Column()
  quantity: number;
}
