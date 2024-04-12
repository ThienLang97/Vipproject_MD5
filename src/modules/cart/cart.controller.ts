import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';

@Controller('/api/v1/cart/')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get('/:id')
  findAll(@Param('id') user_id: any) {
    return this.cartService.find(user_id);
  }

  @Post()
  addToCart(@Body() body: any) {
    // console.log(body)
    return this.cartService.addToCart(body);
  }

  @Patch('/update/:id')
  updateCart(@Body() body: any, @Param('id') param: any) {
    console.log(body, param);
    return this.cartService.updateCart(body, param);
  }

  @Delete('/delete/:id')
  deleteCart(
    @Param('id') user_id: string,
    @Query('products_id') products_id: string,
  ) {
    // console.log(user_id);
    // console.log(products_id);
    return this.cartService.deleteCart(user_id, products_id);
  }

  @Delete("/user/:id")
  deleteAllCart(@Param('id') user_id: any) {
    console.log(user_id)
  return this.cartService.deleteAllCart(user_id)
  }
}
