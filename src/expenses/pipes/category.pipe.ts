import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from "@nestjs/common";


@Injectable()
export class CategoryPipe implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata) {
        console.log(value , 'valuer form pipes')

        const knowCategory = ["fishing" , "hunting"]
        if(value && !knowCategory.includes(value)) throw new BadRequestException('uknow category')

        return value
    }
}