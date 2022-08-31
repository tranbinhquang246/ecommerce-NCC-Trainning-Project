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
import fs = require('fs');
import { Category, CategoryDocument } from '../category/schema/category.schema';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
    @InjectModel(Category.name) private categoryModel: Model<CategoryDocument>,
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
      $or: [category ? { category: category } : {}],
    };
    const findProduct = await this.productModel.aggregate([
      { $sample: { size: 3 } },
    ]);

    if (!findProduct) {
      throw new NotFoundException(`Not found`);
    }
    const data = {
      data: findProduct,
    };

    return response.status(HttpStatus.OK).send(data);
  }

  async getCategory() {
    const category = await this.categoryModel.find().exec();
    return category;
  }
  async getOneProduct(productId: string, @Res() response) {
    const findProduct = await this.productModel.findById(productId);
    if (!findProduct) {
      throw new NotFoundException(`Product #${productId} does not exist`);
    }
    this.getCategory().then(function (result) {
      result[0]?.data.map((element) => {
        console.log('element', element);
        console.log('findProduct.category', findProduct.category);
        if (findProduct.category === element['categoryValues']) {
          findProduct.categoryName = element['categoryNames'];
        }
        (element['brandValues'] as Category[]).map((value, index) => {
          if (findProduct.brand === String(value)) {
            findProduct.brandName = element['brandNames'][index];
          }
        });
      });
      return response.status(HttpStatus.OK).send(findProduct);
    });
  }

  async createProduct(
    mainImg: Express.Multer.File,
    createProductDto: CreateProductDto,
    @Res() response,
  ) {
    const picturePath = `${process.env.URL_PICTURE}${mainImg.filename}`;
    const newProduct = new this.productModel(createProductDto);
    newProduct.mainImg = picturePath;
    newProduct.slidesImg = [null, null, null, null];
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
    const mainImg = deletedProduct.mainImg;
    const slidesImg = deletedProduct.slidesImg;
    fs.unlinkSync(`uploads/${mainImg.substring(mainImg.lastIndexOf('/') + 1)}`);
    slidesImg.map((element) => {
      if (element) {
        fs.unlinkSync(
          `uploads/${element.substring(element.lastIndexOf('/') + 1)}`,
        );
      }
    });
    return response.status(HttpStatus.OK).send(deletedProduct);
  }

  getSetPicturesWillUpdate(_files: Array<Express.Multer.File>, pictureAction) {
    const setPicturesWillUpdate = {};
    let fileSetCounter = 0;
    if (pictureAction[0] === 'update') {
      const newKey = `mainImg`;
      const newValue = `${process.env.URL_PICTURE}${_files[fileSetCounter].filename}`;
      fileSetCounter++;
      Object.assign(setPicturesWillUpdate, {
        [newKey]: newValue,
      });
    }

    for (let index = 1; index < pictureAction.length; index++) {
      if (pictureAction[index] === 'update') {
        const newKey = `slidesImg.${index - 1}`;
        const newValue = `${process.env.URL_PICTURE}${_files[fileSetCounter].filename}`;
        fileSetCounter++;
        Object.assign(setPicturesWillUpdate, {
          [newKey]: newValue,
        });
      } else if (pictureAction[index] === 'delete') {
        const newKey = `slidesImg.${index - 1}`;
        Object.assign(setPicturesWillUpdate, { [newKey]: '' });
      }
    }
    return setPicturesWillUpdate;
  }
  async deleteImg(productId, poisition) {
    const findProduct = await this.productModel.findById(productId);
    const mainImg = findProduct.mainImg;
    const slidesImg = findProduct.slidesImg;
    if (poisition[0] === 'update') {
      fs.unlinkSync(
        `uploads/${mainImg.substring(mainImg.lastIndexOf('/') + 1)}`,
      );
    }
    for (let index = 1; index < poisition.length; index++) {
      if (poisition[index] === 'update' || poisition[index] === 'delete') {
        if (slidesImg[index - 1]) {
          fs.unlinkSync(
            `uploads/${slidesImg[index - 1].substring(
              slidesImg[index - 1].lastIndexOf('/') + 1,
            )}`,
          );
        }
      }
    }
  }
  async updateProduct(
    productId: string,
    img: Array<Express.Multer.File>,
    updateProductDto: UpdateProductsDto,
    @Res() response,
  ) {
    let poisition: string[] = [];
    poisition = [...updateProductDto.poisitions];
    const setPicturesWillUpdate = this.getSetPicturesWillUpdate(img, poisition);
    this.deleteImg(productId, poisition);
    const updateProduct = await this.productModel.findByIdAndUpdate(
      productId,
      {
        name: updateProductDto.name,
        category: updateProductDto.category,
        brand: updateProductDto.brand,
        price: updateProductDto.price,
        description: updateProductDto.description,
        $set: setPicturesWillUpdate,
      },
      { new: true },
    );
    if (!updateProduct) {
      throw new NotFoundException(`Product #${productId} not found`);
    }
    return response.status(HttpStatus.OK).send(updateProduct);
  }
}
