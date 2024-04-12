import { Controller, Get, Post, Body, Patch, Param, Delete, SetMetadata, UseGuards } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@Controller('/api/v1/category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}
  @Get('/list')
  @SetMetadata('role', '0')
  @UseGuards(AuthGuard)
  async getAll() {
    return this.categoryService.getAll();
  }

  @Post('/addnew')
  async addNew(@Body() body: any) {
    return this.categoryService.addNew(body);
  }

  @Delete('/remove/:id')
  async removeCate(@Param('id') param: any) {
    // console.log(param)
    return this.categoryService.removeCate(param);
  }

  @Patch('/update/:id')
  async updateCate(@Param('id') param: any, @Body() body: any) {
    // console.log(param,body)
    return this.categoryService.updateCate(param, body);
  }

  @Get()
  async getAllCate() {
    return this.categoryService.getAll();
  }
}
