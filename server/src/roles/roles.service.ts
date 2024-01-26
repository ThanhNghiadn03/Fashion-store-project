import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import mongoose, { Model } from 'mongoose';
import { Role } from './schemas/role.schema';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class RolesService {
  constructor(@InjectModel(Role.name) private RoleModel: Model<Role>) {}
  async create(createRoleDto: CreateRoleDto) {
    let role = await this.RoleModel.create({
      nameRole : createRoleDto.name,
      descriptionRole: createRoleDto.description
    })
    return role;
  }

  async findAll() {
    let listRoles = await this.RoleModel.find({})
    return listRoles;
  }

  async findOne(id: string) {
    if(!mongoose.Types.ObjectId.isValid(id)) {
      return "Do not found Role";
    }
    let role = await this.RoleModel.findOne({
      _id: id
    })
    if(role == null) {
      return "Do not found Role";
    }
    return role;
  }

  update(id: number, updateRoleDto: UpdateRoleDto) {
    return `This action updates a #${id} role`;
  }

  remove(id: number) {
    return `This action removes a #${id} role`;
  }
}
