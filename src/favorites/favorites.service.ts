import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Favorite, Prisma } from '@prisma/client';

@Injectable()
export class FavoritesService {
  constructor(private prisma: PrismaService) {}

  async createFavorite(data: Prisma.FavoriteCreateInput): Promise<Favorite> {
    return await this.prisma.favorite.create({ data });
  }

  async findAllFavorites(
    options?: Prisma.FavoriteFindManyArgs,
  ): Promise<Favorite[]> {
    return await this.prisma.favorite.findMany(options);
  }

  async findFavoriteById(
    options: Prisma.FavoriteFindUniqueArgs,
  ): Promise<Favorite> {
    return this.prisma.favorite.findUnique(options);
  }

  async updateFavorite(
    id: string,
    data: Prisma.FavoriteUpdateInput,
  ): Promise<Favorite> {
    return await this.prisma.favorite.update({ where: { id }, data });
  }

  async deleteFavorite(id: string): Promise<Favorite> {
    return await this.prisma.favorite.delete({ where: { id } });
  }
}
