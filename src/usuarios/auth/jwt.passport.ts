import { Injectable, UnauthorizedException } from '@nestjs/common';
//  El middleware Passport permite interceptar solicitudes, extraer token y validarlo
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PayloadInterface } from 'src/common/payload/payload.dto';
import { envs } from 'src/config';
import { UsuariosService } from '../usuarios.service';

@Injectable()
// Clase heredada de nest
export class JwtPassport extends PassportStrategy(Strategy) {
    constructor(private readonly usuarioService: UsuariosService) {
        super({
            // Extraemos token del header
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            // Pasamos firma para validarlo
            secretOrKey: envs.jwt_seed
        });
    }

    async validate(payload: PayloadInterface) {
        // Retornamos usuario del payload en request
        try {
            return await this.usuarioService.findOne(+payload.sub);
    } catch (err){
        throw new UnauthorizedException('User not found on token');
    }
    }
}