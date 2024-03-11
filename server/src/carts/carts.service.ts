import { Injectable } from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Cart } from './schemas/cart.schema';
import mongoose, { Model } from 'mongoose';

@Injectable()
export class CartsService {
  constructor(@InjectModel(Cart.name) private cartModel: Model<Cart>) {}
  async create(createCartDto: CreateCartDto) {
    let cart = await this.cartModel.create({
      idCustomers: createCartDto.idCustomers,
      idProduct: createCartDto.idProduct,
      idOrder: createCartDto.idOrder,
      items: {
        quantity: createCartDto.quantity,
        price: createCartDto.price,
        imageProduct: createCartDto.imageProduct,
        nameProduct: createCartDto.nameProduct
      }
    })
    return cart;
  }

  async findAll() {
    let result = await this.cartModel.find({});
    return {result};
  }

  async findOne(id: string) {
    if(!mongoose.Types.ObjectId.isValid(id)) {
      return "ID hàng trong cart không đúng";
    }
    let cart = await this.cartModel.findOne({
      _id: id
    })
    if(cart == null) {
      return "Không tìm thấy hàng này trong cart";
    }
    return cart;
  }

  update(id: number, updateCartDto: UpdateCartDto) {
    return `This action updates a #${id} cart`;
  }

  async remove(id: string) {
    if(!mongoose.Types.ObjectId.isValid(id)) {
      return "ID hàng trong cart không đúng";
    }
    return await this.cartModel.deleteOne({_id:id});
  }

  async numberOfProductInCartByIDCustomer(id: string) {
    let result = await this.cartModel.find({idCustomers: id});
    let count =0;
    if(result) {
      count = result.length;
    }
    console.log('count: ',count);
    return count;
  }

  removeProductIncartByIDCus = async(idCustomer: string, idProduct: string) => {
    let result = await this.cartModel.deleteOne({
      idCustomers: idCustomer,
      idProduct: idProduct
    })
    return result;
  }

  updateQuantity = async(idCustomers: string, idProduct: string, quantity: number, price: number, name: string, img: string) =>{
    
    let result = await this.cartModel.updateOne(
    {
      idCustomers, idProduct
    }, 
    {
      items: {
        quantity: quantity,
        price: price,
        nameProduct: name,
        imageProduct: img
      }
    }
    )
    return result;
  }

  listCartByIdCustomer = async(idCustomers: string) => {
    let result = await this.cartModel.find({
      idCustomers: idCustomers
    })
    return result;
  }
}

