import { Injectable } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { Admin } from './schemas/admin.schema';
import mongoose, { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { genSaltSync, hashSync, compareSync} from 'bcryptjs';

@Injectable()
export class AdminService {
  constructor(@InjectModel(Admin.name) private AdminModel: Model<Admin>) {}
  getHashPassword = (password : string) => {
    var salt = genSaltSync(10);
    var hash = hashSync(password, salt);
    return hash;
  }
  isValidPassword(password : string, hash : string) {
    return compareSync(password, hash);
  }
  async create(createAdminDto: CreateAdminDto) {
    let admin = await this.AdminModel.create({
      firstName : createAdminDto.firstName,
      lastName: createAdminDto.lastName,
      email: createAdminDto.email,
      phoneNumber: createAdminDto.phoneNumber,
      password: this.getHashPassword(createAdminDto.password)
    })
    return admin;
  }

  async findAll() {
    // let result = {}
    let result = await this.AdminModel.find({})
    return {result};
  }

  async findOne(id: string) {
    if(!mongoose.Types.ObjectId.isValid(id)) {
      return "ID admin không đúng";
    }
    let admin = await this.AdminModel.findOne({
      _id: id
    })
    if(admin == null) {
      return "Không tìm thấy admin";
    }
    return admin;
  }

  async findOneByUsername(username: string) {
    return await this.AdminModel.findOne({
      email: username
    })
  }

  async update(updateAdminDto: UpdateAdminDto) {
    let update = await this.AdminModel.updateOne(
      {_id:updateAdminDto._id},
      {
      ...updateAdminDto
      }
      );
      console.log(update);
      return update;
  }

  async remove(id: string) {
    if(!mongoose.Types.ObjectId.isValid(id)) {
      return "ID admin không đúng";
    }
    return await this.AdminModel.deleteOne({_id:id});
  }
}
