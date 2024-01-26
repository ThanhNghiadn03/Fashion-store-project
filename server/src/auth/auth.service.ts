import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AdminService } from 'src/admin/admin.service';

@Injectable()
export class AuthService {
    constructor(
        private AdminService: AdminService,
        private jwtService: JwtService
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

    async login(user: any) {
        const payload = { 
            username: user.email, 
            sub: user._id 
        };
        return {
          access_token: this.jwtService.sign(payload),
        };
      }
}
