import { Module } from '@nestjs/common';
import { DropdownController } from './dropdown.controller';
import { DropdownService } from './dropdown.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Dropdown, DropdownSchema } from './schema/dropdown.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Dropdown.name, schema: DropdownSchema },
    ]),
  ],
  controllers: [DropdownController],
  providers: [DropdownService],
})
export class DropdownModule {}

