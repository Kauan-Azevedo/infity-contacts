import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Phone, Prisma } from '@prisma/client';

@Injectable()
export class PhonesService {
  constructor(private prisma: PrismaService) {}

  async createPhone(data: Prisma.PhoneCreateInput): Promise<Phone> {
    return await this.prisma.phone.create({ data });
  }

  async findAllPhones(options?: Prisma.PhoneFindManyArgs): Promise<Phone[]> {
    return await this.prisma.phone.findMany(options);
  }

  async findPhoneById(options: Prisma.PhoneFindUniqueArgs): Promise<Phone> {
    return this.prisma.phone.findUnique(options);
  }

  async updatePhone(id: string, data: Prisma.PhoneUpdateInput): Promise<Phone> {
    return await this.prisma.phone.update({ where: { id }, data });
  }

  async deletePhone(id: string): Promise<Phone> {
    return await this.prisma.phone.delete({ where: { id } });
  }
}
