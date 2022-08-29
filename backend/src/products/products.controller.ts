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
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import {
  CreateProductDto,
  UpdateProductsDto,
  SearchProductDto,
  RecommendProducts,
} from './dto';
import { ProductsService } from './products.service';
import { Product } from './schema/product.schema';

const multerOptions = {
  storage: diskStorage({
    destination: './uploads',
    filename: (req, file, callback) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      const ext = extname(file.originalname);
      const fileName = `${file.originalname}-${uniqueSuffix}${ext}`;
      callback(null, fileName);
    },
  }),
  fileFilter: (req, file, callback) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
      return callback(new Error('Only image files are allowed!'), false);
    }
    callback(null, true);
  },
};

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
  @Get('recommend')
  async getRecommendProducts(
    @Query() recommendProducts: RecommendProducts,
    @Res() response,
  ): Promise<Product[]> {
    return this.productServices.getRecommendProducts(
      recommendProducts,
      response,
    );
  }

  @Get(':productId')
  async getOneStudents(@Param('productId') productId: string, @Res() response) {
    return this.productServices.getOneProduct(productId, response);
  }

  @Post()
  @UseInterceptors(FileInterceptor('mainImg', multerOptions))
  async createStudent(
    @UploadedFile() mainImg: Express.Multer.File,
    @Body() createProductDto: CreateProductDto,
    @Res() response,
  ): Promise<Product> {
    return this.productServices.createProduct(
      mainImg,
      createProductDto,
      response,
    );
  }

  @Put(':productId')
  @UseInterceptors(FilesInterceptor('img[]', 5, multerOptions))
  async updateProduct(
    @UploadedFiles() img: Array<Express.Multer.File>,
    @Res() response,
    @Param('productId') productId: string,
    @Body() updateProductDto: UpdateProductsDto,
  ): Promise<Product> {
    return this.productServices.updateProduct(
      productId,
      img,
      updateProductDto,
      response,
    );
  }

  @Delete(':productId')
  async remove(@Param('productId') productId: string, @Res() response) {
    return this.productServices.deleteProduct(productId, response);
  }
}
