import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './modules/users/entities/user.entity';
import { UsersModule } from './modules/users/users.module';
import { ProductsModule } from './modules/products/products.module';
import { ProductsEntity } from './modules/products/entities/product.entity';
import { CategoryEntity } from './modules/category/entities/category.entity';
import { CartEntity } from './modules/cart/entities/cart.entity';
import { BillsEntity } from './modules/bills/entities/bill.entity';
import { BillsDetailEntity } from './modules/bills_detail/entities/bills_detail.entity';
import { AuthModule } from './auth/auth.module';
import { CategoryModule } from './modules/category/category.module';
import { CartModule } from './modules/cart/cart.module';
import { BillsModule } from './modules/bills/bills.module';
import { BillsDetailModule } from './modules/bills_detail/bills_detail.module';



@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    database: 'vipproject5',
    entities: [UserEntity,ProductsEntity,CategoryEntity,CartEntity,BillsEntity,BillsDetailEntity],
    synchronize: true
  }),UsersModule,ProductsModule, AuthModule,CategoryModule,CartModule,BillsModule,BillsDetailModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
