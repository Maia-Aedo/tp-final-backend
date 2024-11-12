import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { GUARD_KEY } from './common/keys/guard.key';
import { JwtGuard } from './usuarios/auth/jwt.guard';

@Module({
  imports: [PrismaModule, UsuariosModule],
  controllers: [AppController],
  providers: [AppService,
    {
      provide: GUARD_KEY,
      useClass: JwtGuard
    }
  ]
})
export class AppModule {}
