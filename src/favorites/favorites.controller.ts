import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { Favorite } from '@prisma/client';
import { FavoritesService } from './favorites.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { Request } from 'express';

@UseGuards(AuthGuard)
@Controller('favorites')
export class FavoritesController {
  constructor(private readonly favoriteService: FavoritesService) {}

  @Post()
  async createFavorite(
    @Body() data: { id: string; phoneId: string; ownerId: string },
  ): Promise<Favorite> {
    return this.favoriteService.createFavorite({
      id: data.id,
      phone: {
        connect: {
          id: data.phoneId,
        },
      },
      owner: {
        connect: {
          id: data.ownerId,
        },
      },
    });
  }

  @Get()
  async findAllFavorites(@Req() request: Request): Promise<Favorite[]> {
    //@ts-expect-error nao vai da erro nao confia
    const ownerId = request.user.sub;
    return this.favoriteService.findAllFavorites({
      where: { ownerId: ownerId },
      include: {
        owner: {
          select: {
            username: true,
          },
        },
        phone: {
          select: {
            number: true,
            owner: {
              select: {
                username: true,
              },
            },
          },
        },
      },
    });
  }

  @Get(':id')
  async findFavoriteById(@Param('id') id: string): Promise<Favorite> {
    return this.favoriteService.findFavoriteById({
      where: { id: id },
      include: {
        owner: true,
      },
    });
  }

  @Put(':id')
  async updateFavorite(
    @Param('id') id: string,
    @Body() data: Favorite,
  ): Promise<Favorite> {
    return this.favoriteService.updateFavorite(id, data);
  }

  @Delete(':id')
  async deleteFavorite(@Param('id') id: string): Promise<Favorite> {
    return this.favoriteService.deleteFavorite(id);
  }
}
