import { Injectable } from '@nestjs/common';
import { CreateBillDto } from './dto/create-bill.dto';
import { UpdateBillDto } from './dto/update-bill.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../users/entities/user.entity';
import { Equal, Repository } from 'typeorm';
import { BillsEntity, Status } from './entities/bill.entity';

@Injectable()
export class BillsService {
  @InjectRepository(BillsEntity)
  private billsRepository: Repository<BillsEntity>;

  @InjectRepository(UserEntity)
  private userRepository: Repository<UserEntity>;
  async create(body: any) {
    // console.log(body,"body")
    const user = await this.userRepository.findOne({
      where: {
        user_id: body.user_id,
      },
    });
    const newBill = this.billsRepository.create({
      user: user,
      total: body.total,
      receiver: body.receiver,
      address: body.address,
      phoneNumber: body.phone,
      createdAt: new Date(),
      status: Status.Ongoing,
    });
    return this.billsRepository.save(newBill);
  }

  async getAll() {
    return this.billsRepository.find({ relations: ['user'] });
  }

  async delete(bills_id: any) {
    return this.billsRepository.delete(bills_id);
  }
  async changeStatus(param: any, id: any) {
    console.log(param, 'param');
    console.log(id, 'id');
    const bills = await this.billsRepository.findOne({
      where: {
        bills_id: param.id,
      },
    });

    if (!bills) {
      throw new Error('Invalid bills_id');
    }

    bills.status = id.status;

    await this.billsRepository.save(bills);
  }

  async changeStatus2(param: any, id: any) {
    const bills = await this.billsRepository.findOne({
      where: {
        bills_id: param.id,
      },
    });

    if (!bills) {
      throw new Error('Invalid bills_id');
    }

    bills.status = id.status;

    await this.billsRepository.save(bills);
  }

  async getOne(param: any) {
    const user_id = +param;
    const bills = await this.billsRepository.find({
      where: {
        user: Equal(user_id),
      },
    });

    return bills;
  }

  async changeStatus3(param: any, body: any) {
    const user_id = param;
    const { status, bills_id } = body;
console.log(user_id,status,bills_id)
    const bill = await this.billsRepository.findOne({
      where: {
        bills_id: bills_id,
        user: Equal(user_id.id),
      },
    });
    bill.status = status;
    await this.billsRepository.save(bill);

   
    return 
  }
}
