import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CartsService } from './carts.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';

@Controller('carts')
export class CartsController {
  constructor(private readonly cartsService: CartsService) {}

  @Post('create')
  create(@Body() createCartDto: CreateCartDto) {
    return this.cartsService.create(createCartDto);
  }

  @Get()
  findAll() {
    return this.cartsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cartsService.findOne(id);
  }

  @Get('/cartByCustomer/:idCustomer')
  findCartByIDCustomer(@Param('idCustomer') idCustomer: string) {
    return this.cartsService.listCartByIdCustomer(idCustomer);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCartDto: UpdateCartDto) {
    return this.cartsService.update(+id, updateCartDto);
  }

  @Patch(':idProduct/:idCustomer')
  updateQuantity(@Param('idProduct') idProduct: string,@Param('idCustomer') idCustomer: string, @Body() updateCartDto: UpdateCartDto) {
    return this.cartsService.updateQuantity(idCustomer,idProduct,updateCartDto.quantity,updateCartDto.price, updateCartDto.nameProduct,updateCartDto.imageProduct);
  }
  

  @Delete('/:id1/:id2')
  removeProduct(@Param('id1') idCustomer: string,@Param('id2') idProduct: string) {
    return this.cartsService.removeProductIncartByIDCus(idCustomer,idProduct);
  }


  @Get('countInCart/:id')
  countProductInCartByIDCustomer(@Param('id') id: string) {
    return this.cartsService.numberOfProductInCartByIDCustomer(id);
  }
}
