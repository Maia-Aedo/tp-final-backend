import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client'

@Injectable()
//extendemos la clase primsa
export class PrismaService extends PrismaClient implements OnModuleInit{
    //Mejora los logs en la aplicacion 
    private readonly logger = new Logger('Prisma service');

onModuleInit(){
   //desde la misma intancia de esta clase, nos conectamos por unica vez a la base de datps:
   this.$connect();
   this.logger.log('Connected to database');
}
}