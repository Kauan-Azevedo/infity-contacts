import { Module } from '@nestjs/common';
import { PhonesService } from './phones.service';
import { PhonesController } from './phones.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [PhonesController],
  providers: [PhonesService, PrismaService],
  exports: [PhonesService],
})
export class PhonesModule {}
