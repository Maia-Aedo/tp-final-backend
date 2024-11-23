import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from 'src/common/keys/public.key'

@Injectable()
// Clase heredada desde AuthGuard usando jwt
export class JwtGuard extends AuthGuard('jwt') implements CanActivate {
  /**
   * Los guards retornan boolean, si es true otorga acceso, si es false bloquea y muestra error 401 (unauthorized)
   * Comprueba validez del token
   */

  constructor(private readonly reflector: Reflector){
    super()
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    //  Obtenemos metadatos de las rutas
    const isPublic = this.reflector.getAllAndOverride<boolean>(
      // Comparamos con key creada
      IS_PUBLIC_KEY,
      [context.getHandler(), context.getClass()]
    );
    if(isPublic){
      // Si la ruta tiene el metadato, permite acceso
      return true;
    }
    // Sino, activa passport
    return super.canActivate(context);
  }
}
