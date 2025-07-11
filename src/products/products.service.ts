import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { Product } from './entities/product.entity';
import { User } from 'src/users/schemas/user.schema';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel('product') private ProductModel: Model<Product>,
    @InjectModel('user') private UserModel: Model<User>,
  ) {}

  async create({ category, desc, name, price }: CreateProductDto, userId) {
    const existedProduct = await this.ProductModel.findOne({ name });
    console.log(userId, 'user iddddddddddddddddddddddddddddd')

    if(!isValidObjectId(userId)) throw new BadRequestException('invalid id')

    if (existedProduct) throw new BadRequestException('product already exist');

    const newProduct = await this.ProductModel.create({
      category,
      desc,
      name,
      price,
      author: userId,
    });

    await this.UserModel.findByIdAndUpdate(userId, {
      $push: { products: newProduct._id },
    });

    return { message: 'created succsesfully', newProduct };
  }

  async findAll(req) {
    const hasDiscount = req.subscription;

    if (hasDiscount) {
      const products = await this.ProductModel.find();
      return products.map((item) => ({
        ...item.toObject(),
        price: item.price / 2,
      }));
    }

    const products = await this.ProductModel.find();
    return products;
  }

  async findOne(id: string) {
    if (!isValidObjectId(id)) throw new BadRequestException('invalid id');
    const product = await this.ProductModel.findById(id);

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

  async remove(id: string, userId) {
    if (!isValidObjectId(id)) throw new BadRequestException('invalid id');
    const product = await this.ProductModel.findById(id);
    if (!product) throw new BadRequestException('product not found');

    await this.ProductModel.findByIdAndDelete(id);
    await this.UserModel.findByIdAndUpdate(
      userId,
      { $pull: { products: id } },
      { new: true },
    );

    return 'product deletred succsesfully';
  }
}
