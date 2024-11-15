import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus, ParseIntPipe } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import {  response, Response } from 'express';
import { Public } from 'src/common/decorators/public.decorator';

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

  // aqui falta completar, 
  @Get()
  findAll() {
    return this.usuariosService.findAll();
  }

  // aqui falta completar
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usuariosService.findOne(+id);
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
