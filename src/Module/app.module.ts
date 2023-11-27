import { Module } from '@nestjs/common';
import { AppController } from '../Controller/app.controller';
import { AppService } from '../Service/app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user.module';
import { BlogModule } from './blog.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/nest'),
    UserModule,
    BlogModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
