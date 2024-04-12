import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from '../modules/users/users.service';
import { SignUpDto } from './dto/auth.dto';

@Controller('api/v1/auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,

    private readonly userService: UsersService,
  ) {}

  @Post('sign-up')
  async signUp(@Body() body: SignUpDto) {
    
    const  userName  = body.userName;
    /** kiem tra email co ton tai bd hay khong */
    const user = await this.userService.getUserByUserName(userName);

    if (user) {
      throw new HttpException('Tên tài khoản đã tồn tại', HttpStatus.BAD_REQUEST);
    }
    return this.authService.signUp(body);
  }

  @Post('login')
  @HttpCode(201)
  async signIn(@Body() body) {
    /**  */
    
    const data = await this.authService.Login(body);
    const user = await this.userService.getUserByUserName(body.userName);
if(user.status === "Active"){
   return {
     message: 'Đăng nhập thành công',
     ...data,
     result: user,
   };
}else{

  throw new HttpException('Tài khoản đã bị khóa', HttpStatus.BAD_REQUEST);
}
  }
}
