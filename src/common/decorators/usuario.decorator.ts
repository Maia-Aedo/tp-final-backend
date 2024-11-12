import { createParamDecorator, ExecutionContext } from '@nestjs/common';

// Obtiene info del usuario después de codificar token
export const Usuario = createParamDecorator(
    // ctx -> app context
    (data: unknown, ctx: ExecutionContext) => {
        // Obtenemos request
        const request = ctx.switchToHttp().getRequest();
        // De la request obtenemos el user generado en passport
        return request.user
    }
)
