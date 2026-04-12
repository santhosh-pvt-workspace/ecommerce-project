import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';
import { format } from 'path';

type UploadType = 'product' | 'banner' | 'avatar';

@Injectable()
export class UploadService {
    constructor(private readonly configService: ConfigService) {
        cloudinary.config({
            cloud_name: this.configService.get<string>('CLOUDINARY_CLOUD_NAME'),
            api_key: this.configService.get<string>('CLOUDINARY_API_KEY'),
            api_secret: this.configService.get<string>('CLOUDINARY_API_SECRET'),
        });
    }

    // 🔥 central config for transformations
    private getUploadOptions(type: UploadType) {
        const options = {
            product: {
                folder: 'products',
                transformation: [
                    { width: 800, height: 800, crop: 'fill' },
                    { quality: 'auto' },
                ],
            },
            banner: {
                folder: 'banners',
                transformation: [
                    { width: 1200, height: 400, crop: 'fill' },
                    { quality: 'auto' },
                ],
            },
            avatar: {
                folder: 'users',
                transformation: [
                    { width: 200, height: 200, crop: 'fill', gravity: 'face' },
                    { quality: 'auto' },
                ],
            },
        };

        return options[type];
    }

    async uploadImage(
        file: Express.Multer.File,
        type: UploadType = 'product',
    ): Promise<{ url: string; publicId: string }> {
        if (!file) {
            throw new InternalServerErrorException('File is required for upload');
        }

        try {
            const options = this.getUploadOptions(type);

            const result = await new Promise<UploadApiResponse>(
                (resolve, reject) => {
                    const stream = cloudinary.uploader.upload_stream(
                        options,
                        (error, result) => {
                            if (error) {
                                return reject(error);
                            }
                            resolve(result as UploadApiResponse);
                        },
                    );

                    stream.end(file.buffer);
                },
            );

            return {
                url: result.secure_url,
                publicId: result.public_id,
            };
        } catch (error) {
            // 🔥 clean + meaningful error
            throw new InternalServerErrorException({
                message: 'Image upload failed',
                reason: error?.message || 'Unknown error from Cloudinary',
            });
        }
    }

    async deleteImage(publicId: string): Promise<{ message: string }> {
        if (!publicId) {
            throw new InternalServerErrorException('publicId is required');
        }

        try {
            await cloudinary.uploader.destroy(publicId);

            return {
                message: 'Image deleted successfully',
            };
        } catch (error) {
            throw new InternalServerErrorException({
                message: 'Image deletion failed',
                reason: error?.message || 'Unknown error from Cloudinary',
            });
        }
    }
}