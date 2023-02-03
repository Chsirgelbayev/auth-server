import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MongooseConfigModule } from '../config/mongoose/mongoose-config.module';
import { MongooseConfigService } from '../config/mongoose/mongoose-config.service';

@Module({
    imports: [
        MongooseModule.forRootAsync({
            imports: [MongooseConfigModule],
            useClass: MongooseConfigService
        })
    ]
})
export class DatabaseModule {}
