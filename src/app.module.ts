import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { GUARD_KEY } from './common/keys/guard.key';
import { JwtGuard } from './usuarios/auth/jwt.guard';
import { ProductosModule } from './productos/productos.module';

@Module({
  imports: [PrismaModule, UsuariosModule, ProductosModule],
  controllers: [AppController],
  providers: [AppService,
    {
      provide: GUARD_KEY,
      useClass: JwtGuard
    }
  ]
})
export class AppModule {}
