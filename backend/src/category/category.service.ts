import {
  BadRequestException,
  HttpStatus,
  Injectable,
  Res,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category, CategoryDocument } from './schema/category.schema';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<CategoryDocument>,
  ) {}
  async findAll(@Res() response): Promise<Category[]> {
    const category = await this.categoryModel.find().exec();
    if (!category) {
      throw new BadRequestException(`Request Failed`);
    }
    return response.status(HttpStatus.OK).send(category);
  }
}
