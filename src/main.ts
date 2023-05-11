import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.init();
  app.enableCors();
  await app.listen(3000);
}
bootstrap();
