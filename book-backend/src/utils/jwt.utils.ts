import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AppJwtService {

    constructor(
        private readonly jwtService: JwtService
    ) { }

    sign(payload: { id: string; email: string; }) {
        return this.jwtService.sign(payload);
    }

    verify(token: string) {
        try {
            return this.jwtService.verify(token);
        } catch {
            return null;
        }
    }

}