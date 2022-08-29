import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { CoreModule } from './core/core.module';
import { CategoryModule } from './category/category.module';
import { ProductsModule } from './products/products.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveStaticOptions: {
        index: false,
      },
    }),
    ConfigModule.forRoot(),
    MongooseModule.forRoot('mongodb://localhost/project_trainning'),
    CoreModule,
    CategoryModule,
    ProductsModule,
  ],
})
export class AppModule {}
