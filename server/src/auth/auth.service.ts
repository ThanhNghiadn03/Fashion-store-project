import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AdminService } from 'src/admin/admin.service';
import { CustomerService } from 'src/customer/customer.service';
import { RolesService } from 'src/roles/roles.service';
import { ConfigService } from '@nestjs/config';
import ms from 'ms';
import { Response } from 'express';

@Injectable()
export class AuthService {
    constructor(
        private AdminService: AdminService,
        private jwtService: JwtService,
        private CustomerService: CustomerService,
        private RolesService: RolesService,
        private ConfigService: ConfigService
    ) {}
    async validateAdmin(username: string, pass: string): Promise<any> {
        const admin = await this.AdminService.findOneByUsername(username);
        if(!admin) {
            return null;
        } else {
            const isValidPassword = await this.AdminService.isValidPassword(pass,admin.password);
            if (!isValidPassword) {
                return null;
            }
            const { password, ...result } = admin;
            return result;
        }
    }

    async login(user: any,  response: Response) {
        let mess = '';
        let checkRole = await this.RolesService.findRoleById(user.idRole);
        mess = checkRole + " login";
        const payload = { 
            sub: "token login",
            iss: "from server",
            username: user.email, 
            id: user._id,
            role: checkRole
        };

        const refresh_token = this.createRefreshToken(payload);

        //update user with refresh token

        await this.CustomerService.updateCustomerService(refresh_token,payload.id);

        // set refresh token as cookies

        response.cookie('refresh_token', refresh_token, {
            httpOnly: true,
            maxAge: ms(this.ConfigService.get<string>('JWT_REFRESH_EXPIRE'))
        });

        return {
          access_token: this.jwtService.sign(payload),
          message: mess,
          userData: {
            id: user._id,
            email: user.email,
            role: checkRole
          }
        };
    }


    async validateCustomer(username: string, pass: string): Promise<any> {
        const customer = await this.CustomerService.findCustomerByUsername(username);
        if(!customer) {
            return null;
        } else {
            const isValidPassword = await this.CustomerService.isValidPassword(pass,customer.password);
            if (!isValidPassword) {
                return null;
            }
            const { password, ...result } = customer;
            return result;
        }
    }

    createRefreshToken = (payload) => {
        const refresh_token = this.jwtService.sign(payload, {
            secret: this.ConfigService.get<string>('JWT_REFRESH_TOKEN'),
            expiresIn: ms(this.ConfigService.get<string>('JWT_REFRESH_EXPIRE'))/1000
        });
        return refresh_token;
    }
}
