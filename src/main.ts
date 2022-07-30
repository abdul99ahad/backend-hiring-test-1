import { NestFactory } from '@nestjs/core';
import { IvrModule } from './ivr/ivr.module';

async function bootstrap() {
  const app = await NestFactory.create(IvrModule);
  await app.listen(3000);
}

bootstrap();
