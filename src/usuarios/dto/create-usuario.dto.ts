import { IsEmail, IsString } from 'class-validator';

export class CreateUsuarioDto {
  // Usamos las validaciones
  //para controlar que tipo de datos debemos recibir
  @IsEmail() // Debe ser email
  correo: string;
  @IsString() // Debe ser string
  contrasenia: string;
  @IsString() // Debe ser string
  rol: string;
}
