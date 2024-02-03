import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './schemas/Product.schema';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';

@Injectable()
export class ProductsService {
  constructor(@InjectModel(Product.name) private productModel: Model<Product>) {}
  async create(createProductDto: CreateProductDto) {
    let product = await this.productModel.create({
      nameProduct : createProductDto.nameProduct,
      price : createProductDto.price,
      discount : createProductDto.discount,
      descriptionProduct : createProductDto.descriptionProduct,
      imageProduct : createProductDto.imageProduct,
      quantity : createProductDto.quantity,
      idCategory : createProductDto.idCategory
    }
    );
    console.log(product);
    return product;
  }

  async findAll() {
    let result = await this.productModel.find({})
    return {result};
  }

  async findOne(id: string) {
    if(!mongoose.Types.ObjectId.isValid(id)) {
      return "ID sản phẩm không đúng";
    }
    let product = await this.productModel.findOne({
      _id: id
    })
    if(product == null) {
      return "Không tìm thấy sản phẩm";
    }
    return product;
  }

  async update(updateProductDto: UpdateProductDto) {
    let update = await this.productModel.updateOne(
      {_id:updateProductDto._id},
      {
      ...updateProductDto
      }
      );
      console.log(update);
      return update;
  }

  async remove(id: string) {
    if(!mongoose.Types.ObjectId.isValid(id)) {
      return "ID sản phẩm không đúng";
    }
    return await this.productModel.deleteOne({_id:id});
  }
}
