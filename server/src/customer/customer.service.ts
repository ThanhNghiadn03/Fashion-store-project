import { Injectable } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Customer } from './schemas/customer.schema';
import { genSaltSync, hashSync } from 'bcryptjs';
@Injectable()
export class CustomerService {
  constructor(@InjectModel(Customer.name) private CustomerModel: Model<Customer>) {}
  getHashPassword = (password : string) => {
    var salt = genSaltSync(10);
    var hash = hashSync(password, salt);
    return hash;
  }
  async create(createCustomerDto: CreateCustomerDto) {
    let customer = await this.CustomerModel.create({
      firstName : createCustomerDto.firstName,
      lastName: createCustomerDto.lastName,
      email: createCustomerDto.email,
      phoneNumber: createCustomerDto.phoneNumber,
      password: this.getHashPassword(createCustomerDto.password)
    })
    return customer;
  }

  async findAll() {
    let listCustomers = await this.CustomerModel.find({})
    return listCustomers;
  }

  async findOne(id: string) {
    if(!mongoose.Types.ObjectId.isValid(id)) {
      return "ID khách hàng không đúng";
    }
    let customer = await this.CustomerModel.findOne({
      _id: id
    })
    if(customer == null) {
      return "Không tìm thấy khách hàng";
    }
    return customer;
  }

  async update(updateCustomerDto: UpdateCustomerDto) {
    let update = await this.CustomerModel.updateOne(
      {_id:updateCustomerDto._id},
      {
      ...updateCustomerDto
      }
      );
      console.log(update);
      return update;
  }

  async remove(id: string) {
    if(!mongoose.Types.ObjectId.isValid(id)) {
      return "ID khách hàng không đúng";
    }
    return await this.CustomerModel.deleteOne({_id:id});
  }
}
