import { createParamDecorator, ExecutionContext } from '@nestjs/common';

/**
 * Los decoradores sirven para agregar metadatos a clases, métodos y propiedades
 * Permiten odificar el comportamiento total de una clase.
 * 
 * function createParamDecorator obtiene info del usuario después de codificar token
 */
export const Usuario = createParamDecorator(
    // ctx -> app context
    (data: unknown, ctx: ExecutionContext) => {
        // Obtenemos request
        const request = ctx.switchToHttp().getRequest();
        // De la request obtenemos el user generado en passport
        return request.user
    }
)
