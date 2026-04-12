import { ConfigService } from '@nestjs/config';
import { v2 as cloudinary } from 'cloudinary';


export const configCloudinary = (ConfigService: ConfigService) => {
    cloudinary.config({
        cloud_name: ConfigService.getOrThrow<string>('CLOUDINARY_CLOUD_NAME'),
        api_key: ConfigService.getOrThrow<string>('CLOUDINARY_API_KEY'),
        api_secret: ConfigService.getOrThrow<string>('CLOUDINARY_API_SECRET')
    });

    return cloudinary;
}