import { Module } from '@nestjs/common';
import { VouchersService } from './vouchers.service';
import { VouchersController } from './vouchers.controller';
import { Voucher, VoucherSchema } from './schemas/voucher.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([{ name: Voucher.name, schema: VoucherSchema }])],
  controllers: [VouchersController],
  providers: [VouchersService]
})
export class VouchersModule {}
