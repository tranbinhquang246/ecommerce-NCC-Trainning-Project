import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Dropdown, DropdownDocument } from './schema/dropdown.schema';

@Injectable()
export class DropdownService {
  constructor(
    @InjectModel(Dropdown.name) private dropdownModel: Model<DropdownDocument>,
  ) {}
  async findAll(): Promise<Dropdown[]> {
    return this.dropdownModel.find().exec();
  }
}

