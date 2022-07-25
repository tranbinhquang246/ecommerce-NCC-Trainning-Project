import { Controller, Get } from '@nestjs/common';
import { DropdownService } from './dropdown.service';
import { Dropdown } from './schema/dropdown.schema';

@Controller('dropdown')
export class DropdownController {
  constructor(private readonly dropdownServices: DropdownService) {}

  @Get()
  async getData(): Promise<Dropdown[]> {
    return this.dropdownServices.findAll();
  }
}

