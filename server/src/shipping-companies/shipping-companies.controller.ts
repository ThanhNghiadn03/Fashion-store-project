import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ShippingCompaniesService } from './shipping-companies.service';
import { CreateShippingCompanyDto } from './dto/create-shipping-company.dto';
import { UpdateShippingCompanyDto } from './dto/update-shipping-company.dto';

@Controller('shipping-companies')
export class ShippingCompaniesController {
  constructor(private readonly shippingCompaniesService: ShippingCompaniesService) {}

  @Post()
  create(@Body() createShippingCompanyDto: CreateShippingCompanyDto) {
    return this.shippingCompaniesService.create(createShippingCompanyDto);
  }

  @Get()
  findAll() {
    return this.shippingCompaniesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.shippingCompaniesService.findOne(id);
  }

  @Patch()
  update(@Body() updateShippingCompanyDto: UpdateShippingCompanyDto) {
    return this.shippingCompaniesService.update(updateShippingCompanyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.shippingCompaniesService.remove(id);
  }
}
