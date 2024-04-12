import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BillsDetailService } from './bills_detail.service';
import { CreateBillsDetailDto } from './dto/create-bills_detail.dto';
import { UpdateBillsDetailDto } from './dto/update-bills_detail.dto';

@Controller('/api/v1/billDetail')
export class BillsDetailController {
  constructor(private readonly billsDetailService: BillsDetailService) {}

  @Post('/create')
  create(@Body() body: any) {
    // console.log(body)
    return this.billsDetailService.create(body);
  }

  @Get("detail/:id")
  getOne(@Param('id') id: any) {
    // console.log(id)
    return this.billsDetailService.getOne(id)
  }
}
