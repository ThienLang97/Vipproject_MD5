import { UsersService } from './../modules/users/users.service';
import {
  HttpCode,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/auth.dto';
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(body: SignUpDto) {
    const { password, ...rest } = body;
   
    const hashPassword = await argon2.hash(password);

    const newUser = {
      ...rest,
      password: hashPassword,
    };

    await this.userService.createUser(newUser);
    return {
      message: 'Tạo tài khoản thành công',
    };
  }

  async Login(userInfo) {
   
    const user = await this.userService.getUserByUserName(userInfo.userName);
    const isMatch =
      user && (await argon2.verify(user.password, userInfo.password));
    if (!user || !isMatch) {
      throw new HttpException(
        'Tài khoản không chính xác',
        HttpStatus.BAD_REQUEST,
      );
    }

    /** san sinh token  */
    return {
      token: await this.generateAccessToken({
        userName: user.userName,
        email: user.email,
        id: user.user_id,
        role:user.role
      }),
    };
  }

  async generateAccessToken(payload) {
    return this.jwtService.sign(payload, {
      expiresIn: '1d',
      secret: 'token',
    });
  }

  async verifyAccessToken(token) {
    return this.jwtService.verify(token, {
      secret: 'token',
    });
  }
}
