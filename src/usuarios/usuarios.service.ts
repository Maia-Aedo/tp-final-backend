import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common'; // lanzan errores HTTP específicos con códigos de estado y mensajes.
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthService } from './auth/auth.service';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class UsuariosService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly auth: AuthService,
  ) { }

  async findAll(paginator: PaginatorDto) {
    // destructuramos el objeto
    const { page, perPage } = paginator || {};
    // creamos una variable let que si no tinen datos devolvera undefined
    let metadata;
    // traemos la cantidad de registros
    const totalPages = await this.prisma.usuario.count({
      //filtrando solo los disponible
      where: { disponible: true },
    });
    // dividimos por cantidad por pagina
    const lastPage = Math.ceil(totalPages / perPage);
    // y si existen la pagina, y cantidas por pagina devolvemos los matadatos
    if (page && perPage)
      metadata = {
        page, //el numero de la pagina
        totalPages, // total de paginas
        lastPage, // cual seria la ultima pagina
      };

    //buscamos los datos 
    const data = await this.prisma.usuario.findMany({
      //en caso de que no existan estos datos, trae todo directamente
      skip: page ? (page - 1) * perPage : undefined,
      take: perPage ? perPage : undefined,
      // filtramos por disponible
      where: { disponible: true },
    });

    // y retornamos la informacion 
    return {
      data,
      // los metodos dependen de la informacion provista por paginador
      metadata: metadata ? metadata : { totalRecords: totalPages },
    };
  }

  async findOne(id: number) {
    const usuario = await this.prisma.usuario.findFirst({
      where: { id, disponible: true },
    });
    if (!usuario) throw new NotFoundException('User not found');
    return usuario;
  }

  async register(createUsuarioDto: CreateUsuarioDto) {
    // Desestructuramos el objeto
    const { contrasenia, correo } = createUsuarioDto || {};
    // buscamos en los registros si ya hay un usuario con ese correo
    const usuario = await this.prisma.usuario.findFirst({ where: { correo } });
    // si existe lanzamos error 
    if (usuario) throw new BadRequestException('Correo already taken');
    // en caso que no se encuentre la contraseña (no deberia pasar si se configuro bien el DTO.)
    if (!contrasenia) throw new BadRequestException('Some params are required');
    // hasheamos la contraseña 
    const hashPassword = await this.auth.hashContrasenia(contrasenia);
    // Creamos usuario
    const newUsuario = await this.prisma.usuario.create({
      data: { ...createUsuarioDto, contrasenia: hashPassword },
    });
    // borramos la propiedad de la contraseña
    delete newUsuario['contrasenia'];
    // retornamos usuario creado
    return newUsuario;
  }

  async login(credenciales: LoginDto) {
    // desestructuramos el objeto
    const { correo, contrasenia } = credenciales || {};
    // buscamos el usuario en la base de datos
    const usuario = await this.prisma.usuario.findFirst({ where: { correo } });
    // si no existe, no esta autorizado
    if (!usuario) throw new UnauthorizedException('User not found');
    //comparamos la contrasenia
    const isPassword = await this.auth.comparePasswords(
      contrasenia,
      usuario.contrasenia
    );
    // si no es igual, no autorizado
    if (!isPassword) throw new UnauthorizedException('Wrong credentials');
    //creamos el token
    const token = this.auth.createJwt(usuario);
    // eliminamos la contraseña del objeto 
    delete usuario['contrasenia'];
    //retornamos el token y el usuario
    return { token, usuario };
  }

  async update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    // desestrcuturamos el objeto, y limpiamos el valor del ID
    const { id: __, ...data } = updateUsuarioDto;
    // insertamos los valores en la base de datos
    const result = await this.prisma.usuario.update({
      where: { id },
      data,
    });
    // no olvidar de eliminar la contraseña del objeto a retornar 
    delete result['contrasenia'];
    return result;
  }

  async remove(id: number) {
    const result = await this.prisma.usuario.update({
      where: { id },
      data: {
        //cambiamos su disponibilidad 
        disponible: false,
      },
    });
    delete result['contrasenia'];
    return result;
  }
}
