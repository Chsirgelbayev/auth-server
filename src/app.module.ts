import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { Module } from '@nestjs/common';

@Module({
    imports: [DatabaseModule, AuthModule]
})
export class AppModule {}
