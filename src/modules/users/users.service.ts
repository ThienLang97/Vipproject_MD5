import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
  ) {}
  getUserByUserName(userName: string) {
    return this.usersRepository.findOne({
      where: {
        userName,
      },
    });
  }

  createUser(user) {
    return this.usersRepository
      .createQueryBuilder('users')
      .insert()
      .into(UserEntity)
      .values(user)
      .execute();
  }

   getAll() {
    return this.usersRepository.find();
  }

 async update(user_id:any,status:any):Promise<any> {

 const updatedUser = await this.usersRepository.update(user_id, { status: status });
 return {message:"Chuyển đổi trạng thái thành công"}
  }

  async remove(user_id: any):Promise<any> {
    const process = await this.usersRepository.delete(user_id);
    return {message:"Xóa người dùng thành công"}
  }
}
