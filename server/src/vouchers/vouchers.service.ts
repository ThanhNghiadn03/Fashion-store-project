import { Injectable } from '@nestjs/common';
import { CreateVoucherDto } from './dto/create-voucher.dto';
import { UpdateVoucherDto } from './dto/update-voucher.dto';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Voucher } from './schemas/voucher.schema';

@Injectable()
export class VouchersService {
  constructor(@InjectModel(Voucher.name) private VoucherModel: Model<Voucher>) {}
  async create(createVoucherDto: CreateVoucherDto) {
    let Voucher = await this.VoucherModel.create({
      idVoucher : createVoucherDto.idVoucher,
      descriptionVoucher: createVoucherDto.description,
      quantity: createVoucherDto.quantity,
      typeVoucher: createVoucherDto.typeVoucher,
      discount: createVoucherDto.discount,
      startDate: new Date(createVoucherDto.startDate),
      endDate: new Date(createVoucherDto.endDate)
    })
    return Voucher;
  }

  async findAll() {
    let result = await this.VoucherModel.find({})
    return {result};
  }

  async findOne(id: string) {
    if(!mongoose.Types.ObjectId.isValid(id)) {
      return "ID voucher bị sai";
    }
    let voucher = await this.VoucherModel.findOne({
      _id: id
    })
    if(voucher == null) {
      return "Không tìm thấy voucher";
    }
    return voucher;
  }

  async update(updateVoucherDto: UpdateVoucherDto) {
    let update = await this.VoucherModel.updateOne(
      {_id:updateVoucherDto._id},
      {
      ...updateVoucherDto
      }
      );
      console.log(update);
      return update;
  }

  async remove(id: string) {
    if(!mongoose.Types.ObjectId.isValid(id)) {
      return "ID voucher không đúng";
    }
    return await this.VoucherModel.deleteOne({_id:id})
  }
}
