import { Controller, Get, Post, Body, Patch, Param, Delete, SetMetadata, UseGuards, Put } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@Controller('/api/v1/products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

 @Get('/list')
 @SetMetadata('role', '0')
 @UseGuards(AuthGuard)
  findAll() {
    return this.productsService.findAll();
  }

  @Post("/create")
create(@Body() body:any){
// console.log(body,"body")
  return this.productsService.create(body)
}

@Put("/update/:id")
update(@Body() body:any, @Param("id") param:any){
  return this.productsService.update(body,param)
}

@Delete("/delete/:id")
delete(@Param("id") param:any){
  return this.productsService.delete(param)
}

@Get()
find(){
  return this.productsService.findAll()
}
}
 


