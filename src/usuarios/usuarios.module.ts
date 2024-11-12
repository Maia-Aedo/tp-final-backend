import { Module } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { JwtModule } from '@nestjs/jwt';
import { UsuariosController } from './usuarios.controller';
import { AuthService } from './auth/auth.service';
import { envs } from 'src/config';
import { JwtPassportService } from './auth/jwt-passport.service';

@Module({
  controllers: [UsuariosController],
  providers: [UsuariosService, AuthService, JwtPassport, JwtPassportService],
  imports: [
    JwtModule.register({
      secret: envs.jwt_seed,
      signOptions: { expiresIn: '24h'}
    }),
  ],
})
export class UsuariosModule {}
