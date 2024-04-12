import { Injectable } from '@nestjs/common';
import { CreateBillsDetailDto } from './dto/create-bills_detail.dto';
import { UpdateBillsDetailDto } from './dto/update-bills_detail.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BillsEntity } from '../bills/entities/bill.entity';
import { Repository } from 'typeorm';
import { BillsDetailEntity } from './entities/bills_detail.entity';
import { UserEntity } from '../users/entities/user.entity';
import { ProductsEntity } from '../products/entities/product.entity';

@Injectable()
export class BillsDetailService {
  @InjectRepository(BillsEntity)
  private billsRepository: Repository<BillsEntity>;

  @InjectRepository(BillsDetailEntity)
  private billsDetailRepository: Repository<BillsDetailEntity>;
  @InjectRepository(UserEntity)
  private userRepository: Repository<UserEntity>;
  @InjectRepository(ProductsEntity)
  private productsRepository: Repository<ProductsEntity>;
  async create(body: any) {
    console.log(body.cartList, 'haha');
    // console.log(body.bills_id);

    const bills_id = body.bills_id; 

    const bills = await this.billsRepository.findOne({
      where: {
        bills_id: bills_id,
      },
    });

    for (const item of body.cartList) {
      const product = await this.productsRepository.findOne({
        where: {
          products_id: item.products_id,
        },
      });
// console.log(product,"prrrrrrr")
      const billsDetail = this.billsDetailRepository.create({
        bills_id: bills,
        products_id: product,
        quantity: item.quantity,
      });

      await this.billsDetailRepository.save(billsDetail);
    }
  }
  async getOne(bills_id: any) {
    // console.log(bills_id);

    return this.billsDetailRepository.find({
      where: {
        bills_id: bills_id,
      },
      relations: ['products_id'],
    });
  }
}
