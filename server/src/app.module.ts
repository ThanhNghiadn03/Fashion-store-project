import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
require('dotenv').config();
// import { UserController } from './user/user.controller';
import { ProductsModule } from './products/products.module';
import { VouchersModule } from './vouchers/vouchers.module';
import { CustomerModule } from './customer/customer.module';
import { CategoriesModule } from './categories/categories.module';
import { RolesModule } from './roles/roles.module';
import { OrderDetailsModule } from './order-details/order-details.module';
import { CartsModule } from './carts/carts.module';
import { EvaluatesModule } from './evaluates/evaluates.module';
import { ShippingCompaniesModule } from './shipping-companies/shipping-companies.module';
import { AuthModule } from './auth/auth.module';
import { AdminModule } from './admin/admin.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/jwt-auth.guard';

@Module({
  imports:  [
    MongooseModule.forRoot(process.env.DB),
    ProductsModule,
    VouchersModule,
    CustomerModule,
    CategoriesModule,
    RolesModule,
    OrderDetailsModule,
    CartsModule,
    EvaluatesModule,
    ShippingCompaniesModule,
    AuthModule,
    AdminModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // {
    //   provide: APP_GUARD,
    //   useClass: JwtAuthGuard,
    // },
  ],
})
export class AppModule {}
