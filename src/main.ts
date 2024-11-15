import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { envs } from './config';
import { HttpExceptionFilter } from './common/filters/http.exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // para mejorar los Logs usamos Logger
  const logger = new Logger('Main');
  // colocamos el filtro de exceptiones de manera global, para todas las rutas:
  app.useGlobalFilters(new HttpExceptionFilter());
  // agregamos un prefix a los endpoint 
  app.useGlobalPipes(
    new ValidationPipe({
      // permite solo el ingreso de propiedades seteadas en los Dto
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  // usamos el port desde el env
  await app.listen(envs.port);

  Logger.log(`Server running on port ${envs.port}`);
}
bootstrap();
