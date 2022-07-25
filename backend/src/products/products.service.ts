import {
  BadRequestException,
  HttpStatus,
  Injectable,
  NotFoundException,
  Res,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProductDto, UpdateProductsDto, SearchProductDto } from './dto';
import { Product, ProductDocument } from './schema/product.schema';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}

  async getAllProducts(searchProductDto: SearchProductDto, @Res() response) {
    let page = searchProductDto.page || 1;
    const limit = searchProductDto.limit || 12;
    const { category, brand, searchWord } = searchProductDto;
    const filter = {
      $and: [
        searchWord ? { name: { $regex: searchWord, $options: 'i' } } : {},
        brand ? { brand: brand } : {},
        category ? { category: category } : {},
      ],
    };
    console.log(filter);
    console.log(page);
    const findProduct = await this.productModel
      .find(filter)
      .skip((page - 1) * limit)
      .limit(limit)
      .exec();
    if (!findProduct) {
      throw new NotFoundException(`Not found`);
    }
    return response.status(HttpStatus.OK).send(findProduct);
  }

  async getOneProduct(productId: string, @Res() response) {
    const findProduct = await this.productModel.findById(productId);
    if (!findProduct) {
      throw new NotFoundException(`Product #${productId} does not exist`);
    }
    return response.status(HttpStatus.OK).send(findProduct);
  }

  async createProduct(
    // mainPic: Express.Multer.File,
    createProductDto: CreateProductDto,
    @Res() response,
  ): Promise<Product> {
    // const picturePath = 'blobla/';
    // const newProduct = new this.productModel(createProductDto);
    // newProduct.mainImg = picturePath;
    const createProduct = await new this.productModel(createProductDto).save();
    if (!createProduct) {
      throw new BadRequestException(`Request Failed`);
    }
    return response.status(HttpStatus.OK).json({
      message: 'Product has been successfully created',
    });
  }

  async deleteProduct(productId: string, @Res() response) {
    const deletedProduct = await this.productModel.findByIdAndDelete(productId);
    if (!deletedProduct) {
      throw new NotFoundException(`Product #${productId} does not exist`);
    }
    return response.status(HttpStatus.OK).json({
      message: 'Product has been successfully deleted',
    });
  }

  async updateProduct(
    productId: string,
    updateProductDto: UpdateProductsDto,
    @Res() response,
  ) {
    const updateStudent = await this.productModel.findByIdAndUpdate(
      productId,
      updateProductDto,
      { new: true },
    );
    if (!updateStudent) {
      throw new NotFoundException(`Product #${productId} not found`);
    }
    return response.status(HttpStatus.OK).json({
      message: 'Product has been successfully updated',
    });
  }
}

