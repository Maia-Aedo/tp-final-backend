<p> Trabajo Práctico Evaluativo: Servidor Básico con NestJS
Objetivo:
Crear una aplicación de servidor utilizando NestJS que permita gestionar un
sistema de inventario básico con usuarios y productos.
</p>

## Descripción

Este README proporciona instrucciones detalladas para la instalación y ejecución de un proyecto NestJS utilizando Prisma como ORM, JOI para la validación de variables de entorno, y JWT para la autenticación de usuarios.

## Requisitos previos

Antes de comenzar, asegúrate de tener instalados los siguientes programas en tu entorno de desarrollo:

Node.js (recomendado versión 18 o superior)
npm (viene con Node.js)
Base de datos (como PostgreSQL, MySQL o SQLite)

## Pasos para la instalación y dependecias

```bash
$ npm install
```

## Configurar las variables de entorno
Crea un archivo .env en la raíz del proyecto y define tus variables de entorno, por ejemplo:
```bash
# development
$ PORT=3000
DATABASE_URL="postgresql://usuario:contraseña@localhost:5432/mi_base_de_datos"
JWT_SECRET=mi-secreto-de-jwt

- PORT: Puerto en el que se ejecutará tu servidor.
- DATABASE_URL: URL de conexión a tu base de datos.
- JWT_SECRET: Clave secreta para la firma de tokens JWT.
```

# Configurar Prisma
```bash
# Esto generará los archivos necesarios (schema.prisma, .env, etc.). Luego, configura tu base de datos en el archivo .env y define tu esquema en schema.prisma.
$ npx prisma init
```

# Crear las migraciones de la base de datos
```bash
## Para crear las tablas en la base de datos, ejecuta el siguiente comando:
$ npx prisma migrate dev --name init
# Este comando aplicará las migraciones y generará el cliente Prisma.
```
# Configuración de Prisma y módulos
```bash
## En tu proyecto, debes crear un módulo de Prisma que exporte los servicios necesarios. Ejecuta los siguientes comandos para generar los archivos:
$ nest g mo prisma
$ nest g s prisma

## Luego, en tu archivo prisma.service.ts, conecta la base de datos usando Prisma y crea un servicio para interactuar con ella.
```
## Configuración de JOI para validar las variables de entorno
```bash
## Crea una carpeta configuration con los archivos index.ts y envs.ts para gestionar la validación de las variables de entorno.
## Utiliza JOI para validar las variables en el archivo envs.ts:
$ import * as Joi from 'joi';

export const envValidationSchema = Joi.object({
  PORT: Joi.number().required(),
  DATABASE_URL: Joi.string().required(),
  JWT_SECRET: Joi.string().required(),
});
```

## Crear recursos y CRUD
```bash
## Puedes generar recursos para realizar el CRUD de tus entidades. Por ejemplo, para crear un recurso de usuarios, usa el siguiente comando:
$ nest g res usuarios
## Esto generará un controlador, un servicio y un DTO para manejar la creación, actualización, eliminación y lectura de los usuarios.
```

## Agregar seguridad y autenticación
```bash
## Para añadir seguridad y autenticación a tu proyecto, primero instala las dependencias necesarias:
$ npm install bcrypt @nestjs/jwt passport passport-local passport-jwt
## Luego, configura el JWT para generar y verificar tokens en el servicio de autenticación (auth.service.ts):

- Crea las funciones para generar un token JWT.
- Implementa la validación de tokens JWT usando Passport.
```

## Seguridad de las rutas
```bash
## Para proteger las rutas de tu servidor usando el JWT, crea un guard que verifique si la petición tiene un token válido:
$ nest g guard usuarios/auth/jwt --flat
## Este guard verificará que las solicitudes tengan un token válido antes de permitir el acceso a las rutas.
```

## Iniciar el servidor
```bash
## Una vez que todo esté configurado, puedes levantar el servidor con:
$ npm run start
```

## Comandos útiles
```bash
## Ejecutar el servidor en modo desarrollo:
$ npm run start:dev

## Ejecutar migraciones de Prisma:
$ npx prisma migrate dev

## Generar cliente Prisma:
$ npx prisma generate

## Generar un nuevo módulo:
$ nest g mo [nombre-modulo]


## Generar un nuevo servicio:
$ nest g s [nombre-servicio]


## Generar un nuevo recurso (controlador + servicio + DTO):
$ nest g res [nombre-recurso]

```