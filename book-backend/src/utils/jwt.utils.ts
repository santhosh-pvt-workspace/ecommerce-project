import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import jwt from 'jsonwebtoken';

@Injectable()
export class AppJwtService{

    constructor(
        private readonly configService : ConfigService
    ){}

    private get secret(){
        return this.configService.getOrThrow("SECRET_KEY")
    }

    private get expiresIn(){
        return this.configService.getOrThrow("EXPIRES_IN")
    }

    sign(payload: { id: string; email: string; }){
        return jwt.sign(payload, this.secret,{
            expiresIn : this.expiresIn,

        })
    }

    verify(token : string){
        try{
            return jwt.verify(token, this.secret)
        }
        catch{
            return null;
        }
    }

}