import { NestFactory } from '@nestjs/core';
import { AppModule } from './Module/app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const cors = require('cors');
  const corsOptions ={
    origin:'http://localhost:3000',
    credentials:true,
    optionSuccessStatus: 200
  }
  app.use(cors(corsOptions));
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3001);
}
bootstrap();
