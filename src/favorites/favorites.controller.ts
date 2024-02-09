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
import { Favorite } from '@prisma/client';
import { FavoritesService } from './favorites.service';
import { AuthGuard } from 'src/auth/auth.guard';

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
  async findAllFavorites(): Promise<Favorite[]> {
    return this.favoriteService.findAllFavorites({
      include: {
        owner: true,
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
