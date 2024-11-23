import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus, ParseIntPipe, Query } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { Response } from 'express';
import { Public } from 'src/common/decorators/public.decorator';
import { LoginDto } from './dto/login.dto';
import { PaginatorDto } from 'src/common/paginator/paginator.dto';

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Post('auth/register')
  // Hacemos la ruta pública con el decorador personalizado
  @Public()
  async register(
    @Body() createUsuarioDto: CreateUsuarioDto,
    @Res() response: Response,
  ) {
    const result = await this.usuariosService.register(createUsuarioDto);
    response
      .status(HttpStatus.CREATED)
      .json({ ok: true, result, msg: 'Created' });
  }

  @Post('auth/login')
  @Public()
  async login(@Body() credenciales: LoginDto, @Res() response: Response) {
    const result = await this.usuariosService.login(credenciales);
    response.status(HttpStatus.OK).json({ ok: true, result, msg: 'Approved' });
  }

  
  @Get()
  async findAll(@Query() paginator: PaginatorDto, @Res() response: Response) {
    const result = await this.usuariosService.findAll(paginator);
    response.status(HttpStatus.OK).json({ ok: true, result, msg: 'Approved'});
  }

  
  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: number,
    @Res() response: Response,
  ){
    const result = await this.usuariosService.findOne(id);
    response.status(HttpStatus.OK).json({ ok: true, result, msg: 'Approved'});
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUsuarioDto: UpdateUsuarioDto,
    @Res() response: Response,
    ) {
      const result = await this.usuariosService.update(id, updateUsuarioDto);
      response.status(HttpStatus.OK).json({ ok: true, result, msg:'Approved'});  }

  @Delete(':id')
  async remove(
    @Param('id', ParseIntPipe) id:number,
    @Res() response: Response,
  ) {
    const result = await this.usuariosService.remove(id);
    response.status(HttpStatus.OK).json({ ok: true, result, mgs: 'Aproved'});
  }
}
