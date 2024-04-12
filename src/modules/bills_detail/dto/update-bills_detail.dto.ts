import { PartialType } from '@nestjs/mapped-types';
import { CreateBillsDetailDto } from './create-bills_detail.dto';

export class UpdateBillsDetailDto extends PartialType(CreateBillsDetailDto) {}
