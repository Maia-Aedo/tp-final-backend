import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
// Controlador comunica cliente con servidor
export class ProductosService extends PrismaClient implements OnModuleInit {
  async onModuleInit(){
    await this.$connect();
  }
  
  create(createProductoDto: CreateProductoDto) {
    return this.producto.create({
      data: createProductoDto
    });
  }

  findAll() {
    return this.producto.findMany({ include: {usuario: true} });
  }

  async findOne(id: number) {
    const product = await this.producto.findFirst({
      where: { id }
    });

    if(!product) throw new NotFoundException('Product not found');
    return product
  }

  async update(id: number, updateProductoDto: UpdateProductoDto) {
    await this.findOne(id);
    return this.producto.update({ where: {id}, data: updateProductoDto })
  }

  async remove(id: number) {
    const product = await this.findOne(id);
    if(!product) throw new NotFoundException('Product not found');

    return this.producto.update({ where: {id}, data: { activo: false } });
  }
}
