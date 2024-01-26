import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Category } from './schemas/category.schema';
import mongoose, { Model } from 'mongoose';

@Injectable()
export class CategoriesService {
  constructor(@InjectModel(Category.name) private CategoryModel: Model<Category>) {}
  async create(createCategoryDto: CreateCategoryDto) {
    let category = await this.CategoryModel.create({
      nameCategory : createCategoryDto.name,
      descriptionCategory: createCategoryDto.description
    })
    return category;
  }

  async findAll() {
    let listCategories = await this.CategoryModel.find({})
    return listCategories;
  }

  async findOne(id: string) {
    if(!mongoose.Types.ObjectId.isValid(id)) {
      return "ID danh mục không hợp lệ";
    }
    let category = await this.CategoryModel.findOne({
      _id: id
    })
    if(category == null) {
      return "Không tìm thấy danh mục này";
    }
    return category;
  }

  async update(updateCategoryDto: UpdateCategoryDto) {
    let update = await this.CategoryModel.updateOne(
      {_id:updateCategoryDto._id},
      {
      ...updateCategoryDto
      }
      );
      console.log(update);
      return update;
  }

  async remove(id: string) {
    if(!mongoose.Types.ObjectId.isValid(id)) {
      return "ID danh mục không đúng";
    }
    return await this.CategoryModel.deleteOne({_id:id})
  }
}
