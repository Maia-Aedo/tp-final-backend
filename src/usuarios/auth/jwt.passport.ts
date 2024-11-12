import { Injectable } from '@nestjs/common';
//  El middleware Passport permite interceptar solicitudes, extraer token y validarlo
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PayloadInterface } from 'src/common/payload/payload.dto';
import { envs } from 'src/config';

@Injectable()
// Clase heredada de nest
export class JwtPassport extends PassportStrategy(Strategy) {
    constructor() {
        super({
            // Extraemos token del header
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            // Pasamos firma para validarlo
            secretOrKey: envs.jwt_seed
        })
    }
    validate(payload: PayloadInterface) {
        // Retornamos usuario del payload en request
        return { ...payload };
    }
}
