import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsSchema } from './entities/product.entity';
import { userSchema } from 'src/users/schemas/user.schema';

@Module({
  imports:[
    MongooseModule.forFeature([
      {schema:ProductsSchema,  name:'product'},
      {schema:userSchema,  name:'user'}
    ])
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
