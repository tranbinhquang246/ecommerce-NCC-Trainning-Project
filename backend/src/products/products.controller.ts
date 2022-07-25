import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateProductDto, UpdateProductsDto, SearchProductDto } from './dto';
import { ProductsService } from './products.service';
import { Product } from './schema/product.schema';

@Controller('products')
export class ProductsController {
  constructor(private readonly productServices: ProductsService) {}

  @Get()
  async getAllProducts(
    @Query() searchProductDto: SearchProductDto,
    @Res() response,
  ): Promise<Product[]> {
    return this.productServices.getAllProducts(searchProductDto, response);
  }

  @Get(':productId')
  async getOneStudents(@Param('productId') productId: string, @Res() response) {
    return this.productServices.getOneProduct(productId, response);
  }

  @Post()
  // @UseInterceptors(FileInterceptor('photo', { dest: './uploads' }))
  async createStudent(
    // @UploadedFile() mainPic: Express.Multer.File,
    @Body() createProductDto: CreateProductDto,
    @Res() response,
  ): Promise<Product> {
    return this.productServices.createProduct(
      // mainPic,
      createProductDto,
      response,
    );
  }

  @Put(':productId')
  async updateproduct(
    @Res() response,
    @Param('productId') productId: string,
    @Body() updateProductDto: UpdateProductsDto,
  ) {
    return this.productServices.updateProduct(
      productId,
      updateProductDto,
      response,
    );
  }

  @Delete(':productId')
  async remove(@Param('productId') productId: string, @Res() response) {
    return this.productServices.deleteProduct(productId, response);
  }

  // @Get('find/findByFilter')
  // async getProductwithParam(
  //   @Query() searchProductDto: SearchProductDto,
  //   @Res() response,
  // ) {
  //   return this.productServices.getProductwithParam(searchProductDto, response);
  // }
}

