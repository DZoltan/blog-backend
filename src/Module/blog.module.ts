import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BlogController } from 'src/Controller/blog.controller';
import { BlogService } from 'src/Service/blog.service';
import { BlogSchema } from 'src/Schema/blog.scheama';
import { UserModule } from './user.module';
import { UserSchema } from 'src/Schema/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Blog', schema: BlogSchema }]),
    UserModule,
  ],
  controllers: [BlogController],
  providers: [BlogService],
})
export class BlogModule {}
