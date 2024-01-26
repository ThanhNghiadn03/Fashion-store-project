import { Injectable } from '@nestjs/common';
import { CreateShippingCompanyDto } from './dto/create-shipping-company.dto';
import { UpdateShippingCompanyDto } from './dto/update-shipping-company.dto';
import { ShippingCompany } from './schemas/shipping-company.schema';
import mongoose, { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ShippingCompaniesService {
  constructor(@InjectModel(ShippingCompany.name) private ShippingCompanyModel: Model<ShippingCompany>) {}
  async create(createShippingCompanyDto: CreateShippingCompanyDto) {
    let ShippingCompany = await this.ShippingCompanyModel.create({
      nameCompany : createShippingCompanyDto.name,
      description: createShippingCompanyDto.description,
      emailContact: createShippingCompanyDto.email,
      nameContactPerson: createShippingCompanyDto.nameContactPerson,
      phoneContact: createShippingCompanyDto.phone
    })
    return ShippingCompany;
  }

  async findAll() {
    let listShippingCompanies = await this.ShippingCompanyModel.find({})
    return listShippingCompanies;
  }

  async findOne(id: string) {
    if(!mongoose.Types.ObjectId.isValid(id)) {
      return "ID công ty không đúng";
    }
    let shippingCompany = await this.ShippingCompanyModel.findOne({
      _id: id
    })
    if(shippingCompany == null) {
      return "Không tìm thấy công ty chuyển phát";
    }
    return shippingCompany;
  }

  async update(updateShippingCompanyDto: UpdateShippingCompanyDto) {
    let update = await this.ShippingCompanyModel.updateOne(
      {_id:updateShippingCompanyDto._id},
      {
      ...updateShippingCompanyDto
      }
      );
      console.log(update);
      return update;
  }

  async remove(id: string) {
    if(!mongoose.Types.ObjectId.isValid(id)) {
      return "ID công ty không đúng";
    }
    return await this.ShippingCompanyModel.deleteOne({_id:id})
  }
}
