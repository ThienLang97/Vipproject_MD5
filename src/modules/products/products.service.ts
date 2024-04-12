import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductsEntity } from './entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductsEntity)
    private readonly productsRepository: Repository<ProductsEntity>,
  ) {}
  async findAll() {
    const newArr = await this.productsRepository.find();
    const newArr2 = newArr.sort((a, b) => {
      return b.products_id - a.products_id;
    });
    return newArr2;
  }
  async create(body) {
    // console.log(body)
    try {
      const newProduct = this.productsRepository.create(body);
      const process = await this.productsRepository.save(newProduct);
      return { message: 'Thêm vào thành công' };
    } catch (error) {
      return { message: 'Đã xảy ra lỗi' };
    }
  }
  async update(body, id) {
    //  console.log(body, 'body');
    //  console.log(id);
    const process = this.productsRepository.update(id, body);
    return { message: 'Cập nhật thành công' };
  }

  async delete(id) {
    // console.log(id,"id dele")
    const process = await this.productsRepository.delete(id);
    return { message: 'Xóa thành công' };
  }

  find() {
    return this.productsRepository.find();
  }
}
