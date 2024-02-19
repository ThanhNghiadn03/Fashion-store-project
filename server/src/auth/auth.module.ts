import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AdminModule } from 'src/admin/admin.module';
import { CustomerModule } from 'src/customer/customer.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './authentication/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './authentication/jwt.strategy';
import ms from 'ms';
import { RolesModule } from 'src/roles/roles.module';
@Module({
  imports: [
    AdminModule,
    CustomerModule, 
    PassportModule,
    RolesModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_ACCESS_TOKEN'),
        signOptions: {
            expiresIn: ms(configService.get<string>('JWT_EXPIRE')),
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy, ConfigService],
  exports : [AuthService]
})
export class AuthModule {}
