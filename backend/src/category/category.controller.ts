import { Controller, Get, Res } from '@nestjs/common';
import { CategoryService } from './category.service';
import { Category } from './schema/category.schema';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryServices: CategoryService) {}

  @Get()
  async getData(@Res() response): Promise<Category[]> {
    return this.categoryServices.findAll(response);
  }
}
