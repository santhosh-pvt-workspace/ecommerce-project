import { applyDecorators, Type } from '@nestjs/common';
import {
    ApiBody,
    ApiOperation,
    ApiResponse,
    ApiBadRequestResponse,
    ApiUnauthorizedResponse,
    ApiInternalServerErrorResponse,
} from '@nestjs/swagger';

interface ApiDocOptions {
    summary: string;
    description?: string;

    bodyType?: Type<any>;
    successType?: Type<any>;

    successStatus?: number;

    isArray?: boolean;
}

export function ApiDoc(options: ApiDocOptions) {
    return applyDecorators(
        ApiOperation({
            summary: options.summary,
            description: options.description,
        }),

        options.bodyType
            ? ApiBody({
                type: options.bodyType,
            })
            : (target: any, key?: any, desc?: any) => desc,

        ApiResponse({
            status: options.successStatus || 200,
            type: options.successType,
            isArray: options.isArray || false,
        }),

        ApiBadRequestResponse({
            description: 'Bad Request',
        }),

        ApiUnauthorizedResponse({
            description: 'Unauthorized',
        }),

        ApiInternalServerErrorResponse({
            description: 'Internal Server Error',
        }),
    );
}