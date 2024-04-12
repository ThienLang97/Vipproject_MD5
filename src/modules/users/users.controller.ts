import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, SetMetadata, Put } from '@nestjs/common';
import { UsersService } from './users.service';

import { AuthGuard } from 'src/auth/guards/auth.guard';

@Controller('api/v1/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/list')
  @SetMetadata('role', '0')
  @UseGuards(AuthGuard)
  async getAll() {
    return this.usersService.getAll();
  }

  @Get("/:id")
  async getOne(@Param('user_id') user_id: any) {
   
  }
  @Put("/:id")
  async update(@Param('id') user_id: any, @Body("status") status:any) {
    return this.usersService.update(user_id,status);
  }
  @Delete("/:id")
  async remove(@Param('id') user_id: any) {
    return this.usersService.remove(user_id);
  }
}
