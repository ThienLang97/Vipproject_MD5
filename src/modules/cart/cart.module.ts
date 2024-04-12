import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartEntity } from './entities/cart.entity';
import { UserEntity } from '../users/entities/user.entity';
import { ProductsEntity } from '../products/entities/product.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({imports: [TypeOrmModule.forFeature([CartEntity,UserEntity,ProductsEntity]),AuthModule,],
  controllers: [CartController],
  providers: [CartService],
  exports: [CartService],
})
export class CartModule {}
