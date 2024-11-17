import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { envs } from './config';
import { HttpExceptionFilter } from './common/filters/http.exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Para mejorar los Logs usamos Logger
  const logger = new Logger('Main');
  // Colocamos el filtro de exceptiones de manera global, para todas las rutas:
  app.useGlobalFilters(new HttpExceptionFilter());

  // agregamos un prefix a los endpoint 
  app.setGlobalPrefix('api/v1');

  // GlobalPipes para validaciones
  app.useGlobalPipes(
    new ValidationPipe({
      // Permite solo el ingreso de propiedades seteadas en los Dto
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  // Usamos el port desde el env
  await app.listen(envs.port);

  logger.log(`Server running on port ${envs.port}`);
}
bootstrap();
