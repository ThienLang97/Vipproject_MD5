import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from './entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
  ) {}

  getAll() {
    return this.categoryRepository.find();
  }

 async addNew(body){
    const newCategory = await this.categoryRepository.create({categoryName:body.name});
    await this.categoryRepository.save(newCategory);
    return
  }

  async removeCate(category_id:any){
    const process = await this.categoryRepository.delete(category_id);
    // return process
  }

  async updateCate(category_id,body){
    console.log(category_id,body.name)
    const process = await this.categoryRepository.update(category_id, {categoryName:body.name});
    // return process
  }
}
