import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  async enableShutdownHooks(app: INestApplication) {
    // @ts-expect-error so,
    this.$on<'beforeExit'>('beforeExit', async () => {
      try {
        await app.close();
      } catch (error) {
        console.error('Error closing the app', error);
      }
    });
  }
}
