import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, SetMetadata } from '@nestjs/common';
import { BillsService } from './bills.service';
import { CreateBillDto } from './dto/create-bill.dto';
import { UpdateBillDto } from './dto/update-bill.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@Controller('/api/v1/bills')
export class BillsController {
  constructor(private readonly billsService: BillsService) {}

  @Post('/create')
  create(@Body() body: any) {
    // console.log(body)
    return this.billsService.create(body);
  }

  @Get('/list')
  @SetMetadata('role', '0')
  @UseGuards(AuthGuard)
  async getAll() {
    return this.billsService.getAll();
  }

  @Delete('/delete/:id')
 
  async delete(@Param('id') id: string) {
    return this.billsService.delete(id);
  }

  @Patch("/changeStatus/:id")
  changeStatus(@Param() param:any, @Body() body:any) {
    // console.log(body)
    return this.billsService.changeStatus(param,body)
  }
  
  @Patch("/changeStatus2/:id")
  changeStatus2(@Param() param:any, @Body() body:any) {
    // console.log(body)
    return this.billsService.changeStatus2(param,body)
  }

  @Get("/:id")
  getOne(@Param("id") param:any) {
    // console.log(param)
    return this.billsService.getOne(param);
  }

  @Patch("/changeStatus3/:id")
  changeStatus3(@Param() param:any, @Body() body:any) {
    // console.log(param,body)
    return this.billsService.changeStatus3(param,body)
  }
}
