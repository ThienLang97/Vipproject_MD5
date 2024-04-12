import { Module } from '@nestjs/common';
import { BillsService } from './bills.service';
import { BillsController } from './bills.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BillsEntity } from './entities/bill.entity';
import { UserEntity } from '../users/entities/user.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({imports : [TypeOrmModule.forFeature([BillsEntity,UserEntity]),AuthModule],
  controllers: [BillsController],
  providers: [BillsService],
  exports:[BillsService]
})
export class BillsModule {}
