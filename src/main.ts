import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as bodyParser from "body-parser"
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(); 
  app.use(bodyParser.json({ limit: '10mb' }));
  await app.listen(6969);
  console.log("Đang chạy ở 6969")
}
bootstrap();
