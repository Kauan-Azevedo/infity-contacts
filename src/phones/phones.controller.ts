import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { PhonesService } from './phones.service';
import { Phone } from '@prisma/client';
import { AuthGuard } from 'src/auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('phones')
export class PhonesController {
  constructor(private readonly phoneService: PhonesService) {}

  @Post()
  async createPhone(
    @Body() data: { id: string; number: string; ownerId: string },
  ): Promise<Phone> {
    return this.phoneService.createPhone({
      id: data.id,
      number: data.number,
      owner: {
        connect: {
          id: data.ownerId,
        },
      },
    });
  }

  @Get()
  async findAllPhones(): Promise<Phone[]> {
    return this.phoneService.findAllPhones({
      include: {
        owner: {
          select: {
            username: true,
          },
        },
      },
    });
  }

  @Get(':id')
  async findPhoneById(@Param('id') id: string): Promise<Phone> {
    return this.phoneService.findPhoneById({
      where: { id: id },
      include: {
        owner: true,
      },
    });
  }

  @Put(':id')
  async updatePhone(
    @Param('id') id: string,
    @Body() data: Phone,
  ): Promise<Phone> {
    return this.phoneService.updatePhone(id, data);
  }

  @Delete(':id')
  async deletePhone(@Param('id') id: string): Promise<Phone> {
    return this.phoneService.deletePhone(id);
  }
}
