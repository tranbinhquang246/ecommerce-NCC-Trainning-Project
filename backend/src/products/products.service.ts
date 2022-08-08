import {
  BadRequestException,
  HttpStatus,
  Injectable,
  NotFoundException,
  Res,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  CreateProductDto,
  UpdateProductsDto,
  SearchProductDto,
  RecommendProducts,
} from './dto';
import { Product, ProductDocument } from './schema/product.schema';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}

  async getAllProducts(searchProductDto: SearchProductDto, @Res() response) {
    const page = searchProductDto.page || 1;
    const limit = searchProductDto.limit || 6;
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
    const productsCount = await this.productModel.find(filter).count().exec();
    const totalPage = Math.ceil(productsCount / limit);
    const findProduct = await this.productModel
      .find(filter)
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ updatedAt: -1 })
      .exec();
    if (!findProduct) {
      throw new NotFoundException(`Not found`);
    }
    const data = {
      data: findProduct,
      totalPage: totalPage,
      currentPage: page,
    };

    return response.status(HttpStatus.OK).send(data);
  }

  async getRecommendProducts(
    recommendProduct: RecommendProducts,
    @Res() response,
  ) {
    const limit = 3;
    const { category, brand } = recommendProduct;
    const filter = {
      $or: [
        brand ? { brand: brand } : {},
        category ? { category: category } : {},
      ],
    };
    const productsCount = await this.productModel.find(filter).count().exec();
    const findProduct = await this.productModel
      .find(filter)
      .limit(limit)
      .sort({ price: 1 })
      .exec();
    if (!findProduct) {
      throw new NotFoundException(`Not found`);
    }
    const data = {
      data: findProduct,
    };

    return response.status(HttpStatus.OK).send(data);
  }

  async getOneProduct(productId: string, @Res() response) {
    const findProduct = await this.productModel.findById(productId);
    if (!findProduct) {
      throw new NotFoundException(`Product #${productId} does not exist`);
    }
    return response.status(HttpStatus.OK).send(findProduct);
  }

  async createProduct(
    mainImg: Express.Multer.File,
    createProductDto: CreateProductDto,
    @Res() response,
  ) {
    const picturePath = `${process.env.URL_PICTURE}${mainImg.filename}`;
    const newProduct = new this.productModel(createProductDto);
    newProduct.mainImg = picturePath;
    const createProduct = await newProduct.save();
    if (!createProduct) {
      throw new BadRequestException(`Request Failed`);
    }
    return response.status(HttpStatus.OK).send(createProduct);
  }

  async deleteProduct(productId: string, @Res() response) {
    const deletedProduct = await this.productModel.findByIdAndDelete(productId);
    if (!deletedProduct) {
      throw new NotFoundException(`Product #${productId} does not exist`);
    }

    return response.status(HttpStatus.OK).send(deletedProduct);
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
