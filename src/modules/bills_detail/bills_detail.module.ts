import { Module } from '@nestjs/common';
import { BillsDetailService } from './bills_detail.service';
import { BillsDetailController } from './bills_detail.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BillsDetailEntity } from './entities/bills_detail.entity';
import { BillsEntity } from '../bills/entities/bill.entity';
import { BillsModule } from '../bills/bills.module';
import { UserEntity } from '../users/entities/user.entity';
import { ProductsEntity } from '../products/entities/product.entity';

@Module({imports : [TypeOrmModule.forFeature([BillsDetailEntity,BillsEntity,UserEntity,ProductsEntity]),BillsModule],
  controllers: [BillsDetailController],
  providers: [BillsDetailService],
})
export class BillsDetailModule {}
