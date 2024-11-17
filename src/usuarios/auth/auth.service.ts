import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { PayloadInterface } from 'src/common/payload/payload.dto';
import { UpdateUsuarioDto } from '../dto/update-usuario.dto';

@Injectable()
// Configuramos header y firma del JWT
export class AuthService {
    // JWT
    constructor(private readonly jwtService: JwtService){}

    /**
     * function createJwt devuelve token (string)
     * function confirmJwt comprueba validez y devuelve payload desestructurado 
     */

    createJwt(usuario: UpdateUsuarioDto): string{
        // Desestructuracion de obj
        const { id: sub, correo, rol } = usuario || {};
        //! Creamos payload
        const payload: PayloadInterface = {
            sub,
            correo,
            rol
        };
        return this.jwtService.sign(payload);
    }

    confirmJwt(token: string): PayloadInterface {
       return this.jwtService.verify(token)
    }
    // --------------------------
    
    // Hash de contraseña
    hashContrasenia(contrasenia: string): Promise<string>{
        const saltOrRounds = 12;
        return bcrypt.hash(contrasenia, saltOrRounds);
    }
    // Identifica si la contraseña es correcta
    comparePasswords( contrasenia: string, hashContrasenia: string): Promise<boolean>{
        return bcrypt.compare(contrasenia, hashContrasenia);
    }
    // --------------------------
}
