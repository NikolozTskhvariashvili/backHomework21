import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UseGuards, Req, Headers } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { HasEmail } from 'src/guards/Has-email.guard';
import { HasId } from 'src/guards/Has-Id.guard';

@UseGuards(HasEmail)
@UseGuards(HasId)
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto, @Headers('user-id') userId) {
    return this.productsService.create(createProductDto, userId);
  }

  @Get()
  findAll(@Req() req) {
    return this.productsService.findAll(req);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Headers('user-id') userId) {
    return this.productsService.remove(id, userId);
  }
}
