import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(@InjectModel('product') private ProductModel: Model<Product>) {}

  async create({ category, desc, name, price }: CreateProductDto) {
    const existedProduct = await this.ProductModel.findOne({ name });

    if (existedProduct) throw new BadRequestException('product already exist');

    const newProduct = this.ProductModel.create({
      category,
      desc,
      name,
      price,
    });

    return { message: 'created succsesfully', newProduct };
  }

  async findAll(req) {      
    const hasDiscount = req.subscription
    
    if(hasDiscount) {
    const products = await this.ProductModel.find();
      return products.map(item => ({
        ...item.toObject(),
        price: item.price/2
      }))
    }

    const products = await this.ProductModel.find();
    return products;
  }

  async findOne(id: string) {
    if (!isValidObjectId(id)) throw new BadRequestException('invalid id');
    const product = await this.ProductModel.findById(id);
    console.log(product);
    
    if (!product) throw new BadRequestException('product not found');

    return product;
  }

  async update(id: string, { category, desc, name, price }: UpdateProductDto) {
    if (!isValidObjectId(id)) throw new BadRequestException('invalid id');
    const product = await this.ProductModel.findById(id);
    if (!product) throw new BadRequestException('product not found');

    await this.ProductModel.findByIdAndUpdate(id, {
      category,
      desc,
      name,
      price,
    });

    return 'updated succsesfully';
  }

  async remove(id: string) {
    if (!isValidObjectId(id)) throw new BadRequestException('invalid id');
    const product = await this.ProductModel.findById(id);
    if (!product) throw new BadRequestException('product not found');

    await this.ProductModel.findByIdAndDelete(id)

    return 'product deletred succsesfully'
  }
}
