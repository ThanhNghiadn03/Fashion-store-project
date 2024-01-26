import { Module } from '@nestjs/common';
import { ShippingCompaniesService } from './shipping-companies.service';
import { ShippingCompaniesController } from './shipping-companies.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ShippingCompany, ShippingCompanySchema } from './schemas/shipping-company.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: ShippingCompany.name, schema: ShippingCompanySchema }])],
  controllers: [ShippingCompaniesController],
  providers: [ShippingCompaniesService]
})
export class ShippingCompaniesModule {}
