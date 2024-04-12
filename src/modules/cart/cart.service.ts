import { Injectable } from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, LessThan, LessThanOrEqual, MoreThan, Repository } from 'typeorm';
import { CartEntity } from './entities/cart.entity';
import { UserEntity } from '../users/entities/user.entity';
import { ProductsEntity } from '../products/entities/product.entity';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(CartEntity)
    private cartRepository: Repository<CartEntity>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    @InjectRepository(ProductsEntity)
    private productsRepository: Repository<ProductsEntity>,
  ) {}

  async find(user_id: any): Promise<any | undefined> {
    const check: FindOneOptions<CartEntity> = {
      relations: ['products'],
      where: { user: { user_id } },
    };
    const data = await this.cartRepository.find(check);
    return data;
    // return data
  }
  async addToCart(body: any) {
    const { user_id, products_id } = body;
    const user = await this.userRepository.findOne({
      where: {
        user_id,
      },
    });
    const product = await this.productsRepository.findOne({
      where: {
        products_id,
      },
    });
    //  console.log(user.user_id,product.products_id)
    const cartItem = this.cartRepository.create({
      user: user,
      products: product,
      quantity: 1,
    });
    const savedCartItem = await this.cartRepository.save(cartItem);
    return { message: 'Thêm vào giỏ hàng thành công' };
  }

  async updateCart(body: any, user_id: any) {
    const user = await this.userRepository.findOne({
      where: {
        user_id,
      },
    });
    const product = await this.productsRepository.findOne({
      where: {
        products_id: body.products_id,
      },
    });
    const type = body.type;
    if (type === 'incre') {
      await this.cartRepository.update(
        {
          user,
          products: product,
        },
        {
          quantity: () => 'quantity + 1',
        },
      );
    } else if (type === 'decre') {
      const cart = await this.cartRepository.findOne({
        where: {
          user,
          products: product,
        },
      });

      if (cart && cart.quantity == 1) {
        await this.cartRepository.remove(cart);
      } else {
        await this.cartRepository.update(
          {
            user,
            products: product,
            quantity: MoreThan(1),
          },
          {
            quantity: () => 'quantity - 1',
          },
        );
      }
    }
    
  }

  async deleteCart(user_id: any, products_id: any) {
    //  console.log(body,user_id)
    // console.log(products_id, user_id);
     const user = await this.userRepository.findOne({
       where: {
         user_id,
       },
     });
     const product = await this.productsRepository.findOne({
       where: {
         products_id: products_id,
       },
     });
    
    await this.cartRepository.delete({
      user,
      products: product,
    });
    return 
   
  }

  async deleteAllCart(user_id: any) {
    const user = await this.userRepository.findOne({
      where: {
        user_id,
      },
    });
    await this.cartRepository.delete({
      user,
    });
    return
  }
}
